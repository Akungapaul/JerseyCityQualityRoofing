"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "min-h-[44px] min-w-[44px]",
    "rounded-md",
    "font-body font-medium",
    "transition-colors duration-[--duration-fast]",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-dominant",
          "hover:bg-accent-hover",
          "font-bold",
        ],
        secondary: [
          "bg-transparent text-accent",
          "border-2 border-accent",
          "hover:bg-accent hover:text-dominant",
        ],
        phone: [
          "bg-transparent text-accent",
          "underline-offset-4",
          "hover:underline",
          "p-0",
        ],
      },
      size: {
        default: "px-6 py-3 text-lg",
        compact: "px-4 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
