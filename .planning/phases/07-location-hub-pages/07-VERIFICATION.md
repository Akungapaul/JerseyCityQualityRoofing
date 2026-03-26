---
phase: 07-location-hub-pages
verified: 2026-03-25T00:10:30Z
status: human_needed
score: 12/12 must-haves verified
human_verification:
  - test: "Visual layout of city hub pages in browser"
    expected: "14 sections render in correct order, city-specific content displayed, JSON-LD present in source"
    why_human: "Task 2 of Plan 05 is an explicit human checkpoint. Cannot verify visual section order, map embed rendering, testimonial carousel display, or content uniqueness across cities without a browser"
  - test: "Content uniqueness across cities"
    expected: "Each city page tells a genuinely different story — not template text with city name swapped"
    why_human: "Programmatic similarity checks are in the test suite, but human judgment is required to confirm the quality and authenticity of the first-person narratives"
  - test: "JSON-LD three-block structure in page source"
    expected: "Three script[type='application/ld+json'] blocks on every city page: RoofingContractor, BreadcrumbList, FAQPage"
    why_human: "Requires running the dev server and inspecting page source or DevTools"
---

# Phase 7: Location Hub Pages Verification Report

**Phase Goal:** Visitors searching for roofing in any Hudson County municipality find a dedicated, locally-relevant page that establishes the company as a local expert in their specific city
**Verified:** 2026-03-25T00:10:30Z
**Status:** human_needed (all automated checks passed — visual verification pending)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | CityHubContent interface exists in types.ts with all required fields | VERIFIED | `src/data/types.ts` line 210: `export interface CityHubContent` with all fields including `neighborhoodBreakdown: NeighborhoodSection[]` and `cityFaqs: FAQ[]` |
| 2 | buildCityRoofingContractorJsonLd function exists and produces valid JSON-LD with @id entity relationships | VERIFIED | `src/lib/seo/json-ld.tsx` line 172: function exported; lines 179/195/206 contain `@id` for organization, city, and service entities |
| 3 | Test scaffolds validate city content word count, field completeness, testimonial availability, and JSON-LD structure | VERIFIED | 3 test files exist in `src/__tests__/phase-07/`; all 217 tests pass (vitest exit code 0) |
| 4 | Tier 1 city content files exist with 3000+ words each | VERIFIED | jersey-city: 4156 words, hoboken: 4032, bayonne: 4028, north-bergen: 4146 — all above 3000 |
| 5 | Tier 2 city content files exist with 3000+ words each | VERIFIED | union-city: 4245, west-new-york: 4461, secaucus: 4271, kearny: 4555 — all above 3000 |
| 6 | Tier 3 city content files exist with 3000+ words each | VERIFIED | harrison: 4077, east-newark: 4288, guttenberg: 4191, weehawken: 4382 — all above 3000 |
| 7 | All 7 section components are Server Components with no "use client" directive | VERIFIED | grep for "use client" across all 7 components returned 0 matches |
| 8 | CityHubHero renders h1, dual CTA (quote form + phone), and CompactQuoteForm | VERIFIED | `city-hub-hero.tsx`: `<h1`, `href="#quote-form"`, `href={PHONE_HREF}`, `CompactQuoteForm` all present; touch targets `min-h-[44px]` confirmed |
| 9 | ServicesInCityGrid renders 8 service cards with prefetch={false} forward links | VERIFIED | `services-in-city-grid.tsx`: `prefetch={false}` on both residential and commercial card links; `ArrowRight` and "Learn More" present |
| 10 | City hub page template wires all 12 city content files via CITY_CONTENT_MAP | VERIFIED | Page imports all 12 `*_CONTENT` constants and maps them in `CITY_CONTENT_MAP: Record<string, CityHubContent>` |
| 11 | City-specific testimonials display with fallback logic | VERIFIED | `getTestimonialsByCity` called; fallback to global `TESTIMONIALS` when city has fewer than 3 |
| 12 | RoofingContractor and BreadcrumbList JSON-LD (plus FAQPage) render on every city page | VERIFIED | Three `<JsonLd>` blocks in page template: `buildCityRoofingContractorJsonLd`, `buildBreadcrumbJsonLd`, `buildFaqPageJsonLd` |

