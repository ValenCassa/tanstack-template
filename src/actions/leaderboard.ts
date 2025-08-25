import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

import { db } from "~/utils/db/db";
import { users } from "~/utils/db/schema/auth/schema";
import {
  postComments,
  posts,
  postUpvotes,
} from "~/utils/db/schema/posts/schema";
import { jsonBuildObject } from "~/utils/db/utils";

/* --------- Get Leaderboard --------- */

const userUpvoteCounts = db.$with("user_upvote_counts").as(
  db
    .select({
      userId: posts.authorId,
      upvoteCount: sql<number>`COUNT(*)`.as("upvote_count"),
    })
    .from(postUpvotes)
    .innerJoin(posts, eq(postUpvotes.postId, posts.id))
    .groupBy(posts.authorId),
);

const userCommentCounts = db.$with("user_comment_counts").as(
  db
    .select({
      userId: postComments.userId,
      commentCount: sql<number>`COUNT(*)`.as("comment_count"),
    })
    .from(postComments)
    .groupBy(postComments.userId),
);

const userPostCounts = db.$with("user_post_counts").as(
  db
    .select({
      userId: posts.authorId,
      postCount: sql<number>`COUNT(*)`.as("post_count"),
    })
    .from(posts)
    .groupBy(posts.authorId),
);

export const getLeaderboard = createServerFn().handler(async () => {
  const data = await db
    .with(userUpvoteCounts, userCommentCounts, userPostCounts)
    .select({
      user: jsonBuildObject({
        id: users.id,
        name: users.name,
        image: users.image,
      }),
      upvotesReceived:
        sql<number>`COALESCE(${userUpvoteCounts.upvoteCount}, 0)`.as(
          "upvotesReceived",
        ),
      comments: sql<number>`COALESCE(${userCommentCounts.commentCount}, 0)`.as(
        "comments",
      ),
      posts: sql<number>`COALESCE(${userPostCounts.postCount}, 0)`.as("posts"),
    })
    .from(users)
    .leftJoin(userUpvoteCounts, eq(userUpvoteCounts.userId, users.id))
    .leftJoin(userCommentCounts, eq(userCommentCounts.userId, users.id))
    .leftJoin(userPostCounts, eq(userPostCounts.userId, users.id));

  return data;
});

export function getLeaderboardQueryOptions() {
  return {
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  };
}
