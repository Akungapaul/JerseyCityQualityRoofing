import { Award, Shield, Star, Clock, CheckCircle } from "lucide-react";

const BADGES = [
  { icon: Award, label: "Manufacturer-Trained" },
  { icon: Shield, label: "Licensed & Insured" },
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
              className="flex items-center gap-2 text-text-primary border-r border-[#4a5040] last:border-r-0 pr-6 last:pr-0 lg:pr-8 lg:last:pr-0"
            >
              <Icon size={20} className="text-accent shrink-0" aria-hidden="true" />
              <span className="text-lg font-body whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
