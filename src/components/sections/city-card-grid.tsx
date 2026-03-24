import { getMunicipalitiesByTier } from "@/data/municipalities";
import { CityCard } from "./city-card";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

export function CityCardGrid() {
  const tier1 = getMunicipalitiesByTier(1);
  const tier2 = getMunicipalitiesByTier(2);
  const tier3 = getMunicipalitiesByTier(3);

  return (
    <SectionWrapper tone="dominant">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Our Service Areas
        </h2>

        {/* Tier 1: Featured cities - larger cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tier1.map((city) => (
            <CityCard key={city.slug} city={city} featured />
          ))}
        </div>

        {/* Tier 2 & 3: Standard-size cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...tier2, ...tier3].map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
