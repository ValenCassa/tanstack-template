import { Tabs } from "@base-ui-components/react/tabs";
import type { ComponentProps } from "react";

import { cn } from "~/utils/cn";

/* -------------- Tabs.Root -------------- */
type TabsRootProps = Tabs.Root.Props;
const TabsRoot = Tabs.Root;

/* -------------- Tabs.List -------------- */
type TabsListProps = Tabs.List.Props;

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <Tabs.List
      className={cn(
        "group/list isolate flex items-center gap-5 px-0.5",
        className,
      )}
      {...props}
    />
  );
}

/* -------------- Tabs.Item -------------- */
type TabsItemProps = Tabs.Tab.Props;

function TabsItem({ className, ...props }: TabsItemProps) {
  return (
    <Tabs.Tab
      data-slot="tab-item"
      className={cn(
        "text-muted relative flex h-8 items-start text-sm font-medium ring-sky-300/10 transition-all outline-none focus-visible:ring-4",
        "hover:text-subtle",
        "data-[selected]:text-base data-[selected]:shadow-[inset_0px_-1.5px_0px_var(--color-neutral-50)]",
        "data-[disabled]:!text-disabled data-[disabled]:!pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

/* -------------- Tabs.ItemContent -------------- */
type TabsItemContentProps = ComponentProps<"span">;

function TabsItemContent({ className, ...props }: TabsItemContentProps) {
  return (
    <span className={cn("flex items-center gap-1.5", className)} {...props} />
  );
}

/* -------------- Tabs.Panel -------------- */
type TabsPanelProps = Tabs.Panel.Props;
const TabsPanel = Tabs.Panel;

/* Exports */
export {
  TabsItem as Item,
  TabsItemContent as ItemContent,
  TabsList as List,
  TabsPanel as Panel,
  TabsRoot as Root,
};

export type {
  TabsItemContentProps as ItemContentProps,
  TabsItemProps as ItemProps,
  TabsListProps as ListProps,
  TabsPanelProps as PanelProps,
  TabsRootProps as RootProps,
};
