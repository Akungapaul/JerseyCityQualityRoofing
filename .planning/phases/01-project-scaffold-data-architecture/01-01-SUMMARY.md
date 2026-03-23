---
phase: 01-project-scaffold-data-architecture
plan: 01
subsystem: infra
tags: [nextjs, typescript, tailwindcss, fonts, data-types]

# Dependency graph
requires: []
provides:
  - Next.js 16 project scaffold with TypeScript strict mode
  - Tailwind CSS 4 with CSS-first configuration
  - Root layout with Cormorant and Cormorant Garamond font loading
  - Shared TypeScript interfaces for Municipality, Service, Testimonial, BusinessInfo, ServiceCityContent
  - Business info data registry (NAP, certifications, license, insurance)
  - cn() utility, site constants (SITE_NAME, BASE_URL, PHONE_NUMBER)
  - Error and 404 pages with proper copy
  - Marketing route group with pass-through layout
  - Empty directory stubs for components (ui, sections, layout, forms) and API routes
affects: [01-02, 01-03, 02, 03, 04, 05, 06, 07, 08, 09, 10]

# Tech tracking
tech-stack:
  added: [next@16.2.1, react@19.2.4, typescript@6.0.2, tailwindcss@4.2.2, "@tailwindcss/postcss@4.2.2", schema-dts@1.1.5, clsx@2.1.1, tailwind-merge@3.5.0, eslint@9.39.4, eslint-config-next@16.2.1]
  patterns: [css-first-tailwind, next-font-google, cn-utility, typed-data-registries]

key-files:
  created:
    - package.json
    - tsconfig.json
    - next.config.ts
    - postcss.config.mjs
    - eslint.config.mjs
    - src/app/layout.tsx
    - src/app/not-found.tsx
    - src/app/error.tsx
    - src/app/(marketing)/layout.tsx
    - src/app/(marketing)/page.tsx
    - src/styles/globals.css
    - src/lib/utils.ts
    - src/lib/constants.ts
    - src/data/types.ts
    - src/data/business-info.ts
    - src/types/index.ts
  modified: []

key-decisions:
  - "Used manual install instead of create-next-app due to non-empty directory (planning artifacts)"
  - "ESLint 9 with native flat config import from eslint-config-next/core-web-vitals (ESLint 10 has circular reference bug with FlatCompat)"
  - "next lint command removed in Next.js 16 -- using eslint . directly"
  - "Added stub homepage at (marketing)/page.tsx so dev server renders"

patterns-established:
  - "CSS-first Tailwind 4: @import 'tailwindcss' + @theme block in globals.css"
  - "Font loading: next/font/google with CSS variables --font-heading and --font-body on html element"
  - "cn() utility: clsx + tailwind-merge composition in src/lib/utils.ts"
  - "Data types: all shared interfaces in src/data/types.ts, re-exported from src/types/index.ts"
  - "Business info: single source of truth in src/data/business-info.ts"
  - "Marketing route group: all public pages under src/app/(marketing)/"

requirements-completed: [FNDN-01, FNDN-02]

# Metrics
duration: 7min
completed: 2026-03-23
---

# Phase 1 Plan 01: Project Scaffold Summary

**Next.js 16 project with TypeScript strict mode, Tailwind CSS 4, Cormorant font loading, shared data types for Municipality/Service/Testimonial/BusinessInfo, cn() utility, and business info registry**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-23T20:49:33Z
- **Completed:** 2026-03-23T20:56:42Z
- **Tasks:** 1
- **Files modified:** 23

## Accomplishments
- Scaffolded Next.js 16 project with TypeScript strict mode, Tailwind CSS 4 CSS-first config, and all Phase 1 dependencies
- Root layout loads Cormorant (headings) and Cormorant Garamond (body) fonts with weights 500 and 700 via next/font/google
- Defined all shared TypeScript interfaces for the data layer: Municipality, Service, Testimonial, BusinessInfo, ServiceCityContent, plus sub-types (Landmark, HousingStock, WeatherData, BuildingCode, ProcessStep, Material, CostFactor, FAQ)
- Business info data registry with complete NAP data, 4 certifications, license number, and insurance info
- pnpm type-check and pnpm lint both pass cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 16 project with types, utilities, and foundation files** - `6b8b30e` (feat)

