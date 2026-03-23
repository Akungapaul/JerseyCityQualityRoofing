# Phase 1: Project Scaffold & Data Architecture - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold a Next.js 16 project with siloed URL routing, type-safe data registries for 12 Hudson County municipalities and 8 roofing services, and SEO metadata infrastructure. This phase delivers the foundation all subsequent phases build on — no UI design, no page content rendering, no forms.

</domain>

<decisions>
## Implementation Decisions

### URL slug conventions
- **D-01:** Short action-based service slugs: `roof-repair`, `roof-replacement`, `roof-inspection`, `emergency-roofing`, `flat-roof-systems`, `roof-maintenance`, `commercial-repair`, `commercial-replacement`
- **D-02:** City-name-only slugs (no state suffix): `jersey-city`, `hoboken`, `bayonne`, `north-bergen`, `west-new-york`, `east-newark`, `union-city`, `secaucus`, `kearny`, `harrison`, `guttenberg`, `weehawken`
- **D-03:** City hub pages at `/service-areas/[city]/` with overview hub at `/service-areas/`
- **D-04:** Flat blog at `/blog/[slug]/`
- **D-05:** Guides at `/guides/cost/[slug]/` and `/guides/materials/[slug]/`
- **D-06:** Problem-to-solution pages at `/problems/[slug]/`
- **D-07:** Static pages at root level: `/about/`, `/contact/`, `/gallery/`, `/testimonials/`

### Full site URL map
- **D-08:** Complete URL hierarchy:
  - `/` — homepage
  - `/about/`, `/contact/`, `/gallery/`, `/testimonials/` — static pages
  - `/services/residential/[service]/` — residential service pillar pages
  - `/services/commercial/[service]/` — commercial service pillar pages
  - `/services/residential/[service]/[city]/` — service-in-city pages
  - `/services/commercial/[service]/[city]/` — service-in-city pages
  - `/service-areas/` — location hub overview
  - `/service-areas/[city]/` — city hub pages
  - `/blog/` — blog index
  - `/blog/[slug]/` — blog articles
  - `/guides/` — guides hub
  - `/guides/cost/[slug]/` — cost guides
  - `/guides/materials/[slug]/` — material deep-dives
  - `/problems/` — problems hub
  - `/problems/[slug]/` — problem-to-solution pages

### Data registry organization
- **D-09:** Single file per entity type in `src/data/`: `municipalities.ts`, `services.ts`, `service-city-content.ts`, `testimonials.ts`, `business-info.ts`, `types.ts`
- **D-10:** Full depth data registries — all fields populated in Phase 1, not deferred
- **D-11:** Municipality interface includes: name, slug, county, population, zipCodes, neighborhoods, landmarks (5+), housingStock, architectureStyles, weatherPatterns, buildingCodes, commonRoofTypes, roofingConcerns, nearbyHighways, description, tier
- **D-12:** Service interface includes: name, slug, category, shortDescription, fullDescription, processSteps, materials, costFactors, faqs (5+), commonProblems, relatedServices, emergencyAvailable, typicalDuration, warrantyInfo
- **D-13:** Cross-reference resolver layer via `service-city-content.ts` — `getCityServiceContent(serviceSlug, citySlug)` returns city-specific content fragments for content uniqueness enforcement
- **D-14:** Testimonials registry with 3-5 per city (~48 total), tagged by city and service type, varied ratings (mostly 5, some 4)
- **D-15:** Business info registry with NAP data, certifications, license numbers, insurance info — single source of truth for consistency across all pages
- **D-16:** Lookup functions + constants pattern — export both raw Record/array AND typed helpers (`getMunicipality()`, `getService()`, `getAllMunicipalitySlugs()`, etc.)
- **D-17:** City tiers defined in data: Tier 1 (Jersey City, Hoboken, Bayonne, North Bergen), Tier 2 (Union City, West New York, Secaucus, Kearny), Tier 3 (Harrison, East Newark, Guttenberg, Weehawken)

### Placeholder data realism
- **D-18:** Research-grade realistic city data — real population numbers, real landmarks, real ZIP codes, real architectural characteristics. Only business details are fictional.
- **D-19:** Industry-accurate service data — process steps reflect real roofing workflows, FAQs are real homeowner questions, cost factors are genuine
- **D-20:** Testimonials are placeholder but realistic — specific details, real-sounding names, varied content

### App directory organization
- **D-21:** Use `src/` directory convention — all application code under `src/`
- **D-22:** `(marketing)` route group wrapping all page routes, with shared marketing layout (header, footer, persistent CTAs). API routes at `src/app/api/`
- **D-23:** Centralized SEO helpers in `src/lib/seo/` — `metadata.ts`, `json-ld.ts`, `sitemap.ts`, `canonical.ts`. Pages call shared generators, not inline metadata.

### Claude's Discretion
- Exact TypeScript type definitions for sub-types (Landmark, HousingStock, WeatherData, BuildingCode, ProcessStep, Material, CostFactor, FAQ, etc.)
- Internal linking data structure (how related services reference each other)
- robots.txt configuration details
- Sitemap generation approach (single vs split)
- Error boundary and not-found page implementation
- Tailwind CSS 4 configuration approach

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — Full v1 requirements with requirement IDs. Phase 1 covers: FNDN-01, FNDN-02, FNDN-03, FNDN-04, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/ROADMAP.md` §Phase 1 — Success criteria and dependencies

### Technology stack
- `CLAUDE.md` §Technology Stack — Complete dependency list with pinned versions, architecture notes, and patterns (`cn()` utility, content data pattern, JSON-LD pattern)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project. No existing codebase beyond docs and config files.

### Established Patterns
- CLAUDE.md defines: kebab-case files, PascalCase components, camelCase hooks, SCREAMING_SNAKE_CASE constants
- `cn()` utility pattern (clsx + tailwind-merge) specified in tech stack
- TypeScript strict mode with `interface` for object shapes, `type` for unions
- `satisfies` operator for type-safe object literals

### Integration Points
- Next.js 16 App Router with `src/` directory
- `pnpm` as package manager
- Vercel deployment target
- Tailwind CSS 4 with CSS-first configuration

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User consistently chose the recommended option across all areas, indicating alignment with best practices for local SEO lead generation sites.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-project-scaffold-data-architecture*
*Context gathered: 2026-03-23*
