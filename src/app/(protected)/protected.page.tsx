import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_(protected).layout/protected")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  return (
    <div className="max-w-app mx-auto grid h-full w-full place-content-center text-sm">
      This is a protected route!
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
