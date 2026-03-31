---
phase: 12-content-data-linking-fixes
plan: 01
subsystem: content-data, seo, cro
tags: [blog-silo, internal-links, content-registry, floating-cta, vitest]

# Dependency graph
requires:
  - phase: 09-blog-supporting-content
    provides: blog articles, internal-links.ts, content registry
  - phase: 10-conversion-performance-polish
    provides: FloatingCTA component with IntersectionObserver
provides:
  - Corrected blog silo data for preventative-roof-maintenance-checklist
  - Service and city node registration in initializeContentRegistry()
  - Contact page id="quote-form" for FloatingCTA scroll target
affects: [content-data, internal-linking, contact-page, floating-cta]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Content registry registers ALL content node types (blog, cost, material, problem, service, city)"

key-files:
  created:
    - src/data/__tests__/blog-silo-links.test.ts
    - src/app/__tests__/contact-quote-form-id.test.tsx
  modified:
    - src/data/content/blog/preventative-roof-maintenance-checklist.ts
    - src/lib/internal-links.ts
    - src/lib/__tests__/internal-links.test.ts
    - src/app/(marketing)/contact/page.tsx

key-decisions:
  - "SectionWrapper id='quote-form' on contact page form section (not on QuoteForm component) for consistent FloatingCTA IntersectionObserver pattern"
  - "City nodes use /service-areas/{slug} path pattern matching existing route structure"
  - "Service nodes map relatedServices from SERVICES data to relatedServiceSlugs in ContentNode"

patterns-established:
  - "initializeContentRegistry covers all 7 content types: blog, cost-guide, material-guide, problem, service, city, service-in-city"

requirements-completed: [CONT-01, SEO-05, CRO-03]

# Metrics
duration: 2min
completed: 2026-03-31
---

# Phase 12 Plan 01: Content Data and Linking Fixes Summary

**Fixed blog silo 404 (residential->commercial), registered 8 service + 12 city nodes in content registry, added id="quote-form" to contact page for FloatingCTA**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-31T16:03:06Z
- **Completed:** 2026-03-31T16:05:45Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Fixed preventative-roof-maintenance-checklist siloCategory from 'residential' to 'commercial', eliminating a 404 pillar link
- Registered 8 service nodes and 12 city nodes in initializeContentRegistry(), enabling getProblemRelatedServices() and getMaterialRelatedServices() to return actual results
- Added id="quote-form" to contact page SectionWrapper so FloatingCTA scrolls to the form instead of self-linking
- Full TDD cycle: 8 new test cases (RED confirmed bugs, GREEN confirmed fixes), 628 total tests pass

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Wave 0 test scaffolds for all three fixes** - `1d4db7c` (test)
2. **Task 2: Apply all three fixes -- blog silo data, registry nodes, contact page id** - `61f4842` (fix)

## Files Created/Modified
- `src/data/__tests__/blog-silo-links.test.ts` - New test file validating blog silo category matches SERVICES data
- `src/app/__tests__/contact-quote-form-id.test.tsx` - New test file validating id="quote-form" presence in contact page
- `src/lib/__tests__/internal-links.test.ts` - Added 3 tests for initializeContentRegistry service/city node registration
- `src/data/content/blog/preventative-roof-maintenance-checklist.ts` - Changed siloCategory to 'commercial' and parentPillarLink to /services/commercial/roof-maintenance
- `src/lib/internal-links.ts` - Added SERVICES and MUNICIPALITIES imports; registered 8 service + 12 city nodes in initializeContentRegistry()
- `src/app/(marketing)/contact/page.tsx` - Added id="quote-form" to SectionWrapper wrapping the form section

## Decisions Made
- Used SectionWrapper id="quote-form" instead of wrapping div to match the pattern used by CompactQuoteForm on the homepage
- City nodes use empty relatedServiceSlugs (per RESEARCH.md recommendation) since service-in-city pages handle that cross-reference
- City path uses /service-areas/{slug} matching existing route structure

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three integration gaps from the v1.0 milestone audit are closed
- Blog silo linking now produces valid routes for all 5 silo-supporting articles
- Internal linking system returns real service links for problem and material pages
- FloatingCTA works correctly on /contact page

## Known Stubs
None - all fixes are complete data corrections with no placeholder values.

## Self-Check: PASSED

All 7 files verified present. Both task commits (1d4db7c, 61f4842) verified in git log.

---
*Phase: 12-content-data-linking-fixes*
*Completed: 2026-03-31*
