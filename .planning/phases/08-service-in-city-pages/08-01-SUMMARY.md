---
phase: 08-service-in-city-pages
plan: 01
subsystem: data, seo, testing
tags: [typescript, schema-dts, json-ld, vitest, jaccard-similarity, service-in-city]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: types.ts base interfaces, json-ld.tsx builder pattern, vitest test infrastructure
  - phase: 05-residential-service-pages
    provides: ServiceContent interface pattern, content test patterns
  - phase: 07-city-hub-pages
    provides: CityHubContent interface, Municipality data, buildCityRoofingContractorJsonLd pattern
provides:
  - ServiceInCityContent interface (12 fields) for all service-in-city content data files
  - NeighborhoodServiceInsight interface (3 fields) for per-neighborhood service insights
  - buildServiceInCityJsonLd function producing city-scoped Service JSON-LD
  - Wave 0 test scaffolds for content uniqueness (Jaccard), structure validation, cumulative word count, and SEO correctness
affects: [08-02 through 08-15 content tiers, service-in-city page components, service-in-city resolver]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ServiceInCityContent data interface with 12 long-form prose fields totaling >= 2500 words per content file"
    - "buildServiceInCityJsonLd with city-scoped areaServed referencing city hub @id"
    - "Jaccard word-set similarity for cross-city content uniqueness validation (< 30% threshold)"
    - "totalProseWords cumulative word count helper for content depth enforcement (>= 2500 words)"

key-files:
  created:
    - src/data/__tests__/service-city-uniqueness.test.ts
    - src/data/__tests__/service-city-content-data.test.ts
    - src/data/__tests__/service-city-seo.test.ts
  modified:
    - src/data/types.ts
    - src/lib/seo/json-ld.tsx

key-decisions:
  - "ServiceInCityContent uses 12 distinct prose fields (not a single blob) to enforce structured content depth and enable per-field word count validation"
  - "Content data files must provide >= 2500 prose words; resolver adds ~527 words to reach 3000+ on rendered pages"
  - "Jaccard similarity threshold set at 30% -- cities sharing > 30% word overlap in narratives are flagged as too similar"
  - "Test scaffolds use describe.skip for content-dependent suites; unskipped as tiers are created"

patterns-established:
  - "ServiceInCityContent interface: all service-in-city content files must satisfy this shape"
  - "totalProseWords helper: standard way to measure cumulative content depth across all prose fields"
  - "jaccardSimilarity helper: standard way to measure cross-city content uniqueness"
  - "buildServiceInCityJsonLd: city-scoped Service schema with areaServed City and provider @id linking to organization"

requirements-completed: [LOC-03, LOC-04, SEO-16]

# Metrics
duration: 3min
completed: 2026-03-26
---

# Phase 8 Plan 01: Foundation Layer Summary

**ServiceInCityContent interface with 12 long-form prose fields, buildServiceInCityJsonLd with city-scoped areaServed, and Wave 0 test scaffolds enforcing content uniqueness (Jaccard), cumulative word count (>= 2500), and SEO correctness**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T15:51:03Z
- **Completed:** 2026-03-26T15:54:13Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- ServiceInCityContent interface with 12 fields and NeighborhoodServiceInsight with 3 fields exported from types.ts
- buildServiceInCityJsonLd function producing Service JSON-LD with city-scoped areaServed and provider @id referencing organization
- Three Wave 0 test scaffolds: Jaccard uniqueness, content structure with totalProseWords (>= 2500 threshold), and SEO validation (JSON-LD, breadcrumbs, FAQ schema)
- All 443 tests passing, TypeScript compilation clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Add ServiceInCityContent and NeighborhoodServiceInsight interfaces** - `767bb2f` (feat)
2. **Task 2: Add buildServiceInCityJsonLd and create Wave 0 test scaffolds** - `c03db50` (feat)

## Files Created/Modified
- `src/data/types.ts` - Added ServiceInCityContent (12 fields) and NeighborhoodServiceInsight (3 fields) interfaces
- `src/lib/seo/json-ld.tsx` - Added buildServiceInCityJsonLd function with city-scoped areaServed
- `src/data/__tests__/service-city-uniqueness.test.ts` - Jaccard similarity helper and cross-city comparison scaffold
- `src/data/__tests__/service-city-content-data.test.ts` - wordCount, totalProseWords helpers and content structure scaffold
- `src/data/__tests__/service-city-seo.test.ts` - JSON-LD builder, breadcrumb chain, and FAQ schema tests

## Decisions Made
- ServiceInCityContent uses 12 distinct prose fields (not a single blob) to enforce structured content depth and enable per-field word count validation
- Content data files must provide >= 2500 prose words; resolver adds ~527 words to reach 3000+ on rendered pages
- Jaccard similarity threshold set at 30% for cross-city uniqueness validation
- Test scaffolds use describe.skip for content-dependent suites, to be unskipped as content tiers are created

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript type assertion errors in SEO test file**
- **Found during:** Task 2 (service-city-seo.test.ts)
- **Issue:** schema-dts types are readonly arrays; direct `as Array<Record<string, unknown>>` cast fails TypeScript strict mode
- **Fix:** Changed to double-cast through `unknown` first: `as unknown as Array<Record<string, unknown>>`
- **Files modified:** src/data/__tests__/service-city-seo.test.ts
- **Verification:** pnpm type-check exits 0, all tests pass
- **Committed in:** c03db50 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Minor type assertion fix necessary for TypeScript strict mode compatibility. No scope creep.

## Issues Encountered
None beyond the type assertion fix documented above.

## Known Stubs
None - all interfaces are complete type definitions, all test helpers are functional, and content-dependent test suites are intentionally skipped (not stubbed) until content data files are created by Plans 02-15.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- ServiceInCityContent interface ready for all content data files (Plans 02-15)
- buildServiceInCityJsonLd ready for service-in-city page components
- Wave 0 test scaffolds ready to be unskipped as each content tier is created
- All existing tests continue to pass (443 total)

## Self-Check: PASSED

All 5 created/modified files verified on disk. Both task commits (767bb2f, c03db50) verified in git log.

---
*Phase: 08-service-in-city-pages*
*Completed: 2026-03-26*
