import Link from "next/link";
import { MapPin } from "lucide-react";
import { getMunicipalitiesByTier } from "@/data/municipalities";
import { buttonVariants } from "@/components/ui/button-variants";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

export function ServiceAreasOverview() {
  const tier1 = getMunicipalitiesByTier(1);
  const tier2 = getMunicipalitiesByTier(2);
  const tier3 = getMunicipalitiesByTier(3);
  const allCities = [...tier1, ...tier2, ...tier3];

  return (
    <SectionWrapper tone="dominant">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Serving Jersey City & All of Hudson County
        </h2>

        {/* Featured Tier 1 cities */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {tier1.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="group flex items-center gap-2 bg-secondary rounded-lg p-4 text-text-primary hover:text-accent transition-colors duration-[150ms]"
            >
              <MapPin
                size={20}
                className="text-accent shrink-0"
                aria-hidden="true"
              />
              <span className="font-heading font-bold text-lg">
                {city.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Tier 2 & 3 cities */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[...tier2, ...tier3].map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="group flex items-center gap-2 text-text-primary hover:text-accent transition-colors duration-[150ms]"
            >
              <MapPin
                size={16}
                className="text-accent shrink-0"
                aria-hidden="true"
              />
              <span className="text-lg">{city.name}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/service-areas"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            View All {allCities.length} Service Areas
          </Link>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
