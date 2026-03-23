# Architecture Research

**Domain:** Local service lead generation website (roofing) with 150+ programmatic pages
**Researched:** 2026-03-22
**Confidence:** HIGH

## System Overview

```
+-----------------------------------------------------------------------+
|                          PRESENTATION LAYER                           |
|  +-------------+  +--------------+  +-------------+  +------------+  |
|  | Layout Shell |  | Page         |  | Section     |  | UI         |  |
|  | (Header,     |  | Templates    |  | Components  |  | Primitives |  |
|  |  Footer,     |  | (Service,    |  | (Hero, CTA, |  | (Button,   |  |
|  |  Nav, CTA)   |  |  City, Blog) |  |  FAQ, etc.) |  |  Card)     |  |
|  +------+-------+  +------+-------+  +------+------+  +-----+------+  |
|         |                 |                 |               |          |
+---------+-----------------+-----------------+---------------+----------+
          |                 |                 |               |
+---------+-----------------+-----------------+---------------+----------+
|                        DATA COMPOSITION LAYER                         |
|  +------------------+  +------------------+  +-------------------+    |
|  | Content Resolver  |  | Schema Generator |  | Link Graph Engine |   |
|  | (fetches from     |  | (JSON-LD per     |  | (internal links,  |   |
|  |  data layer by    |  |  page type +     |  |  breadcrumbs,     |   |
|  |  service + city)  |  |  entity type)    |  |  related content) |   |
|  +--------+---------+  +--------+---------+  +---------+---------+   |
|           |                     |                      |              |
+-----------+---------------------+----------------------+--------------+
            |                     |                      |
+-----------+---------------------+----------------------+--------------+
|                          DATA LAYER                                   |
|  +------------------+  +------------------+  +-------------------+    |
|  | Municipality     |  | Service          |  | Content           |    |
|  | Registry         |  | Registry         |  | Templates         |    |
|  | (12 cities,      |  | (8 services,     |  | (3000+ word       |    |
|  |  landmarks,      |  |  categories,     |  |  page bodies,     |    |
|  |  housing stats,  |  |  materials,      |  |  FAQs, sections)  |    |
|  |  building codes) |  |  problems)       |  |                   |    |
|  +------------------+  +------------------+  +-------------------+    |
|                                                                       |
+-----------------------------------------------------------------------+
            |                     |                      |
+-----------+---------------------+----------------------+--------------+
|                       SEO INFRASTRUCTURE LAYER                        |
|  +------------------+  +------------------+  +-------------------+    |
|  | Metadata         |  | Sitemap          |  | robots.ts         |    |
|  | Generator        |  | Generator        |  | + canonical       |    |
|  | (generateMeta-   |  | (sitemap.ts per  |  |   URL logic       |    |
|  |  data per route) |  |  route segment)  |  |                   |    |
|  +------------------+  +------------------+  +-------------------+    |
+-----------------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Layout Shell | Persistent header, footer, nav, sticky CTAs, phone bar | `app/layout.tsx` root + route group layouts |
| Page Templates | Compose sections for each page type (service page, city hub, service-in-city) | Server Components in `app/` route segments |
| Section Components | Reusable content blocks: Hero, ServiceGrid, FAQ, Testimonials, CTA banners | `components/sections/` -- Server Components by default |
| UI Primitives | Button, Card, Input, Badge, StarRating -- design-system atoms | `components/ui/` -- Client Components only when interactive |
| Content Resolver | Reads from data layer, resolves correct content for a given service + city combo | `lib/content.ts` -- pure functions returning typed data |
| Schema Generator | Builds JSON-LD objects for LocalBusiness, Service, FAQ, Review, BreadcrumbList | `lib/schema.ts` -- type-safe builders using `schema-dts` |
| Link Graph Engine | Computes related pages, sibling services, sibling cities, breadcrumb paths | `lib/linking.ts` -- deterministic functions from registry data |
| Municipality Registry | All 12 Hudson County cities with structured local data | `data/municipalities/` -- TypeScript files per city |
| Service Registry | 8 services (4 residential, 4 commercial) with metadata, materials, problems | `data/services/` -- TypeScript files per service |
| Content Templates | Long-form page content with city-specific interpolation slots | `data/content/` -- structured content objects |
| Metadata Generator | `generateMetadata()` exports per route segment, merging layout title templates | Co-located in each `page.tsx` |
| Sitemap Generator | `sitemap.ts` files per route segment, auto-discovered by Next.js | Co-located in route segments |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx                           # Root layout: html, body, fonts, global schema
│   ├── page.tsx                             # Homepage (Jersey City anchor)
│   ├── robots.ts                            # Dynamic robots.txt generation
│   ├── sitemap.ts                           # Root sitemap index
│   │
│   ├── (marketing)/                         # Route group: shared marketing layout
│   │   ├── layout.tsx                       # Marketing layout: header, footer, sticky CTA
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx                     # About page
│   │   ├── contact/
│   │   │   └── page.tsx                     # Contact page with form + map
│   │   ├── gallery/
│   │   │   └── page.tsx                     # Portfolio/gallery page
│   │   ├── testimonials/
│   │   │   └── page.tsx                     # Reviews/testimonials page
│   │   │
│   │   ├── services/                        # SERVICE SILO ROOT
│   │   │   ├── page.tsx                     # Services index (all services overview)
│   │   │   ├── sitemap.ts                   # Sitemap for all service routes
│   │   │   │
│   │   │   ├── residential/                 # Residential category hub
│   │   │   │   ├── page.tsx                 # Residential services overview
│   │   │   │   └── [service]/               # Dynamic: roof-repair, roof-replacement, etc.
│   │   │   │       ├── page.tsx             # Service pillar page (3000+ words)
│   │   │   │       └── [city]/              # Dynamic: jersey-city, hoboken, etc.
│   │   │   │           └── page.tsx         # Service-in-city page (3000+ words)
│   │   │   │
│   │   │   └── commercial/                  # Commercial category hub
│   │   │       ├── page.tsx                 # Commercial services overview
│   │   │       └── [service]/               # Dynamic: flat-roof-systems, etc.
│   │   │           ├── page.tsx             # Service pillar page (3000+ words)
│   │   │           └── [city]/              # Dynamic: jersey-city, hoboken, etc.
│   │   │               └── page.tsx         # Service-in-city page (3000+ words)
│   │   │
│   │   ├── service-areas/                   # LOCATION SILO ROOT
│   │   │   ├── page.tsx                     # All service areas overview (county map)
│   │   │   ├── sitemap.ts                   # Sitemap for all location routes
│   │   │   └── [city]/                      # Dynamic: jersey-city, hoboken, etc.
│   │   │       └── page.tsx                 # City hub page (3000+ words)
│   │   │
│   │   ├── resources/                       # SUPPORTING CONTENT SILO
│   │   │   ├── page.tsx                     # Resources index
│   │   │   ├── cost-guides/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx             # Cost guide pages
│   │   │   ├── materials/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx             # Material deep-dives
│   │   │   └── roofing-problems/
│   │   │       └── [slug]/
│   │   │           └── page.tsx             # Problem-to-solution pages
│   │   │
│   │   └── blog/                            # BLOG SILO
│   │       ├── page.tsx                     # Blog index
│   │       ├── sitemap.ts                   # Blog sitemap
│   │       └── [slug]/
│   │           └── page.tsx                 # Blog post pages
│   │
│   └── api/                                 # API routes
│       └── contact/
│           └── route.ts                     # Form submission handler
│
├── components/
│   ├── ui/                                  # Design system primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── star-rating.tsx
│   │   └── phone-link.tsx
│   │
│   ├── sections/                            # Reusable page sections (Server Components)
│   │   ├── hero-section.tsx                 # Hero with CTA (service or city variant)
│   │   ├── service-grid.tsx                 # Grid of service cards
│   │   ├── testimonials-section.tsx         # Reviews + star ratings
│   │   ├── faq-section.tsx                  # FAQ accordion with schema
│   │   ├── service-area-map.tsx             # Hudson County map with cities
│   │   ├── trust-signals.tsx                # Certifications, insurance, guarantees
│   │   ├── cost-estimator.tsx               # Ballpark cost ranges
│   │   ├── process-steps.tsx                # Step-by-step service process
│   │   ├── related-services.tsx             # Cross-silo internal links
│   │   ├── city-context-section.tsx         # City-specific landmarks, stats
│   │   ├── emergency-banner.tsx             # Urgency CTA for emergency services
│   │   └── before-after-gallery.tsx         # Project photo gallery
│   │
│   ├── layout/                              # Structural layout components
│   │   ├── header.tsx                       # Site header with nav + phone
│   │   ├── footer.tsx                       # Footer with sitemap links
│   │   ├── navigation.tsx                   # Main nav (mega-menu with silos)
│   │   ├── breadcrumbs.tsx                  # Dynamic breadcrumbs + BreadcrumbList schema
│   │   ├── sticky-cta.tsx                   # Floating quote request button
│   │   └── phone-bar.tsx                    # Sticky phone number bar (mobile)
│   │
│   └── forms/                               # Lead capture forms (Client Components)
│       ├── quote-request-form.tsx           # Main quote request form
│       ├── contact-form.tsx                 # Contact page form
│       └── exit-intent-modal.tsx            # Exit-intent popup form
│
├── data/                                    # CONTENT DATA LAYER
│   ├── municipalities/                      # Per-city structured data
│   │   ├── index.ts                         # Registry: exports all cities, lookup functions
│   │   ├── jersey-city.ts                   # City data: landmarks, stats, housing, codes
│   │   ├── hoboken.ts
│   │   ├── bayonne.ts
│   │   ├── north-bergen.ts
│   │   ├── union-city.ts
│   │   ├── west-new-york.ts
│   │   ├── secaucus.ts
│   │   ├── kearny.ts
│   │   ├── harrison.ts
│   │   ├── east-newark.ts
│   │   ├── guttenberg.ts
│   │   └── weehawken.ts
│   │
│   ├── services/                            # Per-service structured data
│   │   ├── index.ts                         # Registry: exports all services, lookup functions
│   │   ├── residential/
│   │   │   ├── roof-repair.ts
│   │   │   ├── roof-replacement.ts
│   │   │   ├── roof-inspection.ts
│   │   │   └── emergency-roofing.ts
│   │   └── commercial/
│   │       ├── flat-roof-systems.ts
│   │       ├── roof-maintenance.ts
│   │       ├── commercial-repair.ts
│   │       └── commercial-replacement.ts
│   │
│   ├── content/                             # Long-form page content
│   │   ├── service-pages/                   # Service pillar content (per service)
│   │   ├── city-hub-pages/                  # City hub content (per city)
│   │   ├── service-in-city/                 # Service x City matrix content
│   │   │   ├── generate-content.ts          # Content generation/interpolation logic
│   │   │   └── templates/                   # Base templates with city-specific slots
│   │   ├── cost-guides/
│   │   ├── materials/
│   │   └── blog/
│   │
│   ├── testimonials.ts                      # Review data
│   ├── company.ts                           # Business info: NAP, certifications, etc.
│   └── navigation.ts                        # Nav structure, sitemap links
│
├── lib/                                     # Utility and business logic
│   ├── content.ts                           # Content resolver: service + city -> page data
│   ├── schema.ts                            # JSON-LD schema builders (type-safe)
│   ├── linking.ts                           # Internal link graph computation
│   ├── metadata.ts                          # Shared metadata generation helpers
│   ├── slugs.ts                             # Slug generation and validation
│   ├── constants.ts                         # PHONE_NUMBER, BASE_URL, NAP data
│   └── utils.ts                             # General utilities
│
├── types/                                   # Shared TypeScript types
│   ├── municipality.ts                      # Municipality, CityData, HousingStats
│   ├── service.ts                           # Service, ServiceCategory, Material
│   ├── content.ts                           # PageContent, Section, FAQ
│   ├── schema.ts                            # Schema type extensions
│   └── linking.ts                           # LinkNode, BreadcrumbItem
│
└── styles/                                  # Global styles
    └── globals.css                          # Tailwind imports, font-face, custom properties
```

