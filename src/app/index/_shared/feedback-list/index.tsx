import { Suspense } from "react";

import { Spinner } from "~/components/ui";

import { FeedbackAlert } from "./feedback-alert";
import { FeedbackFilters } from "./feedback-filters";
import { FeedbackPosts } from "./feedback-posts";

export function FeedbackList() {
  return (
    <div className="h-full flex-1 space-y-6 py-6">
      <FeedbackAlert />
      <FeedbackFilters />

      <Suspense
        fallback={
          <div className="grid h-[400px] w-full place-content-center">
            <Spinner className="size-6" />
          </div>
        }
      >
        <FeedbackPosts />
      </Suspense>
    </div>
  );
}
