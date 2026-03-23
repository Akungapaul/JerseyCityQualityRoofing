---
phase: 01-project-scaffold-data-architecture
plan: 04
subsystem: seo
tags: [metadata, json-ld, sitemap, robots, vitest, schema-dts, canonical-url, structured-data]

# Dependency graph
requires:
  - phase: 01-project-scaffold-data-architecture (plan 01)
    provides: Next.js scaffold, constants (BASE_URL, SITE_NAME), business-info, root layout
  - phase: 01-project-scaffold-data-architecture (plan 02)
    provides: 18 App Router page stubs with generateStaticParams
  - phase: 01-project-scaffold-data-architecture (plan 03)
    provides: Data registries (municipalities, services, testimonials, service-city-content)
provides:
  - Centralized SEO metadata generator (generatePageMetadata)
  - JSON-LD builders (RoofingContractor, BreadcrumbList) with XSS-safe renderer
  - Canonical URL builder
  - All pages wired with generateMetadata (title, description, openGraph, canonical)
  - Data-driven generateStaticParams replacing hardcoded slug arrays
  - XML sitemap generating 125 URLs from data registries
  - robots.txt with crawling rules and sitemap reference
  - Vitest 4.1.1 test infrastructure with 50 tests across 6 files
  - Data validation script confirming registry completeness
affects: [phase-02, phase-03, phase-04, phase-05, phase-07, phase-09]

# Tech tracking
tech-stack:
  added: [vitest 4.1.1, @vitejs/plugin-react 6.0.1, tsx 4.21.0]
  patterns: [centralized-seo-helpers, data-driven-static-params, xss-safe-json-ld]

key-files:
  created:
    - src/lib/seo/metadata.ts
    - src/lib/seo/json-ld.tsx
    - src/lib/seo/canonical.ts
    - src/app/sitemap.ts
    - src/app/robots.ts
    - vitest.config.ts
    - scripts/validate-data.ts
    - src/data/__tests__/municipalities.test.ts
    - src/data/__tests__/services.test.ts
    - src/lib/__tests__/seo.test.ts
    - src/lib/__tests__/metadata.test.ts
    - src/lib/__tests__/json-ld.test.ts
    - src/lib/__tests__/sitemap.test.ts
  modified:
    - src/app/layout.tsx
    - package.json
    - tsconfig.json
    - All 18 page files in src/app/(marketing)/

key-decisions:
  - "JSON-LD file uses .tsx extension for JSX component (JsonLd renderer)"
  - "Schema-dts WithContext type requires unknown cast in tests due to union type"
  - "Vitest 4.1.1 with node environment and path aliases matching tsconfig"

patterns-established:
  - "SEO metadata pattern: import generatePageMetadata, pass title/description/path"
  - "Dynamic metadata pattern: async generateMetadata with await params, lookup via data registry"
  - "Static params pattern: getResidentialServiceSlugs/getCommercialServiceSlugs/getAllMunicipalitySlugs"
  - "JSON-LD pattern: buildRoofingContractorJsonLd cast through unknown to Record<string, unknown>"
  - "Test pattern: vitest describe/it/expect with @/ path aliases"

requirements-completed: [SEO-07, SEO-08, SEO-09, SEO-10]

# Metrics
duration: 8min
completed: 2026-03-23
---

# Phase 1 Plan 4: SEO Infrastructure Summary

**Centralized SEO helpers with metadata on all 18 pages, data-driven routing, 125-URL sitemap, and 50-test vitest suite**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-23T21:35:07Z
- **Completed:** 2026-03-23T21:43:38Z
- **Tasks:** 3
- **Files modified:** 34

## Accomplishments
- Created centralized SEO helper library (metadata, JSON-LD, canonical URL builders)
- Wired generateMetadata into all 18 pages with title, description, openGraph, and canonical URL
- Replaced all hardcoded generateStaticParams with data registry calls (type-safe, maintainable)
- XML sitemap generates 125 URLs from data registries (9 static + 8 service + 12 city + 96 service-in-city)
- RoofingContractor JSON-LD renders on every page via root layout
- Vitest 4.1.1 test infrastructure with 50 passing tests across 6 test files
- Data validation script confirming completeness of all registries

## Task Commits

Each task was committed atomically:

