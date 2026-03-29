import Link from "next/link";
import type { LocationPricing } from "@/data/types";

interface LocationPricingSectionProps {
  locations: LocationPricing[];
}

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
            <h3>
              <Link
                href={`/service-areas/${location.citySlug}`}
                className="text-lg font-heading font-bold text-accent hover:underline"
              >
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
