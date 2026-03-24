"use client";

import { Loader2 } from "lucide-react";
import {
  buttonVariants,
  type ButtonVariantProps,
} from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariantProps["variant"];
  size?: ButtonVariantProps["size"];
}

export function SubmitButton({
  isSubmitting,
  children,
  className,
  variant = "primary",
  size = "default",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        buttonVariants({ variant, size }),
        isSubmitting && "opacity-80",
        className,
      )}
    >
      {isSubmitting ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 size={20} className="animate-spin" aria-hidden="true" />
          Submitting...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
