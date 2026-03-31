import type { Metadata } from 'next';
import Link from 'next/link';
import {
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
  buildBreadcrumbJsonLd,
} from '@/lib/seo/json-ld';
import { BASE_URL } from '@/lib/constants';
import { getServicesByCategory } from '@/data/services';
import { GuideHero } from '@/components/sections/guide-hero';
import { SectionWrapper } from '@/components/sections/section-wrapper';
import { ScrollReveal } from '@/components/sections/scroll-reveal';
import { CTABanner } from '@/components/sections/cta-banner';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'flat-roof-systems': Layers,
  'roof-maintenance': Wrench,
  'commercial-repair': Building2,
  'commercial-replacement': HardHat,
};

export const metadata: Metadata = generatePageMetadata({
  title: 'Commercial Roofing Services | Jersey City Quality Roofing',
  description:
    'Flat roof systems, maintenance programs, and full-service repair and replacement for commercial properties across Hudson County.',
  path: '/services/commercial',
});

export default function CommercialServicesPage() {
  const services = getServicesByCategory('commercial');

  return (
    <>
      {/* JSON-LD: CollectionPage + RoofingContractor + Breadcrumb */}
      <JsonLd
        data={
          buildCollectionPageJsonLd({
            name: 'Commercial Roofing Services',
            description:
              'Flat roof systems, maintenance programs, and full-service repair and replacement for commercial properties across Hudson County.',
            path: '/services/commercial',
          }) as unknown as Record<string, unknown>
        }
      />
      <JsonLd
        data={buildRoofingContractorJsonLd() as unknown as Record<string, unknown>}
      />
      <JsonLd
        data={
          buildBreadcrumbJsonLd([
            { name: 'Home', url: BASE_URL },
            { name: 'Services', url: `${BASE_URL}/services` },
            { name: 'Commercial Services', url: `${BASE_URL}/services/commercial` },
          ]) as unknown as Record<string, unknown>
        }
      />

      {/* 1. Hero (dominant) */}
      <GuideHero
        headline="Commercial Roofing Services"
        subtitle="Flat roof systems, maintenance programs, and full-service repair and replacement for commercial properties across Hudson County."
        categoryBadgeLabel="COMMERCIAL"
      />

      {/* 2. Intro prose (dominant) */}
      <SectionWrapper tone="dominant">
        <div className="max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            Commercial roofing demands a fundamentally different approach from residential work. Flat and low-slope roof systems, larger surface areas, occupied tenant spaces below, and strict building code requirements mean every commercial project requires specialized knowledge and equipment.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            Our commercial division serves property managers, building owners, and facility directors across Hudson County. From TPO and EPDM membrane installations on warehouses in Kearny to preventative maintenance programs for office complexes along the waterfront, we bring the technical expertise that commercial roofs demand.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mt-4">
            We understand that commercial roof work often needs to happen around business operations. Our team coordinates project timing, manages tenant communication, and minimizes disruption &mdash; because your building does not stop working just because the roof needs attention.
          </p>
        </div>
      </SectionWrapper>

      {/* 3. Service cards (secondary) */}
      <SectionWrapper tone="secondary">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service) => {
              const ServiceIcon = SERVICE_ICONS[service.slug] ?? Building2;
              return (
                <Link
                  key={service.slug}
                  href={`/services/commercial/${service.slug}`}
                  className="group bg-dominant rounded-lg p-6 flex flex-col gap-3 hover:bg-[#4a5040] transition-colors duration-[150ms]"
                >
                  <ServiceIcon
                    size={24}
                    className="text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-heading font-bold text-[1.75rem] text-text-primary">
                    {service.name}
                  </span>
                  <p className="text-text-secondary text-lg">
                    {service.shortDescription}
                  </p>
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

      {/* 4. CTA Banner */}
      <CTABanner
        heading="Protect Your Commercial Investment"
        subtext="Our commercial roofing team serves property managers and building owners across Hudson County. Call now or request a free assessment."
      />
    </>
  );
}
