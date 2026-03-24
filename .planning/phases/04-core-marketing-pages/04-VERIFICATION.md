---
phase: 04-core-marketing-pages
verified: 2026-03-24T00:02:00Z
status: gaps_found
score: 7/8 success criteria verified
gaps:
  - truth: "NAP data is identical across header, footer, contact page, and schema markup on every page"
    status: partial
    reason: "Contact page metadata description has a hardcoded phone number string literal. The google-map-embed.tsx noscript fallback text has a hardcoded address (123 Summit Avenue, Jersey City, NJ 07304). Neither pulls from BUSINESS_INFO or PHONE_NUMBER constants."
    artifacts:
      - path: "src/app/(marketing)/contact/page.tsx"
        issue: "Line 15: description string contains literal '(201) 555-0123' instead of interpolating PHONE_NUMBER constant"
      - path: "src/components/sections/google-map-embed.tsx"
        issue: "Lines 42-44: noscript fallback has hardcoded address '123 Summit Avenue, Jersey City, NJ 07304' instead of accepting an addressFallback prop or importing BUSINESS_INFO"
    missing:
      - "Replace hardcoded phone in contact/page.tsx metadata description with template literal using PHONE_NUMBER"
      - "Replace hardcoded address in google-map-embed.tsx noscript block with a prop or BUSINESS_INFO import"
human_verification:
  - test: "Verify FAQ accordion opens and closes correctly with keyboard"
    expected: "Each FAQ item toggles on Enter/Space, only one item open at a time, aria-expanded updates correctly"
    why_human: "Keyboard interaction and ARIA state change cannot be verified with static code analysis"
  - test: "Verify testimonial carousel autoplays and shows prev/next controls"
    expected: "Carousel advances automatically, pauses on hover, prev/next buttons are visible and functional"
    why_human: "Embla carousel runtime behavior requires browser interaction"
  - test: "Verify Google Maps renders correctly on contact and service-areas pages"
    expected: "Map iframe loads showing correct location, no API key error overlay"
    why_human: "Google Maps embed behavior depends on NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var and network"
  - test: "Verify mobile ordering on contact page"
    expected: "On mobile viewport: ContactInfoColumn appears above QuoteForm; on desktop: form left, info right"
    why_human: "CSS order property behavior requires browser rendering at specific viewport widths"
---

# Phase 4: Core Marketing Pages Verification Report

**Phase Goal:** Visitors landing on the site can understand what the business offers, see proof of credibility, contact the company, and browse all service areas
**Verified:** 2026-03-24T00:02:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Homepage displays hero with dual CTA, badge strip, services grid, testimonials with star ratings, service areas overview, and FAQ section | VERIFIED | `page.tsx` imports and renders all 10 sections in D-02 order: HeroSection (dual CTAs confirmed in component), CompactQuoteForm, BadgeStrip, ServicesGrid, WhyChooseUs, TestimonialCarousel, ServiceAreasOverview, FaqAccordion, QuoteForm, CTABanner |
| 2 | About page presents company story, team section, certifications, insurance info, and license numbers | VERIFIED | `about/page.tsx` renders AboutCompanyStory (4-paragraph narrative from ABOUT_CONTENT), AboutTeamSection (3 members from data), AboutCertifications (certs + licenseNumber + insuranceProvider + insurancePolicyNumber from BUSINESS_INFO) |
| 3 | Contact page has working multi-field quote form, embedded Google Map, and consistent NAP data matching all other pages | PARTIAL | QuoteForm and GoogleMapEmbed present and wired. NAP partially consistent — ContactInfoColumn pulls from BUSINESS_INFO/PHONE_NUMBER correctly, but contact page metadata description has hardcoded "(201) 555-0123" string literal and google-map-embed.tsx noscript fallback has hardcoded address |
| 4 | Service area hub page lists all 12 Hudson County municipalities with links to individual city hub pages | VERIFIED | `service-areas/page.tsx` renders CityCardGrid which calls getMunicipalitiesByTier(1/2/3) and renders CityCard components with all 12 municipalities. CityCard links point to /service-areas/{slug} |
| 5 | NAP data identical across header, footer, contact page, and schema markup on every page | FAILED | Header/footer/ContactInfoColumn/schema all use BUSINESS_INFO or PHONE_NUMBER constants. However: (1) contact/page.tsx metadata description hardcodes "(201) 555-0123", (2) google-map-embed.tsx noscript fallback hardcodes "123 Summit Avenue, Jersey City, NJ 07304". Two independent sources of NAP outside the single source of truth. |

