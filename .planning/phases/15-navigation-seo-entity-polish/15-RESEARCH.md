# Phase 15: Navigation & SEO Entity Polish - Research

**Researched:** 2026-04-02
**Domain:** Navigation UI, JSON-LD structured data, Open Graph image generation
**Confidence:** HIGH

## Summary

Phase 15 closes three advisory integration gaps identified in the v1.0 milestone audit: (1) content silos (/blog, /guides, /problems) are unreachable from persistent navigation, (2) the `buildServicePageJsonLd` function emits an anonymous RoofingContractor provider node without an `@id` entity anchor (while city hub and service-in-city builders already include one), and (3) the OG image route at `/api/og/route.tsx` ignores the `?city=` parameter that 96 service-in-city pages already pass in their metadata.

All three issues are well-scoped code changes to existing files with clear before/after states. The navigation gap affects 27 content pages across 3 silos. The JSON-LD gap affects 8 service pillar pages. The OG image gap affects 96 service-in-city pages. No new dependencies are needed -- this phase uses only existing project infrastructure.

The codebase is in excellent shape: 629 tests pass, all 68 requirements are satisfied, and the patterns for each fix are already established elsewhere in the codebase (entity anchors exist in `buildCityRoofingContractorJsonLd` and `buildServiceInCityJsonLd`; the OG route already loads fonts and renders service data; the MegaMenu and Footer already render service and location links).

**Primary recommendation:** Three focused changes: (1) add a "Resources" section to both MegaMenu and MobileNav with links to /blog, /guides, /problems, plus add these to the Footer; (2) add `'@id': \`${BASE_URL}/#organization\`` to the provider object in `buildServicePageJsonLd`; (3) extend the OG route to read `?city=` param, import `getMunicipality`, and render the city name in the OG image.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| UX-08 | Internal links use next/link, phone numbers use tel: links | Navigation additions must use next/link (already the pattern in MegaMenu and Footer). Adding /blog, /guides, /problems to nav makes these silos reachable via next/link from every page. |
| SEO-02 | Service schema on all service pages with FAQ schema for rich snippets | Adding `@id` entity anchor to `buildServicePageJsonLd` provider completes the Service schema by connecting it to the organization entity graph. |
| SEO-04 | Knowledge graph JSON-LD mapping entity relationships | The `@id: BASE_URL/#organization` anchor enables cross-page entity resolution. Service pages currently emit anonymous contractor nodes that search engines cannot merge with the organization entity from other pages. |
| SEO-05 | Automated internal linking system | Navigation entries for /blog, /guides, /problems create persistent internal links from every page (via header/footer) to all 27 content pages, strengthening the internal link graph. |
| SEO-09 | Canonical URLs set via alternates.canonical in metadata on every page | OG images are part of the metadata system. Service-in-city pages already set canonical URLs and pass `?city=` to the OG route, but the route discards it. Fixing this ensures each page's OG image matches its canonical identity. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, Motion library, pnpm
- **Components**: Default to Server Components; only add `"use client"` when needed
- **Naming**: Files kebab-case, components PascalCase
- **SEO**: All pages must have metadata exports, JSON-LD structured data
- **Links**: Internal links use `next/link`, phone numbers use `tel:` links
- **Accessibility**: Semantic HTML, keyboard-accessible, WCAG AA contrast, focus-visible styles, aria-label on icon-only buttons
- **Typography**: Cormorant Garamond (medium) for body, Cormorant for headings, minimum 18px body

## Standard Stack

No new dependencies required. This phase modifies existing files using the project's established stack.

### Core (already installed)
| Library | Version | Purpose | Used For |
|---------|---------|---------|----------|
| next | 16.2.x | Framework | OG image route (next/og ImageResponse), next/link for nav |
| react | 19.2.x | UI | Component rendering |
| motion | 12.x | Animation | MegaMenu panel transitions, MobileNav accordion |
| lucide-react | 0.477.x | Icons | Navigation icons (ChevronDown, etc.) |
| schema-dts | 1.1.x | JSON-LD types | TypeScript types for Service schema provider |

## Architecture Patterns

### Pattern 1: Navigation Link Structure (MegaMenu)

**What:** The MegaMenu currently has three panels: "Residential Services", "Commercial Services", "Service Areas". A fourth panel or section must be added for content resources.

**Current structure (from mega-menu.tsx):**
```typescript
const navItems: Array<{ id: PanelId; label: string }> = [
  { id: "residential", label: "Residential Services" },
  { id: "commercial", label: "Commercial Services" },
  { id: "locations", label: "Service Areas" },
];
```

