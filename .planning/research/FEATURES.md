# Feature Research

**Domain:** Local roofing lead generation website with topical authority (150+ pages, siloed content architecture)
**Researched:** 2026-03-22
**Confidence:** HIGH

Research based on analysis of top-performing roofing contractor websites, local SEO best practices for service businesses, conversion rate optimization patterns for home services, and content architecture strategies for topical authority sites.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these means visitors bounce to a competitor within seconds.

#### Site Structure and Navigation

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mobile-first responsive design | 70%+ of local service searches happen on mobile. Sites that are not mobile-first lose the majority of traffic. | LOW | Design mobile layouts first, enhance for desktop. Under 3s load on 4G is the benchmark. |
| Persistent click-to-call phone number | Homeowners in a roofing emergency want to call immediately. Phone number must be tappable on every page, every viewport. | LOW | Sticky header with `tel:` link. Visible at all scroll positions. |
| Clear service navigation | Visitors must instantly see what services are offered. Confusing navigation = bounce. | LOW | Mega menu or well-structured dropdown. Service categories (residential, commercial) as top-level nav items. |
| Breadcrumb navigation | Users land deep in the site via search. Breadcrumbs orient them and support SEO via BreadcrumbList schema. | LOW | Auto-generated from route hierarchy. Every page except homepage. |
| Fast page load (under 2s) | Google Core Web Vitals directly affect ranking. Users abandon after 3s. Roofing sites with <3s load see 2x conversion. | MEDIUM | Next.js ISR/SSG, optimized images, lazy loading below-fold, compressed hero images (<150KB). |
| XML sitemap and robots.txt | Technical SEO foundation. Without these, 150+ pages will not be properly crawled. | LOW | Auto-generated. Sitemap must handle all service, location, service-in-city, and blog pages. |
| SSL/HTTPS | Chrome marks non-HTTPS as "Not Secure." Instant trust destroyer. | LOW | Default on Vercel. |

#### Core Pages

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Homepage with hero section | First impression. Must answer three questions instantly: Can you help me? Can I trust you? How do I get a quote? | MEDIUM | Hero with CTA, proof strip (certifications/badges), services grid, testimonials, service areas, FAQ, final CTA. |
| Individual service pages (residential) | Visitors searching "roof repair Jersey City" expect a dedicated page, not a generic services list. | MEDIUM | One page per service: Roof Repair, Roof Replacement, Roof Inspection, Emergency Roofing. 3000+ words each. |
| Individual service pages (commercial) | Commercial property managers search differently and need different messaging than homeowners. | MEDIUM | Flat Roof Systems, Roof Maintenance, Commercial Repair, Commercial Replacement. Separate from residential. |
| About page | Trust-building. Visitors want to know who they are hiring. Team photos, years in business, certifications, company story. | LOW | Include insurance/license info, team photos, company history. |
| Contact page | Must have: form, phone, address, embedded Google Map. | LOW | Multi-field form (name, phone, email, service type, message). Map embed. NAP data. |
| Service area overview page | Hub page listing all municipalities served. Supports internal linking to city-specific pages. | LOW | Map visualization or list of all 12 Hudson County municipalities with links. |

#### Lead Capture

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Quote request form on every service page | The primary conversion mechanism. If a form is not present where the visitor is reading, they will not navigate elsewhere to find one. | LOW | Keep to 5-6 fields max: name, phone, email, service needed, address, message. More fields = lower conversion (34% drop with 9+ fields). |
| Click-to-call CTA on every page | Dual conversion path. Some visitors prefer calling. Must be equally prominent as forms. | LOW | Sticky header + in-content CTAs. Tap-to-call on mobile. |
| Above-the-fold CTA | Visitors must see how to convert without scrolling. The hero section must include either a form or a prominent CTA button. | LOW | "Get a Free Estimate" or "Schedule Roof Inspection" as primary hero CTA. |