### Structure Rationale

- **`app/` with route groups:** The `(marketing)` route group wraps all public-facing pages in a shared layout (header, footer, sticky CTAs) without affecting URLs. The homepage sits at `app/page.tsx` outside the group for a clean root route.

- **Service silos with `residential/` and `commercial/` physical directories:** These are NOT route groups -- they are real URL segments (`/services/residential/roof-repair`). This creates proper topical siloing in the URL structure itself, which is the primary signal search engines use to understand content hierarchy.

- **Nested dynamic segments `[service]/[city]/`:** Next.js cascading `generateStaticParams` generates all 96+ service-in-city pages. The parent `[service]` segment generates params for each service, and the child `[city]` segment generates params for each municipality using the parent's service context.

- **`data/` as TypeScript files (not JSON):** TypeScript files enable type safety, computed properties, and importing shared constants. Each municipality file exports a typed object. The registry index file provides lookup functions (`getMunicipality('jersey-city')`, `getAllSlugs()`).

- **`lib/` for cross-cutting concerns:** Content resolution, schema generation, and link graph computation are pure functions that the page components call. They have no UI -- only data transformation.

- **`types/` as shared contracts:** Every data shape is defined once and used by both the data layer and components. This prevents drift between content and templates.

## Architectural Patterns

### Pattern 1: Data-Driven Programmatic Pages