**Decision: Panel vs. Direct Links**

Adding a full dropdown panel for "Resources" is the recommended approach because:
- It matches the established pattern (consistent UX)
- It provides room for descriptive subtitles (like the service panels)
- 3 top-level categories (/blog, /guides, /problems) with their own descriptions justify a panel

The alternative (direct links without dropdown) would be simpler but breaks the established pattern where every nav item has a dropdown.

**Recommended panel structure:**
```
Resources (dropdown)
  |-- Blog (8 articles)
  |-- Roofing Guides (cost + material guides)
  |-- Common Problems (5 problem-solution pages)
```

**Implementation notes:**
- Add `"resources"` to the `PanelId` type union
- Add a new entry to `navItems` array
- Add a new panel rendering block for `item.id === "resources"`
- Links go to hub pages (/blog, /guides, /problems) not individual articles
- This matches how Services links go to categories, not individual service pages

### Pattern 2: MobileNav Accordion Section

**What:** The MobileNav uses the same AccordionSection pattern. A new "Resources" accordion section should be added with the same 3 links.

**Current sections:** Residential Services, Commercial Services, Service Areas, then standalone About/Contact links.

**Placement:** After Service Areas, before the standalone About/Contact links. This keeps the navigation hierarchy consistent: services first, then locations, then content resources, then company pages.

### Pattern 3: Footer Content Links

**What:** The Footer has a 4-column grid: Residential Services, Commercial Services, Service Areas, Contact Us. Adding content links requires either a 5th column or integrating into the existing Contact Us column.

**Recommended approach:** Add a 5th column titled "Resources" between "Service Areas" and "Contact Us". On mobile (grid-cols-1), this naturally stacks. On tablet/desktop, shift from `lg:grid-cols-4` to `lg:grid-cols-5` or keep 4 columns and let the grid wrap.

**Alternative:** Add resource links below the company links in the Contact Us column. This avoids layout changes but buries the links.

**Recommended:** 5th column approach -- it gives content silos equal visual weight.

### Pattern 4: JSON-LD Entity Anchor

**What:** The `buildServicePageJsonLd` function (json-ld.tsx lines 130-171) creates a provider object without `@id`. Compare with `buildCityRoofingContractorJsonLd` (line 180) and `buildServiceInCityJsonLd` (line 245) which both include `'@id': \`${BASE_URL}/#organization\``.

**Current code (lines 143-153):**
```typescript
provider: {
  '@type': 'RoofingContractor',
  name: BUSINESS_INFO.name,
  telephone: BUSINESS_INFO.phone,
  address: {
    '@type': 'PostalAddress',
    // ... address fields
  },
},
```

**Fix:** Add a single line:
```typescript
provider: {
  '@type': 'RoofingContractor',
  '@id': `${BASE_URL}/#organization`,
  name: BUSINESS_INFO.name,
  // ... rest unchanged
},
```

**Why this matters:** Without `@id`, search engines treat each page's RoofingContractor as an independent entity. With `@id`, they can merge all references across the site into a single knowledge graph node. The pattern is already established -- this is a consistency fix.

### Pattern 5: OG Image City Parameter

**What:** The OG route at `/api/og/route.tsx` currently reads only `?service=` and ignores `?city=`. Both residential and commercial service-in-city pages already pass `?city=` in their metadata:
```typescript
url: `/api/og?service=${service.slug}&city=${city.slug}`,
```

**Current route (lines 7-11):**
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceSlug = searchParams.get('service');
  const service = serviceSlug ? getService(serviceSlug) : null;
  // city param is NOT read
```

**Fix:** Read `?city=`, look up the municipality name, and render it in the image.

**Edge runtime consideration:** The route uses `export const runtime = 'edge'`. The `getMunicipality` function does a simple object lookup on the `MUNICIPALITIES` constant -- this is safe for edge runtime as it involves no Node.js-specific APIs. The `MUNICIPALITIES` data file is a plain TypeScript object (no filesystem reads, no dynamic imports).

**OG image design change:** When `city` param is present:
- Title becomes: `{Service Name} in {City Name}` (e.g., "Roof Repair in Hoboken")
- Subtitle remains the service's shortDescription
- This matches the page's `<title>` tag pattern: `${service.name} in ${city.name}, NJ`

When `city` param is absent, behavior remains unchanged (backward compatible for the 8 service pillar pages that only pass `?service=`).

### Anti-Patterns to Avoid

