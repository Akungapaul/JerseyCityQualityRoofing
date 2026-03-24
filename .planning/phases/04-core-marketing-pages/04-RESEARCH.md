# Phase 4: Core Marketing Pages - Research

**Researched:** 2026-03-23
**Domain:** Next.js App Router marketing pages, Embla Carousel, Schema.org structured data, accessible accordion, Google Maps embed
**Confidence:** HIGH

## Summary

Phase 4 builds the four core marketing pages (Homepage, About, Contact, Service Areas hub) on top of the established design system (Phase 2) and lead capture forms (Phase 3). The codebase is well-prepared: typed data registries for business info, services, municipalities, and testimonials are complete; reusable section components (SectionWrapper, ScrollReveal, CTABanner) and both form variants (CompactQuoteForm, QuoteForm) exist and are ready to embed.

The primary new components are: (1) a testimonial carousel using Embla Carousel with autoplay, (2) an accessible FAQ accordion with FAQPage JSON-LD, (3) a certification badge strip, (4) a tiered city card grid, and (5) lazy-loaded Google Maps iframes. All four page stubs already exist with metadata -- they need full content builds replacing placeholder markup. The JSON-LD builder in `src/lib/seo/json-ld.tsx` needs extension with AggregateRating, FAQPage, and enhanced RoofingContractor schemas.

**CRITICAL SCHEMA FINDING:** Google does not display review stars for LocalBusiness/Organization schema with self-hosted reviews. The AggregateRating schema should still be added for semantic completeness and non-Google consumers (AI search, Bing, social platforms), but it will NOT produce Google star rich results. FAQ rich results are similarly restricted to well-known authoritative sites, but the FAQPage schema still benefits AI search engines and non-Google crawlers.

**Primary recommendation:** Build pages as Server Components with isolated client islands (carousel, accordion, forms). Use existing data registries as the single source of truth for all content. Install `embla-carousel-react` and `embla-carousel-autoplay` for testimonials. Build the FAQ accordion as a custom accessible component (no library needed for a simple disclosure pattern).

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Split hero layout -- left side: headline, subtext, dual CTA buttons (click-to-call phone + scroll-to-form). Right side: hero image/illustration of roofing work. Full-width dark background with warm gold accent on CTAs.
- **D-02:** Trust-first section flow (top to bottom): Hero -> Certification badge strip -> Services grid -> Why Choose Us (stats/differentiators) -> Testimonials with star ratings -> Service Areas overview -> FAQ accordion -> Full quote form -> CTA Banner
- **D-03:** Services grid: icon cards in 2x4 grid layout. Each card has Lucide icon, service name, one-line description, and link arrow. 2 columns on mobile, 4 on desktop. Grouped under Residential and Commercial headings.
- **D-04:** FAQ section: collapsible accordion format, 5-7 questions, one open by default. FAQ schema JSON-LD for rich snippets. Questions like "Do you serve my city?", "Are you licensed and insured?", "How fast can you get here for emergencies?"
- **D-05:** Compact quote form (3-field) near hero per Phase 3 D-01. Full 6-field form near bottom before CTA Banner.
- **D-06:** Certification badge strip: horizontal icon row with Lucide icons + text labels -- "GAF Master Elite", "Licensed & Insured", "BBB A+ Rated", "20+ Years", "CertainTeed SELECT". Dark background with slightly lighter tone than hero. Subtle dividers between items.
- **D-07:** Testimonials: card carousel via Embla Carousel. 3 cards visible on desktop, 1 on mobile. Each card shows 5-star rating, quote text (~150 chars), customer name, city. Auto-sliding or swipeable. Link to full testimonials page. AggregateRating schema JSON-LD.
- **D-08:** Testimonials appear on Homepage and About page only. Contact and Service Areas hub do not include testimonial sections.
- **D-09:** About page includes: company story narrative, team section, certifications list, insurance info, license numbers, years-in-business callout. Testimonial carousel section (same component as homepage).
- **D-10:** Two-column contact layout -- left: full 6-field QuoteForm (reusing Phase 3 component). Right: NAP data (address, phone, email), business hours table, license numbers. On mobile, info stacks above form.
- **D-11:** Google Maps interactive iframe embed showing business location with pin. Lazy-loaded below the fold to protect Core Web Vitals.
- **D-12:** Business hours table: Mon-Fri 7AM-6PM, Sat 8AM-2PM, Sun Closed. Plus "24/7 Emergency Service Available" callout with click-to-call phone number.
- **D-13:** Contact page uses the same full QuoteForm component from Phase 3 (consistent experience, one component).
- **D-14:** Tiered card grid layout -- Tier 1 cities (Jersey City, Hoboken, Bayonne, North Bergen) get larger featured cards. Tier 2 and Tier 3 cities get standard-size cards below.
- **D-15:** Each city card shows: city name as heading, one-line roofing-relevant tagline, one key stat (population or housing stock highlight), and "View Services" link to city hub page.
- **D-16:** Google Maps iframe at top of page showing Hudson County with pins for all 12 municipalities. Lazy-loaded. Below map: the tiered card grid.
- **D-17:** NAP data sourced from `src/data/business-info.ts` single source of truth across: header, footer, contact page info column, and all schema markup.
- **D-18:** AggregateRating schema on pages displaying testimonials (homepage, about page) -- SEO-03
- **D-19:** FAQ schema on homepage FAQ section for rich snippet eligibility
- **D-20:** RoofingContractor (LocalBusiness subtype) schema on contact page with full NAP, service area, hours

