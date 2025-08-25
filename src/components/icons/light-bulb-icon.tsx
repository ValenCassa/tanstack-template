import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function LightBulbIcon({ className, ...props }: IconProps) {
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
          d="m10,13.5v-3l-2-2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="m10,10.5l2-2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <circle
          cx="10"
          cy="8.5"
          r="5.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <path
          d="m10,14c-1.1077,0-2.1368-.3304-3-.8937v2.8937c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2.8937c-.8632.5634-1.8923.8937-3,.8937Z"
          strokeWidth="0"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}
