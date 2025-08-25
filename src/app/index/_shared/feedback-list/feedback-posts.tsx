import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { motion } from "motion/react";

import { getPostsQueryOptions } from "~/actions/posts";
import { MsgFilled } from "~/components/icons";
import { ChevronRightIcon } from "~/components/icons/chevron-right-icon";
import { Avatar, Separator } from "~/components/ui";
import { cn } from "~/utils/cn";
import { BOARD_META } from "~/utils/mappings";

import { Route } from "../../index.page";

export function FeedbackPosts() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(getPostsQueryOptions(search));

  if (!data.length) {
    return "empty";
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
                  "space-y-3 px-4 py-3.5 outline-hidden transition-colors",
                  "hover:bg-muted",
                  "focus-visible:bg-muted",
                )}
              >
                <div className="space-y-1">
                  <p className="text-base text-sm font-medium">{post.title}</p>
                  <p className="text-subtle text-sm">{post.description}</p>
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
