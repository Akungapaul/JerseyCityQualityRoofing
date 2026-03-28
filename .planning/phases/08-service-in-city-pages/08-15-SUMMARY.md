---
phase: 08-service-in-city-pages
plan: 15
subsystem: ui, seo
tags: [next.js, generateStaticParams, json-ld, service-in-city, programmatic-seo, content-data]

# Dependency graph
requires:
  - phase: 08-01
    provides: Foundation types, JSON-LD builder, Wave 0 test scaffolds
  - phase: 08-02
    provides: CityServiceHero, SiblingCitiesNav, CitySpecificConcerns components
  - phase: 08-03 through 08-14
    provides: All 96 ServiceInCityContent data files (12 cities x 8 services)
provides:
  - Fully wired residential service-in-city page template (48 pages)
  - Fully wired commercial service-in-city page template (48 pages)
  - Bidirectional internal linking between parent service pages and city variants
  - Activated uniqueness and content structure tests (Wave 0)
affects: [phase-09-internal-linking, phase-10-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Nested CONTENT_MAP Record<citySlug, Record<serviceSlug, ServiceInCityContent>> for O(1) lookup"
    - "15-section template with dominant/secondary tone alternation per 08-UI-SPEC.md"
    - "Triple JSON-LD per page: Service (city-scoped), FAQPage, BreadcrumbList (5 items)"
    - "Parent service page downlinks to all 12 city variants via Cities We Serve section"

key-files:
  created: []
  modified:
    - src/app/(marketing)/services/residential/[service]/[city]/page.tsx
    - src/app/(marketing)/services/commercial/[service]/[city]/page.tsx
    - src/app/(marketing)/services/residential/[service]/page.tsx
    - src/app/(marketing)/services/commercial/[service]/page.tsx
    - src/data/__tests__/service-city-uniqueness.test.ts
    - src/data/__tests__/service-city-content-data.test.ts

key-decisions:
  - "Nested CONTENT_MAP keyed by citySlug then serviceSlug avoids barrel index and keeps imports explicit"
  - "Cities We Serve section added to both Standard and Emergency templates on residential parent page"
  - "Commercial page heading uses 'What Building Owners Need to Know' for commercial voice differentiation"
  - "Uniqueness tests validate 6 pairwise city combinations (all C(4,2)) for Jaccard < 30%"

patterns-established:
  - "15-section service-in-city template: CityServiceHero, BadgeStrip, LocalServiceContext, ProcessTimeline, NeighborhoodServiceInsights, MaterialCards, CitySpecificConcerns, MidPageCTA, CostFactorsSection, LocalCaseScenario, TestimonialCarousel, SiblingCitiesNav, FaqAccordion, QuoteForm, CTABanner"
  - "Parent-to-child city linking via Cities We Serve section with prefetch={false}"

requirements-completed: [LOC-02, LOC-03, LOC-04, SEO-16]

# Metrics
duration: 8min
completed: 2026-03-28
---

# Phase 8 Plan 15: Final Assembly Summary

**Wire all 96 service-in-city pages with 15-section templates, triple JSON-LD, bidirectional internal linking, and activated content uniqueness/structure tests**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-28T23:07:25Z
- **Completed:** 2026-03-28T23:15:30Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Replaced stub residential and commercial [city]/page.tsx with full 15-section templates importing all 96 content files
- All 96 service-in-city pages generate successfully via `pnpm build`
- Each page has 3 JSON-LD blocks (Service with city-scoped areaServed, FAQPage, BreadcrumbList with 5-item chain)
- Emergency roofing pages swap to emergency hero variant with amber accent on ProcessTimeline and MidPageCTA
- Parent residential and commercial service pages now link down to all 12 city variants (addresses RESEARCH.md Pitfall 5)
- Uniqueness tests activated: 6 pairwise Jaccard < 30% tests + 2 case scenario tests all pass
- Content structure tests activated: 4 sample files validated for word counts, FAQ counts, slug validity, cumulative >= 2500 words
- Full test suite: 524 tests across 16 files, all green

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire residential and commercial page templates with full 15-section layout** - `cd2913f` (feat)
2. **Task 2: Add city downlinks to parent service pages and activate Wave 0 tests** - `28ae550` (feat)

## Files Created/Modified
- `src/app/(marketing)/services/residential/[service]/[city]/page.tsx` - Full 15-section residential service-in-city template with 48 content imports, CONTENT_MAP, triple JSON-LD, emergency variant support
- `src/app/(marketing)/services/commercial/[service]/[city]/page.tsx` - Full 15-section commercial service-in-city template with 48 content imports, CONTENT_MAP, triple JSON-LD
- `src/app/(marketing)/services/residential/[service]/page.tsx` - Added Cities We Serve downlinks section (both Standard and Emergency templates), added Link + getAllMunicipalities imports
- `src/app/(marketing)/services/commercial/[service]/page.tsx` - Added Cities We Serve downlinks section, added Link + getAllMunicipalities imports
- `src/data/__tests__/service-city-uniqueness.test.ts` - Unskipped, imports 4 city content files, tests 6 pairwise narrative + 2 case scenario Jaccard < 30%
- `src/data/__tests__/service-city-content-data.test.ts` - Unskipped, imports 4 diverse sample files, validates all word counts, FAQ counts, slug validity, and totalProseWords >= 2500

## Decisions Made
- Nested CONTENT_MAP (Record<citySlug, Record<serviceSlug, ServiceInCityContent>>) chosen over flat map to keep lookup O(1) without barrel index
- Cities We Serve section added to EmergencyTemplate as well as StandardTemplate on residential parent page, since emergency roofing also has 12 city variants
- Commercial LocalServiceContext heading uses "What Building Owners Need to Know" instead of "What Local Homeowners Need to Know" for commercial voice
- Selected 4 representative cities for uniqueness tests: Jersey City (Tier 1), Hoboken (Tier 1), Bayonne (Tier 1), Secaucus (Tier 2) -- covering the most diverse content

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all 96 pages are fully wired with real content data files, section components, and JSON-LD schemas.

## Issues Encountered

None - type check, build, and all 524 tests passed on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 96 service-in-city pages fully functional with unique content, complete SEO markup, and proper internal linking
- Bidirectional linking complete: parent service pages link down to city variants, city variants link back via LocalServiceContext
- Silo structure complete for Phase 9 internal linking work
- Content uniqueness validated at < 30% Jaccard similarity between city pairs

## Self-Check: PASSED

All 6 modified files exist. Both task commits (cd2913f, 28ae550) verified in git log.

---
*Phase: 08-service-in-city-pages*
*Completed: 2026-03-28*