**Score (Success Criteria):** 4/5 verified (1 partial, 1 failed — both share the same root cause)

---

### Required Artifacts (from PLAN frontmatter)

#### Plan 01 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/seo/json-ld.tsx` | Three new JSON-LD builder functions | VERIFIED | Exports `buildAggregateRatingJsonLd`, `buildFaqPageJsonLd`, `buildContactPageJsonLd` — all substantive (40+ lines each with real computation). Wired via imports in page.tsx, about/page.tsx, contact/page.tsx |
| `src/data/homepage-faq.ts` | Homepage FAQ questions and answers | VERIFIED | Exports `HOMEPAGE_FAQS` as `as const satisfies readonly FAQ[]` with 6 Q/A pairs covering all required topics. Used in page.tsx |
| `src/data/about-content.ts` | About page structured content data | VERIFIED | Exports `ABOUT_CONTENT` with `companyStory` (4 paragraphs), `team` (3 members), `stats` (yearsInBusiness computed dynamically), `insurance`. Used in about/page.tsx and AboutCompanyStory/AboutTeamSection components |
| `src/lib/__tests__/json-ld.test.ts` | Tests for all three new JSON-LD builders | VERIFIED | Three new describe blocks present (buildAggregateRatingJsonLd, buildFaqPageJsonLd, buildContactPageJsonLd) with 15 tests. All pass |
| `src/lib/__tests__/nap-consistency.test.ts` | NAP consistency verification test | VERIFIED | 6 tests covering BUSINESS_INFO.phone/name/address/email/serviceAreas vs constants. All pass |
| `src/data/__tests__/testimonials.test.ts` | Testimonial data completeness test | VERIFIED | 5 tests for 48 entries, all fields present, ratings 4-5, text length, 12-city coverage. All pass |

#### Plan 02 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/sections/hero-section.tsx` | Split hero with dual CTAs | VERIFIED | Substantive (105 lines). Split layout with h1, phone CTA (`PHONE_HREF`/`PHONE_NUMBER`), and quote form scroll CTA. Imported and used in page.tsx |
| `src/components/sections/badge-strip.tsx` | Certification badge strip | VERIFIED | File exists, used in page.tsx |
| `src/components/sections/services-grid.tsx` | 8 service cards grid | VERIFIED | File exists, used in page.tsx |
| `src/components/sections/testimonial-carousel.tsx` | Embla Carousel with autoplay | VERIFIED | Contains `useEmblaCarousel`, used in page.tsx and about/page.tsx |
| `src/components/sections/faq-accordion.tsx` | Accessible accordion with ARIA | VERIFIED | Contains `aria-expanded`, used in page.tsx |
| `src/components/sections/google-map-embed.tsx` | Lazy-loaded Google Maps iframe | VERIFIED | Contains `loading="lazy"`, used in contact/page.tsx and service-areas/page.tsx |
| `src/components/sections/city-card-grid.tsx` | Tiered city card layout | VERIFIED | Contains `getMunicipalitiesByTier`, substantive (35 lines), wired in service-areas/page.tsx |
| `src/components/sections/contact-info-column.tsx` | NAP data column | VERIFIED | Contains `BUSINESS_INFO`, `PHONE_NUMBER`, `PHONE_HREF` — all from constants. No hardcoded NAP. Wired in contact/page.tsx |

