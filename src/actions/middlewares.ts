import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { serverAuth } from "~/utils/auth/server-auth";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getWebRequest();
    const session = await serverAuth.api.getSession(request);

    if (!session) {
      throw new Error("Unauthorized");
    }

    return next({
      context: {
        session,
      },
    });
  },
);
