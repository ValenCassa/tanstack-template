import { Dialog } from "@base-ui-components/react/dialog";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import {
  ArrowTrendUp,
  CalendarBolt,
  FireIcon,
  MagnifierIcon,
  PlusIcon,
} from "~/components/icons";
import { Button, Input, SegmentedTabs } from "~/components/ui";
import { clientAuth } from "~/utils/auth/client-auth";

import { Route } from "../../index.page";
import { CreatePostModal } from "../create-post-modal";

export function FeedbackFilters() {
  const session = clientAuth.useSession();
  const navigate = useNavigate();
  const { sort, search } = Route.useSearch({
    select: (state) => ({
      sort: state.sort,
      search: state.search,
    }),
  });

  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (searchValue: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        navigate({
          from: "/",
          to: "/",
          search: (prev) => ({
            ...prev,
            search: searchValue,
          }),
        });
      }, 300); // 300ms debounce delay
    };
  }, [navigate]);

  return (
    <div className="flex w-full items-center justify-between">
      <SegmentedTabs.Root
        value={sort}
        onValueChange={(val) => {
          navigate({
            from: "/",
            to: "/",
            search: (prev) => ({
              ...prev,
              sort: val,
            }),
          });
        }}
      >
        <SegmentedTabs.List>
          <SegmentedTabs.Item value="trending">
            <FireIcon className="text-subtle size-4" />
            <SegmentedTabs.ItemText>Trending</SegmentedTabs.ItemText>
          </SegmentedTabs.Item>
          <SegmentedTabs.Item value="top">
            <ArrowTrendUp className="text-subtle size-4" />
            <SegmentedTabs.ItemText>Top</SegmentedTabs.ItemText>
          </SegmentedTabs.Item>
          <SegmentedTabs.Item value="new">
            <CalendarBolt className="text-subtle size-4" />
            <SegmentedTabs.ItemText>New</SegmentedTabs.ItemText>
          </SegmentedTabs.Item>

          <SegmentedTabs.Indicator />
        </SegmentedTabs.List>
      </SegmentedTabs.Root>

      <div className="flex items-center gap-3">
        <Input.Root className="max-w-[160px]">
          <MagnifierIcon className="text-muted size-4" />
          <Input.Field
            defaultValue={search}
            placeholder="Search..."
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
          />
        </Input.Root>
        <CreatePostModal>
          <Dialog.Trigger
            data-requires-auth
            onClick={(e) => {
              if (!session.data) {
                e.preventBaseUIHandler();
              }
            }}
            render={
              <Button.Root variant="accent" size="md">
                <PlusIcon className="size-4" />
                <Button.Text>Create post</Button.Text>
              </Button.Root>
            }
          />
        </CreatePostModal>
      </div>
    </div>
  );
}
