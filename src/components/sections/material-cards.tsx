"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, XCircle } from "lucide-react";
import type { Material } from "@/data/types";

interface MaterialCardsProps {
  materials: readonly Material[];
}

export function MaterialCards({ materials }: MaterialCardsProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  function toggleCard(index: number) {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {materials.map((material, index) => {
        const isExpanded = expandedCards.has(index);

        return (
          <div
            key={material.name}
            className="bg-secondary rounded-lg p-6 border border-secondary-lighter"
          >
            <h3 className="text-lg font-heading font-bold text-text-primary">
              {material.name}
            </h3>
            <p className="text-lg text-text-secondary mt-2">
              {material.description}
            </p>

            {/* Badge row */}
            <div className="flex gap-2 mt-4">
              <span className="bg-dominant text-accent text-sm px-3 py-1 rounded-full font-bold">
                {material.lifespan}
              </span>
              <span className="bg-dominant text-text-secondary text-sm px-3 py-1 rounded-full">
                {material.priceRange}
              </span>
            </div>

            {/* Expand/collapse toggle */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => toggleCard(index)}
                className="text-accent text-sm underline min-h-[44px] inline-flex items-center focus-ring"
                aria-expanded={isExpanded}
              >
                {isExpanded ? "Hide Pros & Cons" : "Show Pros & Cons"}
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    {/* Pros list */}
                    <div className="mt-2">
                      {material.pros.map((pro) => (
                        <div
                          key={pro}
                          className="flex items-start gap-2 py-1"
                        >
                          <CheckCircle
                            size={16}
                            className="text-success shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span className="text-lg text-text-secondary">
                            {pro}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Cons list */}
                    <div className="mt-2">
                      {material.cons.map((con) => (
                        <div
                          key={con}
                          className="flex items-start gap-2 py-1"
                        >
                          <XCircle
                            size={16}
                            className="text-destructive shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span className="text-lg text-text-secondary">
                            {con}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
