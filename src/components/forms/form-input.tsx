"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  [
    "w-full rounded-md bg-dominant border",
    "font-body text-lg text-text-primary",
    "placeholder:text-text-secondary/60",
    "transition-colors duration-[--duration-fast]",
    "outline-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      state: {
        default: [
          "border-secondary/50",
          "hover:border-accent/50",
          "focus:border-accent focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-dominant",
        ],
        error: [
          "border-destructive",
          "focus:border-destructive focus:ring-2 focus:ring-destructive focus:ring-offset-1 focus:ring-offset-dominant",
        ],
      },
      inputSize: {
        default: "px-4 py-3",
        compact: "px-3 py-2",
      },
    },
    defaultVariants: {
      state: "default",
      inputSize: "default",
    },
  },
);

type InputVariantProps = VariantProps<typeof inputVariants>;

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    Pick<InputVariantProps, "inputSize"> {
  label: string;
  error?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, inputSize, className, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="font-body text-lg font-medium text-text-primary"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="text-accent ml-1">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            inputVariants({
              state: error ? "error" : "default",
              inputSize,
            }),
            className,
          )}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          {...props}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              className="text-sm text-destructive font-body"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export { FormInput };
export type { FormInputProps };
