import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Wrench,
  RefreshCw,
  Search,
  AlertTriangle,
  Layers,
  ClipboardCheck,
  Hammer,
  ArrowUpCircle,
  ArrowRight,
} from "lucide-react";
import { getServicesByCategory } from "@/data/services";

const RESIDENTIAL_ICONS: Record<string, LucideIcon> = {
  "roof-repair": Wrench,
  "roof-replacement": RefreshCw,
  "roof-inspection": Search,
  "emergency-roofing": AlertTriangle,
};

const COMMERCIAL_ICONS: Record<string, LucideIcon> = {
  "flat-roof-systems": Layers,
  "roof-maintenance": ClipboardCheck,
  "commercial-repair": Hammer,
  "commercial-replacement": ArrowUpCircle,
};

interface ServicesInCityGridProps {
  citySlug: string;
  cityName: string;
}

export function ServicesInCityGrid({
  citySlug,
  cityName,
}: ServicesInCityGridProps) {
  const residentialServices = getServicesByCategory("residential");
  const commercialServices = getServicesByCategory("commercial");

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
        Roofing Services in {cityName}
      </h2>
      <p className="text-lg text-text-secondary mt-2">
        From emergency repairs to full replacements, we provide every roofing
        service {cityName} homeowners and businesses need.
      </p>

      <h3 className="text-lg font-heading font-bold text-text-primary mt-8">
        Residential Services
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {residentialServices.map((service) => {
          const Icon = RESIDENTIAL_ICONS[service.slug] ?? Wrench;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.category}/${service.slug}/${citySlug}`}
              prefetch={false}
              className="group bg-dominant rounded-lg p-5 border border-[#4a5040] hover:border-accent transition-colors duration-[150ms]"
            >
              <Icon size={24} className="text-accent" aria-hidden="true" />
              <p className="text-lg font-heading font-bold text-text-primary mt-3">
                {service.name}
              </p>
              <p className="text-text-secondary text-lg mt-1">in {cityName}</p>
              <span className="inline-flex items-center gap-1 text-accent font-bold text-lg mt-3 group-hover:gap-2 transition-all">
                Learn More{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>

      <h3 className="text-lg font-heading font-bold text-text-primary mt-8">
        Commercial Services
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {commercialServices.map((service) => {
          const Icon = COMMERCIAL_ICONS[service.slug] ?? Layers;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.category}/${service.slug}/${citySlug}`}
              prefetch={false}
              className="group bg-dominant rounded-lg p-5 border border-[#4a5040] hover:border-accent transition-colors duration-[150ms]"
            >
              <Icon size={24} className="text-accent" aria-hidden="true" />
              <p className="text-lg font-heading font-bold text-text-primary mt-3">
                {service.name}
              </p>
              <p className="text-text-secondary text-lg mt-1">in {cityName}</p>
              <span className="inline-flex items-center gap-1 text-accent font-bold text-lg mt-3 group-hover:gap-2 transition-all">
                Learn More{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
