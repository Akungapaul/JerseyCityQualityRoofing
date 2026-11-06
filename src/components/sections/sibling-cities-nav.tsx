import Link from "next/link";
import { getMunicipality } from "@/data/municipalities";

interface SiblingCitiesNavProps {
  serviceName: string;
  serviceSlug: string;
  serviceCategory: "residential" | "commercial";
  currentCitySlug: string;
}

/**
 * Cities-served silo list on service-in-city pages.
 *
 * Single-city restructure (2026-11-06): this used to list all 12 Hudson
 * County municipalities, each linking to the same service in that city.
 * Those pages are retired, so the list now carries a single entry —
 * Jersey City — pointing at the homepage, which is the Jersey City hub.
 */
export function SiblingCitiesNav({
  serviceName,
  currentCitySlug,
}: SiblingCitiesNavProps) {
  const currentCity = getMunicipality(currentCitySlug);

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
        {serviceName} in {currentCity?.name ?? "Jersey City"}
      </h2>
      <nav
        aria-label="Cities served"
        className="flex flex-wrap gap-3"
      >
        <Link
          href="/"
          className="inline-flex items-center bg-secondary rounded-lg px-4 py-2 text-lg text-text-primary border border-[#4a5040] hover:border-accent transition-colors duration-[150ms] min-h-[44px]"
        >
          {currentCity?.name ?? "Jersey City"}
        </Link>
      </nav>
    </div>
  );
}