**What:** Every page in the service/city matrix is generated from the same template component, fed different data from the content resolver. The template defines sections; the data defines what fills them.

**When to use:** Any time you have N services x M cities = N*M pages that follow the same structure but need unique content.

**Trade-offs:** Requires upfront investment in the data schema and content templates, but pays off massively at scale. Adding a new city means adding one data file and regenerating. Content uniqueness depends on data quality.

**Example:**
```typescript
// app/(marketing)/services/residential/[service]/[city]/page.tsx
import { getServiceBySlug } from '@/data/services';
import { getMunicipalityBySlug } from '@/data/municipalities';
import { resolveServiceInCityContent } from '@/lib/content';
import { generateServiceInCitySchema } from '@/lib/schema';
import { getRelatedPages } from '@/lib/linking';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateStaticParams() {
  // Bottom-up: generate all service + city combinations
  const services = getAllResidentialServiceSlugs();
  const cities = getAllMunicipalitySlugs();

  return services.flatMap((service) =>
    cities.map((city) => ({ service, city }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, city } = await params;
  const serviceData = getServiceBySlug(service);
  const cityData = getMunicipalityBySlug(city);

  return {
    title: `${serviceData.name} in ${cityData.name}, NJ`,
    description: `Professional ${serviceData.name.toLowerCase()} services in ${cityData.name}. Licensed, insured roofing contractor serving ${cityData.name} homeowners.`,
    alternates: {
      canonical: `https://example.com/services/residential/${service}/${city}`,
    },
  };
}