#### Trust Signals

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Customer testimonials/reviews | 88% of consumers trust online reviews as much as personal recommendations. 93% of roofing clients check reviews before choosing. | MEDIUM | Display on homepage, service pages, and location pages. Include reviewer name, rating, and ideally a photo or video. |
| Star ratings display | Visual trust shorthand. Star ratings near CTAs increase conversion. | LOW | Aggregate rating (e.g., "4.9/5 from 127 reviews") in hero sections and near forms. |
| Certification and license badges | Homeowners need proof of legitimacy. GAF Master Elite, Owens Corning Preferred, BBB A+, license numbers. | LOW | Badge strip on homepage. Badges in footer across all pages. |
| Insurance and warranty information | Homeowners worry about liability and coverage. Showing insurance/warranty info removes objection. | LOW | Dedicated section on About page. Badges/icons on service pages. |
| Google reviews widget | Dynamic pull of latest 5-star Google reviews provides real-time social proof that cannot be faked. | LOW | Embed Google review widget on homepage and key landing pages. |

#### SEO Foundation

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Metadata on every page | title, description, openGraph. Non-negotiable for ranking and social sharing. | LOW | `generateMetadata()` in Next.js App Router for dynamic pages. |
| Canonical URLs | Prevents duplicate content issues across 150+ pages. Essential at scale. | LOW | Set via `alternates.canonical` in metadata. |
| One H1 per page, strict heading hierarchy | Basic on-page SEO. H1 > H2 > H3, no skipping. Google uses heading structure to understand page topics. | LOW | Enforced via component design. Lint rule recommended. |
| Descriptive image alt text | Accessibility and image SEO. Especially important for before/after gallery images. | LOW | Alt text must describe what is in the image, not be a filename. |
| JSON-LD structured data | Enables rich results in search. LocalBusiness, Service, FAQ, Review, BreadcrumbList schemas. | MEDIUM | Use `RoofingContractor` (more specific than `LocalBusiness`). Every page needs at least BreadcrumbList. Service pages need Service + FAQ. |
| Internal linking system | The backbone of siloed architecture. Links distribute authority and help Google understand topic relationships. | MEDIUM | Automated contextual links between related services, locations, and blog posts. Breadcrumbs as secondary linking. |

#### Content Structure

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| FAQ sections on service pages | Answers common objections in-context. Supports FAQ schema for rich snippets. | LOW | 5-10 FAQs per service page. Unique per page (not duplicated). Collapsible accordion UI. |
| Process explainer sections | "What to expect" reduces anxiety and builds confidence. Step-by-step timelines. | LOW | Visual timeline or numbered steps on each service page. |
| City hub pages (all 12 municipalities) | Each city needs its own hub page for "[service] in [city]" searches. | MEDIUM | Template-driven but with unique local content: landmarks, housing stock, weather patterns, local stats. |

---

### Differentiators (Competitive Advantage)

Features that set this site apart from the typical 5-10 page roofing competitor site. These are where the topical authority strategy creates an unfair advantage.

#### Deep Content Architecture (The Core Differentiator)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Service-in-city pages (~96 pages) | Most competitors have zero city-specific content. Each page targets "[service] [city]" keywords with zero competition at the long-tail level. | HIGH | 8 services x 12 municipalities = 96 pages. Each page needs 30% unique content minimum (local landmarks, housing data, city-specific FAQs, local testimonials) to avoid thin/duplicate issues. The other 70% can be templated service information. |
| 3000+ word deep-dive pages | Competitor sites average 300-500 words per page. Deep content signals expertise to Google and provides genuine value to homeowners doing research. | HIGH | Content depth is the single biggest topical authority signal. Each page must feel like a comprehensive guide, not keyword-stuffed filler. |
| Siloed content architecture | Organized topic clusters (service silos with location branches) create clear hierarchy for Google. Sites using clusters see 67% more organic traffic and hold rankings 2.5x longer. | HIGH | Residential services silo, commercial services silo, location silo, materials silo, problems silo. Each with internal linking that reinforces the cluster. |
| Material deep-dive guides | "Asphalt shingle guide," "TPO roofing explained," etc. Most roofing sites have zero educational material content. Builds entity relationships: Material -> Service -> Location. | MEDIUM | 5-8 material guides (asphalt, TPO, EPDM, slate, metal, modified bitumen, cedar shake, tile). Link to service pages that use each material. |
| Problem-to-solution content | "Ice dam damage" -> links to repair service. "Ponding water on flat roof" -> links to commercial flat roof service. Captures problem-aware searchers before they even know they need a roofer. | MEDIUM | Map common roofing problems to specific services and locations. Each problem page becomes an entry point into the service silo. |
| Cost guides per service and location | "How much does roof replacement cost in Hoboken?" is a high-intent query with low competition. Provides genuine value and captures cost-comparison searchers. | MEDIUM | Template-driven with location-specific cost factors (permitting costs, labor rates, housing stock differences). |

