# Phase 1: Project Scaffold & Data Architecture - Research

**Researched:** 2026-03-23
**Domain:** Next.js 16 project scaffolding, App Router routing, TypeScript data registries, SEO metadata infrastructure
**Confidence:** HIGH

## Summary

Phase 1 is a greenfield scaffold of a Next.js 16 App Router project with TypeScript strict mode, Tailwind CSS 4, siloed URL routing with nested dynamic segments, type-safe data registries for 12 municipalities and 8 roofing services, and SEO metadata/sitemap/robots infrastructure. No UI rendering, no design system, no forms -- purely the structural foundation that all 9 subsequent phases build upon.

The technical landscape is well-documented and stable. Next.js 16.2.1 (latest stable, March 2026) ships with Turbopack as the default bundler, `params` as a Promise (async patterns required), and the `PageProps<'/route'>` helper for strongly-typed route params. Tailwind CSS 4.2.2 uses CSS-first configuration via `@import "tailwindcss"` with the `@tailwindcss/postcss` plugin -- no more `tailwind.config.js`. The `create-next-app` CLI with `--yes` flag gives a turnkey setup with TypeScript, Tailwind, App Router, and ESLint enabled by default.

**Primary recommendation:** Use `pnpm create next-app@latest . --yes` to scaffold, then customize: add `src/` directory, create the `(marketing)` route group, build data registries as TypeScript files with `satisfies` operator for type safety, and wire up centralized SEO helpers that every future page imports.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Short action-based service slugs: `roof-repair`, `roof-replacement`, `roof-inspection`, `emergency-roofing`, `flat-roof-systems`, `roof-maintenance`, `commercial-repair`, `commercial-replacement`
- **D-02:** City-name-only slugs (no state suffix): `jersey-city`, `hoboken`, `bayonne`, `north-bergen`, `west-new-york`, `east-newark`, `union-city`, `secaucus`, `kearny`, `harrison`, `guttenberg`, `weehawken`
- **D-03:** City hub pages at `/service-areas/[city]/` with overview hub at `/service-areas/`
- **D-04:** Flat blog at `/blog/[slug]/`
- **D-05:** Guides at `/guides/cost/[slug]/` and `/guides/materials/[slug]/`
- **D-06:** Problem-to-solution pages at `/problems/[slug]/`
- **D-07:** Static pages at root level: `/about/`, `/contact/`, `/gallery/`, `/testimonials/`
- **D-08:** Complete URL hierarchy (see CONTEXT.md for full map)
- **D-09:** Single file per entity type in `src/data/`: `municipalities.ts`, `services.ts`, `service-city-content.ts`, `testimonials.ts`, `business-info.ts`, `types.ts`
- **D-10:** Full depth data registries -- all fields populated in Phase 1, not deferred
- **D-11:** Municipality interface includes: name, slug, county, population, zipCodes, neighborhoods, landmarks (5+), housingStock, architectureStyles, weatherPatterns, buildingCodes, commonRoofTypes, roofingConcerns, nearbyHighways, description, tier
- **D-12:** Service interface includes: name, slug, category, shortDescription, fullDescription, processSteps, materials, costFactors, faqs (5+), commonProblems, relatedServices, emergencyAvailable, typicalDuration, warrantyInfo
- **D-13:** Cross-reference resolver layer via `service-city-content.ts` -- `getCityServiceContent(serviceSlug, citySlug)` returns city-specific content fragments
- **D-14:** Testimonials registry with 3-5 per city (~48 total), tagged by city and service type, varied ratings
- **D-15:** Business info registry with NAP data, certifications, license numbers, insurance info
- **D-16:** Lookup functions + constants pattern -- export both raw Record/array AND typed helpers
- **D-17:** City tiers: Tier 1 (Jersey City, Hoboken, Bayonne, North Bergen), Tier 2 (Union City, West New York, Secaucus, Kearny), Tier 3 (Harrison, East Newark, Guttenberg, Weehawken)
- **D-18:** Research-grade realistic city data -- real population, real landmarks, real ZIP codes
- **D-19:** Industry-accurate service data -- real roofing workflows, real homeowner FAQs
- **D-20:** Testimonials are placeholder but realistic
- **D-21:** Use `src/` directory convention
- **D-22:** `(marketing)` route group wrapping all page routes, with shared marketing layout. API routes at `src/app/api/`
- **D-23:** Centralized SEO helpers in `src/lib/seo/` -- `metadata.ts`, `json-ld.ts`, `sitemap.ts`, `canonical.ts`