export default async function ServiceInCityPage({ params }: PageProps) {
  const { service, city } = await params;

  const serviceData = getServiceBySlug(service);
  const cityData = getMunicipalityBySlug(city);
  const content = resolveServiceInCityContent(service, city);
  const schema = generateServiceInCitySchema(serviceData, cityData);
  const relatedPages = getRelatedPages(service, city);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <HeroSection service={serviceData} city={cityData} />
      <CityContextSection city={cityData} />
      <ServiceDetailSection content={content} />
      <ProcessSteps service={serviceData} />
      <CostEstimator service={serviceData} city={cityData} />
      <FAQSection faqs={content.faqs} />
      <TestimonialsSection city={city} />
      <RelatedServices links={relatedPages} />
    </article>
  );
}
```

### Pattern 2: Type-Safe Schema Generation

**What:** A centralized schema builder module that composes JSON-LD objects from typed data, using `schema-dts` for compile-time validation. Each page type has a dedicated builder that produces the correct schema combination.

**When to use:** Every page -- this project requires LocalBusiness, Service, FAQ, Review, and BreadcrumbList schemas on every page. Centralizing prevents schema drift.

**Trade-offs:** Adds a dependency (`schema-dts`) but eliminates an entire class of bugs (malformed schema). The builders are pure functions, easy to test.

**Example:**
```typescript
// lib/schema.ts
import type { WithContext, LocalBusiness, Service, FAQPage, BreadcrumbList } from 'schema-dts';
import { COMPANY_INFO } from '@/data/company';

export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: COMPANY_INFO.name,
    telephone: COMPANY_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: 'NJ',
      postalCode: COMPANY_INFO.address.zip,
    },
    areaServed: COMPANY_INFO.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    priceRange: '$$',
  };
}

export function generateServiceSchema(
  service: ServiceData,
  city: MunicipalityData
): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${city.name}`,
    provider: { '@type': 'RoofingContractor', name: COMPANY_INFO.name },
    areaServed: { '@type': 'City', name: city.name },
    description: service.shortDescription,
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function generateBreadcrumbSchema(
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

// Compose multiple schemas for a service-in-city page
export function generateServiceInCitySchema(
  service: ServiceData,
  city: MunicipalityData,
  faqs: FAQ[],
  breadcrumbs: BreadcrumbItem[]
): object[] {
  return [
    generateLocalBusinessSchema(),
    generateServiceSchema(service, city),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs),
  ];
}
```

### Pattern 3: Municipality Data Registry

**What:** Each municipality is a standalone TypeScript file exporting a typed object containing all city-specific data: demographics, landmarks, housing stock characteristics, local building codes, weather patterns, and neighborhood names. A central index module provides lookup functions and slug enumeration.

**When to use:** Every city hub page and every service-in-city page pulls from this registry. It is the primary mechanism for content uniqueness across location pages.

**Trade-offs:** Requires manual data curation per city (12 cities is manageable). Adding a new municipality is one file + one import. Data files are large but only loaded at build time for static generation.

**Example:**
```typescript
// types/municipality.ts
export interface MunicipalityData {
  slug: string;
  name: string;
  county: string;
  state: string;
  zip: string[];
  population: number;
  medianHomeValue: number;
  medianHomeAge: number;
  predominantArchitecture: string[];
  landmarks: string[];
  neighborhoods: string[];
  localBuildingCodes: string[];
  weatherChallenges: string[];
  commonRoofTypes: string[];
  housingStock: {
    singleFamily: number;    // percentage
    multiFamily: number;
    commercial: number;
  };
  nearbyHighways: string[];
  schoolDistrict: string;
  localContext: string;       // 2-3 sentence city description
}

// data/municipalities/jersey-city.ts
import type { MunicipalityData } from '@/types/municipality';

export const jerseyCity: MunicipalityData = {
  slug: 'jersey-city',
  name: 'Jersey City',
  county: 'Hudson',
  state: 'NJ',
  zip: ['07302', '07304', '07305', '07306', '07307', '07310'],
  population: 292449,
  medianHomeValue: 485000,
  medianHomeAge: 65,
  predominantArchitecture: ['brownstone', 'row house', 'high-rise condo', 'Victorian'],
  landmarks: ['Liberty State Park', 'Liberty Science Center', 'Journal Square',
              'Exchange Place', 'Newport Centre Mall'],
  neighborhoods: ['Downtown', 'Journal Square', 'The Heights', 'Bergen-Lafayette',
                  'Greenville', 'West Side', 'Newport'],
  localBuildingCodes: ['NJ Uniform Construction Code', 'FEMA Flood Zone compliance'],
  weatherChallenges: ['Nor\'easters', 'coastal wind exposure', 'freeze-thaw cycles',
                      'urban heat island effect'],
  commonRoofTypes: ['flat roof (multi-family)', 'asphalt shingle', 'slate (historic)'],
  housingStock: { singleFamily: 15, multiFamily: 70, commercial: 15 },
  nearbyHighways: ['NJ Turnpike', 'Route 1/9', 'Route 139'],
  schoolDistrict: 'Jersey City Public Schools',
  localContext: 'As Hudson County\'s largest city and New Jersey\'s second most populous, Jersey City\'s diverse housing stock ranges from historic brownstones in the Heights to modern high-rises along the waterfront.',
};

// data/municipalities/index.ts
import { jerseyCity } from './jersey-city';
import { hoboken } from './hoboken';
// ... all 12 cities

const municipalities: Record<string, MunicipalityData> = {
  'jersey-city': jerseyCity,
  'hoboken': hoboken,
  // ... all 12
};

export function getMunicipalityBySlug(slug: string): MunicipalityData {
  const city = municipalities[slug];
  if (!city) throw new Error(`Unknown municipality: ${slug}`);
  return city;
}

export function getAllMunicipalitySlugs(): string[] {
  return Object.keys(municipalities);
}

export function getAllMunicipalities(): MunicipalityData[] {
  return Object.values(municipalities);
}
```