1. **Task 1: Create SEO helper library and wire JSON-LD into root layout** - `8cc00e4` (feat)
2. **Task 2: Wire generateMetadata into all pages and replace hardcoded generateStaticParams** - `cd907e6` (feat)
3. **Task 3: Create sitemap, robots.txt, vitest setup, all test files, and validation script** - `458fff4` (feat)
4. **Housekeeping: Accept Next.js build-time tsconfig adjustments** - `ffcdb8a` (chore)

## Files Created/Modified

### Created
- `src/lib/seo/metadata.ts` - Centralized metadata generator with openGraph, canonical URL, and title
- `src/lib/seo/json-ld.tsx` - RoofingContractor and BreadcrumbList JSON-LD builders with XSS-safe renderer
- `src/lib/seo/canonical.ts` - Canonical URL builder normalizing paths
- `src/app/sitemap.ts` - XML sitemap generating 125 URLs from data registries
- `src/app/robots.ts` - robots.txt allowing crawling with sitemap reference
- `vitest.config.ts` - Vitest configuration with node environment and @ path alias
- `scripts/validate-data.ts` - Data completeness validation (municipalities, services, testimonials, cross-references)
- `src/data/__tests__/municipalities.test.ts` - 11 tests: 12 cities, tiers, landmarks, housing, weather, codes
- `src/data/__tests__/services.test.ts` - 10 tests: 8 services, categories, FAQs, steps, materials
- `src/lib/__tests__/seo.test.ts` - 9 tests: metadata, canonical URL, JSON-LD
- `src/lib/__tests__/metadata.test.ts` - 5 tests: title, canonical, openGraph, ogType
- `src/lib/__tests__/json-ld.test.ts` - 8 tests: RoofingContractor, BreadcrumbList, properties
- `src/lib/__tests__/sitemap.test.ts` - 7 tests: 125 URLs, city hubs, service-city pages, structure

### Modified
- `src/app/layout.tsx` - Added JsonLd import and RoofingContractor JSON-LD rendering
- `package.json` - Added vitest, tsx, test scripts, validate-data script
- `tsconfig.json` - Next.js auto-modified jsx and include paths
- All 18 page files in `src/app/(marketing)/` - Added generateMetadata and data-driven generateStaticParams

## Decisions Made
- JSON-LD builder file named `.tsx` instead of `.ts` because it contains the JSX `JsonLd` renderer component
- Tests use `as unknown as Record<string, unknown>` cast for schema-dts `WithContext<RoofingContractor>` which is a union type including `string`
- Vitest 4.1.1 chosen (latest stable) with node environment since tests are pure data/logic, no DOM needed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Renamed json-ld.ts to json-ld.tsx**
- **Found during:** Task 1 (SEO helper library creation)
- **Issue:** Plan specified `src/lib/seo/json-ld.ts` but the JsonLd component contains JSX, causing TypeScript error TS1005
- **Fix:** Renamed to `json-ld.tsx` to enable JSX compilation
- **Files modified:** src/lib/seo/json-ld.tsx
- **Verification:** pnpm type-check passes
- **Committed in:** 8cc00e4 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed schema-dts type assertions in test files**
- **Found during:** Task 3 (test file creation)
- **Issue:** Plan's test code accessed properties directly on `WithContext<RoofingContractor>` which is a union type including `string`, causing 13 TypeScript errors
- **Fix:** Added `as unknown as Record<string, unknown>` cast in test assertions
- **Files modified:** src/lib/__tests__/json-ld.test.ts, src/lib/__tests__/seo.test.ts
- **Verification:** pnpm type-check passes, all 50 tests pass
- **Committed in:** 458fff4 (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for TypeScript compilation. No scope creep.

## Issues Encountered
- node_modules missing in worktree -- resolved by running `pnpm install` before first type-check

## Known Stubs
None -- all files created in this plan are functional infrastructure, not UI stubs.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 1 complete: project scaffold, data architecture, SEO infrastructure all in place
- All 131 static pages build successfully with data-driven routing
- Ready for Phase 2: design system, component library, page layouts
- Content writing phases (5-8) can rely on the SEO metadata pattern established here

## Self-Check: PASSED

All 14 created files verified present. All 4 commits (8cc00e4, cd907e6, 458fff4, ffcdb8a) verified in git log.

---
*Phase: 01-project-scaffold-data-architecture*
*Completed: 2026-03-23*
