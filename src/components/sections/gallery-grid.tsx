"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { GalleryProject } from "@/data/types";
import { GalleryComparisonCard } from "@/components/sections/gallery-comparison-card";

interface GalleryGridProps {
  projects: GalleryProject[];
}

function GalleryGridInner({ projects }: GalleryGridProps) {
  const searchParams = useSearchParams();
  const serviceFilter = searchParams.get("service");
  const cityFilter = searchParams.get("city");

  const filtered = projects.filter((p) => {
    const matchService =
      !serviceFilter || serviceFilter === "all" || p.serviceSlug === serviceFilter;
    const matchCity =
      !cityFilter || cityFilter === "all" || p.citySlug === cityFilter;
    return matchService && matchCity;
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-[1.75rem] font-heading font-bold text-text-primary">
          No Projects Match Your Filters
        </h3>
        <p className="text-lg text-text-secondary mt-2">
          Try selecting a different service type or city, or clear all filters
          to browse all projects.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filtered.map((project) => (
        <GalleryComparisonCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export function GalleryGrid({ projects }: GalleryGridProps) {
  return (
    <Suspense fallback={null}>
      <GalleryGridInner projects={projects} />
    </Suspense>
  );
}
