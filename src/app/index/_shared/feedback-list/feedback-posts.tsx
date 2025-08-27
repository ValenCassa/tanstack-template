import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { motion } from "motion/react";

import type { GetPostResponse, GetPostsResponse } from "~/actions/posts";
import {
  getPostQueryOptions,
  getPostsQueryOptions,
  upvotePost as upvotePostAction,
} from "~/actions/posts";
import { EmptyIcon, MsgFilled } from "~/components/icons";
import { ChevronRightIcon } from "~/components/icons/chevron-right-icon";
import { Avatar, Separator } from "~/components/ui";
import { cn } from "~/utils/cn";
import { BOARD_META } from "~/utils/mappings";

import { Route } from "../../index.page";

export function FeedbackPosts() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(getPostsQueryOptions(search));
  const { queryClient } = Route.useRouteContext();
  const upvotePost = useMutation({
    mutationFn: (postId: string) => {
      return upvotePostAction({ data: { postId } });
    },
    onMutate: async (postId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries(getPostQueryOptions(postId));

      // Snapshot the previous value with the current search params
      const previousPosts: GetPostsResponse =
        queryClient.getQueryData(getPostsQueryOptions(search).queryKey) || [];

      // Optimistically update to the new value
      queryClient.setQueryData(
        getPostsQueryOptions(search).queryKey,
        (old: GetPostsResponse) => {
          return old.map((post) => {
            if (post.id !== postId) {
              return post;
            }

            const upvotesAll = post.upvotesAll + (post.upvoted ? -1 : 1);

            return {
              ...post,
              upvoted: !post.upvoted,
              upvotesAll,
            };
          });
        },
      );

      const previousPost: GetPostResponse | undefined =
        queryClient.getQueryData(getPostQueryOptions(postId).queryKey);

      queryClient.setQueryData(
        getPostQueryOptions(postId).queryKey,
        (old: GetPostResponse | undefined) => {
          if (!old) {
            return old;
          }

          const upvotesCount = old.upvotesCount + (old.upvoted ? -1 : 1);

          return { ...old, upvoted: !old.upvoted, upvotesCount };
        },
      );

      return { previousPosts, previousPost };
    },
    onError: (_, postId, context) => {
      queryClient.setQueryData(
        getPostsQueryOptions(search).queryKey,
        context?.previousPosts,
      );
      queryClient.setQueryData(
        getPostQueryOptions(postId).queryKey,
        context?.previousPost,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (!data.length) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="border-strong grid w-full place-content-center space-y-4 rounded-md border border-dashed py-[140px]"
      >
        <EmptyIcon className="text-muted mx-auto size-6" />
        <p className="text-subtle text-sm font-medium">No posts found</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="bg-muted border-base w-full overflow-hidden rounded-md border"
    >
      {data.map((post) => {
        const board = BOARD_META[post.board];
        return (
          <div key={post.id} className="group/post">
            <div className="flex">
              <Link
                to="/post/$postId"
                params={{ postId: post.id }}
                className={cn(
                  "flex-1 space-y-3 px-4 py-3.5 outline-hidden transition-colors",
                  "hover:bg-muted",
                  "focus-visible:bg-muted",
                )}
              >
                <div className="space-y-1">
                  <p className="text-base text-sm font-medium">{post.title}</p>
                  <p className="text-subtle line-clamp-3 text-sm">
                    {post.description}
                  </p>
                </div>

                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <Avatar.Root>
                        <Avatar.Fallback />
                        <Avatar.Image
                          src={post.author.image || ""}
                          alt={post.author.name}
                        />
                      </Avatar.Root>
                      <p className="text-light text-xs font-medium">
                        {post.author.name}
                      </p>
                    </div>

                    <span className="size-1 bg-[var(--text-color-muted)]" />

                    <p className="text-light text-xs font-medium">
                      {DateTime.fromJSDate(post.createdAt).toRelativeCalendar()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <MsgFilled className="text-light size-3" />
                      <p className="text-light text-xs font-medium">
                        {post.commentsAll}
                      </p>
                    </div>

                    <span className="size-1 bg-[var(--text-color-muted)]" />

                    <div className="flex items-center gap-1">
                      <board.icon className="text-light size-3" />
                      <p className="text-light text-xs font-medium">
                        {board.label}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <Separator orientation="vertical" className="!h-[unset]" />

              <button
                data-requires-auth
                data-upvoted={post.upvoted || undefined}
                onClick={() => upvotePost.mutate(post.id)}
                className={cn(
                  "group/upvote grid w-12 shrink-0 place-content-center gap-2 text-xs font-medium outline-hidden transition-colors",
                  "hover:bg-muted",
                  "focus-visible:bg-muted",
                  "data-[upvoted]:bg-sky-300/10",
                )}
              >
                <ChevronRightIcon
                  className={cn(
                    "text-muted size-4 -rotate-90 transition-all group-hover/upvote:text-base",
                    "group-hover/upvote:-translate-y-1",
                  )}
                />
                {post.upvotesAll}
              </button>
            </div>
            <Separator
              orientation="horizontal"
              className="group-last-of-type/post:hidden"
            />
          </div>
        );
      })}
    </motion.div>
  );
}
