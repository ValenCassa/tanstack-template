import { index, layout, rootRoute, route } from "@tanstack/virtual-file-routes";

export const routes = rootRoute("__root.tsx", [
  /* ----------- API Routes ----------- */
  route("/api/auth/$", "api/auth/$.tsx"),

  /* ----------- Public Routes ----------- */
  index("index/index.page.tsx"),

  route("/post", [
    index("post/post.page.tsx"),
    route("/$postId", "post/$postId/$postId.page.tsx"),
  ]),

  /* ----------- Protected Routes ----------- */
  layout("(protected)/(protected).layout.tsx", [
    route("/protected", "(protected)/protected.page.tsx"),
  ]),
]);