#### Plan 03 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/(marketing)/page.tsx` | Complete homepage with all sections | VERIFIED | 97 lines, contains all 10 sections in correct D-02 order, AggregateRating + FAQPage JSON-LD at top of JSX, Server Component (no "use client") |
| `src/app/(marketing)/about/page.tsx` | Complete about page | VERIFIED | 102 lines, contains AboutCompanyStory + AboutTeamSection + AboutCertifications + TestimonialCarousel + AggregateRating JSON-LD, Server Component |
| `src/app/(marketing)/contact/page.tsx` | Complete contact page with form and map | VERIFIED | 71 lines, contains GoogleMapEmbed + QuoteForm + ContactInfoColumn in two-column grid layout (order-1/order-2 for mobile), RoofingContractor JSON-LD, Server Component |
| `src/app/(marketing)/service-areas/page.tsx` | Service areas hub with tiered grid | VERIFIED | 57 lines, contains GoogleMapEmbed (zoom={11}) + CityCardGrid, Server Component |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `src/app/(marketing)/page.tsx` | `src/components/sections/hero-section.tsx` | `import HeroSection` | WIRED | Import present, component rendered at position 1 |
| `src/app/(marketing)/page.tsx` | `src/lib/seo/json-ld.tsx` | `import buildAggregateRatingJsonLd, buildFaqPageJsonLd, JsonLd` | WIRED | All three imported and rendered in JSX fragment at top of return |
| `src/app/(marketing)/contact/page.tsx` | `src/lib/seo/json-ld.tsx` | `import buildContactPageJsonLd, JsonLd` | WIRED | Imported and rendered as first element in JSX return |
| `src/app/(marketing)/contact/page.tsx` | `src/components/forms/quote-form.tsx` | `import QuoteForm` | WIRED | Imported and rendered inside two-column grid with descendant selector override |
| `src/app/(marketing)/service-areas/page.tsx` | `src/components/sections/city-card-grid.tsx` | `import CityCardGrid` | WIRED | Imported and rendered at position 3 |
| `src/components/sections/services-grid.tsx` | `src/data/services.ts` | `import getServicesByCategory` | WIRED | Pattern confirmed in component |
| `src/components/sections/city-card-grid.tsx` | `src/data/municipalities.ts` | `import getMunicipalitiesByTier` | WIRED | Import and usage confirmed in component (lines 1, 7-9) |
| `src/components/sections/contact-info-column.tsx` | `src/data/business-info.ts` | `import BUSINESS_INFO` | WIRED | Import confirmed, destructures address, email, licenseNumber |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| `src/app/(marketing)/page.tsx` → FaqAccordion | `HOMEPAGE_FAQS` | `src/data/homepage-faq.ts` — 6 typed FAQ objects | Yes — 6 substantive Q/A pairs | FLOWING |
| `src/app/(marketing)/page.tsx` → TestimonialCarousel | `TESTIMONIALS` (via component import) | `src/data/testimonials.ts` — 48 entries verified by test | Yes — 48 real testimonials | FLOWING |
| `buildAggregateRatingJsonLd` | `testimonials.reduce(...)` | TESTIMONIALS array (48 entries) | Yes — computes average 4.8 | FLOWING |
| `CityCardGrid` | `getMunicipalitiesByTier(1/2/3)` | `src/data/municipalities.ts` registry | Yes — 12 municipalities tiered | FLOWING |
| `ContactInfoColumn` | `BUSINESS_INFO.address`, `PHONE_NUMBER` | `src/data/business-info.ts`, `src/lib/constants.ts` | Yes — real business data objects | FLOWING |
| `AboutCompanyStory` | `ABOUT_CONTENT.companyStory.paragraphs` | `src/data/about-content.ts` — 4 narrative paragraphs | Yes — substantive content | FLOWING |
| `AboutCertifications` | `BUSINESS_INFO.certifications`, `licenseNumber`, `insurancePolicyNumber` | `src/data/business-info.ts` — 4 certs + real license/policy numbers | Yes — complete business credentials | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| All 76 unit tests pass | `pnpm test` | 8 test files, 76 tests — 0 failures | PASS |
| TypeScript compiles cleanly | `pnpm type-check` | Exit 0, no errors | PASS |
| Production build succeeds | `pnpm build` | "Compiled successfully in 2.3s", all 4 pages rendered as static | PASS |
| No hardcoded NAP in page logic (phone) | grep "555-0123" src/**/*.tsx excluding data/test files | 3 matches: contact/page.tsx metadata description, compact-quote-form placeholder attr, quote-form placeholder attr | WARNING (2 are input placeholder attributes — cosmetic; 1 is metadata description — functional NAP concern) |
| No hardcoded NAP in page logic (address) | grep "123 Summit Avenue" src/**/*.tsx excluding data/test | 1 match: google-map-embed.tsx noscript fallback | WARNING |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| CORE-01 | 04-02, 04-03 | Homepage with hero, proof strip, services grid, testimonials, service areas, FAQ, dual CTAs | SATISFIED | page.tsx renders all 10 sections in D-02 order; hero has phone + form CTAs; BadgeStrip renders certifications; FaqAccordion receives HOMEPAGE_FAQS |
| CORE-02 | 04-02, 04-03 | About page with company story, team, certifications, insurance, license numbers | SATISFIED | about/page.tsx renders AboutCompanyStory (narrative), AboutTeamSection (3 members), AboutCertifications (4 certs + licenseNumber + insuranceProvider + insurancePolicyNumber) |
| CORE-03 | 04-02, 04-03 | Contact page with multi-field quote form, Google Map, full NAP | SATISFIED | contact/page.tsx renders QuoteForm (6-field form from Phase 3), GoogleMapEmbed (BUSINESS_INFO address as query), ContactInfoColumn (NAP from constants). Minor NAP leakage in metadata description is cosmetic SEO metadata, not rendered NAP |
| CORE-04 | 04-02, 04-03 | Service area hub listing all 12 municipalities with map and city links | SATISFIED | service-areas/page.tsx renders GoogleMapEmbed (Hudson County, zoom 11) + CityCardGrid (all 12 municipalities with links) |
| CRO-06 | 04-01, 04-02, 04-03 | Customer testimonials with star ratings on homepage, service pages, location pages | SATISFIED | TestimonialCarousel with StarRating renders on homepage and about page; 48 TESTIMONIALS with ratings 4-5 verified by test; AggregateRating JSON-LD on both pages |
| CRO-07 | 04-02, 04-03 | Certification and license badge strip on homepage and in footer | SATISFIED | BadgeStrip rendered on homepage; AboutCertifications on about page; footer confirmed in Phase 2 |
| SEO-03 | 04-01, 04-03 | Review/AggregateRating schema on pages displaying testimonials | SATISFIED | buildAggregateRatingJsonLd called with TESTIMONIALS on both page.tsx and about/page.tsx; 15 tests verify schema output correctness |
| SEO-14 | 04-01 | NAP consistency across all pages, aligned with Google Business Profile | PARTIAL | BUSINESS_INFO and PHONE_NUMBER/PHONE_HREF are sole sources in rendered UI components. Two hardcoded leaks: (1) contact page metadata description, (2) google-map-embed.tsx noscript fallback. Not rendered on-screen in normal usage but violates single-source principle |
| SEO-15 | 04-02, 04-03 | Google Map embed on contact page and city hub pages | SATISFIED | GoogleMapEmbed rendered on contact/page.tsx (BUSINESS_INFO address query) and service-areas/page.tsx (Hudson County, zoom 11). Component uses lazy-loaded iframe with API key/no-key fallback |

