import { Phone } from "lucide-react";
import { CompactQuoteForm } from "@/components/forms/compact-quote-form";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

interface ServiceHeroProps {
  headline: string;
  subtitle: string;
  serviceName: string;
}

export function ServiceHero({
  headline,
  subtitle,
  serviceName,
}: ServiceHeroProps) {
  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left column: headline, subtitle, CTAs */}
        <div className="lg:w-3/5">
          <h1 className="text-[2.5rem] lg:text-[3rem] font-heading font-bold text-text-primary leading-[1.1]">
            {headline}
          </h1>
          <p className="text-lg text-text-secondary mt-4 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#quote-form"
              className="bg-accent hover:bg-accent-hover text-dominant font-bold px-6 py-3 rounded-lg min-h-[44px] transition-colors duration-[150ms] focus-ring inline-flex items-center"
            >
              Get Your Free Quote
            </a>
            <a
              href={PHONE_HREF}
              className="text-accent hover:text-accent-hover flex items-center gap-2 text-lg font-bold min-h-[44px]"
            >
              <Phone size={20} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>

        {/* Right column: compact quote form */}
        <div className="lg:w-2/5">
          <CompactQuoteForm defaultServiceType={serviceName} />
        </div>
      </div>
    </div>
  );
}
