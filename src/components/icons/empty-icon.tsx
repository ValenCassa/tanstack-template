import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function EmptyIcon({ className, ...props }: IconProps) {
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
          d="m5.0503,14.9498c-1.2668-1.2668-2.0503-3.0168-2.0503-4.9498,0-3.866,3.134-7,7-7,1.933,0,3.683.7835,4.9497,2.0502"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="m16.7631,8.1875c.1545.5781.2369,1.1857.2369,1.8125,0,3.866-3.134,7-7,7-.6268,0-1.2344-.0824-1.8125-.2369"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <line
          x1="3"
          y1="17"
          x2="17"
          y2="3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
      </g>
    </svg>
  );
}