**Score:** 12/12 truths verified (automated)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/data/types.ts` | CityHubContent and NeighborhoodSection interfaces | VERIFIED | Both interfaces present; NOTE: NeighborhoodSection declared twice (lines 2 and 203) — TypeScript treats as duplicate-but-compatible; compiles clean |
| `src/lib/seo/json-ld.tsx` | buildCityRoofingContractorJsonLd with @id | VERIFIED | Function at line 172; imports BUSINESS_INFO and Municipality type; @id on organization/city/service entities |
| `src/__tests__/phase-07/city-hub-content.test.ts` | Content validation tests for all 12 cities | VERIFIED | Exists; 217 tests pass across 3 test files |
| `src/__tests__/phase-07/city-schema.test.ts` | JSON-LD structure and entity relationship tests | VERIFIED | Exists and passes |
| `src/__tests__/phase-07/city-testimonials.test.ts` | City testimonial availability tests | VERIFIED | Exists and passes |
| `src/data/content/cities/jersey-city.ts` | Jersey City hub content (3000+ words) | VERIFIED | 4156 words, exports `JERSEY_CITY_CONTENT: CityHubContent`, slug matches filename |
| `src/data/content/cities/hoboken.ts` | Hoboken hub content (3000+ words) | VERIFIED | 4032 words |
| `src/data/content/cities/bayonne.ts` | Bayonne hub content (3000+ words) | VERIFIED | 4028 words |
| `src/data/content/cities/north-bergen.ts` | North Bergen hub content (3000+ words) | VERIFIED | 4146 words |
| `src/data/content/cities/union-city.ts` | Union City hub content (3000+ words) | VERIFIED | 4245 words |
| `src/data/content/cities/west-new-york.ts` | West New York hub content (3000+ words) | VERIFIED | 4461 words |
| `src/data/content/cities/secaucus.ts` | Secaucus hub content (3000+ words) | VERIFIED | 4271 words |
| `src/data/content/cities/kearny.ts` | Kearny hub content (3000+ words) | VERIFIED | 4555 words |
| `src/data/content/cities/harrison.ts` | Harrison hub content (3000+ words) | VERIFIED | 4077 words |
| `src/data/content/cities/east-newark.ts` | East Newark hub content (3000+ words) | VERIFIED | 4288 words |
| `src/data/content/cities/guttenberg.ts` | Guttenberg hub content (3000+ words) | VERIFIED | 4191 words |
| `src/data/content/cities/weehawken.ts` | Weehawken hub content (3000+ words) | VERIFIED | 4382 words |
| `src/components/sections/city-hub-hero.tsx` | City hero with h1, population, dual CTA | VERIFIED | Exports `CityHubHero`; no "use client"; h1, dual CTA, phone link, CompactQuoteForm all present |
| `src/components/sections/local-expertise-section.tsx` | Local expertise narrative with map | VERIFIED | Exports `LocalExpertiseSection`; GoogleMapEmbed with zoom={13} |
| `src/components/sections/housing-stock-section.tsx` | Housing stock section with stat cards | VERIFIED | Exports `HousingStockSection`; grid-cols-2/lg:grid-cols-4; text-accent on stat numbers |
| `src/components/sections/weather-climate-section.tsx` | Weather section with Lucide icons | VERIFIED | Exports `WeatherClimateSection`; Snowflake, CloudRain imported; aria-hidden="true" on icons |
| `src/components/sections/neighborhood-breakdown.tsx` | Neighborhood grid with roof types | VERIFIED | Exports `NeighborhoodBreakdown`; grid-cols-1 md:grid-cols-2 lg:grid-cols-3; "Key Challenge" label present |
| `src/components/sections/services-in-city-grid.tsx` | Service cards with forward links | VERIFIED | Exports `ServicesInCityGrid`; prefetch={false} on both residential/commercial sections; ArrowRight |
| `src/components/sections/city-landmarks-section.tsx` | Landmarks section with significance tags | VERIFIED | Exports `CityLandmarksSection`; "Local Landmarks & Roofing Heritage" heading |
| `src/app/(marketing)/service-areas/[city]/page.tsx` | Complete city hub page template | VERIFIED | Full 14-section layout; CITY_CONTENT_MAP; triple JSON-LD; getTestimonialsByCity; notFound; dynamicParams=false; no "use client" |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/data/content/cities/*.ts` | `src/data/types.ts` | CityHubContent interface import | VERIFIED | All 12 city files contain `import type { CityHubContent } from '@/data/types'` |
| `src/lib/seo/json-ld.tsx` | `src/data/business-info.ts` | BUSINESS_INFO import for NAP consistency | VERIFIED | Line 2: `import { BUSINESS_INFO } from '@/data/business-info'` |
| `src/components/sections/services-in-city-grid.tsx` | `/services/[category]/[service]/[city]` | next/link with prefetch={false} | VERIFIED | `prefetch={false}` confirmed on service card links |
| `src/components/sections/city-hub-hero.tsx` | `#quote-form` | anchor href to quote form section | VERIFIED | `href="#quote-form"` on primary CTA button |
| `src/app/(marketing)/service-areas/[city]/page.tsx` | `src/data/content/cities/*.ts` | CITY_CONTENT_MAP record lookup | VERIFIED | All 12 imports present; CITY_CONTENT_MAP maps all 12 slugs to their CityHubContent objects |
| `src/app/(marketing)/service-areas/[city]/page.tsx` | `src/lib/seo/json-ld.tsx` | buildCityRoofingContractorJsonLd and buildBreadcrumbJsonLd calls | VERIFIED | Both functions called in page JSX with real city/service data |
| `src/app/(marketing)/service-areas/[city]/page.tsx` | `src/data/testimonials.ts` | getTestimonialsByCity for city-specific testimonials | VERIFIED | `getTestimonialsByCity(city.slug)` called; real filter function (not stub) — `TESTIMONIALS.filter((t) => t.citySlug === citySlug)` |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| `page.tsx` | `city` (Municipality) | `getMunicipality(citySlug)` from municipalities.ts registry | Yes — real data object from TypeScript registry | FLOWING |
| `page.tsx` | `content` (CityHubContent) | `CITY_CONTENT_MAP[citySlug]` — maps to imported city file | Yes — 4000+ word objects with real city-specific content | FLOWING |
| `page.tsx` | `displayTestimonials` | `getTestimonialsByCity(city.slug)` with fallback to `TESTIMONIALS` | Yes — real filter on TESTIMONIALS array; fallback ensures no empty carousel | FLOWING |
| `page.tsx` | `allServices` | `getServicesByCategory('residential')` + `getServicesByCategory('commercial')` | Yes — real service data registry | FLOWING |
| `CityHubHero` | `heroHeadline`, `heroSubtitle`, `population` | Props from `content` and `city` objects in page | Yes — city-specific strings and numbers | FLOWING |
| `ServicesInCityGrid` | Rendered service cards | `getServicesByCategory` called internally | Yes — real service data drives card rendering | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| TypeScript compiles clean | `pnpm exec tsc --noEmit` | No output (exit 0) | PASS |
| All 217 phase-07 tests pass | `pnpm exec vitest run src/__tests__/phase-07/` | 3 passed, 217 tests passed | PASS |
| All 12 city files exist | `ls src/data/content/cities/ | wc -l` | 12 | PASS |
| All 12 slugs match filenames | Grep each file's `slug:` field | All 12 slugs match file names | PASS |
| No "use client" in section components | Grep across 7 components | 0 matches | PASS |
| No anti-patterns in page or components | Grep for TODO/FIXME/placeholder/return null | 0 matches (sole `return {}` is correct Next.js metadata guard) | PASS |
| Production build (from SUMMARY evidence) | `pnpm build` (documented in 07-05-SUMMARY.md commit 458e81a) | 133 total pages generated, all 12 city hub pages included | PASS (prior evidence) |

