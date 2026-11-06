import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/constants";

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
      {/* CRO Phase 3 (2026-11-06, audit finding 3): this link built a
          tel: href from the placeholder business "phone" text, which
          strips to an EMPTY tel: destination. It now routes to the
          detailed quote form on this page, with the estimate label. */}
      <a
        href="#full-quote-form"
        className="flex items-center gap-2 mt-4 text-accent text-lg font-bold"
      >
        {PHONE_NUMBER}
      </a>
    </div>
  );
}
