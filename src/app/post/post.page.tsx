import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/post/")({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({
      to: "/",
    });
  },
});

function RouteComponent() {
  return null;
}
