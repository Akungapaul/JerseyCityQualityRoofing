---
phase: 05-residential-service-pages
plan: 04
subsystem: seo
tags: [json-ld, schema-dts, og-image, next-og, structured-data, css-variables]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: JSON-LD builder infrastructure (json-ld.tsx), data registries (services.ts, business-info.ts), types
  - phase: 02-design-system
    provides: Color palette variables in globals.css @theme block
provides:
  - buildServicePageJsonLd function for Service schema with provider, areaServed, hasOfferCatalog
  - Dynamic OG image route at /api/og with per-service social cards
  - Emergency accent CSS variables (--color-emergency-accent, --color-emergency-accent-hover)
affects: [05-residential-service-pages, 06-commercial-service-pages, 07-location-pages]

# Tech tracking
tech-stack:
  added: [next/og ImageResponse]
  patterns: [Service JSON-LD schema builder pattern, dynamic OG image generation via edge route]

key-files:
  created:
    - src/app/api/og/route.tsx
  modified:
    - src/lib/seo/json-ld.tsx
    - src/lib/__tests__/json-ld.test.ts
    - src/styles/globals.css

key-decisions:
  - "Renamed schema-dts Service import to ServiceSchema to avoid conflict with data Service type"
  - "OG image route uses edge runtime with Cormorant Bold fetched from Google Fonts CDN"
  - "Emergency accent variables placed inside @theme block for automatic Tailwind utility generation"

patterns-established:
  - "Service JSON-LD: buildServicePageJsonLd(service, canonicalUrl) returns WithContext<ServiceSchema> with provider, areaServed, hasOfferCatalog"
  - "OG image route: /api/og?service=slug generates branded 1200x630 PNG per service"

requirements-completed: [SEO-02]

# Metrics
duration: 3min
completed: 2026-03-24
---

# Phase 5 Plan 4: SEO Infrastructure Summary

**Service JSON-LD schema builder with provider/areaServed/hasOfferCatalog, dynamic OG image edge route, and emergency accent CSS variables**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-24T13:31:38Z
- **Completed:** 2026-03-24T13:35:20Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- buildServicePageJsonLd produces valid Service schema with RoofingContractor provider, 12-city areaServed, and OfferCatalog
- Dynamic OG image route at /api/og generates branded 1200x630 PNG social cards per service (dark bg, gold text, Cormorant font)
- Emergency accent CSS variables (--color-emergency-accent: #d4782f) declared in @theme block for Tailwind utility generation
- 9 new JSON-LD tests added, all 32 tests passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Add buildServicePageJsonLd to json-ld.tsx and extend tests** - `0d21468` (feat)
2. **Task 2: Create dynamic OG image route and add emergency accent CSS variable** - `98b376f` (feat)

## Files Created/Modified
- `src/lib/seo/json-ld.tsx` - Added buildServicePageJsonLd function with Service schema, provider (RoofingContractor), areaServed, hasOfferCatalog
- `src/lib/__tests__/json-ld.test.ts` - Extended with 9 new tests for buildServicePageJsonLd covering schema structure, provider, area served, offer catalog
- `src/app/api/og/route.tsx` - New edge route handler generating dynamic OG images with Cormorant Bold font, dark background, gold accents
- `src/styles/globals.css` - Added --color-emergency-accent and --color-emergency-accent-hover in @theme block

## Decisions Made
- Renamed schema-dts `Service` import to `ServiceSchema` to avoid naming conflict with the data `Service` type from `@/data/types`
- OG image route uses edge runtime with Cormorant Bold font fetched from Google Fonts CDN (gstatic.com TTF)
- Emergency accent CSS variables placed inside @theme block (not outside) to enable automatic Tailwind utility class generation (bg-emergency-accent, text-emergency-accent, etc.)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- pnpm vitest command not found initially -- resolved by running pnpm install then using npx vitest
- Pre-existing lint errors in compact-quote-form.tsx and quote-form.tsx (react-hooks/refs) -- out of scope, not modified in this plan

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Service JSON-LD builder ready for use in residential service page templates (Plans 01-03)
- OG image route ready for integration into page metadata via generateMetadata()
- Emergency accent CSS variable ready for emergency roofing page components
- All service pages in Phase 5 can now wire buildServicePageJsonLd + buildFaqPageJsonLd for complete structured data

## Self-Check: PASSED

All 4 source files exist, SUMMARY.md created, both task commits (0d21468, 98b376f) verified in git log.

---
*Phase: 05-residential-service-pages*
*Completed: 2026-03-24*
