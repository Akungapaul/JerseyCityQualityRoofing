# Phase 5: Residential Service Pages - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 4 comprehensive residential service pillar pages (Roof Repair, Roof Replacement, Roof Inspection, Emergency Roofing) — each 3000+ words of unique, humanized content with process explainers, materials sections, cost factors, warning signs, FAQs, testimonials, and embedded quote forms. Service schema + FAQ schema JSON-LD on each page. Emergency Roofing gets a distinct crisis-mode template. Dynamic OG images generated per page.

</domain>

<decisions>
## Implementation Decisions

### Page section flow (standard template: Repair, Replacement, Inspection)
- **D-01:** Content hero style — headline + subtext + dual CTA (phone + scroll-to-form) + compact 3-field form inline. Service-specific headline. No image — content speaks.
- **D-02:** Trust-then-content section order: Hero (with compact form) → BadgeStrip → Service Intro (~500w) → Process Explainer (vertical timeline) → Materials Section (comparison cards) → Cost Factors → Mid-page CTA strip → Testimonials (service-filtered carousel) → Related Services (card row) → FAQ Accordion (8-10 questions) → Full QuoteForm → CTABanner
- **D-03:** Mid-page inline CTA strip between Cost Factors and Testimonials — compact dark-toned strip with phone number + "Get Your Free Estimate" button. Catches readers ready to convert before reaching the full form.

### Content depth strategy
- **D-04:** New content data files in `src/data/content/` — one per service (`roof-repair.ts`, `roof-replacement.ts`, `roof-inspection.ts`, `emergency-roofing.ts`). Long-form prose blocks: service intro narrative, storytelling, local context, warning signs, extended FAQs. Existing `services.ts` stays as structured data (process steps, materials, cost factors, base FAQs). Page component pulls from BOTH sources.
- **D-05:** Expert neighbor voice — first-person "we", conversational but technically authoritative. Real-world scenarios specific to Hudson County ("When a nor'easter tears through Jersey City..."). Feels like a knowledgeable local roofer explaining things to a homeowner. Not a marketing brochure.
- **D-06:** Balanced word distribution (~3200 total): ~500w service intro narrative → ~600w process explainer (expanded storytelling per step) → ~500w materials deep-dive (local relevance) → ~400w cost factors (real-world pricing context) → ~500w warning signs/when-to-call scenarios → ~400w+ FAQ answers = ~3200 words + hero text, CTAs, section headers.
- **D-07:** Dedicated "Warning Signs You Need [Service]" section with 5-6 real-world scenarios per service, specific to Hudson County housing stock and weather patterns. Drives organic traffic from problem-search queries.
- **D-08:** Related Services cross-linking section — 2-3 card links to other residential services using `relatedServices` field from `services.ts`. Strengthens residential silo internal linking. E.g., Roof Repair links to Inspection and Replacement.
- **D-09:** Local context woven throughout all content blocks naturally — brownstone challenges in intros, nor'easter damage in process steps, salt air corrosion in materials, Jersey City building codes in cost factors. No separate "local" section; the whole page feels local.
- **D-10:** Vertical timeline for process explainer — numbered steps with connector lines, step title, duration badge, and expanded description paragraph. Works well for 7 steps.
- **D-11:** Comparison cards grid for materials — 2-col desktop, 1-col mobile. Each card: material name, description, lifespan badge, price range, expandable pros/cons list. Renders existing `materials` data from `services.ts`.

