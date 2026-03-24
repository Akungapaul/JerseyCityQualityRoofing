# Phase 4: Core Marketing Pages - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the 4 core marketing pages: Homepage, About, Contact, and Service Areas hub. Each page uses the existing design system (Phase 2) and lead capture components (Phase 3). Pages include trust signals (certification badges, testimonials with star ratings), consistent NAP data, Google Map embeds, and structured data (Review/AggregateRating schema). This phase delivers the primary conversion and credibility pages — service-specific content pages are built in subsequent phases.

</domain>

<decisions>
## Implementation Decisions

### Homepage hero & structure
- **D-01:** Split hero layout — left side: headline, subtext, dual CTA buttons (click-to-call phone + scroll-to-form). Right side: hero image/illustration of roofing work. Full-width dark background with warm gold accent on CTAs.
- **D-02:** Trust-first section flow (top to bottom): Hero → Certification badge strip → Services grid → Why Choose Us (stats/differentiators) → Testimonials with star ratings → Service Areas overview → FAQ accordion → Full quote form → CTA Banner
- **D-03:** Services grid: icon cards in 2x4 grid layout. Each card has Lucide icon, service name, one-line description, and link arrow. 2 columns on mobile, 4 on desktop. Grouped under Residential and Commercial headings.
- **D-04:** FAQ section: collapsible accordion format, 5-7 questions, one open by default. FAQ schema JSON-LD for rich snippets. Questions like "Do you serve my city?", "Are you licensed and insured?", "How fast can you get here for emergencies?"
- **D-05:** Compact quote form (3-field) near hero per Phase 3 D-01. Full 6-field form near bottom before CTA Banner.

### Trust & social proof
- **D-06:** Certification badge strip: horizontal icon row with Lucide icons + text labels — "GAF Master Elite", "Licensed & Insured", "BBB A+ Rated", "20+ Years", "CertainTeed SELECT". Dark background with slightly lighter tone than hero. Subtle dividers between items.
- **D-07:** Testimonials: card carousel via Embla Carousel. 3 cards visible on desktop, 1 on mobile. Each card shows 5-star rating, quote text (~150 chars), customer name, city. Auto-sliding or swipeable. Link to full testimonials page. AggregateRating schema JSON-LD.
- **D-08:** Testimonials appear on Homepage and About page only. Contact and Service Areas hub do not include testimonial sections. Service/location pages get their own testimonials in later phases.

### About page
- **D-09:** About page includes: company story narrative, team section, certifications list, insurance info, license numbers, years-in-business callout. Testimonial carousel section (same component as homepage). All placeholder content structured identically to final format.

### Contact page
- **D-10:** Two-column layout — left: full 6-field QuoteForm (reusing Phase 3 component). Right: NAP data (address, phone, email), business hours table, license numbers. On mobile, info stacks above form.
- **D-11:** Google Maps interactive iframe embed showing business location with pin. Lazy-loaded below the fold to protect Core Web Vitals.
- **D-12:** Business hours table: Mon-Fri 7AM-6PM, Sat 8AM-2PM, Sun Closed. Plus "24/7 Emergency Service Available" callout with click-to-call phone number.
- **D-13:** Contact page uses the same full QuoteForm component from Phase 3 (D-06 from Phase 3 context — consistent experience, one component).

### Service areas hub
- **D-14:** Tiered card grid layout — Tier 1 cities (Jersey City, Hoboken, Bayonne, North Bergen) get larger featured cards. Tier 2 and Tier 3 cities get standard-size cards below. Reflects the data tier structure from Phase 1 municipality registry.
- **D-15:** Each city card shows: city name as heading, one-line roofing-relevant tagline (e.g., "Historic brownstones and modern condos"), one key stat (population or housing stock highlight), and "View Services" link to city hub page.
- **D-16:** Google Maps iframe at top of page showing Hudson County with pins for all 12 municipalities. Lazy-loaded. Below map: the tiered card grid. Satisfies SEO-15.

### NAP consistency (SEO-14)
- **D-17:** NAP data sourced from `src/data/business-info.ts` single source of truth across: header, footer, contact page info column, and all schema markup. No hardcoded NAP anywhere.

