interface MidPageCTAProps {
  heading?: string;
  accentColor?: string;
}

/**
 * Mid-page CTA (CRO Phase 3, 2026-11-06; audit 3.3/3.5).
 *
 * This strip used to pair a phone-icon "Request a Free Estimate" link
 * that exited to /contact with a button targeting the hero form at the
 * top of the page. Every page that renders MidPageCTA also renders the
 * detailed QuoteForm below it, so the strip now has one honest action:
 * scroll to that nearest form (#full-quote-form). The unused
 * phoneNumber/phoneHref props were removed with the phone link.
 */
export function MidPageCTA({ heading, accentColor }: MidPageCTAProps) {
  const buttonClasses =
    accentColor ?? "bg-accent hover:bg-accent-hover";

  return (
    <div className="bg-secondary py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: text */}
          <div className="text-center sm:text-left">
            <p className="text-[1.75rem] font-heading font-bold text-text-primary">
              {heading ?? "Ready to Get Started?"}
            </p>
            <p className="text-lg text-text-secondary mt-1">
              Free estimates with no obligation.
            </p>
          </div>

          {/* Right: action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#full-quote-form"
              className={`${buttonClasses} text-dominant font-bold px-6 py-3 rounded-lg min-h-[44px] transition-colors duration-[150ms] focus-ring inline-flex items-center`}
            >
              Get My Free Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