- **Linking to individual articles in nav:** The MegaMenu should link to hub pages (/blog, /guides, /problems), not to all 27 individual articles. Individual article discovery happens through the hub pages.
- **Breaking the OG route's backward compatibility:** The `?city=` parameter must be optional. When absent, the route must produce the same output as before (for service pillar pages).
- **Adding `@id` to the wrong level:** The `@id` goes on the `provider` nested object, not on the top-level `Service` schema. The top-level `Service` schema intentionally does NOT have an `@id` on service pillar pages (only service-in-city pages have `@id` on the Service itself).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG image generation | Custom canvas/SVG pipeline | `next/og` (ImageResponse) | Already in use. JSX-based rendering at the edge. Satori handles font loading and layout. |
| JSON-LD types | Manual type definitions | schema-dts | Already in use. Google-maintained TypeScript types for Schema.org. |
| Navigation state | Custom dropdown logic | Existing MegaMenu pattern | The MegaMenu already handles hover/click/keyboard/outside-click. Extend its `PanelId` type, don't build a new component. |

## Common Pitfalls

### Pitfall 1: Edge Runtime Import Restrictions
**What goes wrong:** Adding server-only imports (like database clients, fs, or dynamic requires) to the OG route breaks the edge runtime.
**Why it happens:** The OG route uses `export const runtime = 'edge'` which restricts available Node.js APIs.
**How to avoid:** The `getMunicipality` function is safe -- it reads from a static TypeScript object. Verify that no transitive imports pull in Node.js-only modules. The `municipalities.ts` file only imports from `./types` which is pure TypeScript types.
**Warning signs:** Build error mentioning "Module not found" or "not available in Edge Runtime".

### Pitfall 2: Font Loading in OG Image Route
**What goes wrong:** The OG route fetches the Cormorant Bold font from Google Fonts on every request. Adding city text increases the character set needed.
**Why it happens:** Satori (the engine behind ImageResponse) needs actual font data to render text.
**How to avoid:** The existing font load is fine -- Cormorant Bold covers all Latin characters needed for city names like "West New York", "North Bergen", "East Newark". No additional font weights or families are needed. The route is edge-cached so font fetches are rare in production.
**Warning signs:** OG image shows squares instead of characters (missing glyphs).

### Pitfall 3: MegaMenu Width Overflow with 4th Panel
**What goes wrong:** Adding a 4th trigger button to the MegaMenu may cause the navigation bar to overflow on medium-width screens.
**Why it happens:** The MegaMenu already has 3 relatively long labels ("Residential Services", "Commercial Services", "Service Areas"). Adding "Resources" adds ~120px.
**How to avoid:** The label "Resources" is short (9 chars vs 20+ for others). Test at the lg breakpoint (1024px) where the desktop nav appears. If tight, consider shorter labels like "Guides" or use a slightly smaller font-size at this breakpoint. The current design uses `text-lg` (~18px) for all nav items.
**Warning signs:** Nav items wrap to two lines or overlap with the right-side CTA buttons.

### Pitfall 4: MobileNav Consistency
**What goes wrong:** Adding resources to the MegaMenu but forgetting the MobileNav creates a discrepancy in navigation between desktop and mobile.
**Why it happens:** The MegaMenu and MobileNav are separate components with separate data.
**How to avoid:** Always update both components together. The MobileNav's AccordionSection component should get a "Resources" accordion matching the MegaMenu's Resources panel.
**Warning signs:** Manual testing on mobile shows no way to reach /blog, /guides, or /problems.

### Pitfall 5: Existing Test Coverage for JSON-LD
**What goes wrong:** The existing `buildServicePageJsonLd` tests do NOT check for `@id` on the provider object. Adding `@id` will pass all existing tests but won't be verified.
**Why it happens:** The test was written before entity anchors were a concern.
**How to avoid:** Add a new test case: "provider includes @id entity anchor referencing organization". The existing test at json-ld.test.ts line 215-280 covers `buildServicePageJsonLd` with 8 test cases. A 9th test for `@id` is needed.
**Warning signs:** The `@id` line gets accidentally removed in a future refactor and no test catches it.

## Code Examples

### Example 1: Adding @id to buildServicePageJsonLd provider

