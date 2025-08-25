import { Separator as BaseSeparator } from "@base-ui-components/react/separator";

import { cn } from "~/utils/cn";

type SeparatorProps = BaseSeparator.Props;

function Separator({ className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      className={cn(
        "border-base",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-b",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:border-l",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

export type { SeparatorProps };
