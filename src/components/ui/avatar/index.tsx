import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import type { VariantProps } from "tailwind-variants";

import { CircleUserFilledIcon } from "~/components/icons";
import { cn, variants } from "~/utils/cn";

/* -------------- Avatar.Root -------------- */
const avatarRootVariants = variants({
  variants: {
    size: {
      md: "size-4 rounded-sm",
      lg: "size-8 rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
  },
  base: "bg-subtle inline-grid place-content-center overflow-hidden",
});

type AvatarRootProps = VariantProps<typeof avatarRootVariants> &
  BaseAvatar.Root.Props & {
    className?: string;
  };

function AvatarRoot({ className, size, ...props }: AvatarRootProps) {
  return (
    <BaseAvatar.Root
      className={avatarRootVariants({ className, size })}
      {...props}
    />
  );
}

/* -------------- Avatar.Image -------------- */
type AvatarImageProps = BaseAvatar.Image.Props;

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <BaseAvatar.Image
      className={cn("size-[inherit] rounded-[inherit]", className)}
      {...props}
    />
  );
}

/* -------------- Avatar.Fallback -------------- */
type AvatarFallbackProps = BaseAvatar.Fallback.Props;

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <BaseAvatar.Fallback className={cn(className)} {...props}>
      <CircleUserFilledIcon className="text-muted size-3" />
    </BaseAvatar.Fallback>
  );
}

/* Exports */
export { AvatarFallback as Fallback, AvatarImage as Image, AvatarRoot as Root };
export type {
  AvatarFallbackProps as FallbackProps,
  AvatarImageProps as ImageProps,
  AvatarRootProps as RootProps,
};
