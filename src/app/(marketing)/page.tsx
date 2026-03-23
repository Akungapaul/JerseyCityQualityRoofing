import type { Metadata } from "next";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABanner } from "@/components/sections/cta-banner";
import { ScrollReveal } from "@/components/sections/scroll-reveal";

export const metadata: Metadata = {
  title: "Jersey City Quality Roofing | Hudson County's Trusted Roofing Experts",
  description:
    "Professional residential and commercial roofing services across all 12 Hudson County municipalities. Licensed, insured, and locally trusted since 2003.",
  openGraph: {
    title:
      "Jersey City Quality Roofing | Hudson County's Trusted Roofing Experts",
    description:
      "Professional residential and commercial roofing services across all 12 Hudson County municipalities. Licensed, insured, and locally trusted since 2003.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <SectionWrapper tone="dominant" className="lg:py-[120px]">
        <ScrollReveal>
          <h1 className="font-heading font-medium text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] leading-[1.1] text-text-primary max-w-3xl">
            Hudson County&rsquo;s Trusted Roofing Experts
          </h1>
          <p className="text-text-secondary text-lg mt-6 max-w-2xl">
            Professional residential and commercial roofing services across all
            12 Hudson County municipalities. Licensed, insured, and locally
            trusted since 2003.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
            Our Services
          </h2>
          <p className="text-text-secondary text-lg mt-3">
            From emergency repairs to full commercial roof replacements, we
            handle every roofing need in Hudson County.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <CTABanner />

      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
            Serving All 12 Hudson County Municipalities
          </h2>
          <p className="text-text-secondary text-lg mt-3">
            Jersey City, Hoboken, Bayonne, North Bergen, Union City, West New
            York, Secaucus, Kearny, Harrison, East Newark, Guttenberg, and
            Weehawken.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
            Why Choose Us
          </h2>
          <p className="text-text-secondary text-lg mt-3">
            GAF Master Elite Contractor. CertainTeed SELECT ShingleMaster. Over
            20 years serving Hudson County homeowners and property managers.
          </p>
        </ScrollReveal>
      </SectionWrapper>
    </>
  );
}
