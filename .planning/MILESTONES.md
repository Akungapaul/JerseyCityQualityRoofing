# Milestones

## v1.0 MVP (Shipped: 2026-04-03)

**Phases completed:** 16 phases, 59 plans, 104 tasks

**Key accomplishments:**

- Next.js 16 project with TypeScript strict mode, Tailwind CSS 4, Cormorant font loading, shared data types for Municipality/Service/Testimonial/BusinessInfo, cn() utility, and business info registry
- Complete URL routing skeleton with 18 page files generating 131 static pages across residential/commercial service silos, city hubs, blog, guides, and problem pages
- Type-safe data registries for 12 municipalities (1430 lines), 8 services (1606 lines), 48 testimonials, and a cross-reference resolver for 96 service-in-city content combinations
- Centralized SEO helpers with metadata on all 18 pages, data-driven routing, 125-URL sitemap, and 50-test vitest suite
- Deep Olive Sage color palette with 10-token @theme system, Button (primary/secondary/phone) and Badge (certification/status) components via cva
- Sticky Header with shrink-on-scroll, MegaMenu flyout with 3 service/location panels, full-screen MobileNav with accordion, Footer with CTA banner and 4-column sitemap, and route-aware Breadcrumbs with BreadcrumbList JSON-LD
- SectionWrapper with alternating dark tones, CTABanner conversion strip, ScrollReveal fade-in-up animation, and MarketingLayout wiring Header + Breadcrumbs + main + Footer on every marketing page
- Zod v4 form validation schemas, Cloudflare Turnstile server verification, and Resend email notification with React Email template for two-tier lead capture system
- React Hook Form + Zod v4 form components with Server Action pipeline, Turnstile captcha, honeypot spam filter, and header CTA scroll-to-form behavior for complete lead capture system
- Three JSON-LD builders (AggregateRating, FAQPage, ContactPage), homepage FAQ data, about page content, and NAP/testimonial test infrastructure
- 16 reusable section components with Embla Carousel testimonials, accessible FAQ accordion, lazy-loaded Google Maps, and data-driven server components for all 4 marketing pages
- Four complete marketing pages (Homepage, About, Contact, Service Areas) assembled from 16 section components with JSON-LD structured data, responsive layouts, and mobile-first ordering
- ServiceContent/EmergencyContent type definitions and 4 residential service content data files with 2200+ words each in expert neighbor voice with Hudson County local context
- 6 section components for residential service pages: ServiceHero with dual CTA and CompactQuoteForm, ProcessTimeline with connector lines and duration badges, MaterialCards with Motion-animated expandable pros/cons, CostFactorsSection with impact badges, WarningSignsSection with dynamic Lucide icon mapping, and ServiceContentSection prose renderer
- 6 section components for emergency template (EmergencyHero, WhatToDoSection, StormDamageTypes, InsuranceClaimsSection) and shared CTA/linking sections (MidPageCTA, RelatedServicesRow) using Lucide icons and emergency accent #d4782f
- Service JSON-LD schema builder with provider/areaServed/hasOfferCatalog, dynamic OG image edge route, and emergency accent CSS variables
- Complete residential service page wiring 4 content data files, 12 section components, and dual JSON-LD schemas into standard/emergency template rendering at /services/residential/[service]
- 4 commercial service content data files with 2200+ words each using commercial roofing terminology, first-person expert voice, and Hudson County local context -- all 125 service-content tests passing
- CommercialRelatedServicesRow Server Component with commercial icon map (Layers, ClipboardCheck, Wrench, Building2) linking to /services/commercial/ URLs
- Full 13-section commercial service page wiring 4 content data files, CommercialRelatedServicesRow, and commercial-specific CTA copy with Service + FAQPage JSON-LD schemas
- CityHubContent interface with @id entity JSON-LD builder, Wave 0 test scaffolds validating all 12 cities, and 4 Tier 1 city content files (Jersey City, Hoboken, Bayonne, North Bergen) each with 3000+ words of unique local content
- 7 Server Components for city hub pages: hero with dual CTA, housing stats, weather cards, neighborhood grid, service links, landmarks, and local expertise with map embed
- 4 Tier 2 city content data files (Union City, West New York, Secaucus, Kearny) with 3000+ unique words each covering dense urban, Palisades wind, Meadowlands moisture, and industrial heritage roofing challenges
- Tier 3 city hub content for Harrison, East Newark, Guttenberg, and Weehawken with 3000+ unique words each, leveraging municipality-specific geographic and demographic characteristics
- Complete 14-section city hub page template wiring all 12 municipalities with JSON-LD schemas, city-specific testimonials, and content data maps -- awaiting visual verification
- ServiceInCityContent interface with 12 long-form prose fields, buildServiceInCityJsonLd with city-scoped areaServed, and Wave 0 test scaffolds enforcing content uniqueness (Jaccard), cumulative word count (>= 2500), and SEO correctness
- 5 Server Components (hero, narrative, neighborhood grid, concerns list, city nav) with 18 unit tests verifying single H1, aria-current, accessibility attributes, and emergency variant
- 8 Jersey City content files covering all residential and commercial services with unique narratives, neighborhood insights, case scenarios, and FAQs per service
- 8 Hoboken content files with unique density-focused narratives covering brownstone party walls, Historic District preservation, waterfront salt air, and compact 1.3 sq mi logistics
- 8 Bayonne content files with peninsula-specific narratives emphasizing 3-sided water exposure, salt air corrosion, wood-frame housing stock, and Constable Hook industrial heritage
- 8 North Bergen content files with Palisades ridge-specific narratives emphasizing elevation, wind exposure, steep terrain access, and Tonnelle Avenue commercial corridor demands
- 8 Union City content files emphasizing extreme density, shared party wall construction, zero-lot-line access constraints, and multi-family dominance across 5 distinct neighborhoods
- 8 West New York content files emphasizing Palisades cliff-edge wind exposure, Boulevard East dual-direction wind, mid-rise building stock, and elevation-driven roofing challenges differentiating from adjacent Union City
- 8 Secaucus content files emphasizing Meadowlands wetland moisture, flat terrain drainage engineering, and large-footprint commercial buildings unique to the Meadowlands corridor
- 8 Kearny content files covering all services with industrial heritage, Victorian architecture, South Kearny environmental compliance, and dual-river moisture exposure as primary differentiators
- 8 Harrison content files with dual old-vs-new narrative: century-old two-family homes alongside waterfront luxury condos, Red Bull Arena commercial district, and Passaic River moisture environment as unifying differentiator
- 8 East Newark content files emphasizing smallest-borough-in-NJ status, party wall row house construction, Passaic River moisture, and hyper-local community reputation dynamics with street-level geographic references
- 8 Guttenberg service-in-city content files with densest-municipality-in-US differentiation, Galaxy Towers high-rise context, Palisades cliff-edge wind engineering, and extreme access constraint narratives
- 8 Weehawken service-in-city content files emphasizing waterfront-Heights Palisades divide, Port Imperial luxury development, Lincoln Tunnel access constraints, and dual-market service approach
- Wire all 96 service-in-city pages with 15-section templates, triple JSON-LD, bidirectional internal linking, and activated content uniqueness/structure tests
- Content type interfaces (7 types), Wave 0 test scaffolds (4 files), internal linking utility (10 functions with silo-aware relevance scoring), and BlogPosting/CollectionPage JSON-LD builders
- 16 Server Components for blog/guide page templates: heroes, cards, cost table, material comparison, TOC, author bio, and cross-linking sections
- 8 blog articles (5 silo-supporting + 3 standalone) and 8 cost guides with realistic NJ pricing, registry indexes, and lookup functions for the content data layer
- 6 material guides (asphalt, TPO, EPDM, slate, metal, modified bitumen) and 5 problem-solution pages (ice dams, ponding water, flashing failure, wind damage, missing shingles) with registry indexes and Hudson County context
- Full page templates wiring blog, guide, material, and problem content to 7 static pages with JSON-LD, internal linking, and tone alternation
- Floating quote CTA, exit-intent popup with focus trap, and conditional urgency banner wired into marketing layout with full test coverage
- Before/after project gallery with react-compare-slider comparison cards, URL-based service/city filtering, and 8 placeholder projects across Hudson County
- Full image audit with zero violations found and Core Web Vitals optimization verified: font swap, passive listeners, CLS prevention, and clean build across 150+ pages -- awaiting human Lighthouse checkpoint
- Root JSON-LD @id entity anchor for 108-page graph resolution, OG route NAP constants, and 3 silo index sitemap URLs with TDD test coverage
- Three silo index pages at /services, /services/residential, /services/commercial resolving breadcrumb 404s on ~104 pages with triple JSON-LD and hub page pattern
- Fixed blog silo 404 (residential->commercial), registered 8 service + 12 city nodes in content registry, added id="quote-form" to contact page for FloatingCTA
- Removed duplicate BreadcrumbList JSON-LD from 13 page files and excluded testimonials stub from sitemap with noindex metadata
- Removed duplicate NeighborhoodSection interface, fixed react-hooks/refs lint errors in form components, replaced broken MockDate pattern with vi.useFakeTimers in urgency-banner tests, confirmed react-compare-slider dependency installed
- MaterialServiceCTA component wired into all 6 material guide pages, rendering 2-3 related service cross-links per page with correct residential/commercial paths
- Added @id entity anchor to service page JSON-LD provider and extended OG image route to render city-specific titles for 96 service-in-city pages
- Added Resources navigation to MegaMenu, MobileNav, and Footer making 27 content silo pages discoverable from persistent navigation on every page
- TDD Wave 0 test stubs for silo forward link coverage (32 tests passing) and breadcrumb SEGMENT_LABELS completeness (6 tests failing -- expected RED state)
- SiloContentLinks component rendering cost guide featured card + blog article grid, wired into all 8 service pillar pages for bidirectional content silo linking
- Added 5 SEGMENT_LABELS entries for human-readable breadcrumb text on content pages and removed dead 'service-in-city' ContentNode type variant

---
