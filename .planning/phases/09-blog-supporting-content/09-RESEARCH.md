# Phase 9: Blog & Supporting Content - Research

**Researched:** 2026-03-28
**Domain:** Blog system architecture, content silo linking, cost guides, material guides, problem-solution pages, automated internal linking, BlogPosting JSON-LD
**Confidence:** HIGH

## Summary

Phase 9 builds the informational content layer that supports and strengthens the service and location silos established in Phases 5-8. The scope covers five distinct content types: (1) a blog system at `/blog/` with articles that link back to their parent silo pillar pages, (2) cost guide pages at `/guides/cost/[slug]` for each service type, (3) material deep-dive guides at `/guides/materials/[slug]` for 6 roofing materials, (4) problem-to-solution pages at `/problems/[slug]` mapping common roofing problems to relevant services, and (5) an automated internal linking system that connects related content within and across silos.

The routing scaffold already exists as stub pages in all five locations: `/blog/`, `/blog/[slug]`, `/guides/cost/[slug]`, `/guides/materials/[slug]`, `/problems/[slug]`, and their hub pages (`/guides/`, `/problems/`). All stubs have working `generateMetadata` and `generateStaticParams` with placeholder content. The `sitemap.ts` already includes `/blog`, `/guides`, and `/problems` in static pages but does NOT yet include dynamic entries for individual blog posts, cost guides, material guides, or problem pages -- this must be updated.

The phase requires creating approximately 22-24 new content pages: 8 blog articles (5 silo-supporting + 3 standalone), 8 cost guides (one per service type), 6 material guides (asphalt shingles, TPO, EPDM, slate, metal, modified bitumen), and 5 problem-to-solution pages (ice dams, ponding water, flashing failure, wind damage, missing shingles). Each page targets 3000+ words per project constraints. Additionally, SEO-05 requires building an automated internal linking utility that inserts contextual links between related services, locations, and blog posts following silo boundary rules.

The biggest implementation challenge is the internal linking system (SEO-05). Unlike simple navigation links, this requires a programmatic system that analyzes content relationships and inserts contextual links at the right places. The approach should be a build-time utility (not runtime) that resolves links based on content metadata (silo assignment, related services, target cities) and renders them as `next/link` components.

**Primary recommendation:** Use TypeScript data files (same pattern as Phases 5-8) for all content. Define content type interfaces for each page type (BlogArticle, CostGuide, MaterialGuide, ProblemSolution). Build a central `internal-links.ts` registry that maps content relationships and exposes link-building functions consumed by all page templates. Execute in waves: (1) foundation types + test scaffolds + internal linking utility, (2) blog system + article components, (3) blog articles content, (4) cost guide system + content, (5) material guide system + content, (6) problem-solution system + content, (7) hub pages + sitemap update + final wiring.

## Project Constraints (from CLAUDE.md)

### Hard Requirements
- Minimum 3000 words per page -- non-negotiable for topical authority
- Content must be realistic placeholder structured identically to final content (not lorem ipsum)
- Every page must export `metadata` or `generateMetadata()` with `title`, `description`, and `openGraph`
- One `<h1>` per page, strict heading hierarchy (h1 > h2 > h3, no skipping)
- All images have descriptive `alt` text
- Canonical URL set via `alternates.canonical` in metadata
- Internal links use `next/link`, not raw `<a>` tags
- Default to Server Components -- only `"use client"` when needed
- Files: kebab-case, Components: PascalCase, Constants: SCREAMING_SNAKE_CASE
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- WCAG AA color contrast, keyboard-accessible interactive elements, focus-visible rings
- Cormorant Garamond (medium) body, Cormorant headings, minimum 18px body font
- LocalBusiness JSON-LD on every page
- Phone numbers wrapped in `tel:` links

