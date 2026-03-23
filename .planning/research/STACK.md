# Technology Stack

**Project:** Jersey City Quality Roofing
**Researched:** 2026-03-22
**Overall Confidence:** HIGH

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 16.2.x | Full-stack React framework, App Router | The project specifies Next.js 16. Current stable is 16.2.1 (released March 2026). Turbopack is now the default bundler with 2-5x faster builds. Cache Components and PPR are production-ready for the mixed static/dynamic rendering this site needs. Built-in `generateStaticParams` handles the 150+ page programmatic generation natively. Vercel deployment is zero-config. | HIGH |
| React | 19.2.x | UI library | React 19.2 is stable (October 2025). Server Components are fully stable, reducing client JS for a content-heavy site. Server Actions handle form submissions natively. `use()` hook and Actions API provide clean patterns for the lead capture forms without external state management. | HIGH |
| TypeScript | 5.7.x | Type safety | Strict mode catches bugs at compile time. Critical for a 150+ page site where content data structures, schema markup types, and component props must stay consistent. `satisfies` operator ensures type-safe content objects. | HIGH |

### Styling & Design

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | 4.1.x | Utility-first CSS | Tailwind 4 shipped January 2025 with a Rust-powered engine (5x faster full builds, 100x faster incremental). CSS-first configuration eliminates `tailwind.config.js`. Cascade layers, `@property`, and `color-mix()` are native. Container queries are built-in (no plugin). Zero-config with `@import "tailwindcss"`. | HIGH |
| tailwind-merge | 3.5.x | Merge Tailwind classes without conflicts | Essential for component variants where parent components override child styles. v3.x supports Tailwind v4.0-4.2 natively. | HIGH |
| clsx | 2.1.x | Conditional class composition | 239 bytes. Zero dependencies. The standard for conditional className strings in React. Stable and mature (no changes needed). | HIGH |
| class-variance-authority (cva) | 0.7.x | Component variant definitions | Declarative API for defining Button, Card, Badge variants with Tailwind. Works seamlessly with tailwind-merge. The `cn()` utility pattern (clsx + twMerge) is the standard approach for 2025-2026. | HIGH |
| Motion | 12.x | Animation library | Formerly Framer Motion, now imported from `motion/react`. Provides scroll-linked animations (parallax hero sections), layout transitions (page transitions), and gesture support (swipe galleries). 120fps GPU-accelerated. The project specifies this library. | HIGH |

### Typography

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/font/google | (bundled) | Font optimization | Self-hosts Cormorant Garamond and Cormorant from Google Fonts. Zero external requests to Google. Automatic font-display: swap. Per the project constraints: Cormorant for headings, Cormorant Garamond (medium/500 weight) for body, minimum 18px body size. | HIGH |

### Content & Data Layer

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| TypeScript data files | N/A | Content storage for 150+ pages | For a site with programmatic SEO pages generated from structured data (services x locations), plain TypeScript files in `src/data/` provide type safety, IDE autocomplete, and zero build-time overhead. Each service, location, and service-in-city page pulls from typed data objects. No CMS needed for placeholder content. More reliable than content-collections for this use case. | HIGH |
| generateStaticParams | (built-in) | Static page generation | Next.js built-in. Generates all 96+ service-in-city pages, 12 city hub pages, 8 service pages, and blog posts at build time as static HTML. Supports multiple dynamic segments (`/services/[service]/[city]`). | HIGH |

**Why NOT content-collections:** The `@content-collections/next` package (v0.2.6) is still pre-1.0 and the original Contentlayer project it replaces is unmaintained. For a site where content is structured data (not prose-heavy MDX), TypeScript data files with Zod validation are simpler, more type-safe, and have zero additional dependencies. Content-collections adds value for MDX-heavy blogs, but this site's 3000+ word pages are generated from structured templates, not freeform markdown.

**Why NOT MDX:** The 150+ pages are programmatically generated from data (service type x location). MDX is appropriate for unique editorial content (blog posts), but the core page content should be structured data rendered through shared templates. Using MDX for 96 service-in-city pages would create a maintenance nightmare.

