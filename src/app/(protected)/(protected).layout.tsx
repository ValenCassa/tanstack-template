import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getSession } from "~/actions/auth";

export const Route = createFileRoute("/_(protected).layout")({
  component: Outlet,
  beforeLoad: async () => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: "/",
      });
    }

    return {
      session,
    };
  },
});