### Locked Decisions from Previous Phases
- `as const satisfies Record` pattern for type-safe data registries (Phase 1)
- `cn()` utility pattern with clsx + twMerge (Phase 2)
- SectionWrapper tone="dominant"|"secondary" alternating pattern (Phase 2)
- ScrollReveal wrapping for scroll-linked animations (Phase 2)
- Content data files in `src/data/content/` complement structured data in `src/data/*.ts` (Phase 5)
- CONTENT_MAP record maps slugs to imported content objects for O(1) lookup (Phase 5)
- JSON-LD builders live in `src/lib/seo/json-ld.tsx` with `JsonLd` renderer component (Phase 1/4)
- `buildFaqPageJsonLd()` for FAQ schema (Phase 4)
- `buildBreadcrumbJsonLd()` for BreadcrumbList schema (Phase 2)
- Testimonial filtering: use specific if 3+, else fallback to all (Phases 5/7)
- Vitest 4.1.1 with node environment for data/logic tests (Phase 1)
- Test files in `src/**/__tests__/**/*.test.{ts,tsx}` pattern (vitest.config.ts)
- `ServiceContentSection` component renders long-form prose with paragraph splitting on `\n\n` (Phase 5)
- `FaqAccordion` is a `"use client"` component with Motion animations (Phase 4)

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Blog system with article pages supporting silo-linking (articles link back into service silos) | Stub pages exist at `/blog/` and `/blog/[slug]` with `generateStaticParams`. Need: BlogArticle content type with `siloService` field (maps to one of 8 service slugs or null for standalone), `siloCategory` field (residential/commercial), and explicit `parentPillarLink` pointing back to the pillar page. BlogPosting JSON-LD with `articleSection` set to silo name. New blog article template with "Read More About [Service]" contextual link back to pillar. |
| CONT-02 | At least 5 silo-supporting blog articles (one per major service category) | Five articles mapped to service silos: (1) "Signs You Need a Roof Repair" -> roof-repair, (2) "Complete Roof Replacement Guide for Hudson County Homeowners" -> roof-replacement, (3) "Why Annual Roof Inspections Save Thousands" -> roof-inspection, (4) "How to Choose the Right Commercial Flat Roof System" -> flat-roof-systems, (5) "Preventative Roof Maintenance: A Seasonal Checklist for NJ Homeowners" -> roof-maintenance. Each links back to its parent service page. |
| CONT-03 | At least 3 standalone educational articles for topical authority | Three standalone articles (siloService=null): (1) "Understanding Your Roof: A Homeowner's Anatomy Guide", (2) "How Hudson County Weather Affects Your Roof", (3) "The Complete Guide to Roofing Insurance Claims in New Jersey". These build topical authority without being tied to a single service silo; they can cross-link to multiple silos. |
| CONT-04 | Cost guide pages per service type with location-specific pricing data | Stub pages exist at `/guides/cost/[slug]`. Create 8 cost guides (one per service): roof-repair-cost, roof-replacement-cost, roof-inspection-cost, emergency-roofing-cost, flat-roof-systems-cost, roof-maintenance-cost, commercial-repair-cost, commercial-replacement-cost. Each includes: price ranges by material, Jersey City vs. Hudson County vs. NJ state averages, cost factors table, FAQ section, and links back to parent service page. CostGuide content type with structured pricing data. |
| CONT-05 | Material deep-dive guides for 6 roofing materials (asphalt, TPO, EPDM, slate, metal, modified bitumen) | Stub pages exist at `/guides/materials/[slug]`. Six material guides: asphalt-shingles, tpo-membrane, epdm-rubber, slate-roofing, metal-roofing, modified-bitumen. Each covers: material properties, lifespan, cost ranges, pros/cons, best applications (residential vs commercial), Hudson County climate suitability, installation process, maintenance requirements. MaterialGuide content type. Links to services that install this material (cross-silo linking). |
| CONT-06 | Problem-to-solution pages mapping common roofing problems to relevant services | Stub pages exist at `/problems/` and `/problems/[slug]`. Five problem pages: ice-dams, ponding-water, flashing-failure, wind-damage, missing-shingles. Each covers: problem identification, causes, DIY vs professional repair, when to call a roofer, how our services solve this problem (with internal links to specific services), prevention strategies, and FAQ. ProblemSolution content type with `relatedServiceSlugs` field that drives internal linking. |
| SEO-05 | Automated internal linking system connecting related services, locations, and blog posts within and across silos | Build `src/lib/internal-links.ts` utility that: (1) maintains a registry of all content with silo assignments, (2) exposes `getRelatedContent(currentPage)` returning typed link objects, (3) generates contextual link blocks for blog articles (related articles in same silo + related articles across silos), (4) generates "Related Guides" sections for cost/material/problem pages, (5) generates "From Our Blog" sections on service pages. Silo boundary rules: within-silo links are unrestricted; cross-silo links are limited to hub-to-hub or via educational (standalone) content. All links use `next/link` with `prefetch={false}` for large link sets (per Phase 8 SiblingCitiesNav pattern). |
</phase_requirements>

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.x | App Router, generateStaticParams, generateMetadata | Routing scaffold exists for all content types. Static generation at build time. |
| React | 19.2.x | Server Components for content-heavy pages | Blog articles, guides, problem pages are 100% static -- Server Components only |
| TypeScript | 5.7.x | Strict typing for content data interfaces | `satisfies` pattern for content data files |
| Tailwind CSS | 4.1.x | Utility-first styling | Existing design tokens and SectionWrapper tone system |
| Motion | 12.x | ScrollReveal animations | Already integrated via ScrollReveal wrapper |
| schema-dts | 1.1.x | TypeScript types for JSON-LD | BlogPosting, Article, FAQPage types verified available |
| Lucide React | 1.0.x | Icons | For content type badges, category icons, related links |

### No New Dependencies Required

Phase 9 requires zero new npm packages. All needed functionality exists:
- `schema-dts` exports `BlogPosting` type (verified in `node_modules/schema-dts/dist/schema.d.ts`)
- All section components from Phases 2-8 are reusable (SectionWrapper, ScrollReveal, FaqAccordion, CTABanner, ServiceContentSection, BadgeStrip, MidPageCTA, QuoteForm, TestimonialCarousel)
- `next/link` for internal navigation (built-in)
- `generateStaticParams` for static page generation (built-in)
- `generateMetadata` for SEO metadata (built-in)

