import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  pendingComponent: () => {
    return <div>Loading...</div>;
  },
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  },
});

function RouteComponent() {
  return <div>Hello "/test"!</div>;
}
