import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function NotebookIcon({ className, ...props }: IconProps) {
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
        <rect
          y="5.5"
          width="1.5"
          height="1.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></rect>
        <rect
          x="16"
          y="10"
          width="1.5"
          height="1.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></rect>
        <line
          x1="8"
          y1="3"
          x2="8"
          y2="17"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <rect
          x="3"
          y="4"
          width="14"
          height="12"
          rx="3"
          ry="3"
          transform="translate(20) rotate(90)"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></rect>
        <line
          x1="4"
          y1="6.5"
          x2="2.5"
          y2="6.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <line
          x1="4"
          y1="13.5"
          x2="2.5"
          y2="13.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></line>
        <line
          x1="4"
          y1="10"
          x2="2.5"
          y2="10"
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