### Claude's Discretion
- Hero image/illustration placeholder approach (SVG illustration, placeholder photo, or gradient pattern)
- Exact "Why Choose Us" section content and stat numbers
- About page company story narrative content
- Testimonial carousel configuration (autoplay speed, transition effects)
- Badge strip icon selection from Lucide library
- Service areas hub introductory content above the map
- Google Maps embed API key handling and iframe parameters
- Responsive breakpoints for card grid layouts
- ScrollReveal animation timing per section

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CORE-01 | Homepage with hero, proof strip, services grid, testimonials, service areas overview, FAQ, and dual CTAs | Full homepage section composition using SectionWrapper + ScrollReveal + all new components (badge strip, services grid, testimonial carousel, FAQ accordion, forms) |
| CORE-02 | About page with company story, team section, certifications, insurance info, license numbers, years-in-business callout | Server Component page pulling from BUSINESS_INFO registry + same TestimonialCarousel component |
| CORE-03 | Contact page with multi-field quote form, embedded Google Map, and full NAP data | Two-column layout reusing QuoteForm from Phase 3, lazy-loaded Google Maps iframe, NAP from business-info.ts |
| CORE-04 | Service area overview hub page listing all 12 Hudson County municipalities with map and links | Tiered card grid using getMunicipalitiesByTier(), lazy-loaded Google Maps iframe with Hudson County view |
| CRO-06 | Customer testimonials with star ratings on homepage, service pages, and location pages | Embla Carousel component with star rating display, reusable for later phases |
| CRO-07 | Certification and license badge strip on homepage and in footer across all pages | Badge strip component with Lucide icons; footer already has certification badges from Phase 2 |
| SEO-03 | Review/AggregateRating schema on pages displaying testimonials | buildAggregateRatingJsonLd() function -- note: Google ignores for LocalBusiness self-reviews but still useful for AI search/Bing |
| SEO-14 | NAP consistency across all pages, aligned with Google Business Profile | All NAP pulled from BUSINESS_INFO constant -- enforce via code review, no hardcoded values |
| SEO-15 | Google Map embed on contact page and city hub pages | Lazy-loaded iframe component with Intersection Observer for CWV protection |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, Motion library, pnpm
- **Typography:** Cormorant Garamond (medium/500) for body, Cormorant for headings, minimum 18px body font
- **Component patterns:** Server Components by default, `"use client"` only for interactivity
- **Naming:** kebab-case files, PascalCase components, camelCase hooks
- **SEO:** Every page must have metadata exports, one h1, strict heading hierarchy, descriptive alt text, canonical URLs, JSON-LD structured data
- **Accessibility:** Semantic HTML, keyboard navigation, WCAG AA contrast, focus-visible styles
- **Content style:** Placeholder content must be realistic and structured identically to final content (not lorem ipsum)
- **Organization:** `src/components/sections/` for page sections, `src/components/ui/` for primitives, `src/data/` for content

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.x | App Router pages | Project framework -- page stubs already exist |
| React | 19.2.x | UI library | Server Components for content pages |
| Tailwind CSS | 4.2.x | Styling | CSS-first config already set up in globals.css |
| Motion | 12.38.x | Animations | ScrollReveal already uses motion/react |
| Lucide React | 1.0.x | Icons | Used throughout header, footer, CTA components |
| schema-dts | 1.1.5 | JSON-LD types | Already used in json-ld.tsx for RoofingContractor |

