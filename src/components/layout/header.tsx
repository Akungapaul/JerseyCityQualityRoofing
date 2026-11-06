"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { RoofIcon } from "@/components/layout/logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  const handleQuoteCTA = useCallback(() => {
    const formEl = document.getElementById("quote-form");
    if (formEl) {
      const headerHeight = isScrolled ? 56 : 80;
      const top =
        formEl.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      router.push("/contact");
    }
  }, [isScrolled, router]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <motion.header
        className="sticky top-0 z-50 bg-dominant border-b border-secondary/30"
        animate={{ height: isScrolled ? 56 : 80 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant rounded-md"
            aria-label={`${SITE_NAME} — Home`}
          >
            <motion.div
              // initial pins the box size in the server-rendered style so
              // the logo paints at final size on first paint instead of
              // flashing large until hydration (2026-11-06, finding B)
              initial={{ width: 34, height: 34 }}
              animate={{
                width: isScrolled ? 28 : 34,
                height: isScrolled ? 28 : 34,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <RoofIcon className="size-full" />
            </motion.div>
            {/* Wordmark steps down on small phones (2026-11-06 mobile
                pass): at 1.375rem the nowrap wordmark + phone + CTA +
                hamburger could not fit a 360px row. The scroll shrink
                is preserved via the isScrolled class swap. */}
            <span
              className={cn(
                "font-heading font-bold text-text-primary whitespace-nowrap transition-[font-size] duration-300",
                isScrolled
                  ? "text-[0.95rem] sm:text-[1.125rem]"
                  : "text-[1.05rem] sm:text-[1.375rem]",
              )}
            >
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden lg:flex items-center"
            aria-label="Main navigation"
          >
            <MegaMenu />
          </nav>

          {/* Right side: phone, CTA, hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Estimate link. CRO Phase 3 (2026-11-06, audit finding 3):
                the Phone icon was removed -- this link routes to the
                quote form, it does not place a call (the site has no
                published phone number). */}
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-2 rounded-md text-accent hover:underline underline-offset-4 transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant"
            >
              <span className="hidden sm:inline font-body font-bold text-lg">
                {PHONE_NUMBER}
              </span>
            </a>

            {/* CTA button -- scrolls to #quote-form or navigates to /contact.
                Hidden below sm (2026-11-06 mobile pass): even with the
                smaller wordmark, logo + wordmark + phone + CTA + hamburger
                cannot fit 360px. The hamburger menu carries a full-width
                quote CTA and the hero/floating CTAs cover the rest. */}
            <button
              type="button"
              onClick={handleQuoteCTA}
              className={cn(
                buttonVariants({ variant: "primary", size: "compact" }),
                "hidden px-3 sm:inline-flex sm:px-4",
              )}
            >
              {isScrolled ? "Free Quote" : "Get Free Quote"}
            </button>

            {/* Hamburger menu (mobile only) */}
            <button
              type="button"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md text-text-primary hover:text-accent transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant lg:hidden"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile navigation overlay */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
