import { Tabs } from "@base-ui-components/react/tabs";
import { useNavigate } from "@tanstack/react-router";

import { FeatherFilledIcon } from "~/components/icons";
import { cn } from "~/utils/cn";
import { BOARD_META } from "~/utils/mappings";

import { Route } from "../../index.page";

function FeedbackBoardItem({ className, ...props }: Tabs.Tab.Props) {
  return (
    <Tabs.Tab
      className={cn(
        "text-subtle flex h-7 w-full items-center gap-1.5 rounded-md px-2 text-sm font-medium outline-hidden transition-all",
        "focus-visible:ring-4 focus-visible:ring-sky-300/10",
        "hover:bg-muted hover:text-base",
        "data-[selected]:text-base",
        className,
      )}
      {...props}
    />
  );
}

export function FeedbackBoard() {
  const navigate = useNavigate();
  const { board } = Route.useSearch({
    select: (state) => ({
      board: state.board,
    }),
  });
  return (
    <div className="w-full space-y-2.5">
      <p className="text-sm font-medium">Board</p>
      <Tabs.Root
        value={board}
        onValueChange={(value) => {
          navigate({
            from: "/",
            to: "/",
            search: (prev) => ({
              ...prev,
              board: value,
            }),
          });
        }}
        className="w-full"
      >
        <Tabs.List className="relative w-full space-y-2.5">
          <FeedbackBoardItem value="all">
            <FeatherFilledIcon className="text-subtle text-[14px]" />
            <span className="px-0.5">All posts</span>
          </FeedbackBoardItem>
          {Object.entries(BOARD_META).map(([boardType, meta]) => {
            return (
              <FeedbackBoardItem key={boardType} value={boardType}>
                <meta.icon className="text-subtle text-[14px]" />
                <span className="px-0.5">{meta.label}</span>
              </FeedbackBoardItem>
            );
          })}

          <Tabs.Indicator
            className={cn(
              "bg-button-subtle shadow-button-subtle pointer-events-none rounded-md",
              "absolute top-0 left-0 -z-10 h-7 w-[var(--active-tab-width)] translate-y-[var(--active-tab-top)] transition-[translate,width] duration-200 ease-in-out",
            )}
          />
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
}
