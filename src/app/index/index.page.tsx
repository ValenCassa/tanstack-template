import { createFileRoute } from "@tanstack/react-router";

import { getLeaderboardQueryOptions } from "~/actions/leaderboard";
import { getPostsQueryOptions, getPostsValidator } from "~/actions/posts";
import { ScrollArea } from "~/components/ui";

import { FeedbackList } from "./_shared/feedback-list";
import { FeedbackMeta } from "./_shared/feedback-meta";

export const Route = createFileRoute("/")({
  validateSearch: getPostsValidator,
  loaderDeps: ({ search }) => {
    return {
      search,
    };
  },
  loader: ({ deps, context }) => {
    context.queryClient.prefetchQuery(getPostsQueryOptions(deps.search));
    context.queryClient.prefetchQuery(getLeaderboardQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ScrollArea.Root className="h-full w-full">
      <ScrollArea.Viewport className="h-full w-full px-4">
        <div className="max-w-app mx-auto flex w-full gap-10">
          <FeedbackList />
          <FeedbackMeta />
        </div>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