### SEO & Structured Data

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| schema-dts | 1.1.x | TypeScript types for Schema.org JSON-LD | Google-maintained package providing TypeScript types for all Schema.org vocabulary. Enables compile-time validation of LocalBusiness, Service, FAQ, Review, BreadcrumbList, and other structured data. Even though the package has not had a new release in ~12 months, Schema.org types are stable and the library is production-proven. | MEDIUM |
| next/og (ImageResponse) | (built-in) | Dynamic Open Graph images | Built into Next.js App Router. Generates unique OG images per page using JSX syntax. Critical for 150+ pages that each need unique social sharing cards. No extra dependency needed. | HIGH |
| Built-in Metadata API | (built-in) | SEO metadata management | Next.js `generateMetadata()` and static `metadata` exports handle title, description, canonical URL, Open Graph, and Twitter cards. The data-driven approach means each page dynamically generates metadata from the same data objects that generate content. | HIGH |
| Built-in sitemap.ts | (built-in) | XML sitemap generation | Next.js `sitemap.ts` file convention with `generateSitemaps()` for splitting large sitemaps. For 150+ URLs, a single sitemap file suffices (Google limit is 50,000). No need for the `next-sitemap` package. | HIGH |

**Why NOT next-seo:** The App Router's built-in Metadata API replaces everything next-seo provided. next-seo was designed for the Pages Router. Using it alongside the Metadata API creates confusion about which system controls what.

**Why NOT next-sitemap:** The built-in `sitemap.ts` convention handles this natively. At 150-200 pages, there is no need for the splitting and indexing features that next-sitemap provides for sites with thousands of pages.

### Forms & Validation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| React Hook Form | 7.72.x | Form state management | 8.6 KB gzipped, zero dependencies. Minimal re-renders via uncontrolled components. Works alongside React 19 Server Actions (RHF handles client-side UX, Server Actions handle submission). The clear leader in 2025-2026 with active maintenance. | HIGH |
| @hookform/resolvers | 5.2.x | Validation resolver bridge | Connects React Hook Form to Zod for schema-based validation. | HIGH |
| Zod | 4.3.x | Schema validation | Zod v4 delivers 14x faster string parsing, 57% smaller bundle than v3. Built-in `.toJSONSchema()` eliminates external converters. TypeScript-first with full type inference. Used for form validation, API input validation, and content data validation. | HIGH |

### Email & Lead Capture

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Resend | 6.9.x | Transactional email delivery | Developer-first email API. Direct Next.js integration via Server Actions or API routes. Free tier includes 100 emails/day (sufficient for a local business). React Email for building templates. No SMTP configuration needed. | HIGH |
| @react-email/components | 0.0.x | Email templates in React | Build notification emails (new lead alerts, quote confirmations) using React components. Supports Tailwind 4 as of React Email 5.0. Same component model as the website. | MEDIUM |

### Security & Spam Protection

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Cloudflare Turnstile | N/A (client script) | Bot protection for forms | Free (1M requests/month). Invisible to users (no puzzles). 30KB compressed vs reCAPTCHA's 80KB. GDPR-compliant by design. No third-party cookies. Google's reCAPTCHA free tier dropped to 10K assessments/month -- Turnstile is the obvious choice for a small business site. | HIGH |
| Honeypot fields | N/A (custom) | Secondary spam filter | Zero-dependency technique. Hidden form fields that bots fill but humans do not see. Costs nothing to implement as a Server Action validation check. Layer this with Turnstile for defense in depth. | HIGH |

**Why NOT Arcjet:** Arcjet (@arcjet/next) is still in 1.0.0-beta. Overkill for a local business contact form. Turnstile + honeypot fields provide sufficient protection without adding a beta dependency and an additional service account.

**Why NOT reCAPTCHA:** Google cut the free tier from 1M to 10K assessments/month. The 80KB script is slower. User-facing puzzles hurt conversion rates on a lead generation site. Turnstile is superior on every axis that matters here.

### Icons

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Lucide React | 0.477.x | Icon library | 1,500+ icons on a 24x24 grid. Tree-shakable (only imported icons ship). TypeScript typed. Consistent stroke-based design. 6M+ weekly downloads. The de facto standard for modern React projects. | HIGH |

### Analytics & Monitoring

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @vercel/analytics | 2.0.x | Web analytics | Zero-config on Vercel. Privacy-focused (no cookies). Tracks page views, top pages, referrers. Essential for measuring which service/location pages drive traffic. | HIGH |
| @vercel/speed-insights | 2.0.x | Core Web Vitals monitoring | Real-user performance monitoring. Tracks LCP, FID, CLS across all 150+ pages. Critical for SEO since Core Web Vitals are a Google ranking factor. | HIGH |
| @next/third-parties | 16.2.x | Google Analytics (GA4) | Optimized GA4 loader. Defers script loading until after hydration. Auto-tracks client-side navigations. Use alongside Vercel Analytics -- GA4 for deeper funnel analysis, Vercel for speed metrics. | HIGH |

