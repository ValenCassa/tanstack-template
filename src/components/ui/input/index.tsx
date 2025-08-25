import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";

import { cn, variants } from "~/utils/cn";

/* -------------- Input.Root -------------- */
const inputRootVariants = variants({
  variants: {
    size: {
      md: "h-7 px-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
  base: cn(
    "inline-flex gap-0.5 items-center bg-field rounded-md ring-sky-300/10 transition-all not-[:has(input:disabled)]:cursor-text",
    "not-[:has(input:disabled)]:hover:bg-field-hover",
    "focus-within:ring-4 border border-transparent focus:border-base",
  ),
});

type InputRootProps = VariantProps<typeof inputRootVariants> &
  ComponentProps<"div">;
function InputRoot({
  className,
  size,
  onPointerDown,
  ...props
}: InputRootProps) {
  return (
    <div
      onPointerDown={(e) => {
        const input = e.currentTarget.querySelector("input");
        const isInput = (e.target as Element)?.matches?.("input");

        // If clicked element is not the input (clicked on root div), focus and move cursor to end
        if (input && !isInput) {
          e.preventDefault();
          input.focus();
          const length = input.value.length;
          input.setSelectionRange(length, length);
        }

        onPointerDown?.(e);
      }}
      className={cn(inputRootVariants({ size, className }))}
      {...props}
    />
  );
}

/* -------------- Input.Field -------------- */
type InputFieldProps = ComponentProps<"input">;
function InputField({ className, ...props }: InputFieldProps) {
  return (
    <input
      className={cn(
        "placeholder:text-subtle mx-0.5 h-full flex-1 text-base text-sm font-medium outline-none",
      )}
      {...props}
    />
  );
}

/* Exports */

export { InputField as Field, InputRoot as Root };

export type { InputFieldProps as FieldProps, InputRootProps as RootProps };
