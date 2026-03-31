import type { RoofingContractor, WithContext, BreadcrumbList, FAQPage, Service as ServiceSchema, BlogPosting, CollectionPage } from 'schema-dts';
import { BUSINESS_INFO } from '@/data/business-info';
import { BASE_URL } from '@/lib/constants';
import type { Testimonial, Service as ServiceData, Municipality } from '@/data/types';

export function buildRoofingContractorJsonLd(): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${BASE_URL}/#organization`,
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: 'US',
    },
    url: BASE_URL,
    areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Note: Google does not display review stars for self-hosted LocalBusiness reviews.
// Schema still valuable for Bing, AI search, and semantic web.
export function buildAggregateRatingJsonLd(
  testimonials: readonly Testimonial[]
): WithContext<RoofingContractor> {
  const ratingSum = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const ratingValue = (ratingSum / testimonials.length).toFixed(1);

  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: BUSINESS_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount: String(testimonials.length) as unknown as number,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function buildFaqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
  };
}

export function buildContactPageJsonLd(): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    url: BASE_URL,
    image: `${BASE_URL}/og-image.png`,
    priceRange: '$$',
    paymentAccepted: 'Cash, Check, Credit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
      '@type': 'City' as const,
      name: area,
    })),
  };
}

export function buildServicePageJsonLd(
  service: ServiceData,
  canonicalUrl: string
): WithContext<ServiceSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.fullDescription,
    serviceType: service.name,
    url: canonicalUrl,
    provider: {
      '@type': 'RoofingContractor',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS_INFO.address.street,
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.zip,
        addressCountry: 'US',
      },
    },
    areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
      '@type': 'City' as const,
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription,
        },
      }],
    },
  };
}

export function buildCityRoofingContractorJsonLd(
  city: Municipality,
  services: ServiceData[]
): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${BASE_URL}/#organization`,
    name: BUSINESS_INFO.name,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    url: BASE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `${BASE_URL}/service-areas/${city.slug}#city`,
    },
    knowsAbout: [
      `Roofing services in ${city.name}`,
      ...city.commonRoofTypes,
      ...city.architectureStyles.slice(0, 3).map((s: string) => `${s} roof repair`),
    ],
    makesOffer: services.map((s) => ({
      '@type': 'Offer' as const,
      itemOffered: {
        '@type': 'Service' as const,
        '@id': `${BASE_URL}/services/${s.category}/${s.slug}#service`,
        name: s.name,
        description: s.shortDescription,
        areaServed: {
          '@type': 'City' as const,
          name: city.name,
        },
      },
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
  } as WithContext<RoofingContractor>;
}

export function buildServiceInCityJsonLd(
  service: ServiceData,
  city: Municipality,
  canonicalUrl: string
): WithContext<ServiceSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: `${service.name} in ${city.name}`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, NJ. ${service.shortDescription}`,
    serviceType: service.name,
    url: canonicalUrl,
    areaServed: {
      '@type': 'City',
      name: city.name,
      '@id': `${BASE_URL}/service-areas/${city.slug}#city`,
    },
    provider: {
      '@type': 'RoofingContractor',
      '@id': `${BASE_URL}/#organization`,
      name: BUSINESS_INFO.name,
    },
  };
}

export function buildBlogPostingJsonLd(article: {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  updatedDate: string | null;
  authorName: string;
  siloService: string | null;
  wordCount: number;
  basePath?: string; // defaults to '/blog'
  schemaType?: 'BlogPosting' | 'Article'; // defaults to 'BlogPosting'
}): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': article.schemaType ?? 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    dateModified: article.updatedDate ?? article.publishDate,
    author: {
      '@type': 'Person',
      name: article.authorName,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: BASE_URL,
    },
    url: `${BASE_URL}${article.basePath ?? '/blog'}/${article.slug}`,
    wordCount: article.wordCount,
    articleSection: article.siloService ?? 'Roofing',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${article.basePath ?? '/blog'}/${article.slug}`,
    },
  } as unknown as WithContext<BlogPosting>;
}

export function buildCollectionPageJsonLd(hub: {
  name: string;
  description: string;
  path: string;
}): WithContext<CollectionPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.name,
    description: hub.description,
    url: `${BASE_URL}${hub.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: BUSINESS_INFO.name,
      url: BASE_URL,
    },
  } as unknown as WithContext<CollectionPage>;
}

// XSS-safe JSON-LD renderer component
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
