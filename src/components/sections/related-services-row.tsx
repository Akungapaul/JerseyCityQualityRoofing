import Link from "next/link";
import {
  Wrench,
  Home,
  Search,
  AlertTriangle,
  Hammer,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getService } from "@/data/services";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "roof-repair": Wrench,
  "roof-replacement": Home,
  "roof-inspection": Search,
  "emergency-roofing": AlertTriangle,
};

interface RelatedServicesRowProps {
  serviceSlugs: readonly string[];
}

export function RelatedServicesRow({ serviceSlugs }: RelatedServicesRowProps) {
  const services = serviceSlugs
    .map((slug) => {
      const service = getService(slug);
      if (!service) return null;
      return { ...service, Icon: SERVICE_ICON_MAP[slug] ?? Hammer };
    })
    .filter(
      (s): s is NonNullable<typeof s> => s !== null,
    );

  if (services.length === 0) return null;

  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Related Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/residential/${service.slug}`}
            className="bg-secondary rounded-lg p-6 group hover:bg-secondary-lighter transition-colors duration-[150ms]"
          >
            <service.Icon
              size={24}
              strokeWidth={1.5}
              className="text-accent mb-2"
              aria-hidden="true"
            />
            <h3 className="text-lg font-heading font-bold text-text-primary">
              {service.name}
            </h3>
            <p className="text-lg text-text-secondary mt-1 line-clamp-2">
              {service.shortDescription}
            </p>
            <span className="mt-4 flex items-center gap-1 text-accent text-sm">
              View {service.name}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="group-hover:translate-x-1 transition-transform duration-[150ms]"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
