import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { CompactQuoteForm } from "@/components/forms/compact-quote-form";
import { BadgeStrip } from "@/components/sections/badge-strip";
import { HomeServicesStructure } from "@/components/sections/home-services-structure";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { QuoteForm } from "@/components/forms/quote-form";
import { CTABanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { JsonLd, buildFaqPageJsonLd } from "@/lib/seo/json-ld";
import { HOMEPAGE_FAQS } from "@/data/homepage-faq";
import { BASE_URL } from "@/lib/constants";

const homeDescription =
  "Roofer in Jersey City, NJ for roof repair, roof replacement, inspections, emergency leaks, and commercial roofing across Hudson County.";

export const metadata: Metadata = {
  title: "Roofer in Jersey City, NJ",
  description: homeDescription,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Roofer in Jersey City, NJ | Jersey City Quality Roofing",
    description: homeDescription,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* CRO Phase 4 (2026-11-06, audit 4.2): the AggregateRating JSON-LD
          was removed deliberately -- it was computed from the site's own
          testimonial file with no verified external review source. It
          stays out until Paul supplies that source. */}
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

      {/* 4-5. Services structure (Toms River treatment, 2026-11-10):
          replaces both the generic ServicesGrid and the former
          "Priority GSC opportunity links" section. The family
          structure covers every link those sections carried: repair,
          replacement, inspection, maintenance, emergency, flat roof
          systems, the replacement cost guide, both commercial
          services, and the two hubs. */}
      <HomeServicesStructure />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Testimonials (wraps itself in SectionWrapper) */}
      <TestimonialCarousel />

      {/* 7. Service Areas Overview — removed 2026-11-06 (single-city
          restructure): the section linked to the 12 retired city hub
          pages; the homepage itself is the Jersey City hub now. */}

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