**Orphaned requirements check:** REQUIREMENTS.md traceability maps CORE-01, CORE-02, CORE-03, CORE-04, CRO-06, CRO-07, SEO-03, SEO-14, SEO-15 to Phase 4 — all accounted for in at least one plan's `requirements` field.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/app/(marketing)/contact/page.tsx` | 15 | Hardcoded `"(201) 555-0123"` in metadata description string | Warning | Violates NAP single-source-of-truth principle (SEO-14). If phone changes, metadata description won't update automatically |
| `src/components/sections/google-map-embed.tsx` | 42-44 | Hardcoded `"123 Summit Avenue, Jersey City, NJ 07304"` in noscript fallback | Warning | Violates NAP single-source-of-truth. Noscript fallback is visible to crawlers and screen-reader users when JS is disabled. Component accepts query prop but uses hardcoded fallback |
| `src/components/forms/compact-quote-form.tsx` | - | `placeholder="(201) 555-0123"` | Info | Phone as input placeholder attribute — cosmetic only, no functional NAP impact, not crawled as business contact |
| `src/components/forms/quote-form.tsx` | 167 | `react-hooks/refs` lint error (pre-existing Phase 3 issue, logged to deferred-items.md) | Warning | Pre-existing lint violation; does not affect Phase 4 functionality but prevents `pnpm lint` from exiting 0 |

