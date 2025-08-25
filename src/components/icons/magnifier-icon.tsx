import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function MagnifierIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn("size-[1em]", className)}
      {...props}
    >
      <g fill="currentColor">
        <line
          x1="16.5"
          y1="16.5"
          x2="12.0355"
          y2="12.0355"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle
          cx="8.5"
          cy="8.5"
          r="5"
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
