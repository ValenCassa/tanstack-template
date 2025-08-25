import { Tabs } from "@base-ui-components/react/tabs";
import type { ComponentProps } from "react";

import { cn } from "~/utils/cn";

/* -------------- SegmentedTabs.Root -------------- */
type SegmentedTabsRootProps = Tabs.Root.Props;
const SegmentedTabsRoot = Tabs.Root;

/* -------------- SegmentedTabs.List -------------- */
type SegmentedTabsListProps = Tabs.List.Props;

function SegmentedTabsList({ className, ...props }: SegmentedTabsListProps) {
  return (
    <Tabs.List
      className={cn(
        "group/list bg-subtle relative isolate flex items-center gap-0.5 rounded-md",
        className,
      )}
      {...props}
    />
  );
}

/* -------------- SegmentedTabs.Item -------------- */
type SegmentedTabsItemProps = Tabs.Tab.Props;

function SegmentedTabsItem({ className, ...props }: SegmentedTabsItemProps) {
  return (
    <Tabs.Tab
      data-slot="tab-item"
      className={cn(
        "text-subtle relative flex h-7 items-center gap-0.5 px-1.5 text-sm font-medium ring-sky-300/10 transition-all outline-none focus-visible:ring-4",
        "hover:text-button-subtle",
        "data-[selected]:text-base",
        "data-[disabled]:!text-disabled",
        className,
      )}
      {...props}
    />
  );
}

/* -------------- SegmentedTabs.ItemText -------------- */
type SegmentedTabsItemTextProps = ComponentProps<"span">;

function SegmentedTabsItemText({
  className,
  ...props
}: SegmentedTabsItemTextProps) {
  return <span className={cn("px-0.5", className)} {...props} />;
}

/* -------------- SegmentedTabs.Indicator -------------- */

type SegmentedTabsIndicatorProps = Tabs.Indicator.Props;
function SegmentedTabsIndicator({
  className,
  ...props
}: SegmentedTabsIndicatorProps) {
  return (
    <Tabs.Indicator
      className={cn(
        "bg-button-subtle shadow-button-subtle pointer-events-none rounded-md",
        "absolute top-0 left-0 -z-10 h-7 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] transition-[translate,width] duration-200 ease-in-out",
        className,
      )}
      {...props}
    />
  );
}

/* -------------- SegmentedTabs.Panel -------------- */
type SegmentedTabsPanelProps = Tabs.Panel.Props;
const SegmentedTabsPanel = Tabs.Panel;

/* Exports */
export {
  SegmentedTabsIndicator as Indicator,
  SegmentedTabsItem as Item,
  SegmentedTabsItemText as ItemText,
  SegmentedTabsList as List,
  SegmentedTabsPanel as Panel,
  SegmentedTabsRoot as Root,
};

export type {
  SegmentedTabsIndicatorProps as IndicatorProps,
  SegmentedTabsItemProps as ItemProps,
  SegmentedTabsItemTextProps as ItemTextProps,
  SegmentedTabsListProps as ListProps,
  SegmentedTabsPanelProps as PanelProps,
  SegmentedTabsRootProps as RootProps,
};
