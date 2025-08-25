import { createFileRoute } from "@tanstack/react-router";

import { ArrowTrendUp, CalendarBolt, FireIcon } from "~/components/icons";
import { SegmentedTabs } from "~/components/ui";

export const Route = createFileRoute("/roadmap")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="inline-grid h-screen w-full place-content-center">
      <SegmentedTabs.Root>
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
    </div>
  );
}
