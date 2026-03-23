# Phase 2: Design System & Layout Shell - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a consistent visual identity and layout shell shared by every page: design system (typography, color theme, component variants), page layout shell (sticky header, mega-menu navigation, breadcrumbs, full sitemap footer), persistent conversion elements (phone number, CTA button), and Motion-based scroll animations. This phase builds the visual foundation all subsequent content phases render within.

</domain>

<decisions>
## Implementation Decisions

### Color palette
- **D-01:** Dark & authoritative mood — 10 color variations will explore this direction
- **D-02:** Start fresh — discard existing navy (#1a365d) + burnt orange (#c05621). Generate 10 completely new palette options. Current globals.css values will be replaced after approval.
- **D-03:** Deep-toned color backgrounds (deep blues, slates, dark greens, dark warm grays) — not near-black/charcoal
- **D-04:** Full dark site — dark backgrounds throughout ALL sections (header, content areas, footer). Light text on dark. Content sections use slightly lighter dark tones for depth.
- **D-05:** Warm accent colors (gold, amber, copper, warm orange family) for CTA buttons and interactive elements — strong contrast on dark backgrounds
- **D-06:** Modern-elegant typographic treatment — clean spacing, lighter weights where possible, generous whitespace. Cormorant serif reads as refined/premium, not old-fashioned.
- **D-07:** Flat backgrounds with depth via shadows and elevation changes — no texture, noise, or grain patterns. Clean, fast-loading, easy to maintain in Tailwind.

### Navigation & header
- **D-08:** Mega-menu flyout navigation reflecting silo structure (Residential Services, Commercial Services, Locations). Wide dropdown panels showing all services in each silo on hover/click.
- **D-09:** Shrink-on-scroll sticky header — full header on page load (logo, nav, phone number, CTA button), shrinks to compact bar on scroll (logo, condensed nav/hamburger, phone, CTA). Keeps conversion elements visible while saving viewport space.
- **D-10:** Full-screen dark overlay mobile navigation — hamburger opens full-screen overlay with expandable accordion sections for each silo. Phone number and CTA prominent at top.
- **D-11:** Header includes BOTH click-to-call phone number AND a "Get Free Quote" CTA button (warm accent color). Dual conversion paths per CRO-02/CRO-04.

### Footer & layout density
- **D-12:** Full sitemap footer with multi-column layout — all service links, location links, company links, and contact info (NAP). Functions as secondary navigation and SEO internal linking booster.
- **D-13:** CTA banner above footer link columns — full-width call-to-action strip with phone number and quote button. Last conversion opportunity before page end.
- **D-14:** Above-the-fold CTA within hero section on every page — naturally integrated into page design, visible without scrolling. Different pages can have different hero styles.
- **D-15:** 3000+ word pages structured with sectioned visual breaks — alternating dark tones, section dividers, and embedded CTAs every 800-1000 words. Prevents wall-of-text fatigue.

### Animation approach
- **D-16:** Subtle & polished animation intensity — gentle fade-in-up on scroll for sections, smooth header transitions, micro-interactions on buttons/links. Professional, doesn't distract from content.
- **D-17:** No page transitions between routes — instant page loads. Scroll-triggered animations fire fresh on each page.
- **D-18:** Respect prefers-reduced-motion — all scroll animations and transitions disabled when OS has reduced-motion enabled. Elements appear instantly. Standard accessibility best practice.

### Claude's Discretion
- Specific 10 color palette selections (within dark/authoritative, deep-toned, warm accent constraints)
- Specific scroll animation effects (fade-in-up, hover effects, header shrink timing, mega-menu slide-in)
- Exact breakpoints for mobile/tablet/desktop responsive behavior
- Component variant definitions (Button, Card, Badge sizes and states)
- Breadcrumb component styling and BreadcrumbList JSON-LD integration
- Icon sizing and placement within navigation and footer
- Exact spacing scale and design token values

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project requirements
- `.planning/REQUIREMENTS.md` — Full v1 requirements. Phase 2 covers: FNDN-05, FNDN-06, FNDN-07, UX-01, UX-02, UX-03, UX-04, UX-05, UX-06, UX-08, SEO-06, CRO-02, CRO-04
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/ROADMAP.md` §Phase 2 — Success criteria and dependencies

### Phase 1 context
- `.planning/phases/01-project-scaffold-data-architecture/01-CONTEXT.md` — URL hierarchy (D-08), data registry organization (D-09-D-17), app directory structure (D-21-D-23)

### Technology stack
- `CLAUDE.md` §Technology Stack — Complete dependency list with pinned versions. Key for Phase 2: Tailwind CSS 4 (CSS-first config), Motion library (v12.x), Lucide React icons, `cn()` utility pattern (clsx + tailwind-merge), class-variance-authority for component variants
- `CLAUDE.md` §Constraints — Cormorant Garamond (medium) body, Cormorant headings, 18px min body. 10 color variations as HTML files required before implementation.

### Existing code
- `src/app/layout.tsx` — Root layout with Cormorant font CSS variables already configured
- `src/styles/globals.css` — Current Tailwind 4 theme tokens (to be replaced after color approval)
- `src/data/business-info.ts` — NAP data, phone number, certifications for header/footer
- `src/data/services.ts` — Service data for mega-menu navigation links
- `src/data/municipalities.ts` — Municipality data for location navigation links
- `src/lib/seo/json-ld.ts` — JSON-LD builder (BreadcrumbList schema to be added here)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/layout.tsx` — Root layout with Cormorant + Cormorant Garamond fonts, CSS variables `--font-heading` and `--font-body` already configured via next/font/google
- `src/styles/globals.css` — Tailwind 4 CSS-first config with `@theme` block (current colors to be replaced)
- `src/data/business-info.ts` — Phone number, company name, address for header/footer NAP data
- `src/data/services.ts` — Service names and slugs for mega-menu navigation
- `src/data/municipalities.ts` — City names and slugs for location navigation
- `src/lib/seo/json-ld.ts` — Existing JSON-LD builder to extend with BreadcrumbList schema
- `src/lib/utils.ts` — Likely contains or should contain `cn()` utility

### Established Patterns
- `(marketing)` route group wraps all pages — shared marketing layout (header, footer, persistent CTAs) goes in `src/app/(marketing)/layout.tsx`
- TypeScript strict mode with `interface` for object shapes
- kebab-case files, PascalCase components, SCREAMING_SNAKE_CASE constants
- `satisfies` operator for type-safe object literals

### Integration Points
- `src/app/(marketing)/layout.tsx` — Marketing layout where header, footer, and breadcrumbs will be added
- `src/components/layout/` — Empty, ready for Header, Footer, Navigation, Breadcrumbs, MobileNav components
- `src/components/ui/` — Empty, ready for Button, Card, Badge, and other primitive components
- `src/lib/constants.ts` — Place for design tokens and shared constants

</code_context>

<specifics>
## Specific Ideas

- Full dark site throughout — not a dark-chrome-light-content hybrid. Every section uses dark backgrounds with varying tones for depth.
- 10 color variations must be generated as standalone HTML files for user review before any implementation. This is a CLAUDE.md hard requirement.
- Mega-menu should showcase the breadth of the service offering — users see all services at a glance.
- CTA banner above footer provides "last chance" conversion opportunity before page end.
- Long content pages need sectioned breaks every 800-1000 words to prevent fatigue on 3000+ word pages.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-design-system-layout-shell*
*Context gathered: 2026-03-23*
