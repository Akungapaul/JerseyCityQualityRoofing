import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { GalleryHero } from "@/components/sections/gallery-hero";
import { GalleryFilterBar } from "@/components/sections/gallery-filter-bar";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABanner } from "@/components/sections/cta-banner";
import { BadgeStrip } from "@/components/sections/badge-strip";
import { GALLERY_PROJECTS } from "@/data/gallery-projects";

// CRO Phase 4 (2026-11-06, audit 6.1): the title/description used to
// promise "Before & After Roofing Photos", but the project data
// contains no photographs -- only SVG placeholder panels. The page is
// now honestly labeled as illustrated project profiles. Restore photo
// language only when real before/after photo sets are supplied.
export const metadata: Metadata = generatePageMetadata({
  title: "Project Gallery | Roofing Project Profiles",
  description:
    "Browse illustrated profiles of roofing projects completed by Jersey City Quality Roofing -- the scope, materials, and results for residential and commercial roofs across Hudson County.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <GalleryHero projectCount={GALLERY_PROJECTS.length} />
      <BadgeStrip />
      <SectionWrapper tone="dominant">
        <GalleryFilterBar />
        <GalleryGrid projects={GALLERY_PROJECTS} />
      </SectionWrapper>
      <CTABanner
        heading="Ready to Start Your Roofing Project?"
        subtext="Get a free estimate for your roofing project."
      />
    </>
  );
}
