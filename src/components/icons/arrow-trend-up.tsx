import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function ArrowTrendUp({ className, ...props }: IconProps) {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-[1em]", className)}
      {...props}
    >
      <g fill="currentColor">
        <path
          d="m17,6l-7.293,7.293c-.391.391-1.024.391-1.414,0l-2.586-2.586c-.391-.391-1.024-.391-1.414,0l-2.293,2.293"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <polyline
          fill="none"
          points="17 13 17 6 10 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
