import Link from "next/link";
import { getAllMunicipalities } from "@/data/municipalities";

interface SiblingCitiesNavProps {
  serviceName: string;
  serviceSlug: string;
  serviceCategory: "residential" | "commercial";
  currentCitySlug: string;
}

export function SiblingCitiesNav({
  serviceName,
  serviceSlug,
  serviceCategory,
  currentCitySlug,
}: SiblingCitiesNavProps) {
  const municipalities = getAllMunicipalities();

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
        {serviceName} in Other Hudson County Cities
      </h2>
      <nav aria-label="Same service in other cities" className="flex flex-wrap gap-3">
        {municipalities.map((city) =>
          city.slug === currentCitySlug ? (
            <span
              key={city.slug}
              className="inline-flex items-center bg-secondary rounded-lg px-4 py-2 text-lg text-accent font-bold border border-accent cursor-default min-h-[44px]"
              aria-current="page"
            >
              {city.name}
            </span>
          ) : (
            <Link
              key={city.slug}
              href={`/services/${serviceCategory}/${serviceSlug}/${city.slug}`}
              prefetch={false}
              className="inline-flex items-center bg-secondary rounded-lg px-4 py-2 text-lg text-text-primary border border-[#4a5040] hover:border-accent transition-colors duration-[150ms] min-h-[44px]"
            >
              {city.name}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