---

### Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|---------------|-------------|--------|----------|
| LOC-01 | 07-01, 07-02, 07-03, 07-04, 07-05 | City hub pages for all 12 Hudson County municipalities — each with unique local content, services overview, testimonials, and FAQ | SATISFIED | 12 city content files with 4000+ words each; page template with 14 sections; FAQ accordion via `content.cityFaqs`; services via `ServicesInCityGrid`; testimonials via `getTestimonialsByCity` |
| LOC-05 | 07-01, 07-02, 07-05 | Each location page includes city-specific testimonials (tagged by municipality) | SATISFIED | `getTestimonialsByCity(city.slug)` called in page; fallback to global pool when fewer than 3 city testimonials; testimonial data tagged with `citySlug` field |
| SEO-01 | 07-01, 07-05 | JSON-LD structured data on every page: RoofingContractor (LocalBusiness subtype), BreadcrumbList | SATISFIED | Both `buildCityRoofingContractorJsonLd` and `buildBreadcrumbJsonLd` called in page template; FAQPage also added as bonus |
| SEO-04 | 07-01, 07-05 | Knowledge graph JSON-LD mapping entity relationships: Service -> Location -> Materials -> Problems -> Solutions | SATISFIED | `buildCityRoofingContractorJsonLd` maps `@id` on organization (`/#organization`), city (`/service-areas/[slug]#city`), and each service (`/services/[category]/[slug]#service`); `areaServed`, `knowsAbout`, and `makesOffer.itemOffered` entity chain present |

