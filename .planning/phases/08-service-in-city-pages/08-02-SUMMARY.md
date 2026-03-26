---
phase: 08-service-in-city-pages
plan: 02
subsystem: ui
tags: [react, server-components, tailwind, accessibility, lucide-react, next-link]

# Dependency graph
requires:
  - phase: 02-design-system
    provides: SectionWrapper, cva+cn pattern, color tokens, typography tokens
  - phase: 05-residential-service-pages
    provides: ServiceHero layout pattern, CompactQuoteForm, WarningSignsSection icon pattern
  - phase: 07-city-hub-pages
    provides: CityHubHero layout pattern, NeighborhoodBreakdown grid pattern, municipalities data
provides:
  - CityServiceHero section component with emergency variant
  - LocalServiceContext narrative section with internal links
  - NeighborhoodServiceInsights responsive grid with per-neighborhood cards
  - CitySpecificConcerns bulleted list with AlertTriangle icons
  - SiblingCitiesNav horizontal city navigation with aria-current
  - NeighborhoodServiceInsight type definition
  - 18 unit tests for all 5 components
affects: [08-service-in-city-pages, service-in-city-page-template]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-component-renderToStaticMarkup-testing, mock-client-components-in-server-tests]

key-files:
  created:
    - src/components/sections/city-service-hero.tsx
    - src/components/sections/local-service-context.tsx
    - src/components/sections/neighborhood-service-insights.tsx
    - src/components/sections/city-specific-concerns.tsx
    - src/components/sections/sibling-cities-nav.tsx
    - src/components/sections/__tests__/city-service-components.test.tsx
  modified:
    - src/data/types.ts
    - vitest.config.ts

key-decisions:
  - "Mock CompactQuoteForm in tests to avoid client component render issues with renderToStaticMarkup"
  - "Use createElement instead of JSX in test file to avoid needing React plugin in vitest"
  - "Added NeighborhoodServiceInsight type to types.ts since Plan 01 runs in parallel"
  - "Updated vitest config to include .tsx test files alongside .ts"

patterns-established:
  - "Server Component testing with renderToStaticMarkup + createElement + vi.mock for client deps"
  - "CityServiceHero follows CityHubHero own-section-wrapper pattern (no SectionWrapper)"
  - "SiblingCitiesNav uses prefetch={false} on all Link elements to avoid 11x96 prefetch overhead"

requirements-completed: [LOC-02, SEO-16]

# Metrics
duration: 3min
completed: 2026-03-26
---

# Phase 8 Plan 02: Service-in-City Section Components Summary

**5 Server Components (hero, narrative, neighborhood grid, concerns list, city nav) with 18 unit tests verifying single H1, aria-current, accessibility attributes, and emergency variant**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T15:51:42Z
- **Completed:** 2026-03-26T15:55:29Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Built CityServiceHero with two-column layout, population line, emergency variant swapping accent to #d4782f
- Built LocalServiceContext with paragraph splitting and internal links to parent service/city pages via next/link
- Built NeighborhoodServiceInsights with responsive 1/2/3-column grid matching Phase 7 NeighborhoodBreakdown pattern
- Built CitySpecificConcerns with AlertTriangle-prefixed bulleted list and optional intro
- Built SiblingCitiesNav with aria-current="page" on current city, prefetch={false} on 11 sibling links, correct href patterns for both residential and commercial categories
- 18 unit tests covering all 5 components with renderToStaticMarkup assertions

## Task Commits

Each task was committed atomically:

1. **Task 1: Build CityServiceHero, LocalServiceContext, and NeighborhoodServiceInsights** - `c38fd1a` (feat)
2. **Task 2: Build CitySpecificConcerns, SiblingCitiesNav, and component unit tests** - `ce6eb86` (feat)

## Files Created/Modified
- `src/components/sections/city-service-hero.tsx` - Hybrid hero combining ServiceHero and CityHubHero patterns with emergency variant
- `src/components/sections/local-service-context.tsx` - Long-form narrative section with internal links to parent pages
- `src/components/sections/neighborhood-service-insights.tsx` - Per-neighborhood cards in responsive grid with common issue highlights
- `src/components/sections/city-specific-concerns.tsx` - Bulleted list of concerns with AlertTriangle icons
- `src/components/sections/sibling-cities-nav.tsx` - Horizontal nav linking same service across all 12 municipalities
- `src/components/sections/__tests__/city-service-components.test.tsx` - 18 unit tests for all 5 components
- `src/data/types.ts` - Added NeighborhoodServiceInsight interface
- `vitest.config.ts` - Extended include pattern to support .tsx test files

## Decisions Made
- Mocked CompactQuoteForm in tests to avoid client component hooks (useForm, useState) failing in renderToStaticMarkup node environment
- Used createElement() calls instead of JSX in test file since vitest was configured for node environment without React JSX transform
- Added NeighborhoodServiceInsight type directly to types.ts since Plan 01 (which defines it in the plan spec) runs in parallel and may not have committed yet
- Updated vitest config include pattern from `*.test.ts` to `*.test.{ts,tsx}` to support component test files with JSX

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added NeighborhoodServiceInsight type to types.ts**
- **Found during:** Task 1 (NeighborhoodServiceInsights component)
- **Issue:** The NeighborhoodServiceInsight interface referenced in the plan context does not exist in types.ts yet (expected from Plan 01 running in parallel)
- **Fix:** Added the interface directly to src/data/types.ts
- **Files modified:** src/data/types.ts
- **Verification:** pnpm type-check passes
- **Committed in:** c38fd1a (Task 1 commit)

**2. [Rule 3 - Blocking] Extended vitest config for .tsx test files**
- **Found during:** Task 2 (component unit tests)
- **Issue:** vitest.config.ts only included `*.test.ts` files, not `*.test.tsx` needed for component tests
- **Fix:** Changed include pattern to `*.test.{ts,tsx}`
- **Files modified:** vitest.config.ts
- **Verification:** pnpm test passes with all 448 tests (including 18 new)
- **Committed in:** ce6eb86 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both auto-fixes were necessary for task completion. No scope creep.

## Issues Encountered
- pnpm install was required at start (worktree had no node_modules) -- resolved in under 3 seconds

## Known Stubs
None -- all 5 components accept props and render complete UI. No hardcoded empty data or placeholder text.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 5 section components ready for assembly into the service-in-city page template (Plan 15)
- Components follow established patterns: Server Components, no "use client", correct Tailwind tokens, 44px touch targets
- SiblingCitiesNav correctly generates href patterns for both residential and commercial service categories

## Self-Check: PASSED

All 7 created files verified on disk. Both task commits (c38fd1a, ce6eb86) verified in git log.

---
*Phase: 08-service-in-city-pages*
*Completed: 2026-03-26*
