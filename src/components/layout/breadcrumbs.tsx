"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buildBreadcrumbJsonLd, JsonLd } from "@/lib/seo/json-ld";
import { BASE_URL } from "@/lib/constants";

const SEGMENT_LABELS: Record<string, string> = {
  services: "Services",
  residential: "Residential Services",
  commercial: "Commercial Services",
  "service-areas": "Service Areas",
  about: "About Us",
  contact: "Contact",
  blog: "Blog",
  guides: "Guides",
  cost: "Cost Guides",
  materials: "Material Guides",
  problems: "Common Roofing Problems",
  gallery: "Project Gallery",
};

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't render breadcrumbs on homepage
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items with cumulative URLs
  const items = [{ name: "Home", url: BASE_URL }];

  segments.forEach((segment, index) => {
    const url = `${BASE_URL}/${segments.slice(0, index + 1).join("/")}`;
    const name = SEGMENT_LABELS[segment] ?? slugToTitle(segment);
    items.push({ name, url });
  });

  const jsonLdData = buildBreadcrumbJsonLd(items) as unknown as Record<
    string,
    unknown
  >;

  return (
    <nav aria-label="Breadcrumb" className="bg-dominant">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3">
        <JsonLd data={jsonLdData} />
        <ol className="flex items-center gap-1 text-text-secondary text-lg font-body font-medium flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.url} className="inline-flex items-center gap-1">
                {/* Separator */}
                {index > 0 && (
                  <ChevronRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-text-secondary/50"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-text-primary"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-accent transition-colors duration-[--duration-fast]"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
