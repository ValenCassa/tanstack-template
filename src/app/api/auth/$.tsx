import { createServerFileRoute } from "@tanstack/react-start/server";

import { serverAuth } from "~/utils/auth/server-auth";

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
  GET: ({ request }) => {
    return serverAuth.handler(request);
  },
  POST: ({ request }) => {
    return serverAuth.handler(request);
  },
});
