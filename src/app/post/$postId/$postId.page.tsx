import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { getPostQueryOptions } from "~/actions/posts";
import { ScrollArea, Spinner } from "~/components/ui";

import { PostContent } from "./_shared/post-content";
import { PostMeta } from "./_shared/post-meta";

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  pendingComponent: () => {
    return (
      <div className="grid h-full w-full place-content-center">
        <Spinner className="size-6" />
      </div>
    );
  },
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(getPostQueryOptions(params.postId));
  },
});

function RouteComponent() {
  return (
    <ScrollArea.Root className="h-full w-full">
      <ScrollArea.Viewport className="h-full w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-app mx-auto flex w-full gap-10"
        >
          <PostContent />
          <PostMeta />
        </motion.div>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
