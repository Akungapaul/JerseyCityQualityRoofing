---
phase: 01-project-scaffold-data-architecture
plan: 02
subsystem: routing
tags: [nextjs, app-router, generateStaticParams, dynamic-routes, stub-pages]

# Dependency graph
requires:
  - phase: 01-project-scaffold-data-architecture/01
    provides: "Project scaffold, types, utilities, business-info registry"
provides:
  - "18 App Router stub pages covering complete D-08 URL hierarchy"
  - "131 statically generated pages (9 static + 122 dynamic via generateStaticParams)"
  - "dynamicParams=false on all dynamic routes for strict 404 on unknown slugs"
  - "Async params pattern on all dynamic Server Components"
affects: [01-project-scaffold-data-architecture/03, 01-project-scaffold-data-architecture/04, 02-design-system-layout-shell]

# Tech tracking
tech-stack:
  added: [next@16.2.1, react@19.2.4, typescript@6.0.2, tailwindcss@4.2.2, "@tailwindcss/postcss@4.2.2", clsx@2.1.1, tailwind-merge@3.5.0, schema-dts@1.1.5]
  patterns: [async-params-pattern, generateStaticParams-with-hardcoded-slugs, dynamicParams-false]

key-files:
  created:
    - src/app/(marketing)/page.tsx
    - src/app/(marketing)/about/page.tsx
    - src/app/(marketing)/contact/page.tsx
    - src/app/(marketing)/gallery/page.tsx
    - src/app/(marketing)/testimonials/page.tsx
    - src/app/(marketing)/services/residential/[service]/page.tsx
    - src/app/(marketing)/services/residential/[service]/[city]/page.tsx
    - src/app/(marketing)/services/commercial/[service]/page.tsx
    - src/app/(marketing)/services/commercial/[service]/[city]/page.tsx
    - src/app/(marketing)/service-areas/page.tsx
    - src/app/(marketing)/service-areas/[city]/page.tsx
    - src/app/(marketing)/blog/page.tsx
    - src/app/(marketing)/blog/[slug]/page.tsx
    - src/app/(marketing)/guides/page.tsx
    - src/app/(marketing)/guides/cost/[slug]/page.tsx
    - src/app/(marketing)/guides/materials/[slug]/page.tsx
    - src/app/(marketing)/problems/page.tsx
    - src/app/(marketing)/problems/[slug]/page.tsx
  modified: []

key-decisions:
  - "Hardcoded slug arrays in generateStaticParams -- Plan 04 will replace with data registry function calls"
  - "Foundation files (scaffold, types, utilities) included alongside stub pages because Plan 01 runs in parallel worktree"
  - "Title casing via split-map-join for dynamic pages to render human-readable h1 from slugs"

patterns-established:
  - "Async params pattern: all dynamic pages accept params as Promise<T> and await them"
  - "dynamicParams=false on every dynamic route for strict 404 behavior"
  - "Stub page pattern: <main><h1>{title}</h1><p>under construction</p></main>"
  - "Service-in-city combination: flatMap service slugs over city slugs for generateStaticParams"

requirements-completed: [SEO-11, FNDN-04]

# Metrics
duration: 5min
completed: 2026-03-23
---

# Phase 1 Plan 2: App Router Stub Pages Summary

**Complete URL routing skeleton with 18 page files generating 131 static pages across residential/commercial service silos, city hubs, blog, guides, and problem pages**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-23T20:49:44Z
- **Completed:** 2026-03-23T20:54:59Z
- **Tasks:** 1
- **Files modified:** 39

## Accomplishments

- Created all 18 App Router page files matching the D-08 URL hierarchy
- 131 static pages generated at build time: 9 static + 48 residential service-in-city + 48 commercial service-in-city + 12 city hubs + 8 service pillars + 6 dynamic content pages
- Every dynamic route exports generateStaticParams and dynamicParams=false
- pnpm build and pnpm type-check both pass cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: Create all App Router stub pages with complete URL routing skeleton** - `f1d0a93` (feat)

## Files Created/Modified

