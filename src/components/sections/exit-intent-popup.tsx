"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useExitIntent } from "@/hooks/use-exit-intent";

export function ExitIntentPopup() {
  const { isTriggered, dismiss } = useExitIntent();
  const previousFocus = useRef<Element | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and scroll lock
  useEffect(() => {
    if (!isTriggered) {
      // Restore focus when closing
      if (previousFocus.current && previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
        previousFocus.current = null;
      }
      return;
    }

    // Save previous focus
    previousFocus.current = document.activeElement;

    // Scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    // Focus trap + Escape handling
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isTriggered, dismiss]);

  return (
    <AnimatePresence>
      {isTriggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-heading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-secondary rounded-xl p-8 max-w-lg w-[calc(100%-2rem)] mx-auto shadow-2xl relative"
          >
            <button
              ref={closeButtonRef}
              onClick={dismiss}
              aria-label="Close popup"
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#4a5040] transition-colors"
            >
              <X size={20} />
            </button>

            <h2
              id="exit-popup-heading"
              className="text-[1.75rem] font-heading font-bold text-text-primary"
            >
              Before You Go...
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mt-2">
              Get a free, no-obligation roofing estimate for your Hudson County
              property. Most quotes delivered within 24 hours.
            </p>

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "w-full mt-6 justify-center text-lg",
              )}
            >
              Get My Free Quote
            </Link>

            <a
              href={PHONE_HREF}
              className="text-accent flex items-center justify-center gap-2 text-lg font-bold mt-3 min-h-[44px]"
            >
              <Phone size={20} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