## Files Created/Modified
- `package.json` - Project config with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and all Phase 1 deps
- `tsconfig.json` - TypeScript strict mode with @/* path alias
- `next.config.ts` - Minimal Next.js config
- `postcss.config.mjs` - Tailwind CSS 4 via @tailwindcss/postcss
- `eslint.config.mjs` - ESLint 9 flat config with next/core-web-vitals
- `src/app/layout.tsx` - Root layout with font loading, metadata template
- `src/app/not-found.tsx` - Custom 404 page
- `src/app/error.tsx` - Global error boundary (client component)
- `src/app/(marketing)/layout.tsx` - Pass-through marketing layout
- `src/app/(marketing)/page.tsx` - Stub homepage
- `src/styles/globals.css` - Tailwind CSS 4 import with @theme font and placeholder color variables
- `src/lib/utils.ts` - cn() utility (clsx + tailwind-merge)
- `src/lib/constants.ts` - SITE_NAME, BASE_URL, PHONE_NUMBER, PHONE_HREF
- `src/data/types.ts` - All shared TypeScript interfaces for data registries
- `src/data/business-info.ts` - NAP data, certifications, license, insurance
- `src/types/index.ts` - Re-export barrel from data/types.ts

## Decisions Made
- Used manual `pnpm add` instead of `create-next-app` because the directory already contained .planning/ and CLAUDE.md files that conflicted with the scaffolding tool
- Downgraded to ESLint 9 (from 10) because eslint-config-next's FlatCompat wrapper has a circular reference bug with ESLint 10
- Used native flat config import (`import nextConfig from 'eslint-config-next/core-web-vitals'`) instead of the FlatCompat wrapper
- Changed lint script from `next lint` to `eslint .` because `next lint` was removed as a CLI command in Next.js 16
- Added a stub homepage at `src/app/(marketing)/page.tsx` so the dev server has a page to render (plan did not explicitly include this but it is necessary for verification)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] ESLint configuration for Next.js 16**
- **Found during:** Task 1 (verification step)
- **Issue:** `next lint` CLI command does not exist in Next.js 16. The FlatCompat approach with eslint-config-next produced circular reference errors with both ESLint 9 and 10.
- **Fix:** Used native flat config import from `eslint-config-next/core-web-vitals`, downgraded to ESLint 9, changed lint script to `eslint .`
- **Files modified:** eslint.config.mjs, package.json
- **Verification:** `pnpm lint` passes cleanly
- **Committed in:** 6b8b30e (part of task commit)

**2. [Rule 2 - Missing Critical] Added stub homepage**
- **Found during:** Task 1 (Step 6, marketing layout creation)
- **Issue:** No page.tsx at any route -- dev server would show 404 for all routes
- **Fix:** Created minimal `src/app/(marketing)/page.tsx` with h1 and placeholder paragraph
- **Files modified:** src/app/(marketing)/page.tsx
- **Verification:** Homepage would render at localhost:3000
- **Committed in:** 6b8b30e (part of task commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 missing critical)
**Impact on plan:** Both fixes were necessary -- ESLint would not run without the config fix, and the app needs at least one page to be functional. No scope creep.

## Issues Encountered
- `create-next-app` refused to scaffold into a non-empty directory -- fell back to manual installation as the plan anticipated
- Peer dependency warnings for TypeScript 6.0.2 (eslint plugins declare <6.0.0 peer range) -- these are cosmetic and do not affect functionality

## User Setup Required

None - no external service configuration required.

## Known Stubs

None -- all files delivered are functional infrastructure, not UI rendering stubs. The placeholder color values in globals.css (`--color-primary`, `--color-secondary`) are intentional per UI-SPEC and will be replaced in Phase 2 after the 10-variation color approval process.

## Next Phase Readiness
- Project foundation is complete and type-checks cleanly
- Plans 01-02 and 01-03 can build on this: data registries (municipalities, services, testimonials, service-city content), SEO helpers, sitemap, robots.txt, and stub route pages
- All shared TypeScript interfaces are defined and ready for data population
- Directory structure follows project conventions from CLAUDE.md

## Self-Check: PASSED

All 16 created files verified present. Task commit 6b8b30e verified in git log.

---
*Phase: 01-project-scaffold-data-architecture*
*Completed: 2026-03-23*