**Installation:** None required.

## Architecture Patterns

### Recommended Project Structure (New Files)

```
src/
  data/
    types.ts                              # ADD: BlogArticle, CostGuide, MaterialGuide, ProblemSolution interfaces
    content/
      blog/                               # NEW: 8 blog article content files
        signs-you-need-roof-repair.ts
        complete-roof-replacement-guide.ts
        why-annual-roof-inspections-save-thousands.ts
        choosing-commercial-flat-roof-system.ts
        preventative-roof-maintenance-checklist.ts
        homeowners-roof-anatomy-guide.ts
        hudson-county-weather-roof-effects.ts
        roofing-insurance-claims-nj-guide.ts
      cost-guides/                        # NEW: 8 cost guide content files
        roof-repair-cost.ts
        roof-replacement-cost.ts
        roof-inspection-cost.ts
        emergency-roofing-cost.ts
        flat-roof-systems-cost.ts
        roof-maintenance-cost.ts
        commercial-repair-cost.ts
        commercial-replacement-cost.ts
      material-guides/                    # NEW: 6 material guide content files
        asphalt-shingles.ts
        tpo-membrane.ts
        epdm-rubber.ts
        slate-roofing.ts
        metal-roofing.ts
        modified-bitumen.ts
      problems/                           # NEW: 5 problem-solution content files
        ice-dams.ts
        ponding-water.ts
        flashing-failure.ts
        wind-damage.ts
        missing-shingles.ts
    __tests__/
      blog-content.test.ts               # NEW: blog article data validation
      cost-guide-content.test.ts          # NEW: cost guide data validation
      material-guide-content.test.ts      # NEW: material guide data validation
      problem-content.test.ts             # NEW: problem-solution data validation
      internal-links.test.ts              # NEW: internal linking system tests
  lib/
    seo/
      json-ld.tsx                         # EXTEND: add buildBlogPostingJsonLd, buildArticleJsonLd
    internal-links.ts                     # NEW: automated internal linking utility
    __tests__/
      internal-links.test.ts             # NEW: internal linking unit tests
  components/
    sections/
      blog-hero.tsx                       # NEW: blog article hero section
      blog-article-body.tsx               # NEW: long-form article body renderer
      blog-sidebar.tsx                    # NEW: article sidebar (table of contents, related articles)
      author-bio.tsx                      # NEW: author attribution section
      related-articles.tsx                # NEW: related articles grid
      related-guides.tsx                  # NEW: related guides section
      cost-table.tsx                      # NEW: pricing comparison table
      material-comparison.tsx             # NEW: material pros/cons comparison
      problem-solution-cta.tsx            # NEW: problem -> service CTA block
      blog-card.tsx                       # NEW: blog article preview card
      guide-card.tsx                      # NEW: guide preview card
      reading-time-badge.tsx              # NEW: estimated reading time display
      table-of-contents.tsx              # NEW: auto-generated TOC from headings
      breadcrumb-trail.tsx               # NEW: silo-aware breadcrumb for blog content
  app/
    (marketing)/
      blog/
        page.tsx                          # REWRITE: blog index page with article grid
        [slug]/
          page.tsx                        # REWRITE: blog article page with full template
      guides/
        page.tsx                          # REWRITE: guides hub page
        cost/
          [slug]/
            page.tsx                      # REWRITE: cost guide page with full template
        materials/
          [slug]/
            page.tsx                      # REWRITE: material guide page with full template
      problems/
        page.tsx                          # REWRITE: problems hub page
        [slug]/
          page.tsx                        # REWRITE: problem-solution page with full template
    sitemap.ts                            # EXTEND: add blog, guide, problem page entries
```

### Pattern 1: Content Type Interfaces

Each content type follows the established Phase 5-8 pattern: a TypeScript interface in `src/data/types.ts` with long-form prose fields, and content data files that export a const object satisfying the interface.

