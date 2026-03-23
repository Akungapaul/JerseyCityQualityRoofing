# Phase 1: Project Scaffold & Data Architecture - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-23
**Phase:** 01-project-scaffold-data-architecture
**Areas discussed:** URL slug conventions, Data registry depth & structure, Placeholder data realism, App directory organization

---

## URL Slug Conventions

### Service slug format

| Option | Description | Selected |
|--------|-------------|----------|
| Short action-based | e.g. 'roof-repair', 'flat-roof-systems'. Clean, keyword-focused. | ✓ |
| Descriptive with service suffix | e.g. 'roof-repair-services'. Includes 'services' keyword. | |
| Keyword-rich long-tail | e.g. 'residential-roof-repair'. Redundant with URL path. | |

**User's choice:** Short action-based
**Notes:** None

### City slug format

| Option | Description | Selected |
|--------|-------------|----------|
| City name only | e.g. 'jersey-city', 'hoboken'. Clean, state implied by site focus. | ✓ |
| City + state abbreviation | e.g. 'jersey-city-nj'. More defensive against same-named cities. | |

**User's choice:** City name only
**Notes:** None

### City hub page URLs

| Option | Description | Selected |
|--------|-------------|----------|
| /service-areas/[city]/ | Matches 'Service Areas' concept. Clear parent. | ✓ |
| /locations/[city]/ | More generic term. Common in multi-location. | |
| /roofing-in/[city]/ | Keyword-rich, SEO-aggressive. | |

**User's choice:** /service-areas/[city]/
**Notes:** None

### Blog URL pattern

| Option | Description | Selected |
|--------|-------------|----------|
| /blog/[slug]/ | Flat blog. Silo-linking via internal links, not URL hierarchy. | ✓ |
| /blog/[category]/[slug]/ | Nested by category. More complex routing. | |
| /resources/[slug]/ | 'Resources' instead of 'blog'. Educational positioning. | |

**User's choice:** /blog/[slug]/
**Notes:** None

### Guide page URLs

| Option | Description | Selected |
|--------|-------------|----------|
| Under /guides/ | Separate section: /guides/cost/ and /guides/materials/. | ✓ |
| Under /blog/ with categories | Everything under /blog/ with category filtering. | |
| Nested under /services/ | Children of service silos. Complex routing. | |

**User's choice:** Under /guides/
**Notes:** None

### Problem page URLs

| Option | Description | Selected |
|--------|-------------|----------|
| Under /problems/ | Dedicated section. Links to services as solutions. | ✓ |
| Under /guides/problems/ | Nested under guides as subcategory. | |
| Under /roofing-issues/ | Keyword-rich parent slug. | |

**User's choice:** Under /problems/
**Notes:** None

### Static page URLs

| Option | Description | Selected |
|--------|-------------|----------|
| Root-level flat | /about/, /contact/, /gallery/, /testimonials/. Simple, standard. | ✓ |
| Grouped under /company/ | /company/about/, /company/contact/. Corporate grouping. | |

**User's choice:** Root-level flat
**Notes:** None

---

## Data Registry Depth & Structure

### Registry file organization

| Option | Description | Selected |
|--------|-------------|----------|
| Single file per entity type | One municipalities.ts, one services.ts. Easier to cross-reference. | ✓ |
| One file per entity | Each city/service gets own file. 20 files. | |
| Hybrid: grouped by category | Cities in one, services split residential/commercial. | |

**User's choice:** Single file per entity type
**Notes:** None

### Municipality data depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full depth now | All fields: landmarks, housing stock, building codes, weather, etc. | ✓ |
| Metadata only, expand later | Just name, slug, population, ZIPs. Rich data in Phase 7. | |
| Structured skeleton with TODOs | Full interface, metadata populated, rich fields empty. | |

**User's choice:** Full depth now
**Notes:** None

### Service data depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full depth now | All fields: process steps, materials, cost factors, FAQs, etc. | ✓ |
| Metadata + structure, content later | Name, slug, category. Content in Phase 5-6. | |

**User's choice:** Full depth now
**Notes:** None

### Cross-reference resolver

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, add resolver layer | service-city-content.ts with getCityServiceContent(). | ✓ |
| Defer to Phase 8 | Only municipalities + services now. | |

**User's choice:** Yes, add resolver layer
**Notes:** None

### Additional registries (testimonials, business info)

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, add both now | testimonials.ts + business-info.ts in Phase 1. | ✓ |
| Defer to Phase 4 | Only core registries now. | |
| Business info now, testimonials later | NAP data now, reviews in Phase 4. | |

**User's choice:** Yes, add both now
**Notes:** None

### Data export pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Lookup functions + constants | Export Record AND typed helpers (getMunicipality(), etc.). | ✓ |
| Raw exports only | Export just Record. Pages do own lookups. | |

**User's choice:** Lookup functions + constants
**Notes:** None

### City tiers

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, define tiers in data | Tier 1/2/3 tagged on each city for Phase 8 batched launch. | ✓ |
| No, defer tiering to Phase 8 | Flat data, tiering decided later. | |

**User's choice:** Yes, define tiers in data
**Notes:** Tier 1: Jersey City, Hoboken, Bayonne, North Bergen. Tier 2: Union City, West New York, Secaucus, Kearny. Tier 3: Harrison, East Newark, Guttenberg, Weehawken.

---

## Placeholder Data Realism

### City data realism

| Option | Description | Selected |
|--------|-------------|----------|
| Research-grade realistic | Real populations, landmarks, ZIPs, architecture. Only business data is fake. | ✓ |
| Structurally correct but approximate | Right shape, plausible values, not researched. | |
| Minimal placeholder | Just enough to render. Lorem-style. | |

**User's choice:** Research-grade realistic
**Notes:** None

### Service data realism

| Option | Description | Selected |
|--------|-------------|----------|
| Industry-accurate | Real roofing workflows, genuine FAQs, real cost factors. | ✓ |
| Plausible but generic | Right structure, reasonable content, not deeply researched. | |

**User's choice:** Industry-accurate
**Notes:** None

### Testimonial volume

| Option | Description | Selected |
|--------|-------------|----------|
| 3-5 per city (~48 total) | Spread across cities and services. Varied ratings. | ✓ |
| 1-2 per city | 12-24 total. Minimal set. | |
| 10+ total, untagged | Shared pool without city tags. | |

**User's choice:** 3-5 per city (~48 total)
**Notes:** Distribution weighted toward anchor city (Jersey City: 5, others: 3-4)

---

## App Directory Organization

### Route groups

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, (marketing) group | All pages in (marketing) with shared layout. API routes separate. | ✓ |
| No route group, flat app/ | All routes at root. Root layout handles shared UI. | |

**User's choice:** Yes, (marketing) group
**Notes:** None

### src/ directory

| Option | Description | Selected |
|--------|-------------|----------|
| Use src/ | All app code under src/. Separates from config/docs. | ✓ |
| Root-level app/ | Flatter structure. | |

**User's choice:** Use src/
**Notes:** None

### SEO helpers organization

| Option | Description | Selected |
|--------|-------------|----------|
| Centralized in lib/seo/ | Shared metadata generators. Pages call helpers. | ✓ |
| Inline per page | Each page defines own metadata. Risks inconsistency. | |

**User's choice:** Centralized in lib/seo/
**Notes:** None

---

## Claude's Discretion

- Exact TypeScript type definitions for sub-types
- Internal linking data structure
- robots.txt configuration details
- Sitemap generation approach
- Error boundary and not-found page implementation
- Tailwind CSS 4 configuration approach

## Deferred Ideas

None — discussion stayed within phase scope.
