import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { AboutCompanyStory } from "@/components/sections/about-company-story";
import { AboutTeamSection } from "@/components/sections/about-team-section";
import { AboutCertifications } from "@/components/sections/about-certifications";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { CTABanner } from "@/components/sections/cta-banner";
import { JsonLd, buildAggregateRatingJsonLd } from "@/lib/seo/json-ld";
import { TESTIMONIALS } from "@/data/testimonials";
import { ABOUT_CONTENT } from "@/data/about-content";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us | Jersey City Quality Roofing",
  description:
    "Learn about Jersey City Quality Roofing - over 20 years serving Hudson County homeowners and businesses with expert roofing services. GAF Master Elite Contractor.",
  path: "/about",
});

export default function AboutPage() {
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

      {/* 1. Hero / Intro */}
      <SectionWrapper tone="dominant" className="lg:py-24">
        <ScrollReveal>
          <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
            About Jersey City Quality Roofing
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-3xl">
            Over {ABOUT_CONTENT.stats.yearsInBusiness} years of protecting
            Hudson County homes and businesses with expert roofing services.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      {/* 2. Company Story (wraps itself in SectionWrapper) */}
      <AboutCompanyStory />

      {/* 3. Team Section (wraps itself in SectionWrapper) */}
      <AboutTeamSection />

      {/* 4. Certifications (wraps itself in SectionWrapper) */}
      <AboutCertifications />

      {/* 5. Years in Business Callout */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <div className="text-center">
            <p className="font-heading font-bold text-[3rem] text-accent">
              {ABOUT_CONTENT.stats.yearsInBusiness}+
            </p>
            <p className="text-text-primary text-lg font-heading font-bold mt-2">
              Years Serving Hudson County
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              <div>
                <p className="font-heading font-bold text-[2rem] text-text-primary">
                  {ABOUT_CONTENT.stats.projectsCompleted}
                </p>
                <p className="text-text-secondary text-lg">
                  Projects Completed
                </p>
              </div>
              <div>
                <p className="font-heading font-bold text-[2rem] text-text-primary">
                  {ABOUT_CONTENT.stats.municipalitiesServed}
                </p>
                <p className="text-text-secondary text-lg">
                  Municipalities Served
                </p>
              </div>
              <div>
                <p className="font-heading font-bold text-[2rem] text-text-primary">
                  {ABOUT_CONTENT.stats.averageRating}
                </p>
                <p className="text-text-secondary text-lg">
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 6. Testimonials (wraps itself in SectionWrapper) */}
      <TestimonialCarousel />

      {/* 7. CTA Banner */}
      <CTABanner />
    </>
  );
}