#### Enhanced Trust and Social Proof

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Before/after project gallery with slider | Interactive before/after comparison sliders are visually compelling and demonstrate quality of work far better than static images. "Projects in your neighborhood" filtering by city is a powerful trust-builder. | MEDIUM | Filterable by service type and city. Before/after slider component. Lazy-loaded images. |
| Video testimonials | Embedded 2-3 minute customer videos are significantly more persuasive than text reviews. Most roofing sites have zero video content. | LOW | Embed YouTube/Vimeo videos. Even placeholder structure (with thumbnails) signals professionalism. |
| Location-specific testimonials | Showing reviews from homeowners in a visitor's own city ("See what your Hoboken neighbors say") personalizes trust. | LOW | Tag testimonials by city. Display relevant ones on city pages. |
| Case study pages | Detailed project narratives (problem, assessment, solution, result, photos) demonstrate expertise far beyond what a simple gallery provides. | MEDIUM | 1-2 per service type initially. Include technical details that signal genuine expertise. |

#### Conversion Optimization

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sticky/floating CTA button | Persistent "Get Free Estimate" button that follows the user as they scroll through 3000+ word pages. Prevents scroll-away-from-CTA problem. | LOW | Fixed position button (bottom-right on desktop, bottom-bar on mobile). Opens form modal or scrolls to form. |
| Exit-intent popup | Captures abandoning visitors with a final offer. Finnish roofing company saw 62.5% more leads with this single addition. | LOW | Trigger on mouse leaving viewport (desktop) or back-button intent (mobile). Offer free inspection or downloadable guide. |
| Multi-step form option | A 2-3 step form that asks one question at a time ("What service do you need?" -> "What's your address?" -> "Contact info") feels less overwhelming than a wall of fields. | MEDIUM | Progressive disclosure pattern. Higher completion rates than single-page forms for complex services. |
| Emergency roofing banner | Seasonal/weather-triggered urgency banner. "Storm damage? Call now for emergency tarping" during storm season drives high-intent conversions. | LOW | Conditional banner component. Can be toggled on/off seasonally or in response to weather events. |

#### Advanced SEO Features

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Blog with topic clusters | Dual-purpose blog: silo-supporting articles that link back to service pillars + standalone educational content that captures informational queries. Content clusters drive 30% more organic traffic. | HIGH | 8-12 supporting articles per service pillar. Each blog post links back to its parent service page. Blog categories mirror service silos. |
| Entity-based JSON-LD knowledge graph | Most roofing sites have basic or no schema. Implementing entity relationships (Service -> Location -> Material -> Problem -> Solution) gives Google explicit understanding of the site's topic coverage. | HIGH | Interconnected schema across page types. Service pages reference materials, locations, and problems. Goes beyond basic LocalBusiness markup. |
| GBP-aligned content | Content that mirrors Google Business Profile categories, services, and Q&A creates consistency signals that boost local pack rankings. | MEDIUM | NAP consistency across all pages. Service names match GBP service listings. Map embeds reference GBP listing. |
| Semantic SEO optimization | NLP-optimized copy with co-occurring terms, entity coverage, and topic exhaustiveness. Most competitors do basic keyword targeting only. | HIGH | Use co-occurring terms analysis per topic. Cover entity relationships that Google expects for each topic. This requires content sophistication beyond keyword density. |

