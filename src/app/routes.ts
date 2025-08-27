import { index, rootRoute, route } from "@tanstack/virtual-file-routes";

export const routes = rootRoute("__root.tsx", [
  /* ----------- API Routes ----------- */
  route("/api/auth/$", "api/auth/$.tsx"),

  /* ----------- Page Routes ----------- */
  index("index/index.page.tsx"),

  route("/post", [
    index("post/post.page.tsx"),
    route("/$postId", "post/$postId/$postId.page.tsx"),
  ]),

  route("/test", "test/test.page.tsx"),
]);
