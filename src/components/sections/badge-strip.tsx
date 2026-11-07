import { Shield, Star, Clock, CheckCircle } from "lucide-react";

// CRO Phase 4 (2026-11-06, audit 4.4): the strip used to assert
// "Manufacturer-Trained" and "Licensed & Insured" as unqualified proof
// badges, but the business data behind them says the license is
// "Verification available upon request" and the insurance is "Proof of
// insurance available upon request". The badges now say what the site
// can actually show: documentation is available upon request.
const BADGES = [
  { icon: Shield, label: "Documentation Available on Request" },
  { icon: Star, label: "Local Roofing Pros" },
  { icon: Clock, label: "20+ Years Experience" },
  { icon: CheckCircle, label: "Quality Materials" },
] as const;

export function BadgeStrip() {
  return (
    <section className="bg-[#33382b] py-4 sm:py-6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:gap-x-8">
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-text-primary pr-4 last:pr-0 sm:border-r sm:border-[#4a5040] sm:last:border-r-0 sm:pr-6 lg:pr-8 lg:last:pr-0"
            >
              <Icon size={20} className="text-accent shrink-0" aria-hidden="true" />
              <span className="text-base sm:text-lg font-body whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
