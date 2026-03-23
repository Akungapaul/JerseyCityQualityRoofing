"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { getServicesByCategory } from "@/data/services";
import { getAllMunicipalities } from "@/data/municipalities";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AccordionSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({
  title,
  isExpanded,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div className="border-b border-secondary-lighter/30">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 px-4 font-heading font-bold text-lg text-text-primary min-h-[44px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant rounded-md"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        {title}
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={`transition-transform duration-[--duration-fast] ${
            isExpanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const residentialServices = getServicesByCategory("residential");
  const commercialServices = getServicesByCategory("commercial");
  const municipalities = getAllMunicipalities();

  const toggleSection = useCallback(
    (section: string) => {
      setExpandedSection((prev) => (prev === section ? null : section));
    },
    [],
  );

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap and Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset expanded section on close
  useEffect(() => {
    if (!isOpen) {
      setExpandedSection(null);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[60] bg-dominant overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Top bar with close button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-secondary-lighter/30">
            <span className="font-heading font-bold text-lg text-text-primary">
              Menu
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md text-text-primary hover:text-accent transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Phone + CTA section */}
          <div className="px-4 py-6 border-b border-secondary-lighter/30 space-y-3">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 min-h-[44px] rounded-md bg-secondary px-4 py-3 font-body font-bold text-lg text-accent hover:bg-secondary-lighter transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              Call Now: {PHONE_NUMBER}
            </a>
            <Link href="/contact" onClick={onClose} className="block">
              <Button variant="primary" className="w-full">
                Get Free Quote
              </Button>
            </Link>
          </div>

          {/* Navigation accordion sections */}
          <nav aria-label="Mobile navigation">
            <AccordionSection
              title="Residential Services"
              isExpanded={expandedSection === "residential"}
              onToggle={() => toggleSection("residential")}
            >
              <div className="space-y-1">
                {residentialServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/residential/${service.slug}`}
                    className="block rounded-md px-3 py-2 font-body text-lg text-text-secondary hover:text-accent hover:bg-secondary transition-colors duration-[--duration-fast] min-h-[44px] flex items-center"
                    onClick={onClose}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection
              title="Commercial Services"
              isExpanded={expandedSection === "commercial"}
              onToggle={() => toggleSection("commercial")}
            >
              <div className="space-y-1">
                {commercialServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/commercial/${service.slug}`}
                    className="block rounded-md px-3 py-2 font-body text-lg text-text-secondary hover:text-accent hover:bg-secondary transition-colors duration-[--duration-fast] min-h-[44px] flex items-center"
                    onClick={onClose}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection
              title="Service Areas"
              isExpanded={expandedSection === "locations"}
              onToggle={() => toggleSection("locations")}
            >
              <div className="grid grid-cols-2 gap-1">
                {municipalities.map((muni) => (
                  <Link
                    key={muni.slug}
                    href={`/service-areas/${muni.slug}`}
                    className="block rounded-md px-3 py-2 font-body text-lg text-text-secondary hover:text-accent hover:bg-secondary transition-colors duration-[--duration-fast] min-h-[44px] flex items-center"
                    onClick={onClose}
                  >
                    {muni.name}
                  </Link>
                ))}
              </div>
            </AccordionSection>

            {/* Company links */}
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 font-body font-bold text-lg text-text-primary hover:text-accent hover:bg-secondary transition-colors duration-[--duration-fast] min-h-[44px] flex items-center"
                onClick={onClose}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 font-body font-bold text-lg text-text-primary hover:text-accent hover:bg-secondary transition-colors duration-[--duration-fast] min-h-[44px] flex items-center"
                onClick={onClose}
              >
                Contact
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