#### Insurance and Financing Content

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Insurance claim guide | Step-by-step guide on filing roof insurance claims. High-intent content that captures homeowners actively dealing with roof damage. Positions the company as a claims partner. | MEDIUM | Detailed guide: when to file, what to document, what to expect from adjusters, how a roofer can help. |
| Financing options page | Removes the cost objection. Even a simple "Financing Available" message with details increases conversion by reducing payment anxiety. | LOW | Outline available financing: payment plans, $0 down options. Clear explanation of process. |

---

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems. Explicitly avoid these.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Live chat / AI chatbot | Sounds modern and responsive. "24/7 availability." | Requires ongoing management or AI training. Poorly implemented chatbots frustrate users and feel cheap. For a local roofing company, a chatbot answering "I don't know" about specific roofing questions destroys credibility. Also adds significant JavaScript weight (hurts CWV). | Prominent phone number + well-designed forms on every page. Add a simple "Text us" option (SMS link) for mobile users. Consider live chat only AFTER the site is generating 50+ leads/month and there is staff to manage it. |
| Online cost calculator / instant estimate tool | Interactive and engaging. "Get your price in 30 seconds." | Roofing estimates genuinely require on-site inspection. An inaccurate online estimate sets wrong expectations and creates friction when the real quote differs. Also, third-party calculator embeds (Roofr, InstantRoofer) capture YOUR leads into THEIR platform. | Cost guide pages with ranges ("Roof replacement in Jersey City typically costs $8,000-$15,000 depending on..."). This captures the search intent without creating false expectations. The CTA is "Get Your Personalized Estimate" which drives form fills. |
| Hundreds of thin city pages | "More pages = more rankings." Scale to 200+ locations beyond the service area. | Google explicitly penalizes doorway pages. Creating pages for cities you do not actually serve is deceptive and triggers algorithmic penalties. Even within your service area, 96 service-in-city pages with duplicate content will be consolidated by Google, not individually ranked. | Focus on the 12 Hudson County municipalities you actually serve. Make each page genuinely unique with 30% location-specific content. Quality over quantity -- 96 deep pages outperform 500 thin ones. |
| Pop-up overload (multiple popups per visit) | "Maximize touchpoints." Entry popup + scroll popup + exit popup + chat widget. | Multiple popups per session feel desperate and spammy. Google penalizes intrusive interstitials on mobile. Stacking popups hurts CWV (CLS). Each additional popup reduces trust. | One exit-intent popup maximum. Use non-intrusive sticky CTA instead. Let the content and strategically placed CTAs do the conversion work. |
| Auto-playing video backgrounds | "Premium feel." Large background videos in hero sections. | Destroys page load time. Hero videos are typically 2-5MB even compressed. On mobile/4G, this guarantees a failed Core Web Vitals score. Also distracting -- draws attention away from the CTA. | High-quality compressed hero image (<150KB). Use video only in dedicated gallery/testimonial sections, loaded lazily and user-triggered. |
| Social media feed embeds | "Show we're active on social." Instagram/Facebook feed widgets. | Third-party embeds add 500KB-2MB of JavaScript. Slow page loads, layout shifts, and privacy/tracking concerns. Content is not indexable by Google. Feed content is often generic and adds no conversion value. | Social media icon links in footer. Manually curated "Featured Projects" gallery with the best social media content, served as optimized images from your own domain. |
| Customer login / portal | "Let customers check project status." | Out of scope for a lead gen site. Adds authentication complexity, security liability, and maintenance burden with zero conversion benefit. No homeowner expects a portal from a roofing contractor. | Email/phone updates for active projects. Focus the website entirely on lead generation. |
| Multi-language support | "Reach Spanish-speaking homeowners in Hudson County." | Doubles content creation and maintenance burden across 150+ pages. Translation quality issues. Hreflang implementation is complex. | English only for v1. If data shows significant Spanish-language search volume in the area, consider a Phase 2 /es/ subdirectory with key pages only (homepage, top services, contact). |
| Blog comment system | "Build community and engagement." | Comment spam magnet. Requires moderation. Adds no SEO value since Google ignores UGC in comments. Creates maintenance burden. | No comments. Blog posts link to contact forms and CTAs instead. Engagement happens via phone calls and form submissions. |
| Paid ad landing pages | "Need landing pages for Google Ads campaigns." | Mixing paid landing pages into an organic SEO site creates duplicate content issues and dilutes topical authority. Different optimization goals (ads want minimal content, SEO wants maximum content). | Organic-first strategy per PROJECT.md. If PPC is added later, use separate landing pages on a subdomain or with noindex tags to keep the organic site clean. |

