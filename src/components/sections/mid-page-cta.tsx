import { Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

interface MidPageCTAProps {
  heading?: string;
  phoneNumber?: string;
  phoneHref?: string;
  accentColor?: string;
}

export function MidPageCTA({
  heading,
  phoneNumber,
  phoneHref,
  accentColor,
}: MidPageCTAProps) {
  const displayPhone = phoneNumber ?? PHONE_NUMBER;
  const displayHref = phoneHref ?? PHONE_HREF;
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

          {/* Right: actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone link */}
            <a
              href={displayHref}
              className="text-accent flex items-center gap-2 text-lg font-bold min-h-[44px] hover:opacity-80 transition-opacity"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              {displayPhone}
            </a>

            {/* CTA button */}
            <a
              href="#quote-form"
              className={`${buttonClasses} text-dominant font-bold px-6 py-3 rounded-lg min-h-[44px] transition-colors duration-[150ms] focus-ring inline-flex items-center`}
            >
              Get Your Free Estimate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
