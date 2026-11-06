import Link from "next/link";
import type { LocationPricing } from "@/data/types";

interface LocationPricingSectionProps {
  locations: LocationPricing[];
}

/**
 * Per-city pricing context on cost guides.
 *
 * Single-city restructure (2026-11-06): city names used to link to the
 * /roofing-contractor-<city>-nj hub pages, which are retired. Only
 * Jersey City still has a hub — the homepage — so only its name links
 * (to /); the other towns render as plain headings.
 */
export function LocationPricingSection({
  locations,
}: LocationPricingSectionProps) {
  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
        Cost Variations Across Hudson County
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <div
            key={location.citySlug}
            className="bg-secondary rounded-lg p-6 border border-[#4a5040]"
          >
            <h3 className="text-lg font-heading font-bold">
              {location.citySlug === "jersey-city" ? (
                <Link
                  href="/"
                  className="text-accent hover:underline"
                >
                  {location.cityName}
                </Link>
              ) : (
                <span className="text-text-primary">{location.cityName}</span>
              )}
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