- `src/app/(marketing)/page.tsx` - Homepage stub with "Jersey City Quality Roofing" h1
- `src/app/(marketing)/about/page.tsx` - About Us stub
- `src/app/(marketing)/contact/page.tsx` - Contact Us stub
- `src/app/(marketing)/gallery/page.tsx` - Project Gallery stub
- `src/app/(marketing)/testimonials/page.tsx` - Customer Testimonials stub
- `src/app/(marketing)/service-areas/page.tsx` - Service Areas hub stub
- `src/app/(marketing)/service-areas/[city]/page.tsx` - City hub pages for all 12 municipalities
- `src/app/(marketing)/services/residential/[service]/page.tsx` - 4 residential service pillar pages
- `src/app/(marketing)/services/residential/[service]/[city]/page.tsx` - 48 residential service-in-city pages
- `src/app/(marketing)/services/commercial/[service]/page.tsx` - 4 commercial service pillar pages
- `src/app/(marketing)/services/commercial/[service]/[city]/page.tsx` - 48 commercial service-in-city pages
- `src/app/(marketing)/blog/page.tsx` - Blog index stub
- `src/app/(marketing)/blog/[slug]/page.tsx` - Blog article dynamic pages
- `src/app/(marketing)/guides/page.tsx` - Guides hub stub
- `src/app/(marketing)/guides/cost/[slug]/page.tsx` - Cost guide dynamic pages
- `src/app/(marketing)/guides/materials/[slug]/page.tsx` - Materials guide dynamic pages
- `src/app/(marketing)/problems/page.tsx` - Problems hub stub
- `src/app/(marketing)/problems/[slug]/page.tsx` - Problem-to-solution dynamic pages
- `src/app/layout.tsx` - Root layout with font loading and metadata (foundation)
- `src/app/not-found.tsx` - 404 page (foundation)
- `src/app/error.tsx` - Error boundary (foundation)
- `src/app/(marketing)/layout.tsx` - Marketing route group layout (foundation)
- `src/data/types.ts` - All TypeScript interfaces (foundation)
- `src/data/business-info.ts` - Business info data registry (foundation)
- `src/lib/utils.ts` - cn() utility (foundation)
- `src/lib/constants.ts` - Site-wide constants (foundation)
- `src/types/index.ts` - Types re-export (foundation)
- `src/styles/globals.css` - Tailwind CSS 4 configuration (foundation)
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript strict configuration
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `next.config.ts` - Next.js configuration
- `.gitignore` - Git ignore rules

## Decisions Made

- **Hardcoded slug arrays**: generateStaticParams uses hardcoded arrays rather than data registry imports. Plan 04 will wire these to the data registries built in Plan 03. This avoids a circular dependency during scaffolding.
- **Foundation files included**: Because Plan 01 runs in a separate parallel worktree, this plan bootstrapped the entire project (Next.js, types, utilities) alongside the stub pages to ensure a working build. The parallel agent running Plan 01 creates the same foundation files in its worktree.
- **Title casing from slugs**: Dynamic pages convert slugs to display titles via split-map-join pattern (e.g., "roof-repair" becomes "Roof Repair"). This is a temporary approach for stubs; future phases will use data registry names.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded project foundation because Plan 01 dependency not available in worktree**
- **Found during:** Task 1 (before creating stub pages)
- **Issue:** Plan 01-02 depends on Plan 01-01 for project scaffold, types, and utilities. Running as a parallel agent in a separate worktree, these files did not exist.
- **Fix:** Created all foundation files (package.json, tsconfig, layout, types, utilities, etc.) following the exact Plan 01-01 specification, then created the 18 stub pages on top.
- **Files modified:** package.json, tsconfig.json, postcss.config.mjs, next.config.ts, src/app/layout.tsx, src/app/not-found.tsx, src/app/error.tsx, src/app/(marketing)/layout.tsx, src/lib/utils.ts, src/lib/constants.ts, src/data/types.ts, src/data/business-info.ts, src/types/index.ts, src/styles/globals.css, .gitignore
- **Verification:** pnpm type-check and pnpm build both pass
- **Committed in:** f1d0a93

**2. [Rule 3 - Blocking] Installed missing tailwindcss dependency**
- **Found during:** Task 1 (build verification)
- **Issue:** `@tailwindcss/postcss` requires `tailwindcss` as a resolved module, but it was only listed as a dev dependency peer, not directly installed.
- **Fix:** Ran `pnpm add tailwindcss` to install v4.2.2
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** pnpm build succeeds after installation
- **Committed in:** f1d0a93

---

**Total deviations:** 2 auto-fixed (both Rule 3 - blocking)
**Impact on plan:** Both fixes were necessary to create a buildable project. No scope creep -- foundation files follow Plan 01-01 specification exactly.

## Issues Encountered

- `pnpm create next-app` refused to run in a non-empty directory (existing .planning/ and CLAUDE.md files). Resolved by using manual package installation approach as described in Plan 01-01's fallback strategy.

## User Setup Required

None - no external service configuration required.

## Known Stubs

All 18 pages are intentional stubs per plan design. Each contains only an h1 and placeholder text. These stubs are the deliverable -- they establish the routing skeleton that Plans 03 and 04 will wire with data and metadata.

## Next Phase Readiness

- Complete URL routing skeleton is in place for Plans 03 (data registries) and 04 (SEO infrastructure) to wire into
- All dynamic routes ready to accept data registry function calls in place of hardcoded slug arrays
- 131 pages build successfully, proving the routing architecture is sound
- No blockers for subsequent plans

## Self-Check: PASSED

- All 18 stub page files: FOUND
- Task commit f1d0a93: FOUND
- SUMMARY.md: FOUND

---
*Phase: 01-project-scaffold-data-architecture*
*Completed: 2026-03-23*
