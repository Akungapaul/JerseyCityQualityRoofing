---
phase: 04-core-marketing-pages
plan: 02
subsystem: ui
tags: [embla-carousel, lucide-react, motion, tailwind, server-components, accessibility, aria]

# Dependency graph
requires:
  - phase: 02-design-system-layout-shell
    provides: SectionWrapper, ScrollReveal, CTABanner, Button/buttonVariants, color palette, typography
  - phase: 01-project-scaffold-data-architecture
    provides: data registries (services, municipalities, testimonials, business-info), types, constants
provides:
  - 16 reusable section components for marketing page assembly
  - TestimonialCarousel with Embla autoplay and full ARIA
  - FaqAccordion with Motion height animation and keyboard accessibility
  - GoogleMapEmbed with lazy-loading and API key fallback
  - HeroSection with split layout and dual CTAs
  - ServicesGrid with 8 data-driven service cards
  - CityCard/CityCardGrid with tiered layout from municipality data
  - ContactInfoColumn with NAP from BUSINESS_INFO
  - About page sections (story, team, certifications) from data registries
  - about-content.ts data registry for company narrative and team bios
affects: [04-03-page-assembly, 05-residential-services, 06-commercial-services, 07-city-hub-pages]

# Tech tracking
tech-stack:
  added: [embla-carousel-react@8.6.0, embla-carousel-autoplay@8.6.0]
  patterns: [Embla carousel with autoplay plugin, custom ARIA accordion with Motion, server-component-first section architecture]

key-files:
  created:
    - src/components/sections/hero-section.tsx
    - src/components/sections/badge-strip.tsx
    - src/components/sections/services-grid.tsx
    - src/components/sections/why-choose-us.tsx
    - src/components/sections/testimonial-carousel.tsx
    - src/components/sections/star-rating.tsx
    - src/components/sections/service-areas-overview.tsx
    - src/components/sections/faq-accordion.tsx
    - src/components/sections/google-map-embed.tsx
    - src/components/sections/city-card.tsx
    - src/components/sections/city-card-grid.tsx
    - src/components/sections/business-hours-table.tsx
    - src/components/sections/contact-info-column.tsx
    - src/components/sections/about-company-story.tsx
    - src/components/sections/about-team-section.tsx
    - src/components/sections/about-certifications.tsx
    - src/data/about-content.ts
  modified:
    - package.json
    - pnpm-lock.yaml

key-decisions:
  - "MUNICIPALITIES indexed via Record<string, { name: string }> cast for dynamic city slug lookups in TestimonialCarousel"
  - "about-content.ts created as blocking dependency (Rule 3) since Plan 01 did not include it"
  - "data-placeholder attributes used for hero image and team photos for future replacement"
  - "Pre-existing lint errors in Phase 3 form files logged to deferred-items.md (out of scope)"

patterns-established:
  - "Embla Carousel pattern: useEmblaCarousel with Autoplay plugin, loop, stopOnMouseEnter, ARIA carousel/slide roles"
  - "Custom accordion pattern: single-open state with AnimatePresence height animation, aria-expanded/aria-controls"
  - "Server component sections: SectionWrapper + ScrollReveal wrapping, data imports from registries, zero hardcoded NAP"

requirements-completed: [CORE-01, CORE-02, CORE-03, CORE-04, CRO-06, CRO-07, SEO-15]

# Metrics
duration: 5min
completed: 2026-03-24
---

# Phase 4 Plan 02: Section Components Summary

**16 reusable section components with Embla Carousel testimonials, accessible FAQ accordion, lazy-loaded Google Maps, and data-driven server components for all 4 marketing pages**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-24T03:38:02Z
- **Completed:** 2026-03-24T03:43:44Z
- **Tasks:** 2
- **Files modified:** 19

## Accomplishments
- Installed Embla Carousel (react + autoplay) and built TestimonialCarousel with full ARIA attributes, autoplay loop, and prev/next navigation
- Built FaqAccordion with single-open behavior, keyboard accessibility, Motion height animations, and proper aria-expanded/aria-controls
- Built GoogleMapEmbed with lazy-loaded iframe, API key fallback to no-key URL, and noscript fallback text
- Built 12 server components (HeroSection, BadgeStrip, ServicesGrid, WhyChooseUs, ServiceAreasOverview, CityCard, CityCardGrid, BusinessHoursTable, ContactInfoColumn, AboutCompanyStory, AboutTeamSection, AboutCertifications) all pulling data from typed registries with zero hardcoded NAP
- Created about-content.ts data registry with company story narrative and team member bios

