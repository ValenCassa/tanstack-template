import { index, rootRoute, route } from "@tanstack/virtual-file-routes";

export const routes = rootRoute("__root.tsx", [
  /* ----------- API Routes ----------- */
  route("/api/auth/$", "api/auth/$.tsx"),

  /* ----------- Page Routes ----------- */
  index("index.page.tsx"),
]);