---

## Feature Dependencies

```
[Siloed Content Architecture]
    |-- requires --> [Service Pages (Residential + Commercial)]
    |                    |-- requires --> [Service-in-City Pages (~96)]
    |                    |                    |-- requires --> [City Hub Pages (12)]
    |                    |                    |-- requires --> [Unique Location Content Data]
    |                    |-- enhances --> [FAQ Sections per Page]
    |                    |-- enhances --> [Cost Guide Pages]
    |
    |-- requires --> [Internal Linking System]
    |                    |-- requires --> [Breadcrumb Navigation]
    |                    |-- enhances --> [Blog Topic Clusters]
    |
    |-- requires --> [JSON-LD Schema System]
                         |-- requires --> [Metadata System]

[Lead Capture System]
    |-- requires --> [Quote Request Form Component]
    |                    |-- enhances --> [Multi-step Form Variant]
    |-- requires --> [Click-to-Call Component]
    |-- enhances --> [Sticky/Floating CTA]
    |-- enhances --> [Exit-Intent Popup]

[Trust Signal System]
    |-- requires --> [Testimonials Data + Display Component]
    |                    |-- enhances --> [Location-Specific Testimonials]
    |                    |-- enhances --> [Video Testimonials]
    |-- requires --> [Certification Badge Component]
    |-- enhances --> [Before/After Gallery]
    |                    |-- enhances --> [Case Study Pages]
    |-- enhances --> [Google Reviews Widget]

[Blog System]
    |-- requires --> [Siloed Content Architecture] (blog categories mirror silos)
    |-- requires --> [Internal Linking System]
    |-- enhances --> [Problem-to-Solution Content]
    |-- enhances --> [Material Deep-Dive Guides]
    |-- enhances --> [Semantic SEO Optimization]

[Technical SEO Foundation]
    |-- requires --> [Metadata System (generateMetadata)]
    |-- requires --> [Canonical URLs]
    |-- requires --> [XML Sitemap Generation]
    |-- requires --> [robots.txt]
    |-- requires --> [Fast Page Load (<2s)]
    |-- enhances --> [JSON-LD Schema System]
    |-- enhances --> [Internal Linking System]
```

### Dependency Notes

- **Service-in-City Pages require City Hub Pages:** City hubs must exist as parent pages before service-in-city pages can link up to them. The silo structure demands the hub-and-spoke model be built top-down.
- **Siloed Architecture requires Internal Linking System:** The entire topical authority strategy depends on deliberate, automated internal linking. Without it, the silo structure is invisible to Google.
- **Blog Topic Clusters require Siloed Architecture:** Blog posts must be categorized to mirror service silos and link back to pillar service pages. Building the blog before the silo structure is set creates orphaned content.
- **Exit-Intent Popup enhances Lead Capture:** The popup is an enhancement layer on top of the core form/phone conversion paths. It should not be built before the primary conversion flow is solid.
- **Before/After Gallery enhances Trust Signals:** Gallery is an enhancement to the testimonials/reviews foundation. Basic social proof must exist before investing in visual portfolio features.
- **JSON-LD Schema System requires Metadata System:** Structured data builds on top of the page metadata foundation. Title, description, and canonical must be in place before adding complex schema.

