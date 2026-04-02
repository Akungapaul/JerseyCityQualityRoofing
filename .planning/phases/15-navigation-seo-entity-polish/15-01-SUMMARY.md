---
phase: 15-navigation-seo-entity-polish
plan: 01
subsystem: seo
tags: [json-ld, entity-graph, og-image, schema-org, open-graph]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "JSON-LD builder functions, BASE_URL constant, service/municipality data registries"
  - phase: 05-residential-service-pages
    provides: "buildServicePageJsonLd function and service page templates"
  - phase: 07-city-hub-pages
    provides: "getMunicipality function and municipality data"
provides:
  - "Entity-anchored provider (@id) in buildServicePageJsonLd for organization graph merging"
  - "City-aware OG image route rendering 'Service in City' titles for 96 service-in-city pages"
  - "OG route test scaffold with 5 param combination tests"
affects: [service-pages, service-in-city-pages, og-images, seo-entity-graph]

# Tech tracking
tech-stack:
  added: []
  patterns: ["@id entity anchor on all provider objects for JSON-LD graph merging"]

key-files:
  created:
    - src/app/api/og/__tests__/og-route.test.ts
  modified:
    - src/lib/seo/json-ld.tsx
    - src/lib/__tests__/json-ld.test.ts
    - src/app/api/og/route.tsx

key-decisions:
  - "@id added only to nested provider object, not top-level Service schema, matching buildServiceInCityJsonLd and buildCityRoofingContractorJsonLd patterns"

patterns-established:
  - "All JSON-LD provider objects include @id entity anchor for cross-page graph resolution"

requirements-completed: [SEO-02, SEO-04, SEO-09]

# Metrics
duration: 2min
completed: 2026-04-02
---

# Phase 15 Plan 01: JSON-LD Entity Anchor and City-Aware OG Images Summary

**Added @id entity anchor to service page JSON-LD provider and extended OG image route to render city-specific titles for 96 service-in-city pages**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-02T15:26:02Z
- **Completed:** 2026-04-02T15:28:03Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- buildServicePageJsonLd provider now includes `@id: BASE_URL/#organization` entity anchor, completing the JSON-LD entity graph across all 8 service pillar pages
- OG image route reads `?city=` parameter and renders "Service Name in City Name" title when both service and city params present
- OG route remains fully backward compatible -- absent city param produces identical output
- Test coverage added: 1 new JSON-LD test for @id + 5 new OG route tests for param combinations (635 total tests pass)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add @id entity anchor to buildServicePageJsonLd and create OG route test scaffold** - `aefb96a` (feat)
2. **Task 2: Extend OG image route to render city name from ?city= parameter** - `73f40a8` (feat)

## Files Created/Modified
- `src/lib/seo/json-ld.tsx` - Added `@id` entity anchor to buildServicePageJsonLd provider object
- `src/lib/__tests__/json-ld.test.ts` - Added test verifying @id entity anchor on service page provider
- `src/app/api/og/route.tsx` - Added getMunicipality import, city slug reading, city-aware title rendering
- `src/app/api/og/__tests__/og-route.test.ts` - New test file with 5 OG route tests (basic, service param, city+service, unknown city, missing service)

## Decisions Made
- @id added only to the nested provider object within buildServicePageJsonLd, not to the top-level Service schema -- matches the existing pattern in buildServiceInCityJsonLd (line 245) and buildCityRoofingContractorJsonLd (line 180)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All JSON-LD provider objects across the site now consistently include @id entity anchors for graph merging
- 96 service-in-city pages can now generate unique OG images by passing both `?service=` and `?city=` params
- Ready for Plan 02 (navigation and remaining SEO polish)

## Self-Check: PASSED

All 4 files verified present. Both commit hashes (aefb96a, 73f40a8) verified in git log. 635 tests green.

---
*Phase: 15-navigation-seo-entity-polish*
*Completed: 2026-04-02*
