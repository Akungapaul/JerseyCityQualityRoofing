import { Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

interface GuideHeroProps {
  headline: string;
  subtitle: string;
  categoryBadgeLabel: string;
  showCTA?: boolean;
}

export function GuideHero({
  headline,
  subtitle,
  categoryBadgeLabel,
  showCTA = false,
}: GuideHeroProps) {
  return (
    <section className="bg-dominant">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <span className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-text-secondary text-[0.875rem] font-bold uppercase tracking-wider">
          {categoryBadgeLabel}
        </span>
        <h1 className="text-[2.5rem] lg:text-[3rem] font-heading font-bold text-text-primary leading-[1.1] mt-4">
          {headline}
        </h1>
        <p className="text-lg text-text-secondary mt-4 leading-relaxed">
          {subtitle}
        </p>
        {showCTA && (
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#quote-form"
              className="bg-accent hover:bg-accent-hover text-dominant font-bold px-6 py-3 rounded-lg min-h-[44px] transition-colors duration-[150ms] focus-ring inline-flex items-center"
            >
              Get Your Free Quote
            </a>
            <a
              href={PHONE_HREF}
              className="text-accent flex items-center gap-2 text-lg font-bold min-h-[44px] hover:opacity-80 transition-opacity"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
