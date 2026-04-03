"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Phone, Menu } from "lucide-react";
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
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant rounded-md"
            aria-label={`${SITE_NAME} — Home`}
          >
            <motion.div
              animate={{
                width: isScrolled ? 28 : 34,
                height: isScrolled ? 28 : 34,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <RoofIcon className="size-full" />
            </motion.div>
            <motion.span
              className="font-heading font-bold text-text-primary whitespace-nowrap"
              animate={{
                fontSize: isScrolled ? "1.125rem" : "1.375rem",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {SITE_NAME}
            </motion.span>
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
            {/* Phone link */}
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-2 rounded-md text-accent hover:underline underline-offset-4 transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant"
            >
              <Phone
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="hidden sm:inline font-body font-bold text-lg">
                {PHONE_NUMBER}
              </span>
            </a>

            {/* CTA button -- scrolls to #quote-form or navigates to /contact */}
            <button
              type="button"
              onClick={handleQuoteCTA}
              className={cn(
                buttonVariants({ variant: "primary", size: "compact" }),
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
