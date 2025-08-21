import type { ClassValue } from "clsx";
import clsx from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants";

const twMergeConfig = {
  override: {
    theme: {
      text: ["text-xs", "text-sm", "text-md", "text-lg", "text-xl"],
    },
    classGroups: {
      "text-color": [
        "text-base",
        "text-subtle",
        "text-light",
        "text-muted",
        "text-disabled",

        "text-button-accent",
        "text-button-subtle",
        "text-button-ghost",

        "text-badge-yellow",
      ],
    },
  },
};
const extendedTwMerge = extendTailwindMerge(twMergeConfig);

export function cn(...classNames: ClassValue[]) {
  return extendedTwMerge(clsx(classNames));
}

export const variants = createTV({ twMergeConfig });
