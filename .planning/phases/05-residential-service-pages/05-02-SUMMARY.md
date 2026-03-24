---
phase: 05-residential-service-pages
plan: 02
subsystem: ui
tags: [react, tailwind, motion, lucide-react, server-components, client-components]

# Dependency graph
requires:
  - phase: 02-design-system
    provides: SectionWrapper, ScrollReveal, button-variants, cn() utility, globals.css theme
  - phase: 03-lead-capture
    provides: CompactQuoteForm component with defaultServiceType prop
  - phase: 01-foundation
    provides: types.ts data interfaces (ProcessStep, Material, CostFactor)
provides:
  - ServiceHero section component (headline, subtitle, dual CTA, CompactQuoteForm)
  - ProcessTimeline section component (vertical steps with connectors and duration badges)
  - ServiceContentSection section component (prose paragraph renderer with h2)
  - MaterialCards section component (2-col grid with expandable pros/cons animation)
  - CostFactorsSection section component (divided list with impact badges)
  - WarningSignsSection section component (2-col icon card grid with dynamic Lucide icons)
  - WarningSign type added to src/data/types.ts
affects: [05-03, 05-04, 05-05, 06-commercial-service-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dynamic Lucide icon mapping via Record<string, LucideIcon> with AlertTriangle fallback"
    - "Independent multi-card expand/collapse via useState<Set<number>>"
    - "Impact badge styling via Record<impact, className> lookup"

key-files:
  created:
    - src/components/sections/service-hero.tsx
    - src/components/sections/process-timeline.tsx
    - src/components/sections/service-content-section.tsx
    - src/components/sections/material-cards.tsx
    - src/components/sections/cost-factors-section.tsx
    - src/components/sections/warning-signs-section.tsx
  modified:
    - src/data/types.ts

key-decisions:
  - "WarningSign type added to types.ts directly (Plan 01 not yet merged in parallel execution)"
  - "MaterialCards uses Set<number> for independent multi-card expansion (not single-open like FAQ)"
  - "WarningSignsSection maps 17 Lucide icons by string name with AlertTriangle fallback for unrecognized names"
  - "CostFactorsSection uses Record<impact, className> pattern for type-safe badge styling"

patterns-established:
  - "Dynamic icon resolution: Record<string, LucideIcon> mapping for data-driven icon names"
  - "Independent expand/collapse: useState<Set<number>> for multi-item accordion"
  - "Impact badge lookup: Record<union, className> for type-safe variant styling"

requirements-completed: [CONT-07]

# Metrics
duration: 3min
completed: 2026-03-24
---

# Phase 05 Plan 02: Standard-Template Section Components Summary

**6 section components for residential service pages: ServiceHero with dual CTA and CompactQuoteForm, ProcessTimeline with connector lines and duration badges, MaterialCards with Motion-animated expandable pros/cons, CostFactorsSection with impact badges, WarningSignsSection with dynamic Lucide icon mapping, and ServiceContentSection prose renderer**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-24T13:31:39Z
- **Completed:** 2026-03-24T13:34:39Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Built 6 section components that form the core section flow for standard service pages (Roof Repair, Replacement, Inspection)
- ServiceHero renders 60/40 desktop layout with headline, subtitle, dual CTA (quote button + phone link), and inline CompactQuoteForm
- MaterialCards implements independent multi-card expand/collapse using Motion AnimatePresence for pros/cons lists
- WarningSignsSection maps 17 Lucide icon names from data to React components with fallback handling

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ServiceHero, ProcessTimeline, and ServiceContentSection** - `ecda770` (feat)
2. **Task 2: Build MaterialCards, CostFactorsSection, and WarningSignsSection** - `d30d13b` (feat)

## Files Created/Modified
- `src/components/sections/service-hero.tsx` - Server Component: 60/40 hero with headline, subtitle, dual CTA, CompactQuoteForm
- `src/components/sections/process-timeline.tsx` - Server Component: vertical numbered timeline with connector lines, duration badges
- `src/components/sections/service-content-section.tsx` - Server Component: prose paragraph renderer with h2 heading and optional anchor id
- `src/components/sections/material-cards.tsx` - Client Component: 2-col grid with expandable pros/cons using Motion animation
- `src/components/sections/cost-factors-section.tsx` - Server Component: divided factor list with low/moderate/high impact badges
- `src/components/sections/warning-signs-section.tsx` - Server Component: 2-col icon card grid with 17-icon Lucide mapping
- `src/data/types.ts` - Added WarningSign interface (icon, title, description)

## Decisions Made
- WarningSign type added directly to types.ts since Plan 01 (which was supposed to add it) runs in parallel and is not yet merged. This is a blocking dependency fix per deviation Rule 3.
- MaterialCards uses `useState<Set<number>>` for independent multi-card expansion, distinct from FaqAccordion's single-open pattern, because multiple cards should be expandable simultaneously per the UI spec.
- WarningSignsSection maps 17 common Lucide icon names to components via a Record lookup, defaulting to AlertTriangle for unrecognized names, providing forward-compatible icon resolution from data files.
- CostFactorsSection uses a `Record<CostFactor["impact"], string>` pattern for impact badge class resolution, ensuring type safety and easy maintenance.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added WarningSign type to src/data/types.ts**
- **Found during:** Task 2 (WarningSignsSection component)
- **Issue:** WarningSign interface referenced in plan but not present in types.ts -- Plan 01 Task 1 (which adds it) runs in parallel and is not yet merged
- **Fix:** Added `export interface WarningSign { icon: string; title: string; description: string; }` to types.ts
- **Files modified:** src/data/types.ts
- **Verification:** npx tsc --noEmit passes
- **Committed in:** d30d13b (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary for TypeScript compilation. Identical to the type Plan 01 will add; no conflict expected on merge.

## Issues Encountered
- Pre-existing lint errors in compact-quote-form.tsx and quote-form.tsx (react-hooks/refs rule) -- these are not caused by this plan's changes and are out of scope per the deviation scope boundary rule.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully functional with typed props. They receive data from parent pages (not yet created).

## Next Phase Readiness
- All 6 standard-template section components are ready for use by Plan 03 (data/content files) and Plan 04/05 (page assembly)
- Components accept typed props from data registries; page templates will wire data to these components
- Emergency page components (EmergencyHero, WhatToDoSection, etc.) are separate from this plan and will be built in Plan 03

---
*Phase: 05-residential-service-pages*
*Completed: 2026-03-24*
