---
phase: 11-seo-data-consistency-fixes
plan: 02
subsystem: seo, ui
tags: [next.js, server-components, json-ld, breadcrumbs, silo-architecture, static-pages]

# Dependency graph
requires:
  - phase: 02-design-system-layout
    provides: GuideHero, SectionWrapper, ScrollReveal, CTABanner components
  - phase: 01-project-foundation
    provides: services data registry, JSON-LD builders, metadata utilities
provides:
  - /services root silo index page listing all 8 services in two categories
  - /services/residential category index page with 4 residential service cards
  - /services/commercial category index page with 4 commercial service cards
  - Breadcrumb 404 resolution on ~104 service and service-in-city pages
affects: [sitemap, navigation, breadcrumbs, seo-crawlability]

# Tech tracking
tech-stack:
  added: []
  patterns: [silo-index-page-pattern, category-index-page-pattern]

key-files:
  created:
    - src/app/(marketing)/services/page.tsx
    - src/app/(marketing)/services/residential/page.tsx
    - src/app/(marketing)/services/commercial/page.tsx
  modified: []

key-decisions:
  - "Silo index pages follow blog hub page pattern: GuideHero + prose + card grid + CTABanner + triple JSON-LD"
  - "Commercial cards on dominant background use bg-secondary (not bg-dominant) for visual contrast"
  - "Category index pages use 2-col grid with full shortDescription; root /services uses 4-col grid with truncated descriptions"

patterns-established:
  - "Silo index pattern: Server Component with GuideHero, intro prose, service card grid, CTA, triple JSON-LD (CollectionPage + RoofingContractor + BreadcrumbList)"
  - "Category page cards show full shortDescription at larger card size (p-6, text-[1.75rem] name) vs root cards showing first sentence only (p-5, text-lg name)"

requirements-completed: [FNDN-02, SEO-06]

# Metrics
duration: 3min
completed: 2026-03-31
---

# Phase 11 Plan 02: Silo Index Pages Summary

**Three silo index pages at /services, /services/residential, /services/commercial resolving breadcrumb 404s on ~104 pages with triple JSON-LD and hub page pattern**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T14:09:58Z
- **Completed:** 2026-03-31T14:13:04Z
- **Tasks:** 2
- **Files created:** 3

## Accomplishments
- Created /services root silo index listing all 8 services across two categories (residential + commercial) with category CTA links
- Created /services/residential category index with 4 residential service cards showing full descriptions
- Created /services/commercial category index with 4 commercial service cards showing full descriptions
- All three pages include triple JSON-LD (CollectionPage + RoofingContractor + BreadcrumbList), proper metadata, and heading hierarchy
- Breadcrumb links on ~104 service pillar and service-in-city pages now resolve to real content instead of 404s
- Production build succeeds with all three routes as static pages
- Full test suite passes (615 tests, 28 files)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /services root silo index page** - `44a8ca5` (feat)
2. **Task 2: Create /services/residential and /services/commercial category index pages** - `f7ebecd` (feat)

## Files Created/Modified
- `src/app/(marketing)/services/page.tsx` - Root silo index page listing all 8 services in residential + commercial grids with category CTA links
- `src/app/(marketing)/services/residential/page.tsx` - Residential category index with 4 enhanced service cards (full descriptions)
- `src/app/(marketing)/services/commercial/page.tsx` - Commercial category index with 4 enhanced service cards (full descriptions)

## Decisions Made
- Followed the blog hub page pattern exactly (GuideHero + prose + card grid + CTABanner + triple JSON-LD) as specified in the plan
- Commercial cards on the dominant-toned section use bg-secondary for visual contrast (per UI-SPEC card pattern)
- Category index pages use 2-col grid with full shortDescription for richer content; root /services uses 4-col grid with first-sentence truncation
- Only residential-specific icons imported in residential page; only commercial-specific icons imported in commercial page (tree-shaking friendly)

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all three pages render complete content from the existing services data registry.

## Issues Encountered

- node_modules missing in worktree; resolved with `pnpm install` before build verification

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All three silo index pages are live as static routes
- Breadcrumb navigation chain is now complete: Home > Services > [Category] > [Service] > [City]
- Plan 01 (if running in parallel) handles remaining Phase 11 fixes (JSON-LD @id anchor, OG route constants, sitemap entries)

## Self-Check: PASSED

- All 3 created files exist on disk
- Both task commits (44a8ca5, f7ebecd) verified in git log
- SUMMARY.md created at expected path

---
*Phase: 11-seo-data-consistency-fixes*
*Completed: 2026-03-31*
