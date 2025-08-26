import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { DateTime } from "luxon";

import { getPostQueryOptions } from "~/actions/posts";
import { Avatar } from "~/components/ui";

import { Route } from "../../$postId.page";
import { CommentForm } from "./comment-form";

export function PostComments() {
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(getPostQueryOptions(postId));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-medium">Comments</p>
        <span className="bg-subtle text-subtle inline-grid h-4.5 min-w-4.5 place-content-center rounded-md px-1.5 text-xs font-medium">
          {data.comments.length}
        </span>
      </div>
      <CommentForm />
      <AnimatePresence initial={false} mode="popLayout">
        {data.comments.map((comment) => {
          return (
            <motion.div
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              layout="position"
              className="flex gap-3"
              key={comment.id}
            >
              <Avatar.Root size="lg" className="shrink-0">
                <Avatar.Image
                  src={comment.author.image || undefined}
                  alt={comment.author.name}
                />
                <Avatar.Fallback className="[&_svg]:size-5" />
              </Avatar.Root>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium">{comment.author.name}</p>

                  <span className="size-1 bg-[var(--text-color-muted)]" />

                  <p className="text-subtle text-xs font-medium">
                    {DateTime.fromJSDate(
                      new Date(comment.createdAt),
                    ).toRelativeCalendar()}
                  </p>
                </div>
                <p className="text-light text-sm leading-[22px]">
                  {comment.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
