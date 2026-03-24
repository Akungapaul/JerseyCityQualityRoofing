import { Phone } from "lucide-react";

interface EmergencyHeroProps {
  phoneNumber: string;
  phoneHref: string;
}

export function EmergencyHero({ phoneNumber, phoneHref }: EmergencyHeroProps) {
  return (
    <section className="bg-dominant border-b-4 border-[#d4782f] py-20 sm:py-24 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 24/7 badge */}
        <span className="inline-flex items-center bg-[#d4782f] text-dominant px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
          24/7 EMERGENCY SERVICE
        </span>

        {/* Headline */}
        <h1 className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] font-heading font-bold text-text-primary mt-6 leading-[1.1]">
          24/7 Emergency Roof Repair
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-text-secondary mt-4 max-w-2xl mx-auto">
          Storm damage? Roof leak? We respond immediately.
        </p>

        {/* Phone display */}
        <div className="mt-8">
          <a
            href={phoneHref}
            className="text-[2.5rem] lg:text-[3rem] font-heading font-bold text-[#d4782f] hover:opacity-80 transition-opacity"
          >
            {phoneNumber}
          </a>
        </div>

        {/* CALL NOW button */}
        <div className="mt-6">
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center bg-[#d4782f] hover:bg-[#e08a3f] text-dominant font-bold text-xl px-10 py-4 min-h-[56px] rounded-lg transition-colors duration-[150ms] focus-ring"
          >
            <Phone size={24} strokeWidth={1.5} aria-hidden="true" className="mr-2" />
            Call Now
          </a>
        </div>

        {/* Scroll prompt */}
        <p className="text-sm text-text-secondary mt-6">
          Or scroll down to request emergency service online
        </p>
      </div>
    </section>
  );
}
