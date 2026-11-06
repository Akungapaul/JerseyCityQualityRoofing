import { buttonVariants } from "@/components/ui/button-variants";
import { QuoteCtaButton } from "@/components/ui/quote-cta-button";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
  className?: string;
}

/**
 * End-of-page CTA banner (CRO Phase 3, 2026-11-06; audit 3.5/14).
 *
 * Changes from the audited version:
 * - The phone-icon "Request a Free Estimate" link is gone: it routed
 *   to a form while styled as a call (the site has no phone number).
 * - The single primary button is local-first: on pages that contain a
 *   quote form it scrolls to the nearest one (the detailed form sits
 *   right above this banner); it navigates to /contact#quote-form only
 *   on pages without a form (About, Gallery).
 * - The default subtext no longer says "Call now".
 * - The footer no longer repeats this strip underneath it.
 */
export function CTABanner({
  heading = "Ready to Protect Your Roof?",
  subtext = "Request a free inspection and your no-obligation quote.",
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

          {/* Right side: single local-first CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 max-w-full">
            <QuoteCtaButton
              preferredFormIds={["full-quote-form", "quote-form"]}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
              )}
            >
              Get My Free Quote
            </QuoteCtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
