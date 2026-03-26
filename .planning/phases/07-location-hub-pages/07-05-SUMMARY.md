---
phase: 07-location-hub-pages
plan: 05
subsystem: ui
tags: [nextjs, server-components, json-ld, seo, city-pages, programmatic-seo]

# Dependency graph
requires:
  - phase: 07-01
    provides: City content data files (12 CityHubContent objects)
  - phase: 07-02
    provides: City hub section components (CityHubHero, LocalExpertise, etc.)
  - phase: 07-03
    provides: Tier 2 city content files (Union City, West New York, Secaucus, Kearny)
  - phase: 07-04
    provides: Tier 3 city content files (Harrison, East Newark, Guttenberg, Weehawken)
provides:
  - Complete city hub page template at /service-areas/[city] with 14-section layout
  - All 12 municipality pages generated as static HTML
  - RoofingContractor, BreadcrumbList, and FAQPage JSON-LD on every city page
  - City-specific testimonials with fallback logic
  - Forward links to service-in-city pages via ServicesInCityGrid
affects: [08-service-in-city-pages, 09-internal-linking]

# Tech tracking
tech-stack:
  added: []
  patterns: [CITY_CONTENT_MAP record lookup, city-specific testimonial fallback, triple JSON-LD per page]

key-files:
  created: []
  modified:
    - src/app/(marketing)/service-areas/[city]/page.tsx

key-decisions:
  - "CityHubHero renders its own section wrapper -- no outer SectionWrapper to avoid double-wrapping"
  - "City testimonials use 3+ threshold: city-specific if available, global TESTIMONIALS pool as fallback"
  - "Three JSON-LD blocks per city page: RoofingContractor with @id, BreadcrumbList, FAQPage"

patterns-established:
  - "CITY_CONTENT_MAP: Record<string, CityHubContent> pattern for O(1) content lookup by slug"
  - "Triple JSON-LD per location page: entity + breadcrumb + FAQ for maximum rich result coverage"

requirements-completed: [LOC-01, LOC-05, SEO-01, SEO-04]

# Metrics
duration: 3min
completed: 2026-03-26
---

# Phase 7 Plan 05: City Hub Page Assembly Summary

**Complete 14-section city hub page template wiring all 12 municipalities with JSON-LD schemas, city-specific testimonials, and content data maps -- awaiting visual verification**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T04:02:52Z
- **Completed:** 2026-03-26T04:05:42Z (Task 1 only; Task 2 is checkpoint:human-verify)
- **Tasks:** 1/2 (Task 2 is visual verification checkpoint)
- **Files modified:** 1

## Accomplishments
- Rewrote stub city hub page into full 14-section template following residential service page pattern
- Wired CITY_CONTENT_MAP with all 12 municipality content data files for O(1) lookup
- Added three JSON-LD schema blocks per page: RoofingContractor with @id, BreadcrumbList, FAQPage
- City-specific testimonials with 3+ threshold fallback to global pool
- Production build verified: all 12 static city hub pages generated successfully (133 total pages)

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite city hub page with full 14-section template, JSON-LD, content map, and metadata** - `458e81a` (feat)
2. **Task 2: Visual verification of city hub pages** - PENDING (checkpoint:human-verify)

## Files Created/Modified
- `src/app/(marketing)/service-areas/[city]/page.tsx` - Complete city hub page with 14 sections, CITY_CONTENT_MAP, triple JSON-LD, city-specific testimonials

## Decisions Made
- CityHubHero already renders its own `<section>` with bg-dominant and max-width container, so no outer SectionWrapper to avoid double-wrapping (plan explicitly warned about this)
- City testimonials use 3+ threshold: prefer city-specific testimonials when at least 3 exist, otherwise fall back to full TESTIMONIALS pool (per LOC-05)
- Three JSON-LD blocks per city page for maximum rich result coverage: RoofingContractor with @id entity, BreadcrumbList for navigation, FAQPage for FAQ rich results

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed SectionWrapper around CityHubHero to prevent double-wrapping**
- **Found during:** Task 1
- **Issue:** Plan template wrapped CityHubHero in SectionWrapper, but CityHubHero already renders its own `<section className="bg-dominant py-16...">` with max-width container -- would create nested sections with double padding
- **Fix:** Rendered CityHubHero directly without SectionWrapper, as the plan's own note suggested
- **Files modified:** src/app/(marketing)/service-areas/[city]/page.tsx
- **Verification:** Build passes, no duplicate section nesting
- **Committed in:** 458e81a

---

**Total deviations:** 1 auto-fixed (1 bug prevention)
**Impact on plan:** Minor -- plan itself noted this as a possibility and provided guidance

## Issues Encountered
None -- plan executed cleanly.

## Known Stubs
None -- all sections wired to real content data and components.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- City hub pages are complete and verified via build
- Forward links to /services/[category]/[service]/[city] are in place (ServicesInCityGrid)
- Phase 8 (service-in-city pages) can proceed with these hub pages as parent context
- Visual verification pending (Task 2 checkpoint)

## Self-Check: PASSED

- FOUND: src/app/(marketing)/service-areas/[city]/page.tsx
- FOUND: commit 458e81a
- FOUND: .planning/phases/07-location-hub-pages/07-05-SUMMARY.md

---
*Phase: 07-location-hub-pages*
*Completed: 2026-03-26 (Task 1 only)*