### Claude's Discretion
- Exact TypeScript type definitions for sub-types (Landmark, HousingStock, WeatherData, BuildingCode, ProcessStep, Material, CostFactor, FAQ, etc.)
- Internal linking data structure (how related services reference each other)
- robots.txt configuration details
- Sitemap generation approach (single vs split)
- Error boundary and not-found page implementation
- Tailwind CSS 4 configuration approach

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FNDN-01 | Next.js 16 App Router project scaffolded with TypeScript strict mode, Tailwind CSS 4, pnpm | `pnpm create next-app@latest` with customized settings; Tailwind 4 via `@tailwindcss/postcss`; strict mode in tsconfig |
| FNDN-02 | Siloed URL architecture with nested dynamic segments for service-type and location branches | App Router file-system routing with `[service]/[city]` nested dynamic segments; `generateStaticParams` for static generation |
| FNDN-03 | TypeScript data registries for all 12 municipalities | `src/data/municipalities.ts` with `satisfies` operator; typed lookup functions per D-11 interface |
| FNDN-04 | TypeScript data registries for all 8 services | `src/data/services.ts` with `satisfies` operator; typed lookup functions per D-12 interface |
| SEO-07 | XML sitemap auto-generated covering all routes | `src/app/sitemap.ts` using `MetadataRoute.Sitemap` type; imports from data registries |
| SEO-08 | robots.txt properly configured | `src/app/robots.ts` using `MetadataRoute.Robots` type |
| SEO-09 | Canonical URLs set via alternates.canonical in metadata on every page | Centralized `generatePageMetadata()` helper in `src/lib/seo/metadata.ts` that sets `alternates.canonical` |
| SEO-10 | generateMetadata() on every page with title, description, openGraph, and alternates | Shared metadata generator functions that every page imports; data-driven from registries |
| SEO-11 | One H1 per page with strict heading hierarchy | Enforced via page component patterns; each page template renders exactly one `<h1>` |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript (strict mode), Tailwind CSS 4, Motion library, pnpm, Vercel deployment
- **Typography**: Cormorant Garamond (medium) for body, Cormorant for headings, minimum 18px body font (Phase 2, but font setup in Phase 1 root layout)
- **Naming**: kebab-case files, PascalCase components, camelCase hooks, SCREAMING_SNAKE_CASE constants, PascalCase types/interfaces
- **TypeScript**: `interface` for object shapes, `type` for unions; no `any`; use `satisfies`
- **Components**: Default to Server Components; `"use client"` only when needed
- **SEO**: Every page must export metadata; one h1 per page; strict heading hierarchy; canonical URLs; JSON-LD structured data
- **Content & SEO**: Images via `next/image`; internal links via `next/link`; phone numbers in `tel:` links; LocalBusiness JSON-LD on every page
- **Directory structure**: `src/` directory with `app/`, `components/`, `lib/`, `data/`, `styles/`, `types/`

## Standard Stack

### Core (Phase 1 Only)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.1 | Full-stack React framework | Latest stable. Turbopack default. `PageProps` helper. `params` as Promise. |
| react | 19.2.4 | UI library | Latest stable. Server Components, async params. |
| react-dom | 19.2.4 | React DOM renderer | Required peer of react. |
| typescript | 6.0.2 | Type safety | Latest stable. Strict mode required by project. |
| tailwindcss | 4.2.2 | Utility-first CSS | CSS-first config. No tailwind.config.js needed. |
| @tailwindcss/postcss | 4.2.2 | PostCSS plugin for Tailwind 4 | Required integration layer for Next.js. |
| postcss | 8.5.8 | CSS transformation | Required by @tailwindcss/postcss. |
| schema-dts | 1.1.5 | TypeScript types for Schema.org JSON-LD | Google-maintained. Compile-time validation of structured data. |

