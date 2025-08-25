import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DateTime } from "luxon";

import { getPostQueryOptions } from "~/actions/posts";
import { ChevronRightIcon } from "~/components/icons/chevron-right-icon";
import { Avatar, Button } from "~/components/ui";
import { BOARD_META } from "~/utils/mappings";

import { Route } from "../../$postId.page";

export function PostMeta() {
  const { postId } = Route.useParams();
  const { data } = useSuspenseQuery(getPostQueryOptions(postId));

  const board = BOARD_META[data.board];

  return (
    <div className="sticky top-0 w-[260px] shrink-0 space-y-2.5 self-start py-6">
      <div className="flex h-6 items-center justify-between">
        <p className="font-medium">Upvotes</p>
        <Button.Root data-requires-auth variant="subtle" size="sm">
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
