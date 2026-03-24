import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { CompactQuoteForm } from "@/components/forms/compact-quote-form";
import { BadgeStrip } from "@/components/sections/badge-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ServiceAreasOverview } from "@/components/sections/service-areas-overview";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { QuoteForm } from "@/components/forms/quote-form";
import { CTABanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import {
  JsonLd,
  buildAggregateRatingJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/seo/json-ld";
import { TESTIMONIALS } from "@/data/testimonials";
import { HOMEPAGE_FAQS } from "@/data/homepage-faq";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Jersey City Quality Roofing | Hudson County's Trusted Roofing Experts",
  description:
    "Professional residential and commercial roofing services across all 12 Hudson County municipalities. Licensed, insured, and locally trusted since 2003.",
  alternates: {
    canonical: BASE_URL,
  },
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
      <JsonLd
        data={
          buildAggregateRatingJsonLd(TESTIMONIALS) as unknown as Record<
            string,
            unknown
          >
        }
      />
      <JsonLd
        data={
          buildFaqPageJsonLd([...HOMEPAGE_FAQS]) as unknown as Record<
            string,
            unknown
          >
        }
      />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Compact Quote Form (wraps itself in SectionWrapper) */}
      <CompactQuoteForm />

      {/* 3. Badge Strip */}
      <BadgeStrip />

      {/* 4. Services Grid */}
      <ServicesGrid />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Testimonials (wraps itself in SectionWrapper) */}
      <TestimonialCarousel />

      {/* 7. Service Areas Overview */}
      <ServiceAreasOverview />

      {/* 8. FAQ Section */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={HOMEPAGE_FAQS} defaultOpenIndex={0} />
        </ScrollReveal>
      </SectionWrapper>

      {/* 9. Full Quote Form (wraps itself in SectionWrapper) */}
      <QuoteForm />

      {/* 10. CTA Banner */}
      <CTABanner />
    </>
  );
}