```typescript
// Source: Existing pattern in buildCityRoofingContractorJsonLd (json-ld.tsx line 180)
// and buildServiceInCityJsonLd (json-ld.tsx line 245)
provider: {
  '@type': 'RoofingContractor',
  '@id': `${BASE_URL}/#organization`,  // <-- ADD THIS LINE
  name: BUSINESS_INFO.name,
  telephone: BUSINESS_INFO.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.address.street,
    addressLocality: BUSINESS_INFO.address.city,
    addressRegion: BUSINESS_INFO.address.state,
    postalCode: BUSINESS_INFO.address.zip,
    addressCountry: 'US',
  },
},
```

### Example 2: OG Route with city parameter

```typescript
// Source: Existing pattern in /api/og/route.tsx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceSlug = searchParams.get('service');
  const citySlug = searchParams.get('city');       // <-- ADD
  const service = serviceSlug ? getService(serviceSlug) : null;
  const city = citySlug ? getMunicipality(citySlug) : null;  // <-- ADD

  // ... font loading unchanged ...

  // When city is present, compose "Service in City" title
  const title = service && city
    ? `${service.name} in ${city.name}`
    : service?.name ?? 'Professional Roofing Services';
  const subtitle = service?.shortDescription
    ?? 'Licensed, insured, and locally trusted across Hudson County.';

  // ... rest of ImageResponse unchanged, title variable already used ...
}
```

### Example 3: MegaMenu PanelId extension

```typescript
// Source: Existing pattern in mega-menu.tsx
type PanelId = "residential" | "commercial" | "locations" | "resources" | null;

const navItems: Array<{ id: PanelId; label: string }> = [
  { id: "residential", label: "Residential Services" },
  { id: "commercial", label: "Commercial Services" },
  { id: "locations", label: "Service Areas" },
  { id: "resources", label: "Resources" },          // <-- ADD
];

// New panel rendering block:
{item.id === "resources" && (
  <div className="grid gap-4">
    <p className="font-heading font-bold text-lg text-accent mb-1">
      Roofing Resources
    </p>
    <Link href="/blog" onClick={closePanel} role="menuitem"
      className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter">
      <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
        Blog
      </span>
      <span className="block text-text-secondary text-lg leading-snug mt-0.5">
        Roofing tips, guides, and industry insights
      </span>
    </Link>
    <Link href="/guides" onClick={closePanel} role="menuitem"
      className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter">
      <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
        Roofing Guides
      </span>
      <span className="block text-text-secondary text-lg leading-snug mt-0.5">
        Cost guides and material deep-dives
      </span>
    </Link>
    <Link href="/problems" onClick={closePanel} role="menuitem"
      className="group block rounded-md p-2 -mx-2 transition-colors duration-[--duration-fast] hover:bg-dominant-lighter">
      <span className="block font-body font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[--duration-fast]">
        Common Problems
      </span>
      <span className="block text-text-secondary text-lg leading-snug mt-0.5">
        Solutions for ice dams, leaks, and storm damage
      </span>
    </Link>
  </div>
)}
```

### Example 4: Footer Resources Column

```typescript
// Source: Existing footer.tsx column pattern
<div>
  <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
    Resources
  </h3>
  <ul className="space-y-2">
    <li>
      <Link href="/blog"
        className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]">
        Blog
      </Link>
    </li>
    <li>
      <Link href="/guides"
        className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]">
        Roofing Guides
      </Link>
    </li>
    <li>
      <Link href="/problems"
        className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]">
        Common Problems
      </Link>
    </li>
    <li>
      <Link href="/gallery"
        className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]">
        Project Gallery
      </Link>
    </li>
  </ul>
