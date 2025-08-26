import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function CalendarBolt({ className, ...props }: IconProps) {
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
        <path
          d="m17,8v-1c0-1.6569-1.3431-3-3-3H6c-1.6569,0-3,1.3431-3,3v1h14Z"
          strokeWidth="0"
          fill="currentColor"
        ></path>
        <line
          x1="6"
          y1="4"
          x2="6"
          y2="2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <line
          x1="14"
          y1="4"
          x2="14"
          y2="2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <path
          d="m17,7h0c0-1.6569-1.3431-3-3-3H6c-1.6569,0-3,1.3431-3,3v6c0,1.6569,1.3431,3,3,3h3.1492"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <polyline
          points="14 14 14.5 10 12 14 17 14 14.5 18 15 14"
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polyline>
      </g>
    </svg>
  );
}