### Supporting (Phase 1 Only)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class composition | Any component with conditional classes (minimal use in Phase 1) |
| tailwind-merge | 3.5.0 | Merge Tailwind classes without conflicts | Component variant overrides |

**Installation (Phase 1 dependencies only):**
```bash
pnpm add schema-dts clsx tailwind-merge
```

Note: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/postcss`, `postcss` are all installed by `create-next-app`.

**Version verification (confirmed 2026-03-23 via npm registry):**
- next: 16.2.1
- react: 19.2.4
- typescript: 6.0.2
- tailwindcss: 4.2.2
- @tailwindcss/postcss: 4.2.2
- postcss: 8.5.8
- schema-dts: 1.1.5
- clsx: 2.1.1
- tailwind-merge: 3.5.0

## Architecture Patterns

### Recommended Project Structure (Phase 1 Deliverable)

```
src/
  app/
    (marketing)/              # Route group -- no URL segment, shared layout
      layout.tsx              # Marketing layout (placeholder shell for Phase 2)
      page.tsx                # Homepage (stub)
      about/page.tsx          # Static page stubs
      contact/page.tsx
      gallery/page.tsx
      testimonials/page.tsx
      services/
        residential/
          [service]/
            page.tsx          # Service pillar page (stub)
            [city]/
              page.tsx        # Service-in-city page (stub)
        commercial/
          [service]/
            page.tsx          # Service pillar page (stub)
            [city]/
              page.tsx        # Service-in-city page (stub)
      service-areas/
        page.tsx              # Location hub overview (stub)
        [city]/
          page.tsx            # City hub page (stub)
      blog/
        page.tsx              # Blog index (stub)
        [slug]/
          page.tsx            # Blog article (stub)
      guides/
        page.tsx              # Guides hub (stub)
        cost/
          [slug]/
            page.tsx          # Cost guide (stub)
        materials/
          [slug]/
            page.tsx          # Material guide (stub)
      problems/
        page.tsx              # Problems hub (stub)
        [slug]/
          page.tsx            # Problem-to-solution (stub)
    api/                      # API routes (empty for Phase 1)
    layout.tsx                # Root layout (html, body, fonts)
    not-found.tsx             # Custom 404
    error.tsx                 # Global error boundary
    sitemap.ts                # XML sitemap generator
    robots.ts                 # robots.txt generator
  components/                 # Empty for Phase 1 (created for structure)
    ui/
    sections/
    layout/
    forms/
  lib/
    seo/
      metadata.ts             # Centralized metadata generators
      json-ld.ts              # JSON-LD builder helpers
      canonical.ts            # Canonical URL builder
    utils.ts                  # cn() utility
    constants.ts              # Site-wide constants (BASE_URL, SITE_NAME, etc.)
  data/
    types.ts                  # All shared TypeScript interfaces
    municipalities.ts         # 12 Hudson County city registries
    services.ts               # 8 service registries
    service-city-content.ts   # Cross-reference resolver
    testimonials.ts           # ~48 placeholder testimonials
    business-info.ts          # NAP, certifications, license, insurance
  styles/
    globals.css               # Tailwind import + custom properties
  types/
    index.ts                  # Re-exports from data/types.ts + any additional
```

### Pattern 1: Async Params (Next.js 16 Requirement)

**What:** In Next.js 16, `params` is a Promise that must be awaited. This is a breaking change from Next.js 14 and earlier.
**When to use:** Every page, layout, and `generateMetadata` that accesses route params.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/page
// CORRECT: Next.js 16 pattern
export default async function Page({
  params,
}: {
  params: Promise<{ service: string; city: string }>
}) {
  const { service, city } = await params;
  // ...
}

// ALSO CORRECT: Using PageProps helper (globally available after next dev/build)
export default async function Page(props: PageProps<'/services/residential/[service]/[city]'>) {
  const { service, city } = await props.params;
  // ...
}
```

