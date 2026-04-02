---
phase: 14-material-guide-service-cross-links
plan: 01
subsystem: seo
tags: [internal-linking, cross-links, material-guides, server-components]

# Dependency graph
requires:
  - phase: 09-blog-supporting-content
    provides: getMaterialRelatedServices function in internal-links.ts and 6 material guide pages
provides:
  - MaterialServiceCTA component for rendering service cross-links on material guides
  - Material guide pages wired to display related service links (residential and commercial)
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - MaterialServiceCTA follows ProblemSolutionCTA visual pattern with material-specific copy

key-files:
  created:
    - src/components/sections/material-service-cta.tsx
  modified:
    - src/app/(marketing)/guides/materials/[slug]/page.tsx

key-decisions:
  - "MaterialServiceCTA as Server Component (no use client) matching ProblemSolutionCTA pattern"
  - "Section placed between FAQ Accordion and Related Guides with tone=dominant"

patterns-established:
  - "Material-to-service cross-linking via getMaterialRelatedServices + MaterialServiceCTA"

requirements-completed: [SEO-05]

# Metrics
duration: 2min
completed: 2026-04-02
---

# Phase 14 Plan 01: Material Guide Service Cross-Links Summary

**MaterialServiceCTA component wired into all 6 material guide pages, rendering 2-3 related service cross-links per page with correct residential/commercial paths**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-02T04:08:08Z
- **Completed:** 2026-04-02T04:10:28Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created MaterialServiceCTA Server Component following ProblemSolutionCTA visual pattern with material-specific heading, service link pills, and phone CTA
- Wired getMaterialRelatedServices into material guide page template with proper conditional rendering
- All 6 material guide pages now display related service cross-links between FAQ and Related Guides sections
- Service link paths correctly route to residential (/services/residential/*) or commercial (/services/commercial/*) based on service category

## Task Commits

Each task was committed atomically:

1. **Task 1: Create MaterialServiceCTA component** - `637191a` (feat)
2. **Task 2: Wire getMaterialRelatedServices into material guide page template** - `04ab3b4` (feat)

## Files Created/Modified
- `src/components/sections/material-service-cta.tsx` - New Server Component rendering material-specific service cross-links with pills and phone CTA
- `src/app/(marketing)/guides/materials/[slug]/page.tsx` - Added getMaterialRelatedServices import/call and MaterialServiceCTA JSX section

## Decisions Made
- MaterialServiceCTA is a Server Component (no "use client") matching the ProblemSolutionCTA pattern for visual consistency
- New section placed at position 13.5 (between FAQ Accordion and Related Guides) with SectionWrapper tone="dominant" per UI-SPEC

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Vitest 4.1.1 does not support `-x` flag (plan specified it) - used `--bail 1` instead. All 22 tests passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 14 complete: the last v1.0 milestone audit gap is closed
- All material guide pages now have bidirectional service cross-links
- No blockers for future phases

## Self-Check: PASSED

- [x] src/components/sections/material-service-cta.tsx exists
- [x] src/app/(marketing)/guides/materials/[slug]/page.tsx exists
- [x] .planning/phases/14-material-guide-service-cross-links/14-01-SUMMARY.md exists
- [x] Commit 637191a exists (Task 1)
- [x] Commit 04ab3b4 exists (Task 2)

---
*Phase: 14-material-guide-service-cross-links*
*Completed: 2026-04-02*
