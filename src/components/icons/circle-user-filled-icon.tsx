import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function CircleUserFilledIcon({ className, ...props }: IconProps) {
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
          d="m10,2C5.589,2,2,5.589,2,10s3.589,8,8,8,8-3.589,8-8S14.411,2,10,2Zm0,4c1.378,0,2.5,1.122,2.5,2.5s-1.122,2.5-2.5,2.5-2.5-1.122-2.5-2.5,1.122-2.5,2.5-2.5Zm0,10c-1.522,0-2.908-.574-3.967-1.511.92-1.228,2.361-1.989,3.967-1.989s3.048.761,3.967,1.989c-1.059.937-2.446,1.511-3.967,1.511Z"
          strokeWidth="0"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
