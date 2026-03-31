"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { useScrollPastFold } from "@/hooks/use-scroll-past-fold";
import { PHONE_HREF } from "@/lib/constants";

export function FloatingCTA() {
  const isPastFold = useScrollPastFold();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);
  const [ctaHref, setCtaHref] = useState("#quote-form");

  useEffect(() => {
    const formEl = document.getElementById("quote-form");
    if (!formEl) {
      setCtaHref("/contact");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearForm(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

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
            className="bg-[#33382b] text-text-secondary hover:text-text-primary rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
          <a
            href={ctaHref}
            className="bg-accent hover:bg-accent-hover text-dominant font-bold text-lg px-6 py-2 rounded-lg min-h-[44px] shadow-lg inline-flex items-center gap-2 transition-colors"
            aria-label="Get a free roofing quote"
          >
            <Phone size={20} aria-hidden="true" />
            <span className="hidden sm:inline">Get Free Quote</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
