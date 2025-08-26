import { Suspense } from "react";

import { Button } from "~/components/ui";

import { FeedbackBoard } from "./feedback-board";
import { FeedbackLeaderboard } from "./feedback-leaderboard";

export function FeedbackMeta() {
  return (
    <div className="sticky top-0 w-[260px] space-y-6 self-start py-6">
      <FeedbackBoard />
      <div className="min-h-[230px] w-full space-y-2.5">
        <p className="text-sm font-medium">Leaderboard</p>
        <Suspense>
          <FeedbackLeaderboard />
        </Suspense>
      </div>
      <Button.Root
        variant="ghost"
        className="-mt-4"
        render={
          <a
            className="flex justify-center"
            href="https://x.com/_cassarino_"
            target="_blank"
            rel="noreferrer"
          >
            <Button.Text>Made with love by @_cassarino_</Button.Text>
          </a>
        }
      />
    </div>
  );
}
