"use client";

import { useState, useEffect } from "react";

export function useScrollPastFold(threshold = 1.0): boolean {
  const [isPastFold, setIsPastFold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastFold(window.scrollY > window.innerHeight * threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPastFold;
}
