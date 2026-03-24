"use client";

import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const selectVariants = cva(
  [
    "w-full rounded-md bg-dominant border",
    "font-body text-lg text-text-primary",
    "appearance-none pr-10",
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

type SelectVariantProps = VariantProps<typeof selectVariants>;

interface FormSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    Pick<SelectVariantProps, "inputSize"> {
  label: string;
  error?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      required,
      options,
      placeholder = "Select a service",
      inputSize,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              selectVariants({
                state: error ? "error" : "default",
                inputSize,
              }),
              className,
            )}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
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

FormSelect.displayName = "FormSelect";

export { FormSelect };
export type { FormSelectProps };
