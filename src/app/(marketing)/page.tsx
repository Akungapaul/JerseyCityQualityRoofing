import type { Metadata } from "next";
import Link from "next/link";
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

const homeDescription =
  "Roofer in Jersey City, NJ for roof repair, roof replacement, inspections, emergency leaks, and commercial roofing across Hudson County.";

const PRIORITY_SERVICE_LINKS = [
  {
    href: "/services/residential/roof-replacement/jersey-city",
    label: "Roof Replacement in Jersey City, NJ",
    description:
      "Full tear-offs, flat-roof membranes, and shingle replacements for Jersey City homes.",
  },
  {
    href: "/services/residential/roof-repair/jersey-city",
    label: "Roof Repair in Jersey City, NJ",
    description:
      "Leak tracing, storm damage repair, flashing fixes, and brownstone parapet repairs.",
  },
  {
    href: "/services/commercial/commercial-replacement/jersey-city",
    label: "Commercial Roof Replacement",
    description:
      "Commercial membrane replacement for Jersey City apartments, storefronts, and mixed-use buildings.",
  },
  {
    href: "/services/commercial/flat-roof-systems",
    label: "Commercial Flat Roof Systems",
    description:
      "TPO, EPDM, modified bitumen, drainage, and maintenance options for flat roofs.",
  },
  {
    href: "/service-areas/jersey-city",
    label: "Jersey City Service Area",
    description:
      "Neighborhood-specific roofing guidance for Downtown, The Heights, Journal Square, and more.",
  },
];

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

      {/* 5. Priority GSC opportunity links */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <div className="max-w-3xl mb-8">
            <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-3">
              Jersey City Roofing Services People Are Searching For
            </h2>
            <p className="text-text-secondary text-lg">
              Quick paths to the roof replacement, roof repair, inspection, and
              commercial roofing pages that match current Jersey City search
              demand.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRIORITY_SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-lg bg-secondary p-5 transition-colors duration-[150ms] hover:bg-[#4a5040]"
              >
                <span className="font-heading text-lg font-bold text-text-primary group-hover:text-accent">
                  {link.label}
                </span>
                <span className="mt-2 block text-lg text-text-secondary">
                  {link.description}
                </span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Why Choose Us */}
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