### New Dependencies (must install)
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| embla-carousel-react | 8.6.0 | Carousel hook for React | Headless, ~800 bytes, full styling control with Tailwind. Already specified in project stack. |
| embla-carousel-autoplay | 8.6.0 | Autoplay plugin for Embla | Handles auto-sliding with configurable delay, pause on interaction, resume on mouse leave. Required by D-07. |

### Not Needed (build custom)
| Problem | Why No Library |
|---------|---------------|
| FAQ Accordion | Simple disclosure pattern -- 3 ARIA attributes + a button + hidden attribute. Adding a library for this adds unnecessary weight. Build with native HTML button + controlled state. |
| Google Maps embed | Plain iframe with loading="lazy" + Intersection Observer. No npm package needed. |
| Star ratings | 5 Lucide Star icons with conditional fill. No rating library needed. |
| Badge strip | Static horizontal flex layout with Lucide icons. Already have Badge component from Phase 2. |

**Installation:**
```bash
pnpm add embla-carousel-react@8.6.0 embla-carousel-autoplay@8.6.0
```

## Architecture Patterns

### Recommended Component Structure
```
src/
  components/
    sections/
      hero-section.tsx              # Server wrapper, client CTA buttons
      badge-strip.tsx               # Server Component -- static icons + text
      services-grid.tsx             # Server Component -- icon cards from data
      why-choose-us.tsx             # Server Component -- stats/differentiators
      testimonial-carousel.tsx      # "use client" -- Embla Carousel + autoplay
      service-areas-overview.tsx    # Server Component -- city links grid
      faq-accordion.tsx             # "use client" -- accordion with aria state
      google-map-embed.tsx          # "use client" -- lazy-loaded iframe
      city-card.tsx                 # Server Component -- single city card
      city-card-grid.tsx            # Server Component -- tiered grid layout
      star-rating.tsx               # Server Component -- visual star display
      business-hours-table.tsx      # Server Component -- hours table
      contact-info-column.tsx       # Server Component -- NAP + hours + license
      about-company-story.tsx       # Server Component -- narrative content
      about-team-section.tsx        # Server Component -- team bios
      about-certifications.tsx      # Server Component -- cert list
    ui/
      (existing: badge.tsx, button.tsx, button-variants.ts)
  lib/
    seo/
      json-ld.tsx                   # EXTEND: add buildAggregateRatingJsonLd, buildFaqPageJsonLd, buildContactPageJsonLd
  data/
    homepage-faq.ts                 # FAQ questions/answers for homepage
    about-content.ts                # About page narrative content
```

### Pattern 1: Server Component Page with Client Islands
**What:** Page files are Server Components that compose sections. Only interactive sections (carousel, accordion, forms) are client components.
**When to use:** All four pages in this phase.
**Example:**
```typescript
// src/app/(marketing)/page.tsx -- Server Component
import { HeroSection } from '@/components/sections/hero-section';
import { BadgeStrip } from '@/components/sections/badge-strip';
import { ServicesGrid } from '@/components/sections/services-grid';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { FaqAccordion } from '@/components/sections/faq-accordion';
import { CompactQuoteForm } from '@/components/forms/compact-quote-form';
import { QuoteForm } from '@/components/forms/quote-form';
import { CTABanner } from '@/components/sections/cta-banner';

export default function HomePage() {
  return (
    <>
      <HeroSection />          {/* Server wrapper, client CTA buttons */}
      <BadgeStrip />           {/* Pure Server Component */}
      <ServicesGrid />         {/* Pure Server Component */}
      <WhyChooseUs />          {/* Pure Server Component */}
      <TestimonialCarousel />  {/* Client Component */}
      <ServiceAreasOverview /> {/* Pure Server Component */}
      <FaqAccordion />         {/* Client Component */}
      <QuoteForm />            {/* Client Component (Phase 3) */}
      <CTABanner />            {/* Pure Server Component */}
    </>
  );
}
```

