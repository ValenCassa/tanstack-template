import { Suspense } from "react";

import { FeedbackBoard } from "./feedback-board";
import { FeedbackLeaderboard } from "./feedback-leaderboard";

export function FeedbackMeta() {
  return (
    <div className="sticky top-0 w-[260px] space-y-6 self-start py-6">
      <FeedbackBoard />
      <div className="h-[230px] w-full space-y-2.5">
        <p className="text-sm font-medium">Leaderboard</p>
        <Suspense>
          <FeedbackLeaderboard />
        </Suspense>
      </div>
    </div>
  );
}