### Image Optimization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next/image | (built-in) | Image component | Automatic lazy loading, responsive sizing, WebP/AVIF conversion. Required by project conventions. | HIGH |
| sharp | 0.34.x | Server-side image processing | Required by Next.js for production image optimization. 40-70% file size reduction. On Vercel, optimized images are cached on edge CDN. Install as a dependency for production builds. | HIGH |

### Carousel / Gallery

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Embla Carousel | 8.6.x | Before/after gallery, testimonial carousel | Lightweight (~800 bytes core), dependency-free, accessible (keyboard + screen reader). 6M+ weekly downloads. Bare-bones by design -- you control all styling, which aligns with the Tailwind approach. Used for project portfolio galleries and testimonial carousels. | HIGH |

### Package Manager & Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| pnpm | 10.x | Package management | Specified by project. Content-addressable storage saves disk space. Strict dependency isolation prevents phantom deps. Fastest install times in 2026 benchmarks. | HIGH |
| ESLint | 9.x | Code linting | Flat config format (eslint.config.js) is now required. Ships with Next.js via `next lint`. | HIGH |
| Prettier | 3.x | Code formatting | Consistent formatting across 150+ page templates. | MEDIUM |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not the Alternative |
|----------|-------------|-------------|------------------------|
| Framework | Next.js 16 | Astro, Remix | Astro lacks server actions and dynamic capabilities needed for forms. Remix has weaker static generation. Next.js is the project constraint. |
| Styling | Tailwind CSS 4 | CSS Modules, styled-components | CSS-in-JS libraries are being deprecated for Server Components. Tailwind's utility-first approach scales better across 150+ pages with shared components. |
| Forms | React Hook Form + Zod | Formik, React 19 Actions alone | Formik is 5x heavier and less maintained. React 19 Actions alone lack client-side validation UX (field-level errors, touched states). |
| Email | Resend | SendGrid, Nodemailer | SendGrid is enterprise-priced for transactional email. Nodemailer requires SMTP server management. Resend is purpose-built for the Next.js/React ecosystem. |
| Animation | Motion | GSAP, CSS-only | GSAP's license restricts commercial use without a paid plan. CSS-only animations lack the scroll-linked and layout animation capabilities needed for the hero sections and page transitions. |
| Icons | Lucide React | Heroicons, React Icons | React Icons bundles icons from multiple sets (larger). Heroicons has fewer icons (~300 vs 1,500). Lucide is the modern fork of Feather with better maintenance. |
| Carousel | Embla Carousel | Swiper, React Slick | Swiper is 150KB+ with bundled styles. React Slick depends on jQuery-era patterns. Embla is ~800 bytes and fully headless. |
| CAPTCHA | Cloudflare Turnstile | Google reCAPTCHA | reCAPTCHA's free tier is now 10K/month. Heavier script. User-hostile puzzles reduce conversion. Turnstile is invisible and free to 1M/month. |
| Sitemap | Built-in sitemap.ts | next-sitemap | next-sitemap is unnecessary for sites under 50,000 pages. The built-in convention is simpler and has no dependency. |
| SEO metadata | Built-in Metadata API | next-seo | next-seo was designed for Pages Router. The App Router Metadata API is more powerful and built-in. |
| Content management | TypeScript data files | Contentlayer, content-collections, Sanity | Contentlayer is abandoned. content-collections is pre-1.0. A headless CMS (Sanity) adds complexity and cost for placeholder content. TypeScript files are type-safe and zero-overhead. |
| Dark mode | None (not planned) | next-themes | A local roofing lead generation site does not need dark mode. Adding it doubles the design/QA surface for no conversion benefit. Defer unless specifically requested. |

---

## Complete Dependency List

### Production Dependencies

```bash
pnpm add next@latest react@latest react-dom@latest
pnpm add motion
pnpm add react-hook-form @hookform/resolvers zod
pnpm add resend @react-email/components
pnpm add schema-dts
pnpm add lucide-react
pnpm add embla-carousel-react
pnpm add tailwind-merge clsx class-variance-authority
pnpm add @vercel/analytics @vercel/speed-insights
pnpm add @next/third-parties
pnpm add sharp
```

### Dev Dependencies

```bash
pnpm add -D typescript @types/react @types/react-dom @types/node
pnpm add -D tailwindcss @tailwindcss/postcss postcss
pnpm add -D eslint eslint-config-next
pnpm add -D prettier prettier-plugin-tailwindcss
```

