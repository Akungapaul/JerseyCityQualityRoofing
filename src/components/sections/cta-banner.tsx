import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
  className?: string;
}

export function CTABanner({
  heading = "Ready to Protect Your Roof?",
  subtext = "Call now for a free inspection or request your no-obligation quote.",
  className,
}: CTABannerProps) {
  return (
    <div className={cn("bg-secondary py-8 lg:py-10", className)}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Left side: heading and subtext */}
          <div className="text-center sm:text-left">
            <p className="font-heading font-bold text-[1.75rem] text-text-primary leading-[1.2]">
              {heading}
            </p>
            <p className="text-text-secondary text-lg mt-1">{subtext}</p>
          </div>

          {/* Right side: phone and CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-md text-accent font-body font-bold text-lg hover:underline underline-offset-4 transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
              )}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