```typescript
// src/data/types.ts (additions)

export interface BlogArticle {
  slug: string;
  title: string;
  headline: string;                       // H1 headline
  subtitle: string;                       // Supporting tagline
  siloService: string | null;             // Service slug for silo-supporting, null for standalone
  siloCategory: ServiceCategory | null;   // 'residential' | 'commercial' | null
  parentPillarLink: string | null;        // URL path to parent pillar page, e.g., '/services/residential/roof-repair'
  author: string;                         // Author name
  publishDate: string;                    // ISO 8601 date
  updatedDate: string | null;             // ISO 8601 date or null
  readingTimeMinutes: number;             // Estimated reading time
  tags: string[];                         // Topic tags for related content matching
  introNarrative: string;                 // ~300 words: opening hook
  sections: ArticleSection[];             // Ordered body sections with headings
  closingNarrative: string;               // ~200 words: closing CTA
  faqs: FAQ[];                            // 5+ article-specific FAQs
  relatedServiceSlugs: string[];          // Services this article relates to
  relatedCitySlugs: string[];             // Cities mentioned (for internal linking)
  relatedMaterialSlugs: string[];         // Materials mentioned
  relatedProblemSlugs: string[];          // Problems mentioned
}

export interface ArticleSection {
  heading: string;                         // H2 or H3 heading
  headingLevel: 2 | 3;                    // Heading hierarchy level
  content: string;                         // ~400-600 words per section
}

export interface CostGuide {
  slug: string;
  serviceSlug: string;                     // Maps to one of the 8 services
  serviceCategory: ServiceCategory;
  title: string;
  headline: string;
  subtitle: string;
  introNarrative: string;                  // ~500 words
  costOverview: CostRange[];               // Price ranges by material/scope
  costFactorsNarrative: string;            // ~500 words: what affects cost
  locationPricing: LocationPricing[];      // Jersey City, Hoboken, etc. pricing context
  savingStrategies: string;                // ~300 words
  whenToInvest: string;                    // ~300 words
  financingOptions: string;                // ~200 words
  closingNarrative: string;                // ~200 words
  faqs: FAQ[];                             // 5+ cost-specific FAQs
}

export interface CostRange {
  item: string;                            // e.g., "Asphalt shingle repair (10 sq ft)"
  lowEstimate: string;                     // e.g., "$300"
  highEstimate: string;                    // e.g., "$800"
  notes: string;                           // Context for the range
}

export interface LocationPricing {
  cityName: string;
  citySlug: string;
  priceContext: string;                    // ~100 words: why prices differ here
}

export interface MaterialGuide {
  slug: string;
  materialName: string;
  title: string;
  headline: string;
  subtitle: string;
  introNarrative: string;                  // ~500 words
  materialProperties: string;              // ~400 words
  lifespanAndDurability: string;           // ~300 words
  costAnalysis: string;                    // ~300 words with price ranges
  prosAndCons: { pros: string[]; cons: string[] };
  bestApplications: string;               // ~400 words: residential vs commercial
  hudsonCountySuitability: string;         // ~300 words: local climate factors
  installationProcess: string;             // ~300 words
  maintenanceRequirements: string;         // ~200 words
  closingNarrative: string;                // ~200 words
  faqs: FAQ[];                             // 5+ material-specific FAQs
  relatedServiceSlugs: string[];           // Services that work with this material
}

export interface ProblemSolution {
  slug: string;
  problemName: string;
  title: string;
  headline: string;
  subtitle: string;
  introNarrative: string;                  // ~500 words: problem identification
  causesNarrative: string;                 // ~400 words: why this happens
  identificationSigns: string[];           // List of visual/physical signs
  diyVsProfessional: string;               // ~300 words: when to DIY vs call
  professionalSolution: string;            // ~400 words: how our services fix it
  preventionStrategies: string;            // ~300 words
  hudsonCountyContext: string;             // ~200 words: local relevance
  closingNarrative: string;                // ~200 words
  faqs: FAQ[];                             // 5+ problem-specific FAQs
  relatedServiceSlugs: string[];           // Services that solve this problem
}
```

### Pattern 2: Internal Linking Registry

The automated internal linking system is a build-time utility that maintains a complete content registry and resolves contextual links.

```typescript
// src/lib/internal-links.ts

import type { ServiceCategory } from '@/data/types';

// Content registry entry -- every page in the site
export interface ContentNode {
  slug: string;
  type: 'service' | 'city' | 'service-in-city' | 'blog' | 'cost-guide' | 'material-guide' | 'problem';
  title: string;
  path: string;                             // Full URL path
  siloService: string | null;              // Service slug
  siloCategory: ServiceCategory | null;    // 'residential' | 'commercial'
  tags: string[];                          // For fuzzy matching
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  relatedMaterialSlugs: string[];
  relatedProblemSlugs: string[];
}

export interface InternalLink {
  title: string;
  path: string;
  type: ContentNode['type'];
  description?: string;
}

// Functions exposed:
// getRelatedBlogArticles(currentSlug: string, limit?: number): InternalLink[]
// getRelatedGuides(currentSlug: string, limit?: number): InternalLink[]
// getSiloArticles(serviceSlug: string): InternalLink[]
// getCrossSiloLinks(currentSilo: string, limit?: number): InternalLink[]
// getServicePillarLink(serviceSlug: string, category: ServiceCategory): InternalLink
// getProblemRelatedServices(problemSlug: string): InternalLink[]
// getMaterialRelatedServices(materialSlug: string): InternalLink[]
// getBlogArticlesForService(serviceSlug: string): InternalLink[]
// getCostGuideForService(serviceSlug: string): InternalLink | null
```

### Pattern 3: Silo Boundary Rules

The internal linking system must follow these rules:

1. **Within-silo links** (unlimited): Blog articles assigned to a service silo can freely link to: the parent service pillar page, other blog articles in the same silo, cost guide for the same service, related problem pages, and related material guides.