### Pattern 4: Automated Internal Linking via Link Graph

**What:** A deterministic link graph engine that, given a current page's service and city context, computes all related pages: sibling services in the same city, the same service in neighboring cities, parent silo pages, and supporting content (cost guides, materials, blog posts). This powers "Related Services," "See This Service in Other Cities," breadcrumbs, and contextual inline links.

**When to use:** Every page needs internal links for both UX navigation and SEO silo reinforcement. Computing these from the data registries ensures no orphan pages and consistent cross-linking.

**Trade-offs:** The link graph is computed at build time (pure functions over static data), so there is zero runtime cost. The logic is in one place, so changing the linking strategy is a single-module change.

**Example:**
```typescript
// lib/linking.ts
import { getAllMunicipalitySlugs, getMunicipalityBySlug } from '@/data/municipalities';
import { getAllServiceSlugs, getServiceBySlug } from '@/data/services';

interface InternalLink {
  href: string;
  label: string;
  relationship: 'sibling-service' | 'sibling-city' | 'parent-silo' | 'supporting' | 'breadcrumb';
}

export function getRelatedPages(
  currentService: string,
  currentCity: string,
  category: 'residential' | 'commercial'
): InternalLink[] {
  const links: InternalLink[] = [];

  // 1. Same city, different services (sibling services)
  const allServices = getAllServiceSlugs(category);
  for (const service of allServices) {
    if (service !== currentService) {
      const serviceData = getServiceBySlug(service);
      links.push({
        href: `/services/${category}/${service}/${currentCity}`,
        label: `${serviceData.name} in ${getMunicipalityBySlug(currentCity).name}`,
        relationship: 'sibling-service',
      });
    }
  }

  // 2. Same service, different cities (sibling cities)
  const allCities = getAllMunicipalitySlugs();
  for (const city of allCities) {
    if (city !== currentCity) {
      links.push({
        href: `/services/${category}/${currentService}/${city}`,
        label: `${getServiceBySlug(currentService).name} in ${getMunicipalityBySlug(city).name}`,
        relationship: 'sibling-city',
      });
    }
  }

  // 3. Parent silo pages
  links.push({
    href: `/services/${category}/${currentService}`,
    label: getServiceBySlug(currentService).name,
    relationship: 'parent-silo',
  });
  links.push({
    href: `/service-areas/${currentCity}`,
    label: `Roofing in ${getMunicipalityBySlug(currentCity).name}`,
    relationship: 'parent-silo',
  });

  return links;
}

export function getBreadcrumbs(
  segments: Array<{ slug: string; label: string; href: string }>
): InternalLink[] {
  return [
    { href: '/', label: 'Home', relationship: 'breadcrumb' },
    ...segments.map((s) => ({
      href: s.href,
      label: s.label,
      relationship: 'breadcrumb' as const,
    })),
  ];
}
```

### Pattern 5: Cascading generateStaticParams for the Service Matrix

**What:** The nested `[service]/[city]/` dynamic segments use Next.js's parent-to-child param cascading. The parent `[service]` segment generates all service slugs, and the child `[city]` segment receives the parent's service param and generates all city slugs for it.

**When to use:** This specific pattern is for the 96+ service-in-city pages. The alternative (flat bottom-up generation) also works, but cascading is cleaner for this two-level nesting.

**Trade-offs:** With 8 services x 12 cities = 96 pages, the build generates quickly (under 150 pages is well within Next.js/Vercel comfort zone). No need for ISR or partial generation at this scale.