## Task Commits

Each task was committed atomically:

1. **Task 1: Build interactive client components** - `e76e45e` (feat)
2. **Task 2: Build static server components** - `c4a4c95` (feat)

## Files Created/Modified
- `src/components/sections/star-rating.tsx` - Server component rendering 5 Lucide Star icons with role="img"
- `src/components/sections/testimonial-carousel.tsx` - Client component with Embla Carousel, autoplay, ARIA carousel roles
- `src/components/sections/faq-accordion.tsx` - Client component with Motion animations, single-open accordion
- `src/components/sections/google-map-embed.tsx` - Client component with lazy-loaded iframe and API key fallback
- `src/components/sections/hero-section.tsx` - Server component with split layout, dual CTAs, SVG placeholder
- `src/components/sections/badge-strip.tsx` - Server component with 5 certification badges on #33382b background
- `src/components/sections/services-grid.tsx` - Server component with 8 service cards in 2-column/4-column grid
- `src/components/sections/why-choose-us.tsx` - Server component with 4 stat cards
- `src/components/sections/service-areas-overview.tsx` - Server component with tiered city links
- `src/components/sections/city-card.tsx` - Server component for individual city card with featured variant
- `src/components/sections/city-card-grid.tsx` - Server component with tiered grid layout
- `src/components/sections/business-hours-table.tsx` - Server component with hours table and 24/7 emergency callout
- `src/components/sections/contact-info-column.tsx` - Server component with NAP data from BUSINESS_INFO
- `src/components/sections/about-company-story.tsx` - Server component rendering company narrative from data
- `src/components/sections/about-team-section.tsx` - Server component with team member cards and placeholder photos
- `src/components/sections/about-certifications.tsx` - Server component with cert cards and insurance info
- `src/data/about-content.ts` - Data registry with company story paragraphs and team member bios
- `package.json` - Added embla-carousel-react and embla-carousel-autoplay dependencies

## Decisions Made
- Cast MUNICIPALITIES to Record<string, { name: string }> for dynamic city slug lookup in TestimonialCarousel (as const satisfies prevents string indexing)
- Created about-content.ts data file as blocking dependency since Plan 01 did not create it (Rule 3 auto-fix)
- Used data-placeholder attributes on hero image and team photos for future real image replacement
- Logged pre-existing Phase 3 lint errors to deferred-items.md rather than fixing (out of scope)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created missing about-content.ts data file**
- **Found during:** Task 2 (AboutCompanyStory and AboutTeamSection components reference ABOUT_CONTENT from @/data/about-content)
- **Issue:** Plan references `import ABOUT_CONTENT from '@/data/about-content'` but the file did not exist in the codebase
- **Fix:** Created src/data/about-content.ts with typed AboutContent interface, company story narrative (5 paragraphs), and 3 team members
- **Files modified:** src/data/about-content.ts
- **Verification:** pnpm type-check passes, all components import successfully
- **Committed in:** c4a4c95 (Task 2 commit)

**2. [Rule 1 - Bug] Fixed MUNICIPALITIES indexing type error**
- **Found during:** Task 1 (TestimonialCarousel accessing MUNICIPALITIES by citySlug)
- **Issue:** MUNICIPALITIES uses `as const satisfies Record<string, Municipality>` so TypeScript treats keys as literal types, preventing string indexing
- **Fix:** Cast to Record<string, { name: string }> for dynamic lookup
- **Files modified:** src/components/sections/testimonial-carousel.tsx
- **Verification:** pnpm type-check passes
- **Committed in:** e76e45e (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for compilation. No scope creep.

## Issues Encountered
- Pre-existing lint errors in src/components/forms/compact-quote-form.tsx and src/components/forms/quote-form.tsx (react-hooks/refs rule violation). These are Phase 3 files not modified in this plan. Logged to .planning/phases/04-core-marketing-pages/deferred-items.md.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 16 section components ready for Plan 03 page assembly
- Components are self-contained and composable with SectionWrapper tone alternation
- Client components limited to 3 (testimonial-carousel, faq-accordion, google-map-embed) for minimal JS bundle
- Data registries (services, municipalities, testimonials, business-info, about-content) provide all content

## Self-Check: PASSED

All 17 created files verified present. Both commit hashes (e76e45e, c4a4c95) verified in git log.

---
*Phase: 04-core-marketing-pages*
*Completed: 2026-03-24*
