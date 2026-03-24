import Link from "next/link";
import {
  Hammer,
  RefreshCw,
  Search,
  Siren,
  Layers,
  Wrench,
  Building2,
  HardHat,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { getServicesByCategory } from "@/data/services";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "roof-repair": Hammer,
  "roof-replacement": RefreshCw,
  "roof-inspection": Search,
  "emergency-roofing": Siren,
  "flat-roof-systems": Layers,
  "roof-maintenance": Wrench,
  "commercial-repair": Building2,
  "commercial-replacement": HardHat,
};

export function ServicesGrid() {
  const residential = getServicesByCategory("residential");
  const commercial = getServicesByCategory("commercial");

  return (
    <SectionWrapper tone="secondary">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Our Roofing Services
        </h2>

        {/* Residential Services */}
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Residential Services
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {residential.map((service) => {
            const ServiceIcon = SERVICE_ICONS[service.slug] ?? Hammer;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.category}/${service.slug}`}
                className="group bg-dominant rounded-lg p-5 flex flex-col gap-3 hover:bg-[#4a5040] transition-colors duration-[150ms]"
              >
                <ServiceIcon
                  size={24}
                  className="text-accent"
                  aria-hidden="true"
                />
                <span className="font-heading font-bold text-lg text-text-primary">
                  {service.name}
                </span>
                <span className="text-text-secondary text-lg line-clamp-2">
                  {service.shortDescription.split(".")[0]}.
                </span>
                <ArrowRight
                  size={16}
                  className="text-accent mt-auto group-hover:translate-x-1 transition-transform duration-[150ms]"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Commercial Services */}
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Commercial Services
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {commercial.map((service) => {
            const ServiceIcon = SERVICE_ICONS[service.slug] ?? Building2;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.category}/${service.slug}`}
                className="group bg-dominant rounded-lg p-5 flex flex-col gap-3 hover:bg-[#4a5040] transition-colors duration-[150ms]"
              >
                <ServiceIcon
                  size={24}
                  className="text-accent"
                  aria-hidden="true"
                />
                <span className="font-heading font-bold text-lg text-text-primary">
                  {service.name}
                </span>
                <span className="text-text-secondary text-lg line-clamp-2">
                  {service.shortDescription.split(".")[0]}.
                </span>
                <ArrowRight
                  size={16}
                  className="text-accent mt-auto group-hover:translate-x-1 transition-transform duration-[150ms]"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