**Example:**
```typescript
// Option A: Bottom-up (simpler, recommended for this scale)
// app/(marketing)/services/residential/[service]/[city]/page.tsx
export async function generateStaticParams() {
  const services = getAllResidentialServiceSlugs();  // 4 slugs
  const cities = getAllMunicipalitySlugs();           // 12 slugs

  return services.flatMap((service) =>
    cities.map((city) => ({ service, city }))
  );
  // Returns 48 param objects for residential
}

// Option B: Top-down cascading (more explicit, better for conditional generation)
// app/(marketing)/services/residential/[service]/layout.tsx
export async function generateStaticParams() {
  return getAllResidentialServiceSlugs().map((service) => ({ service }));
}

// app/(marketing)/services/residential/[service]/[city]/page.tsx
export async function generateStaticParams({
  params: { service },
}: {
  params: { service: string };
}) {
  // Could conditionally generate different cities per service
  return getAllMunicipalitySlugs().map((city) => ({ city }));
}
```

## Data Flow

### Build-Time Static Generation Flow

```
generateStaticParams()
    |
    v
For each { service, city } param:
    |
    +---> generateMetadata({ params })
    |         |
    |         +---> getServiceBySlug(service)     [data/services/]
    |         +---> getMunicipalityBySlug(city)    [data/municipalities/]
    |         +---> return Metadata object
    |
    +---> Page Component({ params })
              |
              +---> resolveServiceInCityContent(service, city)    [lib/content.ts]
              |         |
              |         +---> reads from data/content/service-in-city/
              |         +---> interpolates city-specific data from municipality registry
              |         +---> returns fully resolved PageContent
              |
              +---> generateServiceInCitySchema(serviceData, cityData)  [lib/schema.ts]
              |         |
              |         +---> composes LocalBusiness + Service + FAQ + BreadcrumbList
              |         +---> returns JSON-LD array
              |
              +---> getRelatedPages(service, city)                [lib/linking.ts]
              |         |
              |         +---> computes sibling services, sibling cities, parent silos
              |         +---> returns InternalLink[]
              |
              +---> renders Server Component tree
                        |
                        +---> HeroSection (service + city data)
                        +---> CityContextSection (landmarks, stats)
                        +---> ServiceDetailSection (long-form content)
                        +---> FAQSection (city-specific FAQs)
                        +---> RelatedServices (computed internal links)
                        +---> <script type="application/ld+json"> (schema)
```

### User Request Flow (Production)

```
User requests /services/residential/roof-repair/jersey-city
    |
    v
Vercel CDN serves pre-built static HTML (no server computation)
    |
    v
Browser hydrates minimal client components:
    +---> sticky-cta.tsx (floating quote button)
    +---> phone-bar.tsx (mobile sticky phone)
    +---> exit-intent-modal.tsx (tracks mouse leave)
    +---> quote-request-form.tsx (form state + submission)
    |
    v
Form submission:
    +---> POST /api/contact (Server Action or Route Handler)
    +---> Validates input
    +---> Sends to email service / CRM webhook
    +---> Returns success/error response
```

### Sitemap Generation Flow

```
Next.js build discovers sitemap.ts files:
    |
    +---> app/sitemap.ts (root index)
    |         |
    |         +---> Links to: /services/sitemap.xml, /service-areas/sitemap.xml, etc.
    |
    +---> app/(marketing)/services/sitemap.ts
    |         |
    |         +---> Enumerates all: /services, /services/residential,
    |         |     /services/residential/[service], /services/residential/[service]/[city]
    |         +---> Generates 100+ URLs with lastModified, priority, changefreq
    |
    +---> app/(marketing)/service-areas/sitemap.ts
    |         |
    |         +---> Enumerates: /service-areas, /service-areas/[city]
    |         +---> 13 URLs (index + 12 cities)
    |
    +---> app/(marketing)/blog/sitemap.ts
              |
              +---> Enumerates all blog posts
```

### Key Data Flows

1. **Content Resolution:** `params -> data registries -> content resolver -> resolved page content -> section components` -- all at build time, zero runtime cost.
2. **Schema Generation:** `resolved content -> schema builders -> JSON-LD array -> script tag in HTML` -- type-checked at compile time, validated by Rich Results Test.
3. **Internal Linking:** `current page context -> link graph engine -> InternalLink[] -> Link components` -- deterministic, testable, ensures zero orphan pages.
4. **Lead Capture:** `user fills form -> client component state -> POST /api/contact -> server validates -> forwards to email/CRM -> response to user` -- only runtime server interaction.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 150 pages (current) | Full static generation at build time. Build completes in under 2 minutes on Vercel. No ISR needed. Every page is a CDN-served static HTML file. |
| 300-500 pages (adding neighborhoods, more services) | Still fine with full SSG. May want to split sitemaps using `generateSitemaps()` if approaching 200+ URLs per sitemap for cleaner crawl management. |
| 1000+ pages (multi-county expansion) | Consider partial static generation: generate top-priority pages at build time, use `dynamicParams: true` with ISR for long-tail pages. Add `generateSitemaps()` to split into multiple sitemap files. |
| 5000+ pages (state-wide) | Move to on-demand ISR with empty `generateStaticParams` returning `[]`. Pages generate on first visit and cache. Database or CMS replaces file-based data layer. Build stays fast regardless of page count. |

