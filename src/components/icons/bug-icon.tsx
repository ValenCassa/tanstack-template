import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function BugIcon({ className, ...props }: IconProps) {
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
        <line
          x1="6"
          y1="11"
          x2="3"
          y2="11"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <path
          d="m6,8c-1.6569,0-3-1.3431-3-3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="m6,14c-1.6569,0-3,1.3431-3,3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <line
          x1="14"
          y1="11"
          x2="17"
          y2="11"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <path
          d="m14,8c1.6569,0,3-1.3431,3-3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="m14,14c1.6569,0,3,1.3431,3,3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="m8,6h4c1.1038,0,2,.8962,2,2v4c0,2.2077-1.7923,4-4,4h0c-2.2077,0-4-1.7923-4-4v-4c0-1.1038.8962-2,2-2Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="m10,3h0c1.1038,0,2,.8962,2,2v1h-4v-1c0-1.1038.8962-2,2-2Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}