### Pattern 2: Data-Driven Content from Registries
**What:** All page content derives from typed TypeScript data files. No hardcoded strings in components.
**When to use:** Services grid (from SERVICES), city cards (from MUNICIPALITIES), testimonials (from TESTIMONIALS), NAP (from BUSINESS_INFO).
**Example:**
```typescript
// src/components/sections/services-grid.tsx -- Server Component
import { getServicesByCategory } from '@/data/services';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ServicesGrid() {
  const residential = getServicesByCategory('residential');
  const commercial = getServicesByCategory('commercial');
  // Render from data -- no hardcoded service names
}
```

### Pattern 3: Embla Carousel with Autoplay
**What:** Use useEmblaCarousel hook with autoplay plugin for testimonial cards.
**When to use:** Testimonial sections on Homepage and About page.
**Example:**
```typescript
"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Testimonial } from '@/data/types';

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {/* Slide items */}
      </div>
    </div>
  );
}
```

### Pattern 4: Accessible FAQ Accordion (WAI-ARIA)
**What:** Custom accordion using native button elements with aria-expanded, aria-controls, and hidden attribute.
**When to use:** Homepage FAQ section.
**Example:**
```typescript
"use client";

import { useState } from 'react';
import type { FAQ } from '@/data/types';

interface FaqAccordionProps {
  faqs: FAQ[];
  defaultOpenIndex?: number;
}

export function FaqAccordion({ faqs, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div role="region" aria-label="Frequently Asked Questions">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const headingId = `faq-heading-${index}`;

        return (
          <div key={headingId}>
            <h3>
              <button
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left flex items-center justify-between"
              >
                {faq.question}
                {/* Chevron icon */}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### Pattern 5: Lazy-Loaded Google Maps iframe
**What:** Google Maps iframe loaded only when it enters the viewport, using native loading="lazy" plus a wrapper for proper sizing.
**When to use:** Contact page and Service Areas hub page.
**Example:**
```typescript
// src/components/sections/google-map-embed.tsx
interface GoogleMapEmbedProps {
  query: string;        // e.g. "Jersey City Quality Roofing, 123 Summit Ave, Jersey City NJ"
  title: string;        // Accessible iframe title
  className?: string;
  zoom?: number;
}

