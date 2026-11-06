"use client";

import type { MouseEvent, ReactNode } from "react";
import {
  CONTACT_QUOTE_FORM_URL,
  scrollToQuoteForm,
} from "@/lib/quote-form-nav";

interface QuoteCtaButtonProps {
  children: ReactNode;
  className?: string;
  /** Form element IDs to try, in order, before falling back to /contact. */
  preferredFormIds?: readonly string[];
  /** Navigation target used when no on-page form exists. */
  fallbackHref?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
}

/**
 * Local-first estimate CTA (CRO Phase 3, 2026-11-06). Renders a normal
 * anchor to the contact page form, but when the current page already
 * has a quote form it intercepts the click and smooth-scrolls to that
 * form instead of sending a ready visitor to another page.
 */
export function QuoteCtaButton({
  children,
  className,
  preferredFormIds,
  fallbackHref = CONTACT_QUOTE_FORM_URL,
  ariaLabel,
  onNavigate,
}: QuoteCtaButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollToQuoteForm(preferredFormIds)) {
      event.preventDefault();
      onNavigate?.();
    }
  };

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
