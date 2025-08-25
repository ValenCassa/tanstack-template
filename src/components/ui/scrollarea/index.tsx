import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";

import { cn } from "~/utils/cn";

/* -------------- ScrollArea.Root -------------- */
type ScrollAreaRootProps = ScrollAreaPrimitive.Root.Props;
function ScrollAreaRoot({
  className,
  children,
  ...props
}: ScrollAreaRootProps) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn("h-full w-full overflow-hidden", className)}
      {...props}
    >
      {children}
      <ScrollAreaPrimitive.Scrollbar className="m-2 flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75">
        <ScrollAreaPrimitive.Thumb className="w-full rounded bg-neutral-600" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}

/* -------------- ScrollArea.Viewport -------------- */
type ScrollAreaViewportProps = ScrollAreaPrimitive.Viewport.Props;
function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  return (
    <ScrollAreaPrimitive.Viewport
      className={cn("h-full !overflow-auto overscroll-contain", className)}
      {...props}
    />
  );
}

/* Exports */
export { ScrollAreaRoot as Root, ScrollAreaViewport as Viewport };

export type { ScrollAreaRootProps, ScrollAreaViewportProps };
