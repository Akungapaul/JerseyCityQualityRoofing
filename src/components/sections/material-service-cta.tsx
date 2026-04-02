import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business-info";

interface MaterialServiceCTAProps {
  materialName: string;
  serviceLinks: { title: string; path: string }[];
}

export function MaterialServiceCTA({
  materialName,
  serviceLinks,
}: MaterialServiceCTAProps) {
  if (serviceLinks.length === 0) return null;

  return (
    <div className="bg-secondary rounded-lg p-8 border border-accent">
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Professional {materialName} Services
      </h2>
      <p className="text-lg text-text-secondary mt-4 leading-relaxed">
        Our team specializes in {materialName.toLowerCase()} installation,
        repair, and maintenance across Hudson County. Explore our related
        services:
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        {serviceLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="inline-flex items-center gap-2 bg-accent text-dominant font-bold px-4 py-2 rounded-lg min-h-[44px] hover:bg-accent-hover transition-colors duration-[150ms]"
          >
            {link.title}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <a
        href={`tel:${BUSINESS_INFO.phone.replace(/[^+\d]/g, "")}`}
        className="flex items-center gap-2 mt-4 text-accent text-lg font-bold"
      >
        <Phone size={20} aria-hidden="true" />
        {BUSINESS_INFO.phone}
      </a>
    </div>
  );
}