2. **Cross-silo links** (controlled): Cross-silo links are allowed only through: (a) hub-to-hub connections (e.g., residential repair pillar linking to commercial repair pillar via "Related Services"), (b) standalone educational articles that naturally reference multiple services, (c) material guides that serve both residential and commercial (e.g., TPO is commercial, asphalt is residential -- they can link to their respective silos), (d) problem pages that map to multiple services.

3. **Vertical silo chain**: Service pillar page -> Cost guide -> Blog articles -> Problem pages. Every page in the chain links upward to the pillar and downward to supporting content.

4. **Location cross-links**: Blog articles can reference specific cities (via `relatedCitySlugs`) and link to city hub pages, but NOT directly to service-in-city pages (which would dilute link equity from the 96-page layer). Service-in-city pages can link TO blog articles for additional reading.

### Pattern 4: Blog Article Page Template

Blog articles follow the established section-alternating pattern but use `<article>` semantic HTML:

```
<article>
  1. Blog Hero (dominant)              -- title, date, reading time, author, silo badge
  2. Badge Strip (secondary)           -- trust signals
  3. Article Intro (dominant)          -- opening hook ~300 words
  4. Table of Contents (secondary)     -- auto-generated from section headings
  5-N. Article Sections (alternating)  -- H2/H3 sections with ~400-600 words each
  N+1. Related Guides (secondary)      -- cost guide + material guides related to this topic
  N+2. FAQ Accordion (dominant)        -- article-specific FAQs
  N+3. Related Articles (secondary)    -- 3 related blog posts (same silo + cross-silo)
  N+4. Author Bio (dominant)           -- company attribution
  N+5. Quote Form (secondary)          -- lead capture
  N+6. CTA Banner                      -- final call to action
</article>
```

### Pattern 5: BlogPosting JSON-LD Schema