### Pattern 2: generateStaticParams with Multiple Dynamic Segments

**What:** Generate all combinations of service x city for static generation.
**When to use:** The `/services/[category]/[service]/[city]/` route pattern.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// Bottom-up approach: generate ALL combinations from the leaf page
import { getAllServiceSlugs } from '@/data/services';
import { getAllMunicipalitySlugs } from '@/data/municipalities';

export function generateStaticParams() {
  const services = getAllServiceSlugs('residential'); // or 'commercial'
  const cities = getAllMunicipalitySlugs();

  return services.flatMap((service) =>
    cities.map((city) => ({
      service,
      city,
    }))
  );
}
```

### Pattern 3: Data Registry with satisfies Operator

**What:** Type-safe data objects with both full type checking and preserved literal types.
**When to use:** All data registries in `src/data/`.
**Example:**
```typescript
// src/data/types.ts
interface Municipality {
  name: string;
  slug: string;
  county: string;
  population: number;
  zipCodes: string[];
  neighborhoods: string[];
  landmarks: Landmark[];
  housingStock: HousingStock;
  architectureStyles: string[];
  weatherPatterns: WeatherData;
  buildingCodes: BuildingCode;
  commonRoofTypes: string[];
  roofingConcerns: string[];
  nearbyHighways: string[];
  description: string;
  tier: 1 | 2 | 3;
}

// src/data/municipalities.ts
import type { Municipality } from './types';

const MUNICIPALITIES = {
  'jersey-city': {
    name: 'Jersey City',
    slug: 'jersey-city',
    county: 'Hudson',
    population: 292449,
    zipCodes: ['07302', '07304', '07305', '07306', '07307', '07310'],
    // ... all fields
  },
  // ... 11 more
} as const satisfies Record<string, Municipality>;

// Lookup functions
export function getMunicipality(slug: string): Municipality | undefined {
  return MUNICIPALITIES[slug as keyof typeof MUNICIPALITIES];
}

export function getAllMunicipalitySlugs(): string[] {
  return Object.keys(MUNICIPALITIES);
}

export function getMunicipalitiesByTier(tier: 1 | 2 | 3): Municipality[] {
  return Object.values(MUNICIPALITIES).filter((m) => m.tier === tier);
}

export { MUNICIPALITIES };
```

### Pattern 4: Centralized Metadata Generator

**What:** Shared helper that generates consistent metadata from data registries.
**When to use:** Every page imports this instead of writing inline metadata.
**Example:**
```typescript
// src/lib/seo/metadata.ts
import type { Metadata } from 'next';
import { SITE_NAME, BASE_URL } from '@/lib/constants';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogType = 'website',
}: PageMetadataInput): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: ogType,
      locale: 'en_US',
    },
  };
}

// Usage in a page:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.name,
    description: service.shortDescription,
    path: `/services/residential/${service.slug}`,
  });
}
```

### Pattern 5: JSON-LD Builder with schema-dts Types

**What:** Type-safe JSON-LD structured data using schema-dts types and XSS-safe rendering.
**When to use:** Every page that needs structured data (which is every page per project requirements).
**Example:**
```typescript
// src/lib/seo/json-ld.ts
import type { RoofingContractor, WithContext, BreadcrumbList } from 'schema-dts';
import { BUSINESS_INFO } from '@/data/business-info';
import { BASE_URL } from '@/lib/constants';

export function buildRoofingContractorJsonLd(): WithContext<RoofingContractor> {
  return {
    '@context': 'https://schema.org',
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
    url: BASE_URL,
    areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
  };
}

// Render component (used in layouts/pages)
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
```

### Pattern 6: Tailwind CSS 4 Configuration

**What:** CSS-first Tailwind 4 setup with `@import "tailwindcss"` -- no JavaScript config file.
**When to use:** Initial project setup.
**Example:**
```css
/* src/styles/globals.css (or src/app/globals.css) */
@import "tailwindcss";

