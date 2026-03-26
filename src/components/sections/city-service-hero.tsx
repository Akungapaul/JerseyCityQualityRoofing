import { Phone } from "lucide-react";
import { CompactQuoteForm } from "@/components/forms/compact-quote-form";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

interface CityServiceHeroProps {
  heroHeadline: string;
  heroSubtitle: string;
  cityName: string;
  population: number;
  serviceName: string;
  isEmergency?: boolean;
}

export function CityServiceHero({
  heroHeadline,
  heroSubtitle,
  cityName,
  population,
  serviceName,
  isEmergency = false,
}: CityServiceHeroProps) {
  return (
    <section
      className={`bg-dominant py-16 sm:py-20 lg:py-24${isEmergency ? " border-b-4 border-[#d4782f]" : ""}`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8 items-start">
          {/* Left column: headline, subtitle, CTAs */}
          <div className="lg:col-span-3">
            {isEmergency ? (
              <span className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-[#d4782f] font-bold text-lg">
                24/7 EMERGENCY SERVICE
              </span>
            ) : (
              <span className="inline-flex items-center bg-secondary rounded-full px-3 py-1 text-text-secondary text-lg">
                Hudson County, NJ
              </span>
            )}
            <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary mt-4">
              {heroHeadline}
            </h1>
            <p className="text-lg text-text-secondary mt-4 leading-relaxed">
              {heroSubtitle}
            </p>
            <p className="text-lg text-text-secondary mt-2">
              Serving {population.toLocaleString()} residents in {cityName}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {isEmergency ? (
                <a
                  href={PHONE_HREF}
                  className="bg-[#d4782f] hover:bg-[#e08a3f] text-dominant font-bold px-6 py-3 rounded-lg min-h-[44px] transition-colors duration-[150ms] focus-ring inline-flex items-center"
                >
                  Call Now
                </a>
              ) : (
                <a
                  href="#quote-form"
                  className="bg-accent hover:bg-accent-hover text-dominant font-bold px-6 py-3 rounded-lg min-h-[44px] transition-colors duration-[150ms] focus-ring inline-flex items-center"
                >
                  Get Your Free Quote
                </a>
              )}
              <a
                href={PHONE_HREF}
                className={`flex items-center gap-2 font-bold min-h-[44px] hover:opacity-80 transition-opacity${isEmergency ? " text-[#d4782f] text-2xl" : " text-accent text-lg"}`}
              >
                <Phone
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>

          {/* Right column: compact quote form */}
          <div className="mt-8 lg:mt-0 lg:col-span-2">
            <CompactQuoteForm defaultServiceType={serviceName} />
          </div>
        </div>
      </div>
    </section>
  );
}
