import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { serverAuth } from "~/utils/auth/server-auth";

export const getSession = createServerFn().handler(async () => {
  const request = getWebRequest();

  if (!request) {
    throw new Error("No request found");
  }

  const session = await serverAuth.api.getSession(request);

  return session;
});
