import type { IconProps } from "~/components/icons/types";
import { cn } from "~/utils/cn";

export function Spinner({ className, ...props }: IconProps) {
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
        <circle
          cx="10"
          cy="10"
          fill="currentColor"
          r="2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="m3.29,8c.672-2.258,2.452-4.038,4.71-4.71"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="animate-spinner-fade delay-0"
        />
        <path
          d="m12,3.29c2.258.672,4.038,2.452,4.71,4.71"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="animate-spinner-fade delay-150"
        />
        <path
          d="m16.71,12c-.672,2.258-2.452,4.038-4.71,4.71"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="animate-spinner-fade delay-300"
        />
        <path
          d="m8,16.71c-2.258-.672-4.038-2.452-4.71-4.71"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="animate-spinner-fade delay-450"
        />
      </g>
    </svg>
  );
}
