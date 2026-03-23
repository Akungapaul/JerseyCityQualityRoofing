import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1",
    "px-3 py-1",
    "rounded-full",
    "font-body font-medium text-lg",
  ],
  {
    variants: {
      variant: {
        certification: [
          "bg-secondary text-accent",
          "border border-secondary-lighter",
        ],
        status: ["bg-accent text-dominant", "font-bold"],
      },
    },
    defaultVariants: {
      variant: "certification",
    },
  },
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
