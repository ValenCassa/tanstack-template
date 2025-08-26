import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DateTime } from "luxon";

import type { GetPostResponse } from "~/actions/posts";
import {
  getPostQueryOptions,
  getPostsQueryOptions,
  GetPostsResponse,
  upvotePost as upvotePostAction,
} from "~/actions/posts";
import { ChevronRightIcon } from "~/components/icons/chevron-right-icon";
import { Avatar, Button } from "~/components/ui";
import { cn } from "~/utils/cn";
import { BOARD_META } from "~/utils/mappings";

import { Route } from "../../$postId.page";

export function PostMeta() {
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(getPostQueryOptions(postId));
  const { queryClient } = Route.useRouteContext();
  const upvotePost = useMutation({
    mutationFn: (postId: string) => {
      return upvotePostAction({ data: { postId } });
    },
    onMutate: async (postId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries(getPostQueryOptions(postId));

      // Snapshot the previous value with the current search params
      const previousPost: GetPostResponse | undefined =
        queryClient.getQueryData(getPostQueryOptions(postId).queryKey);

      if (!previousPost) {
        throw new Error("Post not found");
      }

      queryClient.setQueryData(["post", postId], (old: GetPostResponse) => {
        const upvotesCount = old.upvotesCount + (old.upvoted ? -1 : 1);

        return { ...old, upvoted: !old.upvoted, upvotesCount };
      });

      return { previousPost };
    },
    onError: (_, postId, context) => {
      queryClient.setQueryData(
        getPostQueryOptions(postId).queryKey,
        context?.previousPost,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const board = BOARD_META[data.board];

  return (
    <div className="sticky top-0 w-[260px] shrink-0 space-y-2.5 self-start py-6">
      <div className="flex h-6 items-center justify-between">
        <p className="font-medium">Upvotes</p>
        <Button.Root
          onClick={() => {
            upvotePost.mutate(postId);
          }}
          data-requires-auth
          variant="subtle"
          size="sm"
          className={cn(
            "relative overflow-hidden",
            "before:pointer-events-none before:absolute before:inset-0",
            {
              "text-sky-50 before:bg-sky-300/30 [&_svg]:text-sky-50":
                !!data.upvoted,
            },
          )}
        >
          <ChevronRightIcon className="text-subtle size-4 -rotate-90" />
          <Button.Text>{data.upvotesCount}</Button.Text>
        </Button.Root>
      </div>

      <div className="flex h-6 items-center justify-between">
        <p className="font-medium">Board</p>
        <Button.Root
          variant="subtle"
          size="sm"
          render={
            <Link to="/" search={{ board: data.board }}>
              <board.icon className="text-subtle size-3" />
              <Button.Text className="text-xs">{board.label}</Button.Text>
            </Link>
          }
        />
      </div>

      <div className="flex h-6 items-center justify-between">
        <p className="font-medium">Author</p>
        <div className="flex items-center gap-2">
          <Avatar.Root>
            <Avatar.Image
              src={data.author.image ?? undefined}
              alt={data.author.name}
            />
            <Avatar.Fallback />
          </Avatar.Root>
          <p className="text-subtle text-sm font-medium">{data.author.name}</p>
        </div>
      </div>

      <div className="flex h-6 items-center justify-between">
        <p className="font-medium">Date</p>
        <p className="text-subtle text-sm font-medium">
          {DateTime.fromJSDate(data.createdAt).toLocaleString(
            DateTime.DATE_MED,
          )}
        </p>
      </div>
    </div>
  );
}