/* Custom theme tokens via CSS custom properties */
@theme {
  --font-heading: 'Cormorant', serif;
  --font-body: 'Cormorant Garamond', serif;
  --color-primary: #1a365d;
  --color-secondary: #c05621;
  /* Phase 2 will define full color palette */
}
```

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Pattern 7: Sitemap Generation from Data Registries

**What:** Dynamic sitemap.ts that imports all data registries to generate complete URL list.
**When to use:** `src/app/sitemap.ts` -- single file, no splitting needed for ~150 URLs.
**Example:**
```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllMunicipalitySlugs } from '@/data/municipalities';
import { getAllServiceSlugs } from '@/data/services';
import { BASE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = getAllMunicipalitySlugs();
  const residentialServices = getAllServiceSlugs('residential');
  const commercialServices = getAllServiceSlugs('commercial');

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    // ... other static pages
  ];

  const servicePages = [...residentialServices, ...commercialServices].map(
    (service) => ({
      url: `${BASE_URL}/services/${service.category}/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })
  );

  const cityPages = cities.map((city) => ({
    url: `${BASE_URL}/service-areas/${city}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Service-in-city combinations
  const serviceCityPages = [
    ...residentialServices.flatMap((service) =>
      cities.map((city) => ({
        url: `${BASE_URL}/services/residential/${service.slug}/${city}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    ),
    ...commercialServices.flatMap((service) =>
      cities.map((city) => ({
        url: `${BASE_URL}/services/commercial/${service.slug}/${city}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    ),
  ];

  return [...staticPages, ...servicePages, ...cityPages, ...serviceCityPages];
}
```

### Anti-Patterns to Avoid

- **Synchronous params access:** Never destructure params directly without `await`. Next.js 16 will warn and eventually error. Always `const { slug } = await params;`.
- **tailwind.config.js:** Do not create a JavaScript config file for Tailwind 4. Use `@theme {}` in CSS and `@import "tailwindcss"`. The old approach still works but is deprecated.
- **Inline metadata on every page:** Do not write `export const metadata = { ... }` with hardcoded values on each page. Use centralized helpers from `src/lib/seo/metadata.ts` to ensure consistency.
- **`any` types in data registries:** Never use `any` for data objects. The `satisfies` pattern catches type errors at compile time while preserving literal types for autocomplete.
- **Storing data in separate JSON files:** TypeScript files are better than `.json` because they allow type annotations, computed values, and `satisfies` validation. JSON files also cannot export helper functions.
- **Putting generateStaticParams in layout.tsx for service routes:** For routes like `/services/residential/[service]/[city]/`, put `generateStaticParams` in the `page.tsx` to generate both `service` and `city` params together (bottom-up approach). Putting it in the layout only generates the parent segment.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Canonical URL generation | Custom URL concatenation per page | `alternates.canonical` in Metadata API | Next.js handles edge cases (trailing slashes, encoding) |
| Sitemap XML generation | Custom XML string builder | `sitemap.ts` file convention with `MetadataRoute.Sitemap` | Next.js handles XML formatting, caching, and routing |
| robots.txt generation | Static file or string template | `robots.ts` file convention with `MetadataRoute.Robots` | Programmatic control, type-safe, consistent with sitemap |
| JSON-LD typing | Manual object shapes | `schema-dts` package | Google-maintained types for all Schema.org vocabulary |
| Route param typing | Manual `{ params: Promise<{ slug: string }> }` | `PageProps<'/route/[slug]'>` helper | Auto-generated from route structure, less error-prone |
| Class merging | Custom string concatenation | `clsx` + `tailwind-merge` via `cn()` utility | Handles Tailwind specificity conflicts correctly |
| Font loading | Manual `<link>` tags | `next/font/google` | Self-hosted, zero CLS, automatic `font-display: swap` |

**Key insight:** Next.js 16 has built-in file conventions for sitemap, robots, metadata, fonts, and error pages. Using these conventions instead of custom solutions ensures compatibility with the framework's rendering pipeline and future upgrades.

## Common Pitfalls

### Pitfall 1: Forgetting to await params in Next.js 16
**What goes wrong:** Runtime error or deprecation warning when accessing params synchronously.
**Why it happens:** Migration from Next.js 14/15 patterns where params was synchronous.
**How to avoid:** Always use `const { slug } = await params;` in async Server Components, or `use(params)` in Client Components.
**Warning signs:** TypeScript will show `params` as `Promise<...>` type. If code compiles but runtime errors occur, check param access patterns.

### Pitfall 2: create-next-app overwriting existing files
**What goes wrong:** Running `create-next-app` in a directory with existing files (like .planning/, CLAUDE.md) can conflict.
**Why it happens:** The CLI expects an empty directory by default.
**How to avoid:** Run `create-next-app` with the project name as a subdirectory, then move files up. Or use manual installation (install packages, create files manually). Since this project already has docs and planning artifacts, the safest approach is manual installation or creating in a temp directory and moving files.
**Warning signs:** CLI prompts about overwriting or non-empty directory.

### Pitfall 3: Tailwind CSS 4 @import vs @tailwind directives
**What goes wrong:** Styles don't apply. Build succeeds but no Tailwind classes work.
**Why it happens:** Using old `@tailwind base; @tailwind components; @tailwind utilities;` syntax instead of `@import "tailwindcss";`.
**How to avoid:** Use only `@import "tailwindcss"` in the CSS file. Use `@tailwindcss/postcss` plugin, not `tailwindcss` directly, in postcss.config.mjs.
**Warning signs:** No Tailwind classes rendering, no errors in console.

### Pitfall 4: Data registry size causing slow dev server
**What goes wrong:** Dev server becomes sluggish because all 48 testimonials and 12 municipality records are loaded on every page refresh.
**Why it happens:** In dev mode, modules are re-evaluated frequently. Large data objects increase memory pressure.
**How to avoid:** Keep data registries as constants (not functions that compute on every call). Use `as const satisfies` which allows tree-shaking. Individual lookup functions only traverse what's needed.
**Warning signs:** Dev server taking > 5 seconds to refresh.

### Pitfall 5: Route group (marketing) layout vs root layout confusion
**What goes wrong:** Shared elements appear doubled, or root layout doesn't apply correctly.
**Why it happens:** Misunderstanding the layout nesting: root `layout.tsx` wraps everything including `(marketing)/layout.tsx`.
**How to avoid:** Root layout = `<html>`, `<body>`, fonts, global providers only. Marketing layout = header, footer, persistent CTAs (Phase 2). In Phase 1, marketing layout is a pass-through.
**Warning signs:** Duplicate `<html>` or `<body>` tags in rendered HTML.

### Pitfall 6: dynamicParams default allowing arbitrary URLs
**What goes wrong:** Routes like `/services/residential/nonexistent-service/fake-city/` return 200 instead of 404.
**Why it happens:** `dynamicParams` defaults to `true`, which tries to render pages for any param value at runtime.
**How to avoid:** Add `export const dynamicParams = false;` to route segments where all valid params are known via `generateStaticParams`. This returns 404 for unknown slugs.
**Warning signs:** Google indexing garbage URLs, or users seeing broken pages for mistyped URLs.

### Pitfall 7: Missing XSS sanitization in JSON-LD
**What goes wrong:** Cross-site scripting vulnerability if user-controlled data appears in JSON-LD.
**Why it happens:** `JSON.stringify` does not escape `<script>` tags embedded in data.
**How to avoid:** Always use `.replace(/</g, '\\u003c')` on the stringified JSON-LD before passing to `dangerouslySetInnerHTML`. The official Next.js docs recommend this pattern.
**Warning signs:** Raw `<` characters in rendered JSON-LD script tags.

## Code Examples

### create-next-app with Customization
```bash
# Source: https://nextjs.org/docs/app/getting-started/installation
# Since project directory already has files, use custom settings approach:
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
# Note: --no-turbopack is only if Turbopack causes issues; it's default now
# Alternatively, with --yes to accept defaults (includes AGENTS.md):
pnpm create next-app@latest . --yes
```

### robots.ts for a Local Business Site
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// src/app/robots.ts
import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

### Root Layout with Font Setup
```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Cormorant, Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jersey City Quality Roofing | Expert Roofing Services in Hudson County',
    template: '%s | Jersey City Quality Roofing',
  },
  description: 'Professional roofing services in Jersey City and all Hudson County municipalities. Residential and commercial roof repair, replacement, and inspection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cormorantGaramond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### not-found.tsx
```typescript
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <main>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </main>
  );
}
```

### error.tsx (Client Component Required)
```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
```

### cn() Utility
```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params` as sync object | `params` as Promise (must await) | Next.js 15+ (enforced in 16) | Every page/layout/generateMetadata must be async |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind CSS 4.0 (Jan 2025) | Simpler CSS, no JS config file |
| `tailwindcss` as PostCSS plugin | `@tailwindcss/postcss` as PostCSS plugin | Tailwind CSS 4.0 | Different package name in postcss config |
| `tailwind.config.js` | `@theme {}` in CSS | Tailwind CSS 4.0 | CSS-first configuration, tokens via custom properties |
| `next lint` in build | Separate `eslint` command | Next.js 16 | `next build` no longer runs linter; run via npm scripts |
| Manual params typing | `PageProps<'/route'>` global helper | Next.js 16 | Auto-generated types from route structure |
| `getStaticPaths` | `generateStaticParams` | Next.js 13+ (stable) | File-system based, colocated with pages |

**Deprecated/outdated:**
- `next-seo`: Designed for Pages Router. Use built-in Metadata API instead.
- `next-sitemap`: Unnecessary. Use built-in `sitemap.ts` convention.
- `tailwind.config.js`: Still works but is the legacy approach. Prefer CSS-first config in Tailwind 4.

## Open Questions

1. **create-next-app in non-empty directory**
   - What we know: The project root already contains `.planning/`, `CLAUDE.md`, `.claude/`, `_bmad/`, etc.
   - What's unclear: Whether `create-next-app` will refuse to run or overwrite existing files.
   - Recommendation: Use `create-next-app` with `--yes` flag (which skips prompts and uses defaults). If it refuses due to non-empty directory, use manual installation approach: `pnpm add next@latest react@latest react-dom@latest` then manually create `src/app/layout.tsx`, `tsconfig.json`, etc. The planner should include a fallback strategy.

2. **TypeScript 6.x compatibility with Next.js 16**
   - What we know: npm shows TypeScript 6.0.2 as latest. Next.js 16 docs mention minimum TypeScript v5.1.0.
   - What's unclear: Whether TypeScript 6.x is fully tested with Next.js 16.2.1 or if 5.7.x is safer.
   - Recommendation: Let `create-next-app` install its preferred TypeScript version. If it installs 5.x, use that. If 6.x, verify build succeeds. LOW risk -- Next.js typically supports the latest stable TypeScript.

3. **Exact Cormorant Garamond font weights**
   - What we know: Project specifies "medium weight" for body and Cormorant for headings.
   - What's unclear: Whether Cormorant Garamond's "medium" is weight 400 or 500 in Google Fonts API.
   - Recommendation: Import weights 400, 500, 600, 700 for both Cormorant and Cormorant Garamond. The design system phase (Phase 2) will lock the exact weight mappings. Phase 1 just needs the fonts loaded.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 16 (min 20.9) | Yes | 25.4.0 | -- |
| pnpm | Package management | Yes | 10.32.1 | -- |
| git | Version control | Yes | 2.50.1 | -- |
| Vercel CLI | Deployment (not Phase 1) | Yes | 50.1.5 | -- |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

All required tools are available and exceed minimum version requirements.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | TypeScript compiler (`tsc --noEmit`) + Next.js build validation |
| Config file | `tsconfig.json` (created by scaffold) |
| Quick run command | `pnpm type-check` (alias for `tsc --noEmit`) |
| Full suite command | `pnpm build` (validates static generation, metadata, sitemap) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FNDN-01 | Dev server starts successfully | smoke | `pnpm dev &; sleep 5; curl -s http://localhost:3000; kill %1` | -- Wave 0 |
| FNDN-02 | Dynamic route segments resolve correctly | smoke | `pnpm build` (validates generateStaticParams) | -- Wave 0 |
| FNDN-03 | Municipality data registry returns data for all 12 cities | unit | `npx tsx --eval "import { getMunicipality, getAllMunicipalitySlugs } from './src/data/municipalities'; const slugs = getAllMunicipalitySlugs(); console.assert(slugs.length === 12); slugs.forEach(s => console.assert(getMunicipality(s)));"` | -- Wave 0 |
| FNDN-04 | Service data registry returns data for all 8 services | unit | `npx tsx --eval "import { getService, getAllServiceSlugs } from './src/data/services'; const slugs = getAllServiceSlugs(); console.assert(slugs.length === 8); slugs.forEach(s => console.assert(getService(s)));"` | -- Wave 0 |
| SEO-07 | Sitemap generated with all routes | smoke | `pnpm build && curl -s http://localhost:3000/sitemap.xml` | -- Wave 0 |
| SEO-08 | robots.txt generated | smoke | `pnpm build && curl -s http://localhost:3000/robots.txt` | -- Wave 0 |
| SEO-09 | Canonical URLs present in metadata | build | `pnpm build` (build output shows generated pages with metadata) | -- Wave 0 |
| SEO-10 | All pages have generateMetadata | build | `pnpm build` + type-check (missing metadata would be a pattern violation, caught in code review) | -- Wave 0 |
| SEO-11 | One H1 per page | manual-only | Code review -- structural pattern enforced by page stub templates | -- |

### Sampling Rate
- **Per task commit:** `pnpm type-check` (fast, validates all TypeScript)
- **Per wave merge:** `pnpm build` (full static generation validation)
- **Phase gate:** `pnpm build` succeeds + `pnpm dev` serves all routes + data registry assertions pass

### Wave 0 Gaps
- [ ] `scripts/validate-data.ts` -- script that imports all data registries and asserts completeness (12 municipalities, 8 services, ~48 testimonials)
- [ ] `tsconfig.json` -- TypeScript strict mode configuration (created by scaffold)
- [ ] `package.json` -- `type-check` script addition: `"type-check": "tsc --noEmit"`

## Sources

### Primary (HIGH confidence)
- [Next.js 16.2.1 Installation Guide](https://nextjs.org/docs/app/getting-started/installation) -- create-next-app prompts, manual setup, `--yes` flag behavior
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) -- `[slug]` convention, async params, PageProps helper, Cache Components interaction
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- multiple dynamic segments, bottom-up vs top-down, dynamicParams config
- [Next.js Metadata & OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- generateMetadata signature, Metadata type, streaming metadata
- [Next.js page.tsx API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/page) -- PageProps helper, params as Promise, searchParams
- [Next.js sitemap.ts Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- MetadataRoute.Sitemap type, generateSitemaps
- [Next.js robots.ts Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) -- MetadataRoute.Robots type
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- script tag pattern, schema-dts recommendation, XSS prevention
- [Tailwind CSS 4 with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs) -- @tailwindcss/postcss plugin, @import syntax, postcss.config.mjs

### Secondary (MEDIUM confidence)
- npm registry version checks (2026-03-23) -- confirmed current versions of all packages

### Tertiary (LOW confidence)
- None -- all findings verified against official documentation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against npm registry on 2026-03-23; all patterns verified against official Next.js 16.2.1 and Tailwind CSS 4.2.2 docs
- Architecture: HIGH -- file-system routing patterns are well-documented and stable; data registry patterns follow TypeScript best practices
- Pitfalls: HIGH -- all pitfalls documented in official migration guides or observed in official docs (async params, Tailwind 4 config changes, dynamicParams defaults)

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable APIs, no breaking changes expected)