```typescript
// Addition to src/lib/seo/json-ld.tsx
import type { BlogPosting, WithContext } from 'schema-dts';

export function buildBlogPostingJsonLd(article: {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  updatedDate: string | null;
  authorName: string;
  siloService: string | null;
  wordCount: number;
}): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.publishDate,
    dateModified: article.updatedDate ?? article.publishDate,
    author: {
      '@type': 'Person',
      name: article.authorName,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: BASE_URL,
    },
    url: `${BASE_URL}/blog/${article.slug}`,
    wordCount: article.wordCount,
    articleSection: article.siloService ?? 'Roofing',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}`,
    },
  };
}
```

Google recommends `headline`, `datePublished`, `author` (with `author.name` and `author.url`), `dateModified`, and `image` for maximum eligibility. The `@type: 'BlogPosting'` is a subtype of `Article` and is supported by Google for rich results.

### Anti-Patterns to Avoid

- **Cross-silo link flooding:** Do NOT create links from every blog article to every service page. Each article should have exactly ONE parent pillar link (its silo assignment) and 2-3 contextual cross-links max. Over-linking dilutes topic signals.
- **Orphaned content:** Every blog article, guide, and problem page MUST be reachable from at least 2 other pages (the hub page AND at least one contextual link from a service/city page). No orphaned content.
- **Duplicate FAQ answers:** Blog article FAQs must NOT duplicate FAQs already present on the parent service page. Use `extendedFaqs` in the article content files that cover different questions.
- **Template content across guides:** Cost guides and material guides must have genuinely unique narratives. Do NOT reuse the same "cost factors" prose from the service page -- write fresh content that approaches the topic from an informational (not commercial) angle.
- **`<article>` nesting:** Blog post pages should use `<article>` as the top-level semantic wrapper. Do NOT nest `<article>` inside `<main>` since the marketing layout already wraps children in `<main id="main-content">`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Table of Contents | Manual heading extraction | Build-time heading parser from `ArticleSection[]` data | Content data already has section headings and levels; parse from data structure, not DOM |
| Reading time | Runtime word counting | Pre-computed `readingTimeMinutes` in content data | Word count is known at content authoring time; store as data, not compute at render |
| Related articles matching | Full-text similarity engine | Tag-based matching from content registry | `tags` array in each content type provides explicit relationships; no NLP needed |
| Markdown/MDX rendering | MDX compiler pipeline | Plain TypeScript strings with `\n\n` paragraph splits | Established pattern from Phase 5-8; ServiceContentSection handles prose rendering. No markdown needed -- content is authored directly as strings |
| RSS feed | Custom XML generation | `app/blog/feed.xml/route.ts` using Response | Next.js route handlers generate XML natively; no RSS library needed |
| Author system | Multi-author CMS | Single author constant | This is a single-business site; one author ("Jersey City Quality Roofing Team") |

## Common Pitfalls

### Pitfall 1: Sitemap Stale After Adding Dynamic Content
**What goes wrong:** New blog posts, guides, and problem pages are created but `sitemap.ts` still only includes hardcoded entries. Google never discovers the new pages.
**Why it happens:** The current sitemap has blog/guides/problems as static entries but no dynamic generation from content registries.
**How to avoid:** Update `sitemap.ts` to import content registries and generate entries for each blog article, cost guide, material guide, and problem page using the same pattern as service-in-city pages. Set blog posts to `changeFrequency: 'monthly'`, guides to `changeFrequency: 'monthly'`, priority 0.6-0.7.
**Warning signs:** Google Search Console reports fewer indexed pages than expected.

### Pitfall 2: Blog Articles Not Linking Back to Pillar Pages
**What goes wrong:** Blog articles are published but lack explicit links back to their parent service silo pillar page. Google cannot determine the silo relationship.
**Why it happens:** Developer forgets to add the pillar link, or the template lacks a dedicated "Read More About [Service]" section.
**How to avoid:** Make `parentPillarLink` a required field in the `BlogArticle` interface for silo-supporting articles (non-null when `siloService` is set). The article template must render this link prominently (not buried in footer text). Test validates that every silo-supporting article has a non-null `parentPillarLink`.
**Warning signs:** `parentPillarLink` is null for articles with a non-null `siloService`.

### Pitfall 3: Cost Guide Price Data Becoming Fictional
**What goes wrong:** Cost ranges are invented without any basis, making the content untrustworthy and potentially harmful (users make financial decisions based on these numbers).
**Why it happens:** Pressure to fill in pricing data without access to actual market data.
**How to avoid:** Use realistic placeholder ranges based on publicly available roofing industry data (HomeAdvisor, Angi, RSMeans). Mark all prices as "estimated ranges" with a disclaimer. Structure the content to emphasize "factors that affect cost" more than specific dollar amounts. The data must be plausible even as placeholder content.
**Warning signs:** Prices that are unrealistically low or high for the NJ market.

### Pitfall 4: Internal Linking System Over-Linking
**What goes wrong:** Every page has 20+ internal links, diluting PageRank and creating a "link farm" appearance.
**Why it happens:** Automated system adds every possible related link without limits.
**How to avoid:** Cap internal links per section: (1) "Related Articles" section: max 3 links, (2) "Related Guides" section: max 3 links, (3) within-body contextual links: max 2-3 per 500-word section, (4) "Related Services" section: reuse existing RelatedServicesRow pattern (max 3). Total contextual links per page should not exceed 15-20 (excluding navigation).
**Warning signs:** Pages with 30+ internal links in the body content.

### Pitfall 5: Hub Pages With Thin Content
**What goes wrong:** The `/blog/`, `/guides/`, and `/problems/` hub pages are just link lists with no substantive content.
**Why it happens:** Hub pages are treated as index pages only, not as content pages.
**How to avoid:** Each hub page should include: (1) a proper hero section with H1 and intro paragraph, (2) category filtering or grouping (blog by silo, guides by type, problems by category), (3) at least 200-300 words of contextual content explaining what the section covers, (4) proper metadata and JSON-LD. These hub pages serve as silo root nodes.
**Warning signs:** Hub pages with fewer than 100 words of visible content.

### Pitfall 6: Heading Hierarchy Violations in Article Sections
**What goes wrong:** Article sections jump from H2 to H4, or use multiple H1 tags, breaking the heading hierarchy constraint.
**Why it happens:** ArticleSection data allows arbitrary heading levels without validation.
**How to avoid:** Constrain `headingLevel` to `2 | 3` in the interface. Validate in tests that: (1) first section starts at H2, (2) H3 only appears after an H2, (3) no heading level is skipped. The article template renders the H1 in the hero; all body sections use H2/H3 only.
**Warning signs:** Heading outline shows gaps (H1 -> H3 skip).

### Pitfall 7: generateStaticParams Returning Wrong Shape
**What goes wrong:** Blog articles, guides, or problem pages fail to generate because `generateStaticParams` returns the wrong parameter name.
**Why it happens:** Existing stubs use `{ slug: 'placeholder-article' }` which is correct, but when switching to content-registry-driven generation, the field name might not match the route segment `[slug]`.
**How to avoid:** Follow the exact existing pattern: `return blogArticles.map((article) => ({ slug: article.slug }))`. The parameter name MUST match the directory name `[slug]`.
**Warning signs:** Build errors about missing static params or 404s on article pages.

## Code Examples

### Content Data File Pattern (Blog Article)

```typescript
// src/data/content/blog/signs-you-need-roof-repair.ts
import type { BlogArticle } from '@/data/types';

