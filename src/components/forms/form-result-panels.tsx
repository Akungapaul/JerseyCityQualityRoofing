"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business-info";

/**
 * Shared result panels for both quote forms (CRO Phase 1/2, 2026-11-06).
 *
 * - FormSuccessPanel shows the visitor's lead reference ID (issued only
 *   for real, processed leads) and sets expectations from the published
 *   business hours instead of inventing a response-time promise.
 * - FormErrorBanner displays the safe server error message and replaces
 *   the old "call us" fallback (the site has no phone number) with the
 *   business email address.
 * - FormTurnstileError renders the security-check failure state that
 *   used to be invisible (console-only).
 * - FormPrivacyNote is the reassurance microcopy shown beside submit.
 */

interface FormSuccessPanelProps {
  leadId?: string | null;
}

export const FormSuccessPanel = forwardRef<
  HTMLDivElement,
  FormSuccessPanelProps
>(function FormSuccessPanel({ leadId }, ref) {
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      className="bg-secondary rounded-lg p-6 border-l-4 border-success outline-none"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle size={32} className="text-success" aria-hidden="true" />
        <h2 className="font-heading text-[1.75rem] font-bold text-text-primary">
          Thank You!
        </h2>
        <p className="font-body text-lg text-text-secondary">
          We&apos;ve received your request and will contact you within 24
          hours.
        </p>
        {leadId ? (
          <p className="font-body text-lg text-text-secondary">
            Your reference number is{" "}
            <strong className="text-text-primary">{leadId}</strong>. Keep it
            handy if you email us about this request.
          </p>
        ) : null}
        <p className="font-body text-lg text-text-secondary">
          We reply during business hours ({BUSINESS_INFO.operatingHours}).
        </p>
      </div>
    </motion.div>
  );
});

export function FormErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      role="alert"
      className="bg-destructive/10 rounded-md p-4 border-l-4 border-destructive mt-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-2">
        <AlertCircle
          size={20}
          className="text-destructive shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <p className="font-body text-lg text-text-primary">
          {message} Or email us at{" "}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="text-accent hover:underline underline-offset-4"
          >
            {BUSINESS_INFO.email}
          </a>{" "}
          and we will take care of it.
        </p>
      </div>
    </motion.div>
  );
}

export function FormTurnstileError({
  message,
}: {
  message?: string | null;
}) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="text-destructive font-body text-base col-span-full"
    >
      {message}
    </p>
  );
}

export function FormPrivacyNote() {
  return (
    <p className="text-base text-text-secondary col-span-full">
      We reply from {BUSINESS_INFO.email}. No spam, no obligation.
    </p>
  );
}
