import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { QuoteForm } from "@/components/forms/quote-form";
import { ContactInfoColumn } from "@/components/sections/contact-info-column";
import { GoogleMapEmbed } from "@/components/sections/google-map-embed";
import { CTABanner } from "@/components/sections/cta-banner";
import { JsonLd, buildContactPageJsonLd } from "@/lib/seo/json-ld";
import { BUSINESS_INFO } from "@/data/business-info";
import { PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us | Jersey City Quality Roofing",
  description: `Get a free roofing estimate in Jersey City and Hudson County. Call ${PHONE_NUMBER} or fill out our quote request form for fast, professional service.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={
          buildContactPageJsonLd() as unknown as Record<string, unknown>
        }
      />

      {/* 1. Page Header */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
            Contact Us
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-2xl">
            Ready to protect your roof? Get in touch for a free estimate or call
            us directly. We respond to all inquiries within 24 hours.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      {/* 2. Two-column layout: form + info (D-10) */}
      <SectionWrapper tone="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* On mobile: info above form (order-1). On desktop: form left (order-1), info right (order-2) */}
          <div className="order-2 lg:order-1 [&>section]:py-0 [&>section]:bg-transparent">
            <QuoteForm />
          </div>
          <div className="order-1 lg:order-2">
            <ContactInfoColumn />
          </div>
        </div>
      </SectionWrapper>

      {/* 3. Google Map */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Find Us
          </h2>
          <GoogleMapEmbed
            query={`${BUSINESS_INFO.name}, ${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.city} ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zip}`}
            title="Map showing Jersey City Quality Roofing location"
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. CTA Banner */}
      <CTABanner />
    </>
  );
}