### Scaling Priorities

1. **First bottleneck (unlikely at 150 pages):** Build time. At 150 pages with 3000+ words each, build time may reach 3-5 minutes. Mitigation: Vercel handles this fine. Pages are static HTML, so build is a one-time cost per deploy.
2. **Second bottleneck (if expanding):** Data layer complexity. If municipalities grow beyond 20-30, managing individual TypeScript files becomes cumbersome. Mitigation: Move to a structured JSON/YAML format with a build-time validation script, or adopt a headless CMS.

## Anti-Patterns

### Anti-Pattern 1: Identical Content with City Name Swapped

**What people do:** Use the exact same 3000-word body content for every service-in-city page, only changing the city name. "Roof repair in [CITY]" repeated across 12 pages.
**Why it's wrong:** Google detects thin/duplicate content and penalizes or deindexes these pages. This is the single most common failure mode of local service programmatic SEO.
**Do this instead:** Each municipality data file contains unique local context (landmarks, housing stock, building codes, weather challenges). The content templates use these data points to produce genuinely unique paragraphs. The FAQ section contains city-specific questions. The cost estimator shows city-specific pricing context.

### Anti-Pattern 2: Client Components for Everything

**What people do:** Add `"use client"` to page-level components because they contain one interactive element.
**Why it's wrong:** Sends the entire component tree (including 3000 words of content) as JavaScript to the client. Destroys Core Web Vitals (LCP, FID). Defeats the purpose of Server Components.
**Do this instead:** Keep page-level components as Server Components. Extract interactive elements (forms, sticky CTAs, exit-intent modals) into small client component islands. Pass data down as props. The article content, FAQ, schema, and section layout all render on the server.

### Anti-Pattern 3: Flat URL Structure Without Silos

**What people do:** Put all pages at the root level: `/roof-repair-jersey-city`, `/flat-roof-hoboken`, `/about`.
**Why it's wrong:** Search engines cannot infer content hierarchy or topical relationships from flat URLs. Internal link equity distributes randomly instead of flowing through silo pillars.
**Do this instead:** Use hierarchical URLs that mirror the content silo structure: `/services/residential/roof-repair/jersey-city`. The URL itself communicates: this is a residential service, specifically roof repair, specifically in Jersey City.

### Anti-Pattern 4: Schema Markup Inline in Every Page

**What people do:** Write JSON-LD objects directly in each `page.tsx` file, copying and pasting between pages.
**Why it's wrong:** Schema drift between pages, inconsistent NAP data, missing required fields on some pages, and maintenance nightmare at 150+ pages.
**Do this instead:** Centralize schema generation in `lib/schema.ts` with typed builder functions. Each page calls the builder with its data. Changes to business info or schema structure happen in one place.

### Anti-Pattern 5: Using a CMS or Database for Static Content at This Scale

**What people do:** Set up Contentful, Sanity, or a Postgres database to manage 12 municipality records and 8 service definitions.
**Why it's wrong:** Adds runtime dependency, deployment complexity, API latency, and a billing relationship for content that changes once a quarter. At 150 pages with known, structured data, this is over-engineering.
**Do this instead:** TypeScript files in `data/` provide type safety, zero-latency access at build time, version control with git, and no external dependencies. Graduate to a CMS only if content volume exceeds what developers can manage in code (500+ pages or non-developer content editors).

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Email/CRM (form submissions) | API Route (`/api/contact`) -> external webhook (e.g., Resend, SendGrid, or Zapier) | Server-side only. Never expose API keys to client. Validate + sanitize all inputs. |
| Google Maps (contact page embed) | `<iframe>` embed with API key restricted to domain | Use `loading="lazy"` to avoid LCP impact. Static embed, no interactive SDK needed. |
| Google Business Profile | NAP data consistency ensured via `data/company.ts` constant | Not a runtime integration -- alignment is at content level. |
| Analytics (Google Analytics / Vercel Analytics) | Script tag in root layout or Vercel Analytics auto-install | Use `next/script` with `strategy="afterInteractive"` for GA. Vercel Analytics has zero config. |
| Rich Results Test | Validation tool, not runtime integration | Run after deploy on sample pages to verify schema correctness. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Data Layer -> Content Resolver | Direct import (TypeScript) | Content resolver imports municipality/service registries. No API boundary -- same build. |
| Content Resolver -> Page Components | Function call returning typed objects | Pages call `resolveServiceInCityContent()` which returns `PageContent` type. |
| Page Components -> Schema Generator | Function call returning JSON-LD objects | Pages call `generateServiceInCitySchema()` and inject the result. |
| Page Components -> Link Graph | Function call returning `InternalLink[]` | Pages call `getRelatedPages()` and render links in section components. |
| Client Components -> API Routes | HTTP POST from `<form>` action | Forms use React 19 Server Actions or fetch to `/api/contact`. Only runtime boundary. |

