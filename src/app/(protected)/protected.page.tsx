import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_(protected).layout/protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid h-full w-full place-content-center text-sm">
      This is a protected route!
    </div>
  );
}
