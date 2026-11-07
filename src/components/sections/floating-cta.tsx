"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardList, X } from "lucide-react";
import { useScrollPastFold } from "@/hooks/use-scroll-past-fold";
import { CONTACT_QUOTE_FORM_URL } from "@/lib/quote-form-nav";

/**
 * Floating quote CTA (CRO Phase 3, 2026-11-06; audit 3.1/3.5).
 *
 * Fixes from the audited version:
 * - The link used to hardcode href="#quote-form", which dead-ends on
 *   pages with no such element (Gallery, About). The target now
 *   resolves on mount: the compact form if present, else the detailed
 *   form, else /contact#quote-form as a real navigation fallback.
 * - The Phone icon was replaced: this button routes to a form, it does
 *   not place a call (the site has no published phone number).
 */
export function FloatingCTA() {
  const isPastFold = useScrollPastFold();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);
  const [ctaHref, setCtaHref] = useState("#quote-form");

  // Resolve the best on-page form target once mounted.
  useEffect(() => {
    if (document.getElementById("quote-form")) {
      setCtaHref("#quote-form");
    } else if (document.getElementById("full-quote-form")) {
      setCtaHref("#full-quote-form");
    } else {
      setCtaHref(CONTACT_QUOTE_FORM_URL);
    }
  }, []);

  useEffect(() => {
    if (!ctaHref.startsWith("#")) return;
    const formEl = document.getElementById(ctaHref.slice(1));
    if (!formEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearForm(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, [ctaHref]);

  const isVisible = isPastFold && !isDismissed && !isNearForm;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
          role="complementary"
          aria-label="Quick quote request"
        >
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss quote button"
            className="bg-[#33382b] text-text-secondary hover:text-text-primary rounded-full w-11 h-11 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
          <a
            href={ctaHref}
            className="bg-accent hover:bg-accent-hover text-dominant font-bold text-lg px-6 py-2 rounded-lg min-h-[44px] shadow-lg inline-flex items-center gap-2 transition-colors"
            aria-label="Get a free roofing quote"
          >
            <ClipboardList size={20} aria-hidden="true" />
            <span className="hidden sm:inline">Get Free Quote</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