## Build Order (Dependency Graph)

The following build order reflects true technical dependencies. Each item depends on the items above it.

```
Phase 1: Foundation (no dependencies)
    ├── types/           # Type definitions first -- everything depends on these
    ├── data/company.ts  # Business constants (NAP, phone)
    └── lib/constants.ts # BASE_URL, etc.

Phase 2: Data Layer (depends on types)
    ├── data/municipalities/   # Each city file implements MunicipalityData type
    ├── data/services/         # Each service file implements ServiceData type
    └── data/navigation.ts     # Navigation structure

Phase 3: Business Logic (depends on data layer)
    ├── lib/content.ts    # Content resolver (imports registries)
    ├── lib/schema.ts     # Schema generators (imports registries + company)
    ├── lib/linking.ts    # Link graph engine (imports registries)
    ├── lib/metadata.ts   # Metadata helpers (imports registries)
    └── lib/slugs.ts      # Slug utilities

Phase 4: UI Foundation (depends on types, parallel with Phase 2-3)
    ├── styles/globals.css      # Tailwind + fonts
    ├── components/ui/          # Design system primitives
    └── components/layout/      # Header, footer, nav, breadcrumbs

Phase 5: Section Components (depends on UI foundation + types)
    └── components/sections/    # All reusable page sections

Phase 6: Page Templates (depends on everything above)
    ├── app/layout.tsx                              # Root layout
    ├── app/(marketing)/layout.tsx                  # Marketing layout
    ├── app/page.tsx                                # Homepage
    ├── Static pages (about, contact, gallery)      # Simple pages
    ├── Service pillar pages ([service]/page.tsx)    # Service pages
    ├── City hub pages ([city]/page.tsx)             # City pages
    └── Service-in-city pages ([service]/[city]/)    # Matrix pages (96+)

Phase 7: SEO Infrastructure (depends on data layer + page templates)
    ├── app/robots.ts
    ├── app/sitemap.ts
    ├── Segment-level sitemap.ts files
    └── Schema validation

Phase 8: Content Population (depends on content templates)
    ├── data/content/service-pages/          # 3000+ word service content
    ├── data/content/city-hub-pages/         # 3000+ word city content
    ├── data/content/service-in-city/        # 3000+ word matrix content
    └── data/testimonials.ts                 # Review data

Phase 9: Interactive Features (depends on UI foundation)
    ├── components/forms/                    # Lead capture forms
    ├── components/layout/sticky-cta.tsx     # Floating CTA
    ├── app/api/contact/route.ts             # Form handler
    └── Exit-intent, urgency elements
```

## Sources

- [Next.js generateStaticParams API Reference (v16.2.1)](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- Official documentation, verified 2026-03-20. **HIGH confidence.**
- [Next.js JSON-LD Guide (v16.2.1)](https://nextjs.org/docs/app/guides/json-ld) -- Official recommended pattern for structured data. **HIGH confidence.**
- [Next.js generateSitemaps API Reference (v16.2.1)](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) -- Official documentation for multi-sitemap generation. **HIGH confidence.**
- [Next.js generateMetadata API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- Official metadata merging behavior. **HIGH confidence.**
- [schema-dts npm package](https://www.npmjs.com/package/schema-dts) -- Google-maintained TypeScript types for Schema.org. 100k+ weekly downloads. **HIGH confidence.**
- [Vercel ISR Documentation](https://vercel.com/docs/incremental-static-regeneration) -- ISR patterns for scaling beyond full SSG. **HIGH confidence.**
- [How I built a Next.js app with 1,500+ localized routes](https://dev.to/hunterx13/how-i-built-a-nextjs-app-with-1500-localized-routes-and-perfect-technical-seo-3g5l) -- Real-world case study at scale. **MEDIUM confidence** (limited implementation details disclosed).
- [Next.js App Router Patterns That Actually Matter in 2026](https://dev.to/teguh_coding/nextjs-app-router-the-patterns-that-actually-matter-in-2026-146) -- Community patterns and anti-patterns. **MEDIUM confidence.**
- [Programmatic SEO Internal Linking Strategies](https://seomatic.ai/blog/programmatic-seo-internal-linking) -- Internal linking patterns for programmatic SEO. **MEDIUM confidence.**
- [Handling Large-Scale Static Generation with generateStaticParams](https://github.com/vercel/next.js/discussions/58006) -- Community discussion on limits at 1500+ pages. **LOW confidence** (single report, may be outdated).
- [Vercel Build Time Optimization](https://vercel.com/kb/guide/how-do-i-reduce-my-build-time-with-next-js-on-vercel) -- Strategies for reducing build time. **HIGH confidence.**

---
*Architecture research for: Jersey City Quality Roofing -- Local service lead generation with 150+ programmatic pages*
*Researched: 2026-03-22*
