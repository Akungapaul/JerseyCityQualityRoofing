"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/types";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  faqs: readonly FAQ[];
  defaultOpenIndex?: number;
  className?: string;
}

export function FaqAccordion({
  faqs,
  defaultOpenIndex = 0,
  className,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div
      role="region"
      aria-label="Frequently Asked Questions"
      className={cn("divide-y divide-[#4a5040]", className)}
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const headingId = `faq-heading-${index}`;

        return (
          <div key={headingId}>
            <h3>
              <button
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left flex items-center justify-between py-4 min-h-[44px] text-text-primary font-heading font-bold text-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    "transition-transform duration-300 text-accent shrink-0 ml-4",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-text-secondary text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