**Lint status:** `pnpm lint` exits 1 due to 3 errors in Phase 3 form files (compact-quote-form.tsx and quote-form.tsx) — pre-existing, logged to deferred-items.md, out of scope for Phase 4.

---

### Human Verification Required

#### 1. FAQ Accordion Keyboard Accessibility

**Test:** Navigate to the homepage in a browser. Tab to the FAQ section. Use Enter or Space to open/close items. Tab to the next item.
**Expected:** Each item toggles independently, only one item is open at a time, `aria-expanded` attribute switches between true/false, focus stays on the button
**Why human:** ARIA state transitions and keyboard event handling require browser interaction

#### 2. Testimonial Carousel Autoplay Behavior

**Test:** Navigate to the homepage or About page. Observe the testimonial section. Hover over the carousel.
**Expected:** Carousel auto-advances every few seconds, pauses on mouse hover, prev/next arrow buttons are accessible and functional
**Why human:** Embla autoplay loop behavior and stopOnMouseEnter require runtime execution

#### 3. Google Maps Rendering (Contact and Service Areas)

**Test:** Navigate to /contact and /service-areas with `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` set (or unset for fallback URL).
**Expected:** Map iframe loads and displays the correct location (Jersey City business address on contact page, Hudson County overview on service-areas)
**Why human:** Google Maps embed rendering depends on env var and external API availability

#### 4. Contact Page Mobile Column Ordering

**Test:** Open /contact on a mobile viewport (< 1024px width). Observe the section containing the form and contact info.
**Expected:** ContactInfoColumn (address, phone, hours, license) appears above the QuoteForm. On a desktop viewport (>= 1024px), form appears on the left and contact info on the right.
**Why human:** CSS `order` property behavior requires browser rendering

---

### Gaps Summary

One root cause produces the two SEO-14 failures:

**NAP hardcoding in two locations:** The `google-map-embed.tsx` component was designed as a generic reusable embed that accepts a `query` prop, but its `noscript` fallback text is hardcoded with the business address rather than using a prop or importing `BUSINESS_INFO`. Separately, the contact page metadata description was written with the phone number interpolated as a literal string rather than using the `PHONE_NUMBER` constant.

These are both minor — neither affects the rendered on-screen NAP which is consistently sourced from `BUSINESS_INFO` and constants throughout — but they violate the single-source principle that SEO-14 requires and that the `nap-consistency.test.ts` suite is designed to enforce. The noscript fallback is visible to crawlers and screen-reader-first users when JavaScript is disabled, making it a functional concern.

**Fix scope:** Two targeted edits. Both are under 5 lines each and do not require new components or data restructuring.

---

_Verified: 2026-03-24T00:02:00Z_
_Verifier: Claude (gsd-verifier)_