export const SIGNS_YOU_NEED_ROOF_REPAIR: BlogArticle = {
  slug: 'signs-you-need-roof-repair',
  title: '7 Warning Signs You Need a Roof Repair Before It Gets Worse',
  headline: '7 Warning Signs You Need a Roof Repair Before It Gets Worse',
  subtitle: 'Catch these problems early and save thousands on emergency repairs.',
  siloService: 'roof-repair',
  siloCategory: 'residential',
  parentPillarLink: '/services/residential/roof-repair',
  author: 'Jersey City Quality Roofing Team',
  publishDate: '2026-03-01T00:00:00Z',
  updatedDate: null,
  readingTimeMinutes: 12,
  tags: ['roof-repair', 'warning-signs', 'maintenance', 'hudson-county'],
  introNarrative: `...~300 words...`,
  sections: [
    {
      heading: 'Water Stains on Your Ceiling or Walls',
      headingLevel: 2,
      content: `...~400-600 words...`,
    },
    // ... more sections
  ],
  closingNarrative: `...~200 words...`,
  faqs: [
    { question: '...', answer: '...' },
    // 5+ FAQs
  ],
  relatedServiceSlugs: ['roof-repair', 'roof-inspection', 'emergency-roofing'],
  relatedCitySlugs: ['jersey-city', 'hoboken'],
  relatedMaterialSlugs: ['asphalt-shingles'],
  relatedProblemSlugs: ['missing-shingles', 'flashing-failure'],
};
```

### Internal Linking Utility Pattern

```typescript
// src/lib/internal-links.ts
import type { InternalLink, ContentNode } from './internal-links.types';

// Central registry built from all content data imports
const CONTENT_REGISTRY: ContentNode[] = [
  // Populated by importing all content files
];

export function getRelatedBlogArticles(
  currentSlug: string,
  limit: number = 3
): InternalLink[] {
  const current = CONTENT_REGISTRY.find(
    (n) => n.slug === currentSlug
  );
  if (!current) return [];

  // Prioritize same-silo articles, then tag-overlap articles
  return CONTENT_REGISTRY
    .filter((n) => n.type === 'blog' && n.slug !== currentSlug)
    .map((n) => ({
      node: n,
      score: computeRelevanceScore(current, n),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ node }) => ({
      title: node.title,
      path: node.path,
      type: node.type,
    }));
}

function computeRelevanceScore(a: ContentNode, b: ContentNode): number {
  let score = 0;
  // Same silo = highest priority
  if (a.siloService && a.siloService === b.siloService) score += 10;
  // Shared tags
  const sharedTags = a.tags.filter((t) => b.tags.includes(t));
  score += sharedTags.length * 2;
  // Shared related services
  const sharedServices = a.relatedServiceSlugs.filter(
    (s) => b.relatedServiceSlugs.includes(s)
  );
  score += sharedServices.length * 3;
  return score;
}
```

### Cost Guide Page Assembly Pattern

```typescript
// src/app/(marketing)/guides/cost/[slug]/page.tsx
export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getCostGuide(slug);
  if (!guide) notFound();

  const service = getService(guide.serviceSlug);
  const pillarPath = `/services/${guide.serviceCategory}/${guide.serviceSlug}`;

  return (
    <>
      <JsonLd data={buildBlogPostingJsonLd({...}) as unknown as Record<string, unknown>} />
      <JsonLd data={buildFaqPageJsonLd(guide.faqs) as unknown as Record<string, unknown>} />
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: 'Home', url: BASE_URL },
        { name: 'Guides', url: `${BASE_URL}/guides` },
        { name: 'Cost Guides', url: `${BASE_URL}/guides/cost` },
        { name: guide.title, url: `${BASE_URL}/guides/cost/${slug}` },
      ]) as unknown as Record<string, unknown>} />

      {/* Hero */}
      {/* Badge Strip */}
      {/* Intro Narrative */}
      {/* Cost Overview Table */}
      {/* Cost Factors Narrative */}
      {/* Location Pricing Section */}
      {/* Saving Strategies */}
      {/* When to Invest */}
      {/* Related Service CTA -> pillar page */}
      {/* FAQ Accordion */}
      {/* Related Guides (material guides for related materials) */}
      {/* Quote Form */}
      {/* CTA Banner */}
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| MDX/Contentlayer for blog | TypeScript data files (project pattern) | Phase 5 (2026-03) | Zero build dependencies, type safety, consistent with rest of site |
| Article schema only | BlogPosting schema with author + datePublished | Google March 2026 update | BlogPosting with Person author supports E-E-A-T and AI Mode citation |
| Manual internal links | Automated link registry with silo boundaries | Best practice 2025-2026 | Programmatic sites need automated linking at scale; manual linking does not scale to 150+ pages |
| Rigid silo boundaries | Hybrid silos with controlled cross-linking | SEO evolution 2025 | Pure rigid silos are outdated; hybrid approach with controlled cross-links is the 2025-2026 recommendation |
| RSS via npm packages | Next.js route handler (`feed.xml/route.ts`) | Next.js 14+ | No external dependency needed; route handlers generate XML natively |

