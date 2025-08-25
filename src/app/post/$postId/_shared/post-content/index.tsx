import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { getPostQueryOptions } from "~/actions/posts";
import { ChevronRightIcon } from "~/components/icons/chevron-right-icon";

import { Route } from "../../$postId.page";
import { PostComments } from "./post-comments";

export function PostContent() {
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(getPostQueryOptions(postId));
  return (
    <div className="space-y-3 py-6">
      <Link
        to="/"
        from="/post/$postId"
        className="text-muted inline-flex items-center gap-1 text-xs font-medium outline-hidden transition-all hover:text-base focus-visible:text-base focus-visible:ring-4 focus-visible:ring-sky-300/10"
      >
        <ChevronRightIcon className="text-muted size-3 rotate-180" />
        Back to feedback
      </Link>
      <div className="space-y-3.5 pb-[140px]">
        <h1 className="text-[16px] font-medium">{data.title}</h1>
        <p className="text-light text-sm leading-[22px]">{data.description}</p>
      </div>
      <PostComments />
    </div>
  );
}