### Not Installed (Built-in or External)

- `next/font/google` -- bundled with Next.js (Cormorant, Cormorant Garamond)
- `next/image` -- bundled with Next.js
- `next/og` (ImageResponse) -- bundled with Next.js
- `sitemap.ts` -- Next.js file convention, no package needed
- `generateMetadata` / `metadata` -- Next.js built-in
- `generateStaticParams` -- Next.js built-in
- Cloudflare Turnstile -- loaded via `<script>` tag, no npm package
- Honeypot fields -- custom implementation, no package

---

## Architecture Notes for Stack

### Static Generation Strategy

All 150+ pages are statically generated at build time via `generateStaticParams`. No ISR needed because content changes are deployed via git commits, not runtime updates. This gives:
- Fastest possible page loads (pre-rendered HTML from CDN)
- Best SEO (complete HTML for crawlers)
- Lowest Vercel cost (no serverless function invocations for page views)

Server Actions (via React 19 + Next.js) handle the dynamic parts:
- Contact form submissions
- Quote request forms
- Turnstile verification

### The `cn()` Utility Pattern

The standard pattern combining clsx + tailwind-merge for safe class composition:

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Content Data Pattern

```typescript
// src/data/services.ts
import type { Service } from "@/types/content";

export const SERVICES = {
  "roof-repair": {
    slug: "roof-repair",
    title: "Roof Repair",
    category: "residential",
    // ... structured content fields
  },
} as const satisfies Record<string, Service>;
```

### JSON-LD Pattern

```typescript
// src/lib/schema.ts
import type { LocalBusiness, Service, FAQPage } from "schema-dts";

export function generateLocalBusinessSchema(): LocalBusiness {
  return {
    "@type": "LocalBusiness",
    // ... type-safe schema fields
  };
}
```

---

## Version Pinning Strategy

Pin major versions in `package.json` to prevent breaking changes during development:

```json
{
  "dependencies": {
    "next": "^16.2.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "motion": "^12.0.0",
    "zod": "^4.3.0",
    "react-hook-form": "^7.72.0",
    "resend": "^6.9.0"
  }
}
```

Use `^` (caret) to allow minor/patch updates. Lock exact versions via `pnpm-lock.yaml`. Run `pnpm audit` periodically for security patches.

---

## Sources

### Official Documentation (HIGH confidence)
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)
- [Next.js 16.1 Blog Post](https://nextjs.org/blog/next-16-1)
- [Next.js 16.2 Blog Post](https://nextjs.org/blog/next-16-2)
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js Sitemap Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js Third-Party Libraries](https://nextjs.org/docs/app/guides/third-party-libraries)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)
- [React 19.2 Blog Post](https://react.dev/blog/2025/10/01/react-19-2)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Zod v4 Release Notes](https://zod.dev/v4)
- [Motion Documentation](https://motion.dev/docs)
- [Resend Next.js Integration](https://resend.com/nextjs)
- [React Email 5.0](https://resend.com/blog/react-email-5)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation)
- [schema-dts GitHub](https://github.com/google/schema-dts)
- [Embla Carousel](https://www.embla-carousel.com/)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [React Hook Form](https://react-hook-form.com/)

### npm Package Versions (verified March 2026)
- next: 16.2.1
- react: 19.2.x
- tailwindcss: 4.1.x
- motion: 12.38.0
- zod: 4.3.6
- react-hook-form: 7.72.0
- @hookform/resolvers: 5.2.2
- resend: 6.9.4
- schema-dts: 1.1.5
- lucide-react: 0.477.0+
- embla-carousel-react: 8.6.0
- tailwind-merge: 3.5.0
- clsx: 2.1.1
- class-variance-authority: 0.7.1
- sharp: 0.34.5
- @vercel/analytics: 2.0.1
- @vercel/speed-insights: 2.0.0
- @next/third-parties: 16.2.1
- pnpm: 10.32.1

### Community Sources (MEDIUM confidence)
- [React Hook Form vs React 19 - LogRocket](https://blog.logrocket.com/react-hook-form-vs-react-19/)
- [Cloudflare Turnstile vs reCAPTCHA Comparison](https://nexterwp.com/blog/cloudflare-turnstile-vs-google-recaptcha/)
- [Content Collections Migration - Dub](https://dub.co/blog/content-collections)
- [Zod v4 Deep Dive - Peerlist](https://peerlist.io/jagss/articles/deep-dive-into-zod-v4-whats-new-and-why-it-matters)
