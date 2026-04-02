import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Hammer,
  RefreshCw,
  Search,
  Siren,
  Layers,
  Wrench,
  Building2,
  HardHat,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildCollectionPageJsonLd,
  buildRoofingContractorJsonLd,
} from '@/lib/seo/json-ld';
import { getServicesByCategory } from '@/data/services';
import { GuideHero } from '@/components/sections/guide-hero';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';
import { CTABanner } from '@/components/sections/cta-banner';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'roof-repair': Hammer,
  'roof-replacement': RefreshCw,
  'roof-inspection': Search,
  'emergency-roofing': Siren,
  'flat-roof-systems': Layers,
  'roof-maintenance': Wrench,
  'commercial-repair': Building2,
  'commercial-replacement': HardHat,
};

export const metadata: Metadata = generatePageMetadata({
  title: 'Our Roofing Services | Jersey City Quality Roofing',
  description:
    'Complete residential and commercial roofing solutions for every property in Hudson County. Expert roof repair, replacement, inspection, emergency services, flat roof systems, and maintenance programs.',
  path: '/services',
});

export default function ServicesPage() {
  const residential = getServicesByCategory('residential');
  const commercial = getServicesByCategory('commercial');

  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Our Roofing Services',
            description:
              'Complete residential and commercial roofing solutions for every property in Hudson County.',
            path: '/services',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      {/* 1. Hero (dominant) */}
      <GuideHero
        headline="Our Roofing Services"
        subtitle="Complete residential and commercial roofing solutions for every property in Hudson County."
        categoryBadgeLabel="ALL SERVICES"
      />

      {/* 2. Intro prose (dominant) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Whether you own a single-family home in the Heights or manage a commercial property along the waterfront, our team delivers the roofing expertise your building demands. We have organized our services into two distinct categories to help you find exactly what you need.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Our residential services cover everything homeowners face &mdash; from emergency leak repairs after a nor&apos;easter to complete roof replacements with premium materials. Our commercial division specializes in flat roof systems, preventative maintenance programs, and large-scale commercial projects that require specialized techniques and materials.
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Residential block (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Residential Roofing Services
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {residential.map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.slug] ?? Hammer;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.category}/${service.slug}`}
                  className="group bg-dominant rounded-lg p-5 flex flex-col gap-3 hover:bg-[#4a5040] transition-colors duration-[150ms]"
                >
                  <ServiceIcon
                    size={24}
                    className="text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-heading font-bold text-lg text-text-primary">
                    {service.name}
                  </span>
                  <span className="text-text-secondary text-lg line-clamp-2">
                    {service.shortDescription.split('.')[0]}.
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-accent mt-auto group-hover:translate-x-1 transition-transform duration-[150ms]"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 4. Commercial block (dominant) */}
      <SectionWrapper tone="dominant">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
            Commercial Roofing Services
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {commercial.map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.slug] ?? Building2;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.category}/${service.slug}`}
                  className="group bg-secondary rounded-lg p-5 flex flex-col gap-3 hover:bg-[#4a5040] transition-colors duration-[150ms]"
                >
                  <ServiceIcon
                    size={24}
                    className="text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-heading font-bold text-lg text-text-primary">
                    {service.name}
                  </span>
                  <span className="text-text-secondary text-lg line-clamp-2">
                    {service.shortDescription.split('.')[0]}.
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-accent mt-auto group-hover:translate-x-1 transition-transform duration-[150ms]"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* 5. Category CTAs (secondary) */}
      <SectionWrapper tone="secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/services/residential"
            className="group bg-dominant rounded-lg p-6 border-l-4 border-transparent hover:border-accent hover:bg-[#4a5040] transition-all duration-[150ms]"
          >
            <span className="font-heading font-bold text-lg text-text-primary">
              View All Residential Services
            </span>
            <ArrowRight
              size={16}
              className="text-accent mt-2 group-hover:translate-x-1 transition-transform duration-[150ms]"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/services/commercial"
            className="group bg-dominant rounded-lg p-6 border-l-4 border-transparent hover:border-accent hover:bg-[#4a5040] transition-all duration-[150ms]"
          >
            <span className="font-heading font-bold text-lg text-text-primary">
              View All Commercial Services
            </span>
            <ArrowRight
              size={16}
              className="text-accent mt-2 group-hover:translate-x-1 transition-transform duration-[150ms]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </SectionWrapper>

      {/* 6. CTA Banner */}
      <CTABanner />
    </>
  );
}