**Deprecated/outdated:**
- `next-mdx-remote`: Unnecessary for this project; content is authored as TypeScript strings
- `contentlayer`: Abandoned; no longer maintained
- `content-collections`: Pre-1.0; unnecessary when TypeScript data files work perfectly

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.1 |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `pnpm test` |
| Full suite command | `pnpm test` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Blog articles have silo assignment and parent pillar link | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | Wave 0 |
| CONT-02 | 5 silo-supporting articles exist with valid siloService | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | Wave 0 |
| CONT-03 | 3 standalone articles exist with null siloService | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | Wave 0 |
| CONT-04 | 8 cost guides exist, one per service, with pricing data | unit | `pnpm test -- src/data/__tests__/cost-guide-content.test.ts -x` | Wave 0 |
| CONT-05 | 6 material guides exist for specified materials | unit | `pnpm test -- src/data/__tests__/material-guide-content.test.ts -x` | Wave 0 |
| CONT-06 | 5 problem pages exist with relatedServiceSlugs | unit | `pnpm test -- src/data/__tests__/problem-content.test.ts -x` | Wave 0 |
| SEO-05 | Internal linking utility returns correct links following silo rules | unit | `pnpm test -- src/lib/__tests__/internal-links.test.ts -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm test`
- **Per wave merge:** `pnpm test && pnpm build`
- **Phase gate:** Full suite green + `pnpm build` succeeds before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/data/__tests__/blog-content.test.ts` -- covers CONT-01, CONT-02, CONT-03
- [ ] `src/data/__tests__/cost-guide-content.test.ts` -- covers CONT-04
- [ ] `src/data/__tests__/material-guide-content.test.ts` -- covers CONT-05
- [ ] `src/data/__tests__/problem-content.test.ts` -- covers CONT-06
- [ ] `src/lib/__tests__/internal-links.test.ts` -- covers SEO-05

Framework install: Not needed -- Vitest 4.1.1 already installed and configured.

## Open Questions

1. **Blog article image strategy**
   - What we know: Google recommends `image` property in BlogPosting schema for maximum rich result eligibility. `next/image` is the established image component.
   - What's unclear: Phase 9 focuses on content structure, not media. Should blog articles include placeholder image references in their data, or defer image implementation to Phase 10?
   - Recommendation: Include `ogImage` and `heroImage` fields in the BlogArticle interface as optional strings. Set them to null in Phase 9 content files. The JSON-LD can reference the OG image route (`/api/og?article=${slug}`) as a fallback. Actual image assets can be added later.

2. **Cost guide pricing accuracy**
   - What we know: Pricing data must be realistic placeholder data for the NJ market. HomeAdvisor and Angi publish national averages.
   - What's unclear: How to differentiate Jersey City pricing from generic NJ pricing without real market data.
   - Recommendation: Use publicly available national/regional averages with a 10-15% urban premium for Jersey City/Hoboken (higher labor and permit costs in dense urban areas). Mark all prices with a "prices are estimates and vary by project" disclaimer.

3. **Service page blog backlinks (reverse direction)**
   - What we know: Blog articles link TO service pillar pages. SEO-05 also requires service pages to link to related blog content.
   - What's unclear: Should service pillar pages (Phase 5-6) be modified in this phase to add "From Our Blog" sections?
   - Recommendation: Yes -- add a "From Our Blog" section to the service page templates using the internal linking utility. This is part of SEO-05's "automated internal linking connects related services... and blog posts." It can be a simple `RelatedArticles` component inserted between the FAQ and Quote Form sections.

## Sources

### Primary (HIGH confidence)
- [Google Article Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article) - BlogPosting required/recommended properties
- [Schema.org BlogPosting](https://schema.org/BlogPosting) - Full property inheritance chain
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Implementation pattern for App Router
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) - Route conventions
- schema-dts v1.1.5 `node_modules/schema-dts/dist/schema.d.ts` - Verified BlogPosting type export

### Secondary (MEDIUM confidence)
- [Silo Structure SEO: Internal Linking Guide](https://www.tangence.in/blog/silo-structure-seo/) - Silo boundary rules and linking patterns
- [How to Build Smarter SEO Silos](https://thrivethemes.com/seo-silos-for-traffic-and-conversions/) - Hybrid silo approach
- [Programmatic SEO Internal Linking](https://seomatic.ai/blog/programmatic-seo-internal-linking) - Automation strategies for large sites
- [Advanced Internal Linking Strategies 2026](https://bloghunter.se/blog/advanced-internal-linking-strategies-for-seo-success-in-2026) - Cross-silo linking rules
- [Blog Schema Markup Guide 2026](https://superblog.ai/blog/blog-schema-markup-guide/) - BlogPosting implementation patterns
- [Schema Markup After March 2026](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies) - Google March 2026 update impact on structured data

### Tertiary (LOW confidence)
- [Roofing SEO Guide 2025](https://miromind.com/blog/roofing-seo) - Roofing industry content strategy patterns
- [Local SEO for Roofing Companies 2026](https://insidea.com/blog/marketing/roofing-companies/ultimate-local-seo-guide/) - Local business blog strategy

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies; all patterns established in Phases 5-8
- Architecture: HIGH - Content type interfaces follow proven Phase 5-8 patterns; routing stubs already exist
- Pitfalls: HIGH - Validated against actual sitemap.ts, existing test patterns, and Google documentation
- Internal linking: MEDIUM - Silo boundary rules synthesized from multiple SEO sources; implementation pattern is straightforward but business logic needs validation through tests
- Cost/pricing data: MEDIUM - Realistic placeholders based on industry averages; not verified against live NJ market data

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable -- no fast-moving dependencies)
