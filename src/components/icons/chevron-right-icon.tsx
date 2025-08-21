import { cn } from "~/utils/cn";

import type { IconProps } from "./types";

export function ChevronRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-[1em]", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.77466 5.275C7.95044 5.09944 8.18873 5.00082 8.43716 5.00082C8.6856 5.00082 8.92388 5.09944 9.09966 5.275L13.1622 9.3375C13.3377 9.51328 13.4363 9.75156 13.4363 10C13.4363 10.2484 13.3377 10.4867 13.1622 10.6625L9.09966 14.725C8.92194 14.8906 8.68689 14.9808 8.44401 14.9765C8.20113 14.9722 7.9694 14.8738 7.79764 14.702C7.62587 14.5303 7.52748 14.2985 7.52319 14.0557C7.51891 13.8128 7.60906 13.5777 7.77466 13.4L11.1747 10L7.77466 6.6C7.5991 6.42422 7.50049 6.18594 7.50049 5.9375C7.50049 5.68906 7.5991 5.45078 7.77466 5.275Z"
        fill="currentColor"
      />
    </svg>
  );
}
