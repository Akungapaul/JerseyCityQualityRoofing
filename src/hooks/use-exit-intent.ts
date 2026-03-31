"use client";

import { useState, useEffect, useCallback, useRef } from "react";

let dismissed = false;

interface UseExitIntentOptions {
  enabled?: boolean;
  delayMs?: number;
}

export function useExitIntent(options: UseExitIntentOptions = {}): {
  isTriggered: boolean;
  dismiss: () => void;
} {
  const { enabled = true, delayMs = 5000 } = options;
  const [isTriggered, setIsTriggered] = useState(false);
  const mountTime = useRef(Date.now());
  const lastScrollY = useRef(0);

  // Desktop: mouseLeave on document
  useEffect(() => {
    if (!enabled || dismissed) return;

    const pathname = window.location.pathname;
    if (!pathname.startsWith("/services/") && !pathname.startsWith("/service-areas/")) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (dismissed) return;
      if (e.clientY <= 0 && Date.now() - mountTime.current > delayMs) {
        setIsTriggered(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [enabled, delayMs]);

  // Mobile: rapid scroll-up detection
  useEffect(() => {
    if (!enabled || dismissed) return;

    const pathname = window.location.pathname;
    if (!pathname.startsWith("/services/") && !pathname.startsWith("/service-areas/")) {
      return;
    }

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (dismissed) return;
      const currentY = window.scrollY;
      const delta = lastScrollY.current - currentY;

      if (delta > 300 && Date.now() - mountTime.current > delayMs) {
        setIsTriggered(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, delayMs]);

  const dismiss = useCallback(() => {
    dismissed = true;
    setIsTriggered(false);
  }, []);

  return { isTriggered: isTriggered && !dismissed, dismiss };
}