---

## MVP Definition

### Launch With (v1 - Core Site)

Minimum viable site to begin indexing, building authority, and capturing leads.

- [ ] **Homepage** -- Hero, services grid, testimonials, service areas, CTAs. This is the front door and must convert.
- [ ] **8 service pages (4 residential + 4 commercial)** -- 3000+ words each with unique content, FAQs, process explainers. These are the silo pillars.
- [ ] **12 city hub pages** -- One per Hudson County municipality with unique local content. Parent pages for service-in-city expansion.
- [ ] **About page** -- Company story, certifications, insurance, team.
- [ ] **Contact page** -- Form, phone, map, NAP data.
- [ ] **Quote request form on every page** -- The primary conversion mechanism.
- [ ] **Click-to-call on every page** -- Sticky header phone number + in-content CTAs.
- [ ] **JSON-LD structured data** -- RoofingContractor, Service, FAQ, BreadcrumbList on every page.
- [ ] **Technical SEO foundation** -- Metadata, canonical URLs, XML sitemap, robots.txt, Core Web Vitals optimization.
- [ ] **Internal linking system** -- Breadcrumbs + automated contextual links between services and locations.
- [ ] **Testimonials/reviews display** -- At minimum, manually curated testimonials on homepage and service pages.
- [ ] **Certification/badge strip** -- On homepage and in footer across all pages.
- [ ] **Mobile-first responsive design** -- Every page optimized for mobile-first, fast loading.

### Add After Validation (v1.x - Content Scale-Up)

Features to add once the core site is indexed and initial traffic/lead data is available.

- [ ] **96 service-in-city pages** -- The scale play. Build after silo structure proves effective with initial city hubs. Trigger: core pages indexed, city hubs ranking for branded terms.
- [ ] **Cost guide pages** -- Per service and location. Trigger: search console shows impressions for "cost of [service] in [city]" queries.
- [ ] **Blog with topic clusters** -- 8-12 supporting articles per service silo. Trigger: service pillar pages indexed and beginning to rank.
- [ ] **Material deep-dive guides** -- Asphalt, TPO, EPDM, slate, metal, etc. Trigger: service pages ranking, need to deepen topical coverage.
- [ ] **Before/after project gallery** -- Filterable by service and city. Trigger: have project photos or placeholders ready.
- [ ] **Problem-to-solution content** -- Ice dams, ponding, flashing failure, etc. Trigger: blog system in place, ready to expand entry points.
- [ ] **Exit-intent popup** -- Trigger: site receiving 500+ monthly visitors with measurable bounce rate data.
- [ ] **Sticky/floating CTA** -- Trigger: analytics show users scrolling deep into 3000+ word pages but not converting at in-content CTAs.
- [ ] **Emergency roofing banner** -- Trigger: storm season or weather events. Pre-build the component, toggle on when needed.

### Future Consideration (v2+)

Features to defer until the site has established rankings and lead flow.