**Orphaned requirements check:** Requirements.md Traceability table maps LOC-01, LOC-05, SEO-01, and SEO-04 to Phase 7. All four are accounted for in plan frontmatter. No orphaned requirements.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/data/types.ts` | 2 and 203 | Duplicate `export interface NeighborhoodSection` declaration | Warning | TypeScript treats both as compatible (identical shape), so compilation succeeds. However, if one declaration is updated but not the other, a silent type drift occurs. Not a blocker — the interface at line 2 was pre-existing before Phase 7 added the Phase 7 version at line 203. |

---

### Human Verification Required

### 1. Visual Layout of City Hub Pages

**Test:** Run `pnpm dev` and open `http://localhost:3000/service-areas/jersey-city`
**Expected:** 14 sections render in correct top-to-bottom order: Hero with dual CTA and quote form, Badge Strip, Local Expertise narrative with map, Housing Stock with 4 stat cards, Weather with 6 icon cards, Landmarks with cards, Neighborhood grid (6 cards), Mid-page CTA, Services grid (4 residential + 4 commercial), Building Codes section, Testimonials carousel, FAQ accordion, Quote form, CTA Banner
**Why human:** Section order, visual layout, component rendering quality, and map embed cannot be verified programmatically

### 2. Content Uniqueness and Voice Quality

**Test:** Open at least 3 different city pages (e.g., `/service-areas/jersey-city`, `/service-areas/hoboken`, `/service-areas/guttenberg`) and compare the Local Expertise narratives and neighborhood breakdowns
**Expected:** Each city tells a genuinely different story referencing that city's specific buildings, neighborhoods, and geography — not template text with the city name swapped in
**Why human:** Human judgment is required to assess quality and authenticity of first-person roofing expert narratives; 217 automated tests verify structure and word count but not authentic differentiation

### 3. JSON-LD Three-Block Structure in Page Source

**Test:** On any city page, right-click "View Page Source" and search for `application/ld+json`
**Expected:** Three separate `<script type="application/ld+json">` blocks — one for `RoofingContractor`, one for `BreadcrumbList`, one for `FAQPage`
**Why human:** Requires running the server and inspecting rendered HTML

---

### Gaps Summary

No automated gaps found. All 12 truths verified, all 24 artifacts pass all four levels of verification (exists, substantive, wired, data flowing). All 4 required requirements (LOC-01, LOC-05, SEO-01, SEO-04) are satisfied.

**Notable code issue (non-blocking):** `src/data/types.ts` declares `NeighborhoodSection` twice — once at line 2 (pre-Phase-7 declaration) and once at line 203 (Phase 7 addition). Both are identical in structure so TypeScript compiles clean. The pre-Phase-7 version at line 2 should be removed to avoid future maintenance confusion.

Phase goal is achieved: all 12 Hudson County municipality city hub pages exist with locally-relevant content, city-specific data sections, JSON-LD entity relationships, testimonials, FAQ, and forward links to service-in-city pages. The only remaining item is human visual verification (Task 2 of Plan 05 — the explicit checkpoint:human-verify task).

---

_Verified: 2026-03-25T00:10:30Z_
_Verifier: Claude (gsd-verifier)_
