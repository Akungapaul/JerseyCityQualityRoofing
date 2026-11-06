import Link from "next/link";
import type { LocationPricing } from "@/data/types";

interface LocationPricingSectionProps {
  locations: LocationPricing[];
}

/**
 * Per-city pricing context on cost guides.
 *
 * Single-city alignment (2026-11-06, Paul's word after the restructure):
 * the section used to show four Hudson County towns ("Cost Variations
 * Across Hudson County" — Jersey City, Hoboken, Bayonne, North Bergen).
 * The site is Jersey City only now, so only the Jersey City entry
 * renders, under a Jersey City title; its name links to the homepage,
 * which is the Jersey City hub. The other towns' pricing contexts stay
 * in the guide data as reference only.
 */
export function LocationPricingSection({
  locations,
}: LocationPricingSectionProps) {
  const jerseyCity = locations.filter(
    (location) => location.citySlug === "jersey-city",
  );
  if (jerseyCity.length === 0) {
    return null;
  }
  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
        Roofing Costs in Jersey City
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {jerseyCity.map((location) => (
          <div
            key={location.citySlug}
            className="bg-secondary rounded-lg p-6 border border-[#4a5040]"
          >
            <h3 className="text-lg font-heading font-bold">
              <Link href="/" className="text-accent hover:underline">
                {location.cityName}
              </Link>
            </h3>
            <p className="text-lg text-text-secondary mt-2 leading-relaxed">
              {location.priceContext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
