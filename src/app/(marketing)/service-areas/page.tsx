import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { GoogleMapEmbed } from "@/components/sections/google-map-embed";
import { CityCardGrid } from "@/components/sections/city-card-grid";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = generatePageMetadata({
  title: "Service Areas | Jersey City Quality Roofing",
  description:
    "Jersey City Quality Roofing serves all 12 Hudson County municipalities including Jersey City, Hoboken, Bayonne, North Bergen, Union City, and more.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      {/* 1. Page Header */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
            Service Areas
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-3xl">
            Proudly Serving All 12 Hudson County Municipalities
          </p>
          <p className="text-text-secondary text-lg mt-3 max-w-3xl">
            From the brownstone-lined streets of Jersey City to the waterfront
            condos of Weehawken, we provide expert residential and commercial
            roofing services to every community in Hudson County.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      {/* 2. Google Map (D-16) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Hudson County Coverage Map
          </h2>
          <GoogleMapEmbed
            query="Hudson County, New Jersey"
            title="Map showing Hudson County service coverage area"
            zoom={11}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 3. Tiered City Card Grid (wraps itself in SectionWrapper, D-14) */}
      <CityCardGrid />

      {/* 4. CTA Banner */}
      <CTABanner />
    </>
  );
}