</div>
```

### Example 5: Test for @id entity anchor

```typescript
// Source: Existing test pattern in json-ld.test.ts
it('provider includes @id entity anchor for organization graph merging', () => {
  const schema = buildServicePageJsonLd(service, canonicalUrl) as unknown as Record<string, unknown>;
  const provider = schema.provider as Record<string, unknown>;
  expect(provider['@id']).toBe(`${BASE_URL}/#organization`);
});
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest --run` |
| Full suite command | `npx vitest --run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-02/SEO-04 | buildServicePageJsonLd provider has @id anchor | unit | `npx vitest --run src/lib/__tests__/json-ld.test.ts` | Exists (add test case) |
| SEO-09 | OG route reads ?city= param and renders city name | unit | `npx vitest --run src/app/api/og/__tests__/og-route.test.ts` | Wave 0 |
| UX-08/SEO-05 | MegaMenu includes Resources panel with /blog, /guides, /problems | unit | `npx vitest --run src/components/layout/__tests__/mega-menu.test.tsx` | Wave 0 |
| UX-08/SEO-05 | Footer includes Resources column | unit | `npx vitest --run src/components/layout/__tests__/footer.test.tsx` | Wave 0 |
| UX-08/SEO-05 | MobileNav includes Resources accordion | unit | `npx vitest --run src/components/layout/__tests__/mobile-nav.test.tsx` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest --run`
- **Per wave merge:** `npx vitest --run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/app/api/og/__tests__/og-route.test.ts` -- covers SEO-09 OG city param
- [ ] `src/components/layout/__tests__/mega-menu.test.tsx` -- covers UX-08/SEO-05 nav links (render test with renderToStaticMarkup)
- [ ] `src/components/layout/__tests__/footer.test.tsx` -- covers UX-08/SEO-05 footer resources column
- [ ] `src/components/layout/__tests__/mobile-nav.test.tsx` -- covers UX-08/SEO-05 mobile nav resources
- [ ] Add test case to existing `src/lib/__tests__/json-ld.test.ts` -- covers SEO-02/SEO-04 @id anchor

**Note on component testing:** MegaMenu, MobileNav, and Footer are client components with `"use client"`. Server Component test pattern (`renderToStaticMarkup + createElement`) works for Footer (Server Component) but MegaMenu and MobileNav need vi.mock for motion/react and client hooks. The established pattern from Phase 8 (vi.mock for client dependencies) applies here.

**Important:** The OG route test requires mocking the `fetch` call for font loading and the `ImageResponse` class. Since the route runs in Edge runtime, the test should verify the function logic (param reading, title composition) rather than the full image output. Test the exported `GET` function with a mock `Request` object.

## Open Questions

1. **Footer column count on tablet**
   - What we know: Current footer uses `lg:grid-cols-4`. Adding a 5th column shifts to `lg:grid-cols-5` which gives each column ~220px at 1280px max-width.
   - What's unclear: Whether 5 columns look cramped at 1024-1280px breakpoint.
   - Recommendation: Use `lg:grid-cols-5` at the 1280px container. If too tight at `lg` (1024px), keep `md:grid-cols-3` and let 2 columns wrap to a second row. This is a visual decision best resolved during implementation with browser preview.

2. **Gallery link in nav**
   - What we know: The /gallery page exists but is also not in the navigation (like /blog, /guides, /problems). The milestone audit specifically calls out /blog, /guides, and /problems (27 pages) but not /gallery.
   - What's unclear: Whether /gallery should also be added to navigation.
   - Recommendation: Include /gallery in the Footer "Resources" column (it fits naturally) but NOT in the MegaMenu Resources panel (keep the panel focused on content silos). The audit scope is the 3 content silos, but adding /gallery to the footer is trivial and improves discoverability.

## Sources

### Primary (HIGH confidence)
- **Codebase inspection** (all files read directly):
  - `src/components/layout/mega-menu.tsx` -- current navigation structure (3 panels)
  - `src/components/layout/mobile-nav.tsx` -- current mobile navigation (3 accordion sections)
  - `src/components/layout/footer.tsx` -- current footer (4-column grid)
  - `src/lib/seo/json-ld.tsx` -- all JSON-LD builder functions, entity anchor patterns
  - `src/app/api/og/route.tsx` -- current OG image generation (service-only)
  - `src/app/(marketing)/services/residential/[service]/[city]/page.tsx` -- service-in-city metadata (passes `?city=`)
  - `src/app/(marketing)/services/commercial/[service]/[city]/page.tsx` -- commercial service-in-city metadata (same pattern)
  - `src/app/(marketing)/services/residential/[service]/page.tsx` -- service pillar metadata (no `?city=`)
  - `src/lib/__tests__/json-ld.test.ts` -- existing JSON-LD test coverage
  - `src/data/types.ts` -- Municipality interface (name field available for OG)
  - `src/data/municipalities.ts` -- getMunicipality function (static object lookup, edge-safe)
  - `src/data/services.ts` -- getService function (static object lookup, edge-safe)

- **.planning/v1.0-MILESTONE-AUDIT.md** -- advisory gap definitions
- **.planning/ROADMAP.md** -- Phase 15 success criteria
- **.planning/REQUIREMENTS.md** -- UX-08, SEO-02, SEO-04, SEO-05, SEO-09 definitions

### Secondary (MEDIUM confidence)
- **Schema.org documentation** -- @id property for entity deduplication across JSON-LD blocks is a well-established pattern in the Schema.org specification

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all existing patterns
- Architecture: HIGH -- all files inspected, patterns are established and consistent
- Pitfalls: HIGH -- based on direct codebase analysis, not speculative

**Research date:** 2026-04-02
**Valid until:** 2026-05-02 (stable -- no dependency changes expected)
