import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { GalleryHero } from "@/components/sections/gallery-hero";
import { GalleryFilterBar } from "@/components/sections/gallery-filter-bar";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABanner } from "@/components/sections/cta-banner";
import { BadgeStrip } from "@/components/sections/badge-strip";
import { GALLERY_PROJECTS } from "@/data/gallery-projects";

export const metadata: Metadata = generatePageMetadata({
  title: "Project Gallery | Before & After Roofing Photos",
  description:
    "Browse before-and-after photos of our roofing projects across Hudson County. See our craftsmanship on residential and commercial roofs in Jersey City, Hoboken, Bayonne, and beyond.",
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
        subtext="Get a free estimate and see your home in our next gallery update."
      />
    </>
  );
}
