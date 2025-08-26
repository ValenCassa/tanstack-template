import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import type { ComponentProps } from "react";
import type { VariantProps } from "tailwind-variants";

import { cn, variants } from "~/utils/cn";

/* -------------- Button.Root -------------- */
const buttonRootVariants = variants({
  variants: {
    variant: {
      accent:
        "bg-button-accent text-button-accent hover:bg-button-accent-hover active:bg-button-accent-active shadow-button-accent",
      subtle:
        "bg-button-subtle text-button-subtle hover:bg-button-subtle-hover active:bg-button-subtle-active shadow-button-subtle",
      ghost:
        "bg-button-ghost text-button-ghost hover:bg-button-ghost-hover active:bg-button-ghost-active",
      inverted:
        "bg-button-inverted text-button-inverted hover:bg-button-inverted-hover active:bg-button-inverted-active",
    },
    size: {
      md: "h-7 px-1.5",
      sm: "h-6 px-1",
    },
  },
  defaultVariants: {
    variant: "accent",
    size: "md",
  },
  base: "focus-visible:ring-4 ring-sky-300/10 transition-all rounded-md outline-none flex items-center font-medium disabled:opacity-50 disabled:pointer-events-none",
});

type ButtonRootProps = VariantProps<typeof buttonRootVariants> &
  useRender.ComponentProps<"button">;

function ButtonRoot({
  className,
  variant,
  size,
  type = "button",
  render = <button />,
  ...props
}: ButtonRootProps) {
  const element = useRender({
    render,
    props: mergeProps<"button">(
      {
        type,
        className: buttonRootVariants({ variant, size, className }),
      },
      props,
    ),
  });

  return element;
}

/* -------------- Button.Text -------------- */
type ButtonTextProps = ComponentProps<"span">;
function ButtonText({ className, ...props }: ButtonTextProps) {
  return <span className={cn("px-0.5", className)} {...props} />;
}

/* Exports */

export { ButtonRoot as Root, ButtonText as Text };

export type { ButtonRootProps as RootProps, ButtonTextProps as TextProps };
