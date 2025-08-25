import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import { getLeaderboardQueryOptions } from "~/actions/leaderboard";
import { DoubleCheckIcon } from "~/components/icons";
import { Avatar, Separator } from "~/components/ui";

export function FeedbackLeaderboard() {
  const { data } = useSuspenseQuery(getLeaderboardQueryOptions());
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="w-full"
    >
      {data
        .sort((a, b) => {
          const countA =
            Number(a.comments) + Number(a.upvotesReceived) + Number(a.posts);
          const countB =
            Number(b.comments) + Number(b.upvotesReceived) + Number(b.posts);
          return countB - countA;
        })
        .map((entry) => {
          const counts =
            Number(entry.comments) +
            Number(entry.upvotesReceived) +
            Number(entry.posts);
          return (
            <div
              key={entry.user.id}
              className="space-y-1.5 not-first-of-type:pt-1.5"
            >
              <div className="flex h-7 w-full items-center justify-between pr-2 pl-2">
                <div className="flex items-center gap-2">
                  <Avatar.Root>
                    <Avatar.Image
                      src={entry.user.image ?? undefined}
                      alt={entry.user.name}
                    />
                    <Avatar.Fallback />
                  </Avatar.Root>
                  <p className="text-subtle text-sm font-medium">
                    {entry.user.name}
                  </p>
                </div>
                <div className="text-muted flex items-center gap-1">
                  <DoubleCheckIcon className="size-3" />
                  <p className="text-xs font-medium">{counts}</p>
                </div>
              </div>
              <Separator />
            </div>
          );
        })}
    </motion.div>
  );
}
