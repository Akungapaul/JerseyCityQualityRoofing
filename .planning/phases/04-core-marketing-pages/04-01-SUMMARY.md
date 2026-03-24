---
phase: 04-core-marketing-pages
plan: 01
subsystem: seo, data
tags: [json-ld, schema-dts, aggregate-rating, faq-page, nap-consistency, testimonials, structured-data]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: JSON-LD builder pattern, BUSINESS_INFO data, Testimonial type, FAQ type, constants
provides:
  - buildAggregateRatingJsonLd function for testimonial-based star ratings
  - buildFaqPageJsonLd function for FAQ structured data
  - buildContactPageJsonLd function with full NAP, hours, areas, payment
  - HOMEPAGE_FAQS data (6 Q/A pairs)
  - ABOUT_CONTENT data (company story, team, stats, insurance)
  - NAP consistency test suite
  - Testimonial data completeness test suite
affects: [04-core-marketing-pages, 05-residential-service-pages, 07-location-city-hub-pages]

# Tech tracking
tech-stack:
  added: []
  patterns: [schema-dts FAQPage type, AggregateRating nested in RoofingContractor, dual OpeningHoursSpecification array, reviewCount Integer type cast]

key-files:
  created:
    - src/data/homepage-faq.ts
    - src/data/about-content.ts
    - src/lib/__tests__/nap-consistency.test.ts
    - src/data/__tests__/testimonials.test.ts
  modified:
    - src/lib/seo/json-ld.tsx
    - src/lib/__tests__/json-ld.test.ts

key-decisions:
  - "schema-dts reviewCount requires Integer type cast (String() as unknown as number) for valid JSON-LD string output"
  - "buildContactPageJsonLd uses dual OpeningHoursSpecification array (weekday + Saturday) instead of single entry"
  - "ABOUT_CONTENT.stats.yearsInBusiness computed dynamically from BUSINESS_INFO.foundedYear"

patterns-established:
  - "AggregateRating nested inside RoofingContractor schema (not standalone)"
  - "FAQ data uses as const satisfies readonly FAQ[] pattern for type-safe literal data"
  - "NAP consistency tests verify single source of truth for business contact data"

requirements-completed: [SEO-03, SEO-14, CRO-06]

# Metrics
duration: 4min
completed: 2026-03-24
---

# Phase 4 Plan 01: Data & Schema Layer Summary

**Three JSON-LD builders (AggregateRating, FAQPage, ContactPage), homepage FAQ data, about page content, and NAP/testimonial test infrastructure**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-24T03:37:37Z
- **Completed:** 2026-03-24T03:41:44Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Three new JSON-LD builder functions for AggregateRating (computed from testimonials), FAQPage (Schema.org Question/Answer), and ContactPage (full RoofingContractor with dual hours, payment, areas)
- Homepage FAQ data file with 6 realistic Q/A pairs covering service areas, licensing, emergencies, roof types, estimates, and certifications
- About page content data with company narrative, team structure, dynamic stats, and insurance details
- NAP consistency test suite verifying BUSINESS_INFO as single source of truth
- Testimonial completeness test validating all 48 entries across 12 cities

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend JSON-LD builders** (TDD)
   - `a6bd405` (test) - failing tests for AggregateRating, FAQPage, ContactPage builders
   - `d4da002` (feat) - implement three JSON-LD builder functions
2. **Task 2: Content data files and test infrastructure** - `67afa62` (feat)

## Files Created/Modified
- `src/lib/seo/json-ld.tsx` - Added buildAggregateRatingJsonLd, buildFaqPageJsonLd, buildContactPageJsonLd exports
- `src/lib/__tests__/json-ld.test.ts` - Extended with 15 new tests across 3 describe blocks
- `src/data/homepage-faq.ts` - 6 FAQ pairs for homepage structured data
- `src/data/about-content.ts` - Company story, team, stats, insurance data
- `src/lib/__tests__/nap-consistency.test.ts` - 6 tests verifying BUSINESS_INFO consistency
- `src/data/__tests__/testimonials.test.ts` - 5 tests for testimonial data completeness

## Decisions Made
- schema-dts `reviewCount` field requires `Integer` type per the library's Schema.org typing, but valid JSON-LD output needs a string. Used `String() as unknown as number` cast to satisfy TypeScript while producing correct schema output.
- `buildContactPageJsonLd` returns an array of two `OpeningHoursSpecification` objects (Mon-Fri and Saturday) rather than a single entry, matching the actual business hours.
- `ABOUT_CONTENT.stats.yearsInBusiness` computes dynamically from `BUSINESS_INFO.foundedYear` to stay accurate without manual updates.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed schema-dts type incompatibility for reviewCount**
- **Found during:** Task 1 (type-check verification)
- **Issue:** schema-dts `Integer` type for `reviewCount` rejects plain `string`
- **Fix:** Applied type cast `String(testimonials.length) as unknown as number`
- **Files modified:** src/lib/seo/json-ld.tsx
- **Verification:** `pnpm type-check` passes, tests still pass, JSON-LD output unchanged
- **Committed in:** 67afa62 (included in Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minimal -- type cast is necessary for schema-dts compatibility. No scope creep.

## Issues Encountered
- Node modules were missing in worktree (parallel execution setup). Resolved by running `pnpm install` before tests.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- JSON-LD builders ready for Plan 02 section components to consume
- Homepage FAQ data ready for FAQ section rendering
- About page content data ready for about page assembly
- All data contracts established and verified by tests
- No blockers for Plan 02 (section components) or Plan 03 (page assemblies)

## Self-Check: PASSED

All 6 created/modified files verified on disk. All 3 task commits (a6bd405, d4da002, 67afa62) verified in git log.

---
*Phase: 04-core-marketing-pages*
*Completed: 2026-03-24*
