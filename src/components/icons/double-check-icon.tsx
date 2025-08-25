import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function DoubleCheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={cn("size-[1em]", className)}
      {...props}
    >
      <g fill="currentColor">
        <polyline
          points="2 10.5 5.75 14.5 13 5.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <polyline
          points="10 13.7 10.75 14.5 18 5.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