### Emergency page template (Emergency Roofing only)
- **D-12:** Phone-first crisis hero — oversized phone number as dominant element. "24/7 EMERGENCY ROOF REPAIR" headline. No compact form in hero — phone call is the primary conversion path. "CALL NOW" button 2x larger than standard. Warm amber/red-gold urgency accent.
- **D-13:** Urgency-first section reorder: Phone-first Hero → BadgeStrip → "What To Do Right Now" (immediate homeowner steps) → Emergency Response Process (shorter, 4-5 steps) → Storm Damage Types → Insurance Claims Help → Mid-page CTA → Testimonials (storm-specific) → FAQ → Full QuoteForm → CTABanner. "What To Do" and "Insurance Claims" are new sections unique to emergency page.
- **D-14:** Warm amber/red-gold accent color (~#d4782f or ~#c45a3c) for emergency-specific elements: hero phone number, CTA buttons, urgency badges, timeline dots. Rest of the page stays olive dark theme. Signals urgency without breaking site visual identity.

### Schema & SEO
- **D-15:** Service + Offer + FAQ JSON-LD bundle per page: (1) Service schema with name, description, provider (RoofingContractor), areaServed (12 cities), hasOfferCatalog. (2) FAQPage schema from combined FAQ set. (3) BreadcrumbList (auto from layout). New `buildServicePageJsonLd()` function in `json-ld.tsx`.
- **D-16:** Template-driven metadata from service data registry via `generateMetadata()` — title = "[Service Name] Services | Jersey City Quality Roofing", description = `service.shortDescription` (unique per service), canonical URL from route, OG image from dynamic route.
- **D-17:** Dynamic OG image generation via `/api/og` route using next/og (ImageResponse) — dark background, gold text, service name prominently displayed, company name, tagline. Each page gets a unique social sharing card. No extra dependency (built-in).
- **D-18:** Service-filtered testimonials — TestimonialCarousel filters to testimonials tagged with the current service type. Falls back to showing all testimonials if fewer than 3 match the service.
- **D-19:** Extended FAQ set — 5+ base FAQs from `services.ts` + 3-5 additional FAQs in content data files (longer answers, local context) = 8-10 total FAQs per page. All FAQs included in FAQPage schema JSON-LD.

### Claude's Discretion
- Exact content prose and storytelling for each service's content data file
- Emergency page "What To Do Right Now" and "Insurance Claims Help" section content
- Specific warning signs scenarios per service type
- Storm damage types content and categories for emergency page
- Vertical timeline visual styling details (connector line thickness, step marker design)
- Material comparison card layout details (border, spacing, icon usage)
- Related Services card copy and linking logic
- Mid-page CTA strip exact copy and styling
- OG image template layout and typography
- Emergency amber accent exact hex value within the ~#d4782f to ~#c45a3c range
- Section-to-section ScrollReveal animation timing

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — Full v1 requirements. Phase 5 covers: RESI-01, RESI-02, RESI-03, RESI-04, CONT-07, CONT-08, CONT-09, SEO-02
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/ROADMAP.md` SS Phase 5 — Success criteria and dependencies

### Prior phase context
- `.planning/phases/01-project-scaffold-data-architecture/01-CONTEXT.md` — URL hierarchy (D-08), data registries (D-09-D-17), service interface with processSteps/materials/costFactors/faqs (D-12), service-city-content resolver (D-13), SEO helpers (D-23)
- `.planning/phases/02-design-system-layout-shell/02-CONTEXT.md` — Color palette: deep olive sage with warm gold #c89640 (D-01-D-07), dark site styling, SectionWrapper tone variants, section breaks every 800-1000 words (D-15), ScrollReveal animations (D-16-D-18)
- `.planning/phases/03-lead-capture-system/03-CONTEXT.md` — Two-tier form system: compact 3-field + full 6-field (D-01-D-07), service type auto-selection from page context (D-15), inline success/error (D-08-D-10)
- `.planning/phases/04-core-marketing-pages/04-CONTEXT.md` — Homepage page assembly pattern, TestimonialCarousel with Embla (D-07), FaqAccordion with Motion (D-04), BadgeStrip (D-06), page component structure with JsonLd + SectionWrapper + ScrollReveal

### Technology stack
- `CLAUDE.md` SS Technology Stack — Dependency list with pinned versions. Key for Phase 5: schema-dts (1.1.x) for typed JSON-LD, Embla Carousel (8.6.x) for testimonials, Lucide React (0.477.x) for icons, Motion (12.x) for animations, next/og (ImageResponse) for dynamic OG images

### Existing code (key files)
- `src/data/services.ts` — Service data registry with processSteps, materials, costFactors, faqs, commonProblems, relatedServices per service
- `src/data/testimonials.ts` — Testimonials tagged by city and service type for filtering
- `src/data/business-info.ts` — NAP data, phone, certifications for schema and CTA elements
- `src/app/(marketing)/services/residential/[service]/page.tsx` — Stub page with generateStaticParams already wired to data
- `src/lib/seo/json-ld.tsx` — Existing JSON-LD builders (RoofingContractor, BreadcrumbList, AggregateRating, FAQPage) — extend with Service schema
- `src/lib/seo/metadata.ts` — generatePageMetadata helper
- `src/components/sections/faq-accordion.tsx` — FaqAccordion with Motion animations (reuse)
- `src/components/sections/testimonial-carousel.tsx` — TestimonialCarousel with Embla (reuse, add filter prop)
- `src/components/sections/badge-strip.tsx` — BadgeStrip (reuse as-is)
- `src/components/sections/section-wrapper.tsx` — SectionWrapper with tone variants (reuse)
- `src/components/sections/scroll-reveal.tsx` — ScrollReveal animation wrapper (reuse)
- `src/components/sections/cta-banner.tsx` — CTABanner (reuse)
- `src/components/forms/compact-quote-form.tsx` — Compact 3-field form (reuse in hero)
- `src/components/forms/quote-form.tsx` — Full 6-field form (reuse at bottom)
- `src/app/(marketing)/page.tsx` — Homepage as reference for page assembly pattern with JsonLd + sections

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionWrapper` (tone="dominant"|"secondary"): Dark-themed section container — use for every service page section
- `ScrollReveal`: Motion-based fade-in-up animation wrapper — wrap each section's content
- `CTABanner`: Full-width CTA strip with phone and quote button — use at bottom of each page
- `BadgeStrip`: Certification badge strip — reuse as-is after hero
- `CompactQuoteForm` + `QuoteForm`: Lead capture forms — embed compact in hero, full near bottom
- `FaqAccordion`: Motion-animated collapsible FAQ — reuse with combined FAQ data from services.ts + content files
- `TestimonialCarousel`: Embla carousel with star ratings — needs filter prop addition for service-specific filtering
- `HeroSection`: Existing hero component — may need variant or new component for service content hero and emergency crisis hero
- `JsonLd` component: Renders JSON-LD script tags — reuse with new service schema builder
- Service data in `services.ts`: processSteps, materials, costFactors, faqs, commonProblems, relatedServices already populated per service
- `generatePageMetadata()`: Metadata helper — already used in service page stub

### Established Patterns
- Server Components by default, `"use client"` only for interactivity (carousel, accordion, forms)
- `(marketing)` route group with shared layout (header, footer, breadcrumbs rendered automatically)
- cva+cn() for component variants
- kebab-case files, PascalCase components
- Page assembly: imports + JsonLd blocks at top + section components wrapped in SectionWrapper/ScrollReveal
- Data-driven content: pages pull from typed data registries, not inline JSX content

### Integration Points
- `src/app/(marketing)/services/residential/[service]/page.tsx` — Stub page to be replaced with full service page component
- `src/data/content/` — New directory for long-form content data files (4 files)
- `src/lib/seo/json-ld.tsx` — Add `buildServicePageJsonLd()` function
- `src/app/api/og/route.tsx` — New route for dynamic OG image generation
- `src/components/sections/` — New components needed: ProcessTimeline, MaterialCards, WarningSignsSection, CostFactorsSection, RelatedServicesRow, MidPageCTA, EmergencyHero, WhatToDoSection, InsuranceClaimsSection, StormDamageTypes
- `src/styles/globals.css` — Add emergency amber/red-gold CSS variable for emergency page accent

</code_context>

<specifics>
## Specific Ideas

- Expert neighbor voice: "When we get a call about a leak in one of Jersey City's historic brownstones, the first thing we check is the flashing around the parapet walls..."
- Local context woven naturally: salt air from Hudson River affecting materials, nor'easter storm damage patterns, brownstone-specific roofing challenges, Jersey City building code requirements
- Emergency page is fundamentally different UX — crisis user needs phone number immediately, not 3000 words. Phone-first hero, urgency color accent, reordered sections with "What To Do Right Now" prioritized
- Warning Signs section drives problem-search organic traffic: "water stains on ceiling", "shingle granules in gutters", "daylight visible from attic"
- Related Services cards strengthen the residential silo's internal linking graph before Phase 9's automated system
- Combined FAQ strategy (base + extended) gives 8-10 questions per page for maximum FAQ rich snippet surface area

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 05-residential-service-pages*
*Context gathered: 2026-03-24*