export function GoogleMapEmbed({ query, title, className, zoom = 14 }: GoogleMapEmbedProps) {
  const encodedQuery = encodeURIComponent(query);
  const src = `https://www.google.com/maps/embed/v1/place?key=PLACEHOLDER_KEY&q=${encodedQuery}&zoom=${zoom}`;

  return (
    <div className={cn("relative w-full aspect-video rounded-lg overflow-hidden", className)}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
```
**Note on API key:** The Google Maps Embed API requires an API key. For placeholder purposes, use a query-based embed URL (`https://www.google.com/maps?q=...&output=embed`) which works without an API key but has limited features. The planner should include a task for creating an environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with a placeholder value.

### Pattern 6: JSON-LD Schema Extension
**What:** Add new builder functions to the existing `json-ld.tsx` file.
**When to use:** AggregateRating, FAQPage, and enhanced RoofingContractor schemas.
**Example:**
```typescript
// Add to src/lib/seo/json-ld.tsx
import type { FAQPage, AggregateRating, WithContext } from 'schema-dts';
import type { Testimonial } from '@/data/types';

export function buildAggregateRatingJsonLd(
  testimonials: readonly Testimonial[]
): WithContext<RoofingContractor> {
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgRating = (totalRating / testimonials.length).toFixed(1);

  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: BUSINESS_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      bestRating: '5',
      worstRating: '1',
      reviewCount: String(testimonials.length),
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
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
```

### Anti-Patterns to Avoid
- **Hardcoding NAP data anywhere:** All NAP must come from `src/data/business-info.ts`. Hardcoded phone numbers, addresses, or email addresses in component markup will cause NAP inconsistency (violates SEO-14).
- **Making static sections client components:** Badge strip, services grid, why choose us, service areas overview are all static content. They must NOT have `"use client"` -- this increases client JS bundle for zero benefit.
- **Using `<img>` instead of `next/image`:** All images must use the Next.js Image component for automatic optimization, lazy loading, and responsive sizing.
- **Embedding Google Maps without lazy loading:** An eagerly loaded Google Maps iframe adds ~800KB to initial page load and destroys LCP. Always lazy-load.
- **Adding more than one h1 per page:** Each page gets exactly one h1. The homepage h1 is in the hero. Sections use h2. Sub-sections use h3.
- **Wrapping SectionWrapper around forms that already have SectionWrapper:** Both CompactQuoteForm and QuoteForm already wrap themselves in SectionWrapper. Do not double-wrap.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Testimonial carousel with autoplay | Custom scroll/timer logic | embla-carousel-react + embla-carousel-autoplay | Touch handling, momentum scrolling, autoplay pause/resume, loop behavior, and RTL support are deceptively complex. Embla is ~800 bytes and handles all edge cases. |
| Star rating display | Unicode stars or custom SVG | Lucide `Star` icon with fill prop | Consistent icon sizing, accessibility, and theming with the rest of the icon system |
| JSON-LD injection | Manual script tags | Existing `JsonLd` component in json-ld.tsx | XSS-safe serialization with `\u003c` escaping already implemented |
| Form submission | Custom fetch/API calls | Existing `submitQuote` Server Action | Phase 3 already built the full submission pipeline with Turnstile verification, honeypot, Resend email |
| Section containers | Custom padding/max-width divs | Existing `SectionWrapper` component | Consistent section spacing (py-12/16/20) and max-width (1280px) across all pages |
| Scroll animations | Custom Intersection Observer | Existing `ScrollReveal` component | Motion-based fade-in-up with once-only triggering already configured |

**Key insight:** Phase 4 is primarily a composition phase -- assembling existing primitives into complete pages. The only genuinely new interactive components are the testimonial carousel and FAQ accordion. Everything else is Server Component composition from existing data and components.

## Common Pitfalls

### Pitfall 1: AggregateRating Schema Won't Show Stars in Google
**What goes wrong:** Developers add AggregateRating schema to a LocalBusiness page expecting star ratings in Google search results, but Google ignores it.
**Why it happens:** Since 2019, Google does not display review stars for LocalBusiness or Organization types when the reviews are self-hosted (the entity controls reviews about itself). This is documented in Google's structured data policies as "self-serving reviews."
**How to avoid:** Add the AggregateRating schema anyway for Bing, AI search engines (Perplexity, ChatGPT search), and semantic completeness -- but do NOT promise or expect Google star rich results. Document this in code comments.
**Warning signs:** Testing in Google Rich Results Test will show "valid markup" but the preview will not show stars for LocalBusiness.

### Pitfall 2: FAQ Rich Results Limited to Authoritative Sites
**What goes wrong:** Developers add FAQPage schema expecting FAQ rich results (expandable Q&A in Google SERPs), but they never appear.
**Why it happens:** Google restricted FAQ rich results in August 2023 to "well-known, authoritative government and health websites." General business sites no longer qualify.
**How to avoid:** Add FAQPage schema for semantic value and AI search consumption, but don't rely on it for Google SERP features. The visible FAQ content on-page still provides user value and keyword coverage.
**Warning signs:** FAQ schema validates in testing tools but never triggers rich results.

### Pitfall 3: Google Maps iframe Destroys Core Web Vitals
**What goes wrong:** An eagerly loaded Google Maps embed adds ~800KB of JavaScript and multiple render-blocking network requests, causing LCP to exceed 4+ seconds.
**Why it happens:** The iframe loads the full Google Maps application including all its JavaScript bundles.
**How to avoid:** Use `loading="lazy"` on the iframe AND place the map below the fold. For the service areas page where the map is near the top, consider a static map image placeholder that loads the interactive iframe on click.
**Warning signs:** LCP score drops to "poor" (>4s) on pages with maps.

### Pitfall 4: Embla Carousel Not Accessible
**What goes wrong:** The carousel works visually but screen reader users cannot navigate slides, and keyboard users cannot control autoplay.
**Why it happens:** Embla is headless -- it provides no accessibility by default. You must add aria-roledescription, aria-label, and keyboard controls yourself.
**How to avoid:** Add `role="region"`, `aria-roledescription="carousel"`, `aria-label="Customer testimonials"` to the outer wrapper. Each slide gets `role="group"` and `aria-roledescription="slide"`. Add prev/next buttons with aria-labels. Pause autoplay on focus within the carousel.
**Warning signs:** WAVE or axe-core reports missing landmark labels on carousel region.

### Pitfall 5: CompactQuoteForm and QuoteForm Already Include SectionWrapper
**What goes wrong:** Page composer wraps forms in another SectionWrapper, creating double padding and nested background tones.
**Why it happens:** Both form components internally render `<SectionWrapper tone="secondary">`. If the page also wraps them, you get nested sections.
**How to avoid:** Embed `<CompactQuoteForm />` and `<QuoteForm />` directly in the page JSX without any SectionWrapper parent. They manage their own section container. If you need to customize the tone or remove the wrapper, the form components may need a `bare` prop or refactoring.
**Warning signs:** Visually double padding around forms; nested `<section>` elements in DOM.

### Pitfall 6: Heading Hierarchy Violations on Long Pages
**What goes wrong:** Homepage has 8+ sections and developers use h2 for some section titles and h3 for others inconsistently, or skip from h2 to h4.
**Why it happens:** With many sections on one page, it's easy to lose track of the heading level.
**How to avoid:** Establish the rule: page h1 in hero, every top-level section gets h2, sub-items within a section get h3. No h4+ needed for these marketing pages. Write this pattern once and follow it in every section component.
**Warning signs:** axe-core "heading levels should only increase by one" violation.

### Pitfall 7: NAP Inconsistency Across Pages
**What goes wrong:** Phone number is hardcoded in one component, email address is a slightly different format in another, and the schema markup has a different address format than the visible footer.
**Why it happens:** Copy-paste from different sources during implementation.
**How to avoid:** Import ALL NAP data from `BUSINESS_INFO` constant and `PHONE_NUMBER`/`PHONE_HREF` from `@/lib/constants`. Never type a phone number, address, or email as a string literal in any component. The planner should include a NAP consistency audit as a verification step.
**Warning signs:** Searching the codebase for the phone number pattern `555-0123` finds matches outside of `business-info.ts` and `constants.ts`.

## Code Examples

### Verified: Embla Carousel with Autoplay in React
```typescript
// Source: Embla Carousel GitHub + npm documentation
"use client";

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hook usage: options as first arg, plugins array as second arg
const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, align: 'start' },
  [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
);

// Navigation callbacks
const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

// JSX structure (required: overflow-hidden on wrapper, flex on container)
<div className="overflow-hidden" ref={emblaRef}>
  <div className="flex">
    {slides.map((slide) => (
      <div className="flex-[0_0_100%] sm:flex-[0_0_33.33%] min-w-0 pl-4" key={slide.id}>
        {/* Slide content */}
      </div>
    ))}
  </div>
</div>
```
**Autoplay plugin options (from source code analysis):**
- `delay`: number (default: 4000) -- milliseconds between slides
- `stopOnInteraction`: boolean (default: true) -- stop when user interacts
- `stopOnMouseEnter`: boolean -- pause on hover
- `stopOnLastSnap`: boolean -- stop at end (only when loop: false)

### Verified: AggregateRating JSON-LD for RoofingContractor
```json
// Source: Google Developers - Review Snippet documentation
// Note: Google will NOT show stars for self-hosted LocalBusiness reviews
// Still useful for Bing, AI search, semantic web
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Jersey City Quality Roofing",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "48"
  }
}
```
**Required properties:** ratingValue + (ratingCount OR reviewCount)
**Recommended properties:** bestRating (default 5), worstRating (default 1)

### Verified: FAQPage JSON-LD
```json
// Source: Google Developers - FAQ structured data documentation
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you serve my city in Hudson County?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we serve all 12 Hudson County municipalities..."
      }
    }
  ]
}
```
**Required:** mainEntity array with Question objects, each having name and acceptedAnswer with text.
**Content rule:** All FAQ content in the markup MUST be visible on the page.

### Verified: Accessible Accordion Pattern (WAI-ARIA APG)
```typescript
// Source: W3C WAI-ARIA Authoring Practices Guide - Accordion Pattern
// Key ARIA attributes:
// - button: aria-expanded, aria-controls
// - panel: role="region", aria-labelledby, hidden attribute
// - Heading level (h3) wraps the button

<h3>
  <button
    id="faq-heading-0"
    aria-expanded={isOpen}
    aria-controls="faq-panel-0"
    onClick={() => toggle(0)}
  >
    {question}
  </button>
</h3>
<div
  id="faq-panel-0"
  role="region"
  aria-labelledby="faq-heading-0"
  hidden={!isOpen}
>
  <p>{answer}</p>
</div>
```
**Keyboard requirements:** Enter/Space to toggle, Tab to navigate between headers.

### Verified: Google Maps Embed (no API key approach)
```typescript
// For development/placeholder: query-based embed works without API key
const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

// For production: Maps Embed API with key
const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`;

<iframe
  src={src}
  title="Map showing Jersey City Quality Roofing location"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
  className="w-full aspect-video border-0 rounded-lg"
/>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Self-hosted review stars in Google SERPs | Google ignores AggregateRating on LocalBusiness self-reviews | 2019 | Schema still useful for Bing/AI but no Google stars |
| FAQ rich results for any site | Restricted to authoritative government/health sites | August 2023 | FAQPage schema still adds semantic value but no Google rich results for business sites |
| Google Maps JavaScript API for embeds | Maps Embed API (iframe-based) | Long-standing | Iframe is simpler, lighter, and sufficient for static location display |
| Swiper.js for carousels | Embla Carousel (headless) | 2023-2024 trend | ~800 bytes vs 150KB+, full styling control, better for Tailwind projects |
| framer-motion import path | motion/react import path | Motion v11+ | Package renamed from framer-motion to motion; import from motion/react |

**Deprecated/outdated:**
- `next-seo` package: Replaced by built-in Metadata API in App Router
- `framer-motion` import: Now `motion/react` (already correct in this project)
- Google Review stars for self-hosted reviews: No longer displayed by Google for LocalBusiness

## Open Questions

1. **Google Maps API key for embed**
   - What we know: The Maps Embed API requires an API key for the `/embed/v1/place` endpoint. The query-based embed (`/maps?q=...&output=embed`) works without a key but has limitations (no custom styling, occasional rate limiting).
   - What's unclear: Whether the project has a Google Cloud project and Maps API key, or if this should use the no-key approach for now.
   - Recommendation: Use the no-key query-based approach for development/placeholder. Add an `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable that defaults to the no-key URL when empty. Document the upgrade path in code comments.

2. **Hero image/illustration placeholder**
   - What we know: D-01 specifies a split hero with right side showing a hero image/illustration of roofing work. This is under Claude's discretion.
   - What's unclear: Whether to use an SVG illustration, a placeholder photo via next/image, or a gradient/geometric pattern.
   - Recommendation: Use a gradient pattern with a subtle roofing-themed SVG overlay as placeholder. This avoids stock photo licensing concerns, is lightweight (no image download), and looks professional. The SVG can be inline for zero network requests. Mark the area with a `data-placeholder="hero-image"` attribute for easy future replacement.

3. **QuoteForm SectionWrapper conflict**
   - What we know: Both CompactQuoteForm and QuoteForm internally render SectionWrapper. On the homepage, the full QuoteForm near the bottom is meant to be its own section (per D-02 flow: "Full quote form" is a separate section). This works naturally.
   - What's unclear: On the contact page (D-10), the QuoteForm is in a two-column layout with the info column. This may conflict with QuoteForm's built-in SectionWrapper.
   - Recommendation: For the contact page, either (a) create a bare version of QuoteForm that omits SectionWrapper, or (b) create a contact-specific layout component that wraps both columns in a single SectionWrapper and renders the form without its own wrapper. Option (b) is cleaner -- extract form fields into a composable sub-component.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` (node environment, `src/**/__tests__/**/*.test.ts` pattern) |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CORE-01 | Homepage sections render with correct data | unit | `pnpm test -- src/components/__tests__/homepage-sections.test.ts -t "homepage"` | Wave 0 |
| CORE-03 | Contact page NAP matches BUSINESS_INFO | unit | `pnpm test -- src/lib/__tests__/nap-consistency.test.ts` | Wave 0 |
| SEO-03 | AggregateRating JSON-LD has required properties | unit | `pnpm test -- src/lib/__tests__/json-ld.test.ts -t "aggregate"` | Extend existing |
| SEO-14 | NAP data sourced only from business-info.ts | unit | `pnpm test -- src/lib/__tests__/nap-consistency.test.ts -t "nap"` | Wave 0 |
| CRO-06 | Testimonial data has required fields (rating, name, city) | unit | `pnpm test -- src/data/__tests__/testimonials.test.ts` | Wave 0 |
| CRO-07 | Badge strip renders all certifications from BUSINESS_INFO | unit | `pnpm test -- src/components/__tests__/badge-strip.test.ts` | Wave 0 |
| D-04 | FAQ accordion has correct ARIA attributes | unit | `pnpm test -- src/components/__tests__/faq-accordion.test.ts -t "aria"` | Wave 0 |
| D-19 | FAQPage JSON-LD validates against schema | unit | `pnpm test -- src/lib/__tests__/json-ld.test.ts -t "faq"` | Extend existing |
| D-20 | Contact page RoofingContractor schema includes hours + NAP | unit | `pnpm test -- src/lib/__tests__/json-ld.test.ts -t "contact"` | Extend existing |

### Sampling Rate
- **Per task commit:** `pnpm test`
- **Per wave merge:** `pnpm test && pnpm lint && pnpm type-check`
- **Phase gate:** Full suite green + `pnpm build` succeeds before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/nap-consistency.test.ts` -- verifies NAP from BUSINESS_INFO is the sole source, covers SEO-14
- [ ] `src/data/__tests__/testimonials.test.ts` -- verifies testimonial data completeness (all 48 entries have required fields)
- [ ] Extend `src/lib/__tests__/json-ld.test.ts` -- add tests for buildAggregateRatingJsonLd, buildFaqPageJsonLd, buildContactPageJsonLd
- [ ] Note: Component-level tests (carousel, accordion) require jsdom environment which is NOT configured in current vitest.config.ts. For this phase, test data/logic layers (node env) and verify components via browser (`agent-browser-verify`). Adding jsdom/React Testing Library is deferred to avoid scope creep.

## Sources

### Primary (HIGH confidence)
- [Google Developers - Review Snippet Structured Data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) - AggregateRating requirements, self-serving review policy
- [Google Developers - FAQ Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) - FAQPage JSON-LD requirements, eligibility restrictions
- [BrightLocal - Can Local Businesses Use Review Schema?](https://www.brightlocal.com/learn/review-schema/) - Detailed explanation of Google's 2019 policy change on LocalBusiness review stars
- [Embla Carousel GitHub](https://github.com/davidjerleke/embla-carousel) - useEmblaCarousel hook source, Autoplay plugin source code
- [W3C WAI-ARIA APG - Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) - ARIA attributes, keyboard interaction requirements
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) - Embed API documentation

### Secondary (MEDIUM confidence)
- [CoreWebVitals.io - Google Maps 100% PageSpeed](https://www.corewebvitals.io/pagespeed/google-maps-100-percent-pagespeed) - Lazy loading strategies for maps
- [npm: embla-carousel-react v8.6.0](https://www.npmjs.com/package/embla-carousel-react) - Current version verification
- [npm: embla-carousel-autoplay v8.6.0](https://www.npmjs.com/package/embla-carousel-autoplay) - Current version verification
- [Embla Carousel Autoplay Plugin Source](https://raw.githubusercontent.com/davidjerleke/embla-carousel/master/packages/embla-carousel-autoplay/src/components/Autoplay.ts) - Plugin options and methods

### Tertiary (LOW confidence)
- None -- all findings verified against primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already specified in project CLAUDE.md, versions verified against npm registry
- Architecture: HIGH - Patterns derived from existing codebase conventions (Phase 1-3 established patterns)
- Schema/SEO: HIGH - Verified against current Google official documentation
- Pitfalls: HIGH - Schema limitations verified with multiple authoritative sources; carousel/accordion patterns from W3C specifications
- Embla Carousel API: MEDIUM - Source code analysis verified, but official docs site returned 404 on some pages

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable domain -- Schema.org, Embla Carousel, and WAI-ARIA patterns change slowly)