- [ ] **Insurance claim guide section** -- Defer: high-value content but complex to get right. Build after establishing trust and authority.
- [ ] **Financing options page** -- Defer: depends on actual business partnership with financing provider.
- [ ] **Video testimonials** -- Defer: requires real video content. Placeholder structure is fine in v1 but actual video content adds cost.
- [ ] **Case study pages** -- Defer: requires detailed project narratives that cannot be effectively placeholdered.
- [ ] **Semantic SEO optimization (NLP-level)** -- Defer: advanced optimization. Get pages ranking first, then refine with co-occurrence analysis.
- [ ] **Entity-based knowledge graph schema** -- Defer: advanced schema that goes beyond basic structured data. Implement after basic schema is validated in Search Console.
- [ ] **Multi-step form** -- Defer: A/B test against standard form after sufficient traffic volume.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Mobile-first responsive design | HIGH | MEDIUM | P1 |
| Service pages (8 pillars) | HIGH | HIGH | P1 |
| Homepage with conversion flow | HIGH | MEDIUM | P1 |
| Quote request form (every page) | HIGH | LOW | P1 |
| Click-to-call (every page) | HIGH | LOW | P1 |
| JSON-LD structured data | HIGH | MEDIUM | P1 |
| Metadata + canonical URLs | HIGH | LOW | P1 |
| XML sitemap + robots.txt | HIGH | LOW | P1 |
| Internal linking system | HIGH | MEDIUM | P1 |
| Breadcrumb navigation | MEDIUM | LOW | P1 |
| City hub pages (12) | HIGH | HIGH | P1 |
| About page | MEDIUM | LOW | P1 |
| Contact page with form + map | HIGH | LOW | P1 |
| Testimonials/reviews display | HIGH | LOW | P1 |
| Certification badge strip | MEDIUM | LOW | P1 |
| FAQ sections on service pages | HIGH | LOW | P1 |
| Service-in-city pages (96) | HIGH | HIGH | P2 |
| Blog with topic clusters | HIGH | HIGH | P2 |
| Cost guide pages | HIGH | MEDIUM | P2 |
| Before/after project gallery | MEDIUM | MEDIUM | P2 |
| Material deep-dive guides | MEDIUM | MEDIUM | P2 |
| Problem-to-solution content | MEDIUM | MEDIUM | P2 |
| Sticky/floating CTA | MEDIUM | LOW | P2 |
| Exit-intent popup | MEDIUM | LOW | P2 |
| Emergency roofing banner | MEDIUM | LOW | P2 |
| Google reviews widget | MEDIUM | LOW | P2 |
| Location-specific testimonials | MEDIUM | LOW | P2 |
| Insurance claim guide | MEDIUM | MEDIUM | P3 |
| Financing options page | LOW | LOW | P3 |
| Video testimonials | MEDIUM | LOW | P3 |
| Case study pages | MEDIUM | MEDIUM | P3 |
| Multi-step form | LOW | MEDIUM | P3 |
| Entity knowledge graph schema | MEDIUM | HIGH | P3 |
| Semantic SEO optimization | HIGH | HIGH | P3 |

**Priority key:**
- P1: Must have for launch -- the site cannot generate leads or rank without these
- P2: Should have, add in content scale-up phase -- the topical authority differentiators
- P3: Nice to have, future consideration -- optimization and advanced features

---

## Competitor Feature Analysis

Based on research into the roofing website landscape for local businesses in 2025-2026:

| Feature | Typical Competitor (5-10 pages) | Top Performer (50+ pages) | Our Approach (150+ pages) |
|---------|-------------------------------|--------------------------|--------------------------|
| Service pages | 1 generic "Services" page listing everything | Individual service pages, 300-500 words each | 8 deep pillar pages at 3000+ words each with unique FAQs, process explainers, and material references |
| Location targeting | City name in footer only | 3-5 basic city pages with swapped city names | 12 unique city hubs + 96 service-in-city pages with 30%+ unique local content per page |
| Content depth | 100-300 words per page | 500-1000 words per page | 3000+ words per page with storytelling, technical depth, and real-world scenarios |
| Structured data | None or basic LocalBusiness only | LocalBusiness + some FAQ | Full schema ecosystem: RoofingContractor, Service, FAQ, Review, BreadcrumbList, entity relationships |
| Blog/Resources | No blog or abandoned blog | Occasional posts, no strategy | Strategic topic clusters, 8-12 posts per service silo, all interlinked to pillar pages |
| Trust signals | License number in footer | Some testimonials, basic badges | Multi-layered: testimonials per page, badges, before/after gallery, case studies, video testimonials, Google reviews widget |
| Lead capture | Contact page only | Form on homepage + contact page | Form on every page + sticky phone + floating CTA + exit-intent popup |
| Cost information | None | Basic "call for estimate" | Detailed cost guides per service and location with ranges, factors, and comparison tables |
| Materials content | None | Mention materials in service descriptions | Dedicated deep-dive guides per material type, linked to relevant services |
| Problem content | None | None | Problem-to-solution mapping pages capturing problem-aware searchers |
| Internal linking | Basic nav only | Some manual cross-links | Automated siloed internal linking + breadcrumbs + related content + blog cross-linking |
| Mobile optimization | Responsive (barely) | Responsive, decent | Mobile-first design, <2s load, tap-to-call, thumb-friendly CTAs |

