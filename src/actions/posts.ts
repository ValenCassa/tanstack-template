import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";

import { serverAuth } from "~/utils/auth/server-auth";
import { db } from "~/utils/db/db";
import { users } from "~/utils/db/schema/auth/schema";
import {
  boardTypeEnum,
  postComments,
  posts,
  postsValidateSearch,
  postUpvotes,
} from "~/utils/db/schema/posts/schema";
import { jsonBuildObject } from "~/utils/db/utils";

import { authMiddleware } from "./middlewares";

/* --------- Get posts --------- */

const commentCounts = db.$with("comment_counts").as(
  db
    .select({
      postId: postComments.postId,
      comments7d:
        sql<number>`COUNT(*) FILTER (WHERE ${postComments.createdAt} >= NOW() - INTERVAL '7 days')`.as(
          "comments7d",
        ),
      commentsAll: sql<number>`COUNT(*)`.as("commentsAll"),
    })
    .from(postComments)
    .groupBy(postComments.postId),
);

const upvoteCounts = db.$with("upvote_counts").as(
  db
    .select({
      postId: postUpvotes.postId,
      upvotes7d:
        sql<number>`COUNT(*) FILTER (WHERE ${postUpvotes.createdAt} >= NOW() - INTERVAL '7 days')`.as(
          "upvotes7d",
        ),
      upvotesAll: sql<number>`COUNT(*)`.as("upvotesAll"),
    })
    .from(postUpvotes)
    .groupBy(postUpvotes.postId),
);

// handy score expressions (reusable in SELECT + ORDER BY)
const commentsWeight = 2;
const upvotesWeight = 1;

const trendScore = sql<number>`
  COALESCE(${commentsWeight} * COALESCE(${commentCounts.comments7d}, 0), 0)
  + COALESCE(${upvotesWeight} * COALESCE(${upvoteCounts.upvotes7d}, 0), 0)
`;

const topScore = sql<number>`
  COALESCE(${commentsWeight} * COALESCE(${commentCounts.commentsAll}, 0), 0)
  + COALESCE(${upvotesWeight} * COALESCE(${upvoteCounts.upvotesAll}, 0), 0)
`;

export const getPosts = createServerFn()
  .validator(postsValidateSearch)
  .handler(async ({ data: input }) => {
    const request = getWebRequest();
    if (!request) {
      throw new Error("Request not found");
    }

    const session = await serverAuth.api.getSession(request);

    const data = await db
      .with(commentCounts, upvoteCounts)
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        createdAt: posts.createdAt,
        board: posts.board,
        author: jsonBuildObject({
          id: users.id,
          name: users.name,
          image: users.image,
        }),
        comments7d: sql<number>`COALESCE(${commentCounts.comments7d}, 0)`.as(
          "comments7d",
        ),
        upvotes7d: sql<number>`COALESCE(${upvoteCounts.upvotes7d}, 0)`.as(
          "upvotes7d",
        ),
        commentsAll: sql<number>`COALESCE(${commentCounts.commentsAll}, 0)`.as(
          "commentsAll",
        ),
        upvotesAll: sql<number>`COALESCE(${upvoteCounts.upvotesAll}, 0)`.as(
          "upvotesAll",
        ),
        upvoted:
          sql<boolean>`COALESCE(${postUpvotes.id} IS NOT NULL, false)`.as(
            "upvoted",
          ),
        trendScore,
        topScore,
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .leftJoin(commentCounts, eq(commentCounts.postId, posts.id))
      .leftJoin(upvoteCounts, eq(upvoteCounts.postId, posts.id))
      .leftJoin(
        postUpvotes,
        and(
          eq(postUpvotes.postId, posts.id),
          sql`${Boolean(session?.user?.id)} IS NOT NULL`,
          eq(postUpvotes.userId, session?.user?.id ?? ""),
        ),
      )
      .where(
        and(
          // Filter by board if not "all"
          input.board !== "all" ? eq(posts.board, input.board) : undefined,
          // Filter by search if not empty
          input.search
            ? or(
                ilike(posts.title, `%${input.search}%`),
                ilike(posts.description, `%${input.search}%`),
              )
            : undefined,
        ),
      )
      .orderBy(
        sql`
          CASE ${input.sort}
            WHEN 'trending' THEN ${trendScore}
            WHEN 'top'      THEN ${topScore}
            ELSE NULL
          END DESC
        `,
        sql`CASE WHEN ${input.sort} = 'new' THEN ${posts.createdAt} END DESC`,
        desc(posts.createdAt),
      );

    return data;
  });

export function getPostsQueryOptions(
  args: z.infer<typeof postsValidateSearch>,
) {
  return {
    queryKey: ["posts", args],
    queryFn: () => getPosts({ data: args }),
  };
}

/* --------- Get Post --------- */

const getPostValidator = z.object({
  postId: z.string(),
});

