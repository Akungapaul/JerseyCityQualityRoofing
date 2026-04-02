"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { getServicesByCategory } from "@/data/services";
import { getAllMunicipalities } from "@/data/municipalities";

type PanelId = "residential" | "commercial" | "locations" | "resources" | null;

export function MegaMenu() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const residentialServices = getServicesByCategory("residential");
  const commercialServices = getServicesByCategory("commercial");
  const municipalities = getAllMunicipalities();

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openPanel = useCallback(
    (panel: PanelId) => {
      clearCloseTimer();
      setActivePanel(panel);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActivePanel(null);
    }, 100);
  }, [clearCloseTimer]);

  const togglePanel = useCallback(
    (panel: PanelId) => {
      clearCloseTimer();
      setActivePanel((prev) => (prev === panel ? null : panel));
    },
    [clearCloseTimer],
  );

  const closePanel = useCallback(() => {
    clearCloseTimer();
    setActivePanel(null);
  }, [clearCloseTimer]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, panel: PanelId) => {
      if (e.key === "Escape") {
        closePanel();
        // Return focus to the trigger button
        if (panel && triggerRefs.current[panel]) {
          triggerRefs.current[panel]?.focus();
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePanel(panel);
      }
    },
    [closePanel, togglePanel],
  );

  // Close on click outside
  useEffect(() => {
    if (!activePanel) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closePanel();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activePanel, closePanel]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const panelMotionProps = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.2, ease: "easeOut" as const },
  };

  const navItems: Array<{ id: PanelId; label: string }> = [
    { id: "residential", label: "Residential Services" },
    { id: "commercial", label: "Commercial Services" },
    { id: "locations", label: "Service Areas" },
    { id: "resources", label: "Resources" },
  ];

  return (
    <div ref={menuRef} className="relative flex items-center gap-1">
      {navItems.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => openPanel(item.id)}
          onMouseLeave={scheduleClose}
        >
          <button
            ref={(el) => {
              if (item.id) triggerRefs.current[item.id] = el;
            }}
            type="button"
            className="inline-flex items-center gap-1 px-3 py-2 font-body font-bold text-lg tracking-[0.02em] text-text-primary transition-colors duration-[--duration-fast] hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant rounded-md min-h-[44px]"
            aria-expanded={activePanel === item.id}
            aria-haspopup="true"
            onClick={() => togglePanel(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
          >
            {item.label}
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className={`transition-transform duration-[--duration-fast] ${
                activePanel === item.id ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence>
            {activePanel === item.id && (
              <motion.div
                {...panelMotionProps}
                className="absolute left-0 top-full mt-2 bg-secondary rounded-lg shadow-xl p-6 z-50 min-w-[400px]"
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleClose}
                role="menu"
              >
                {item.id === "residential" && (
                  <div className="grid gap-4">
                    <p className="font-heading font-bold text-lg text-accent mb-1">
                      Residential Roofing
                    </p>
                    {residentialServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/residential/${service.slug}`}
                        className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter"
                        onClick={closePanel}
                        role="menuitem"
                      >
                        <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
                          {service.name}
                        </span>
                        <span className="block text-text-secondary text-lg leading-snug mt-0.5">
                          {service.shortDescription.length > 80
                            ? `${service.shortDescription.slice(0, 80)}...`
                            : service.shortDescription}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {item.id === "commercial" && (
                  <div className="grid gap-4">
                    <p className="font-heading font-bold text-lg text-accent mb-1">
                      Commercial Roofing
                    </p>
                    {commercialServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/commercial/${service.slug}`}
                        className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter"
                        onClick={closePanel}
                        role="menuitem"
                      >
                        <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
                          {service.name}
                        </span>
                        <span className="block text-text-secondary text-lg leading-snug mt-0.5">
                          {service.shortDescription.length > 80
                            ? `${service.shortDescription.slice(0, 80)}...`
                            : service.shortDescription}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {item.id === "locations" && (
                  <div>
                    <p className="font-heading font-bold text-lg text-accent mb-3">
                      Service Areas
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {municipalities.map((muni) => (
                        <Link
                          key={muni.slug}
                          href={`/service-areas/${muni.slug}`}
                          className="block rounded-md px-2 py-1.5 font-body text-lg text-text-secondary hover:text-accent hover:bg-dominant-lighter transition-colors duration-[--duration-fast]"
                          onClick={closePanel}
                          role="menuitem"
                        >
                          {muni.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {item.id === "resources" && (
                  <div className="grid gap-4">
                    <p className="font-heading font-bold text-lg text-accent mb-1">
                      Roofing Resources
                    </p>
                    <Link
                      href="/blog"
                      className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter"
                      onClick={closePanel}
                      role="menuitem"
                    >
                      <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
                        Blog
                      </span>
                      <span className="block text-text-secondary text-lg leading-snug mt-0.5">
                        Roofing tips, guides, and industry insights
                      </span>
                    </Link>
                    <Link
                      href="/guides"
                      className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter"
                      onClick={closePanel}
                      role="menuitem"
                    >
                      <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
                        Roofing Guides
                      </span>
                      <span className="block text-text-secondary text-lg leading-snug mt-0.5">
                        Cost guides and material deep-dives
                      </span>
                    </Link>
                    <Link
                      href="/problems"
                      className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter"
                      onClick={closePanel}
                      role="menuitem"
                    >
                      <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
                        Common Problems
                      </span>
                      <span className="block text-text-secondary text-lg leading-snug mt-0.5">
                        Solutions for ice dams, leaks, and storm damage
                      </span>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