---

## Sources

### Roofing Website Best Practices and Design
- [WebFX: Roofing Lead Generation Guide](https://www.webfx.com/blog/home-services/roofing-lead-generation-guide/) -- MEDIUM confidence
- [Hook Agency: Best Roofing Websites](https://hookagency.com/blog/best-roofing-websites/) -- MEDIUM confidence
- [RoofingSEO: Best Roofing Websites 2026](https://roofingseo.services/roofing-website-design/best-roofing-websites-2026/) -- MEDIUM confidence
- [ServiceTitan: Best Roofing Websites](https://www.servicetitan.com/blog/roofing-websites) -- MEDIUM confidence
- [ContractorGorilla: Best Roofing Websites 2026](https://contractorgorilla.com/blog/best-roofing-websites/) -- MEDIUM confidence

### Conversion Rate Optimization
- [Podium: CRO for Roofing](https://www.podium.com/article/conversion-rate-optimization-roofing) -- MEDIUM confidence
- [PHOS Creative: High-Converting Roofing Website](https://phoscreative.com/articles/high-converting-roofing-website/) -- MEDIUM confidence
- [CinchLocal: Roofing Landing Pages](https://www.cinchlocal.com/creating-optimizing-local-landing-page-for-roofers) -- MEDIUM confidence
- [Trustmary: Exit-Intent Popup Principles](https://trustmary.com/conversion-rate/exit-intent-popup-principles-examples-and-hacks/) -- MEDIUM confidence

### Local SEO and Content Architecture
- [Market My Market: Content Silos for Local SEO](https://www.marketmymarket.com/building-effective-content-silos-for-local-seo/) -- MEDIUM confidence
- [Sterling Sky: Service Area Pages SEO](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/) -- HIGH confidence (specialized local SEO authority)
- [ContentAmigo: Unique Service Area Pages](https://contentamigo.com/articles/how-to-make-unique-service-area-pages-avoiding-duplicate-content/) -- MEDIUM confidence
- [Search Engine Land: Local SEO Sprints 90-day Plan](https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059) -- HIGH confidence (industry-authoritative publication)
- [ContentWorks: Roofing Content Clusters](https://contentworks.ai/roofing-content-clusters/) -- MEDIUM confidence

### Schema and Structured Data
- [eseospace: Schema Markup for Contractor Websites](https://eseospace.com/blog/schema-markup-for-contractor-websites/) -- MEDIUM confidence
- [Schema App: LocalBusiness Schema Guide](https://www.schemaapp.com/schema-markup/how-to-do-schema-markup-for-local-business/) -- HIGH confidence (specialized schema authority)
- [Dalton Luka: Local Business Schema Templates](https://daltonluka.com/blog/local-schema-markup) -- MEDIUM confidence

### Topical Authority and Silo Architecture
- [Velir: Topical Authority Driving SEO Strategies 2025](https://www.velir.com/ideas/how-topical-authority-is-driving-smarter-seo-strategies-in-2025) -- MEDIUM confidence
- [Zadro Web: Topical Authority and SILO Architecture](https://zadroweb.com/blog/topical-authority-silo-architecture/) -- MEDIUM confidence
- [Promodo: Silo Site Structure](https://www.promodo.com/blog/silo-site-structure) -- MEDIUM confidence

---
*Feature research for: Local roofing lead generation website (Jersey City Quality Roofing)*
*Researched: 2026-03-22*