### Schema markup
- **D-18:** AggregateRating schema on pages displaying testimonials (homepage, about page) — SEO-03
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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — Full v1 requirements. Phase 4 covers: CORE-01, CORE-02, CORE-03, CORE-04, CRO-06, CRO-07, SEO-03, SEO-14, SEO-15
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/ROADMAP.md` §Phase 4 — Success criteria and dependencies

### Prior phase context
- `.planning/phases/01-project-scaffold-data-architecture/01-CONTEXT.md` — URL hierarchy (D-08), data registries (D-09-D-17), municipality tiers (D-17), business-info registry (D-15), SEO helpers (D-23)
- `.planning/phases/02-design-system-layout-shell/02-CONTEXT.md` — Color palette (D-01-D-07), dark site styling, header/CTA design (D-08-D-11), footer with sitemap (D-12-D-13), section breaks for long pages (D-15), animation approach (D-16-D-18)
- `.planning/phases/03-lead-capture-system/03-CONTEXT.md` — Two-tier form system (D-01-D-07), compact 3-field + full 6-field forms, inline success/error messages (D-08-D-10), service type auto-selection (D-15)

### Technology stack
- `CLAUDE.md` §Technology Stack — Dependency list with pinned versions. Key for Phase 4: Embla Carousel (8.6.x) for testimonials, Lucide React (0.477.x) for badge icons, schema-dts (1.1.x) for typed JSON-LD, Motion (12.x) for scroll animations

### Existing code
- `src/data/business-info.ts` — NAP data, phone, certifications, license numbers (single source of truth)
- `src/data/services.ts` — Service names, slugs, descriptions for services grid
- `src/data/municipalities.ts` — Municipality data with tiers, populations, taglines for service areas hub
- `src/data/testimonials.ts` — Testimonials with star ratings, city tags for carousel
- `src/components/sections/section-wrapper.tsx` — SectionWrapper with tone variants for page sections
- `src/components/sections/scroll-reveal.tsx` — ScrollReveal animation wrapper
- `src/components/sections/cta-banner.tsx` — CTA banner component for page bottoms
- `src/components/forms/compact-quote-form.tsx` — Compact 3-field quote form
- `src/components/forms/quote-form.tsx` — Full 6-field quote form
- `src/components/ui/button.tsx` — Button with cva variants
- `src/components/layout/header.tsx` — Sticky header with CTA
- `src/components/layout/footer.tsx` — Full sitemap footer
- `src/lib/seo/json-ld.ts` — JSON-LD builder (extend with AggregateRating, FAQ, RoofingContractor schemas)
- `src/lib/seo/metadata.ts` — generatePageMetadata helper

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionWrapper` (tone="dominant"|"secondary"): Dark-themed section container with alternating tones — use for every homepage section
- `ScrollReveal`: Motion-based fade-in-up animation wrapper — wrap each section's content
- `CTABanner`: Full-width CTA strip with phone and quote button — use at bottom of each page
- `CompactQuoteForm` + `QuoteForm`: Lead capture forms from Phase 3 — embed directly on homepage and contact page
- `Button` with cva variants: Primary (warm gold accent), secondary, ghost — for all CTAs and links
- `Breadcrumbs`: Auto-generated from route hierarchy with JSON-LD — already in marketing layout
- Business data registries: `business-info.ts`, `services.ts`, `municipalities.ts`, `testimonials.ts` — pull all page content from typed data

### Established Patterns
- Server Components by default, `"use client"` only for interactivity (carousel, accordion, forms)
- `(marketing)` route group with shared layout (header, footer, breadcrumbs already rendered)
- `generatePageMetadata()` for consistent SEO metadata on every page
- JSON-LD builder pattern in `src/lib/seo/json-ld.ts` — extend with new schema types
- cva+cn() for component variants
- kebab-case files, PascalCase components

### Integration Points
- `src/app/(marketing)/page.tsx` — Homepage stub, needs full rebuild with all sections
- `src/app/(marketing)/about/page.tsx` — About stub, needs full content build
- `src/app/(marketing)/contact/page.tsx` — Contact stub, needs form + info + map
- `src/app/(marketing)/service-areas/page.tsx` — Service areas stub, needs map + tiered grid
- `src/lib/seo/json-ld.ts` — Add AggregateRating, FAQ, RoofingContractor schema builders

</code_context>

<specifics>
## Specific Ideas

- Trust-first homepage flow: badge strip immediately after hero builds credibility before presenting services — mirrors "show proof before asking for action" conversion pattern
- Tiered card grid on service areas hub reflects the data tier structure already in municipality registry — Tier 1 cities (largest markets) get visual prominence
- Two-column contact layout with form on left and info on right keeps the conversion action (form) as the primary element while supporting info builds trust alongside it
- Business hours with 24/7 emergency callout serves both regular visitors and emergency searches
- Embla Carousel for testimonials keeps bundle weight minimal (~800 bytes) while providing swipe/autoplay UX

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-core-marketing-pages*
*Context gathered: 2026-03-23*