// CTE for comments with their authors
const postCommentsWithAuthors = db.$with("post_comments_with_authors").as(
  db
    .select({
      postId: postComments.postId,
      commentData: jsonBuildObject({
        id: postComments.id,
        content: postComments.content,
        createdAt: postComments.createdAt,
        author: jsonBuildObject({
          id: users.id,
          name: users.name,
          image: users.image,
        }),
      }).as("comment_data"),
    })
    .from(postComments)
    .innerJoin(users, eq(postComments.userId, users.id))
    .orderBy(desc(postComments.createdAt)),
);

export const getPost = createServerFn()
  .validator(getPostValidator)
  .handler(async ({ data: { postId } }) => {
    const request = getWebRequest();
    if (!request) {
      throw new Error("Request not found");
    }

    const session = await serverAuth.api.getSession(request);

    const data = await db
      .with(upvoteCounts, postCommentsWithAuthors)
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        createdAt: posts.createdAt,
        board: posts.board,
        author: jsonBuildObject({
          id: users.id,
          name: users.name,
          image: users.image,
        }),
        upvotesCount: sql<number>`COALESCE(${upvoteCounts.upvotesAll}, 0)`.as(
          "upvotesCount",
        ),
        upvoted:
          sql<boolean>`COALESCE(${postUpvotes.id} IS NOT NULL, false)`.as(
            "upvoted",
          ),
        comments: sql<
          Array<{
            id: string;
            content: string;
            createdAt: Date;
            author: {
              id: string;
              name: string;
              image: string | null;
            };
          }>
        >`COALESCE(json_agg(${postCommentsWithAuthors.commentData}) FILTER (WHERE ${postCommentsWithAuthors.commentData} IS NOT NULL), '[]'::json)`.as(
          "comments",
        ),
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .leftJoin(upvoteCounts, eq(upvoteCounts.postId, posts.id))
      .leftJoin(
        postCommentsWithAuthors,
        eq(postCommentsWithAuthors.postId, posts.id),
      )
      .leftJoin(
        postUpvotes,
        and(
          eq(postUpvotes.postId, posts.id),
          sql`${Boolean(session?.user?.id)} IS NOT NULL`,
          eq(postUpvotes.userId, session?.user?.id ?? ""),
        ),
      )
      .where(eq(posts.id, postId))
      .groupBy(
        posts.id,
        users.id,
        users.name,
        users.image,
        upvoteCounts.upvotesAll,
        postUpvotes.id,
      )
      .limit(1);

    if (data.length === 0) {
      throw new Error("Post not found");
    }

    return data[0];
  });

export function getPostQueryOptions(postId: string) {
  return {
    queryKey: ["post", postId],
    queryFn: () => getPost({ data: { postId } }),
  };
}

/* --------- Create Post --------- */

const createPostValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  board: z.enum(boardTypeEnum),
});

export const createPost = createServerFn()
  .middleware([authMiddleware])
  .validator(createPostValidator)
  .handler(async ({ data, context }) => {
    const { session } = context;

    const [newPost] = await db
      .insert(posts)
      .values({
        title: data.title,
        description: data.description,
        board: data.board,
        authorId: session.user.id,
      })
      .returning({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        board: posts.board,
        createdAt: posts.createdAt,
      });

    return newPost;
  });

/* --------- Upvote Post --------- */
const upvotePostValidator = z.object({
  postId: z.string(),
});

export const upvotePost = createServerFn()
  .middleware([authMiddleware])
  .validator(upvotePostValidator)
  .handler(async ({ data: { postId }, context }) => {
    const { session } = context;

    // Toggle upvote: delete if exists, otherwise insert
    await db.execute(sql`
      WITH deleted AS (
        DELETE FROM post_upvotes 
        WHERE post_id = ${postId} AND user_id = ${session.user.id}
        RETURNING 1
      )
      INSERT INTO post_upvotes (id, post_id, user_id, created_at, updated_at)
      SELECT gen_random_uuid(), ${postId}, ${session.user.id}, NOW(), NOW()
      WHERE NOT EXISTS (SELECT 1 FROM deleted)
    `);
  });

/* --------- Comment Post --------- */
const commentPostValidator = z.object({
  postId: z.string(),
  content: z.string().min(1),
});

export const commentPost = createServerFn()
  .middleware([authMiddleware])
  .validator(commentPostValidator)
  .handler(async ({ data: { postId, content }, context }) => {
    const { session } = context;

    const [newComment] = await db
      .insert(postComments)
      .values({
        postId,
        content,
        userId: session.user.id,
      })
      .returning({
        id: postComments.id,
        content: postComments.content,
        createdAt: postComments.createdAt,
        postId: postComments.postId,
      });

    return {
      id: newComment.id,
      content: newComment.content,
      createdAt: newComment.createdAt,
      author: {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
      },
    };
  });
