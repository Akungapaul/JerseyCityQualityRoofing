"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { SERVICES } from "@/data/services";
import { MUNICIPALITIES } from "@/data/municipalities";
import { cn } from "@/lib/utils";

function GalleryFilterBarInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentService = searchParams.get("service") ?? "all";
  const currentCity = searchParams.get("city") ?? "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const paramString = params.toString();
    router.replace(
      paramString ? `${pathname}?${paramString}` : pathname,
      { scroll: false },
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      {/* Service filter */}
      <div className="relative">
        <select
          value={currentService}
          onChange={(e) => updateFilter("service", e.target.value)}
          aria-label="Filter by service type"
          className={cn(
            "bg-secondary border rounded-lg px-4 py-2 min-h-[44px] text-lg text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant appearance-none pr-10",
            currentService !== "all" ? "border-accent" : "border-[#4a5040]",
          )}
        >
          <option value="all">All Services</option>
          {Object.values(SERVICES).map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* City filter */}
      <div className="relative">
        <select
          value={currentCity}
          onChange={(e) => updateFilter("city", e.target.value)}
          aria-label="Filter by city"
          className={cn(
            "bg-secondary border rounded-lg px-4 py-2 min-h-[44px] text-lg text-text-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dominant appearance-none pr-10",
            currentCity !== "all" ? "border-accent" : "border-[#4a5040]",
          )}
        >
          <option value="all">All Cities</option>
          {Object.values(MUNICIPALITIES).map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Reset button */}
      {(currentService !== "all" || currentCity !== "all") && (
        <button
          onClick={() => router.replace(pathname, { scroll: false })}
          className="text-accent text-lg underline underline-offset-4 hover:opacity-80 min-h-[44px]"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export function GalleryFilterBar() {
  return (
    <Suspense fallback={null}>
      <GalleryFilterBarInner />
    </Suspense>
  );
}
