---
phase: 1
slug: project-scaffold-data-architecture
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-23
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts (created in Plan 04 Task 3) |
| **Quick run command** | `pnpm vitest run --reporter=verbose` |
| **Full suite command** | `pnpm vitest run && pnpm type-check && pnpm lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --reporter=verbose`
- **After every plan wave:** Run `pnpm vitest run && pnpm type-check && pnpm lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FNDN-01 | integration | `pnpm dev --turbopack` | N/A (manual) | pending |
| 01-02-01 | 02 | 1 | FNDN-04 | integration | `pnpm build` | N/A (build) | pending |
| 01-03-01 | 03 | 2 | FNDN-03 | unit | `pnpm vitest run src/data/__tests__/municipalities.test.ts` | W0 (Plan 04) | pending |
| 01-03-02 | 03 | 2 | FNDN-04 | unit | `pnpm vitest run src/data/__tests__/services.test.ts` | W0 (Plan 04) | pending |
| 01-04-01 | 04 | 3 | SEO-07 | unit | `pnpm vitest run src/lib/__tests__/seo.test.ts` | W0 (Plan 04) | pending |
| 01-04-02 | 04 | 3 | SEO-07 | unit | `pnpm vitest run src/lib/__tests__/metadata.test.ts` | W0 (Plan 04) | pending |
| 01-04-03 | 04 | 3 | SEO-08,SEO-09 | unit | `pnpm vitest run src/lib/__tests__/json-ld.test.ts` | W0 (Plan 04) | pending |
| 01-04-04 | 04 | 3 | SEO-10,SEO-11 | unit | `pnpm vitest run src/lib/__tests__/sitemap.test.ts` | W0 (Plan 04) | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

All Wave 0 test infrastructure is created by Plan 04 Task 3:

- [x] Install vitest + @vitejs/plugin-react
- [x] Create `vitest.config.ts` with path aliases matching tsconfig
- [x] `src/data/__tests__/municipalities.test.ts` — tests for all 12 municipalities
- [x] `src/data/__tests__/services.test.ts` — tests for all 8 services
- [x] `src/lib/__tests__/seo.test.ts` — tests for metadata generators, canonical URL, JSON-LD
- [x] `src/lib/__tests__/metadata.test.ts` — tests for generatePageMetadata helpers
- [x] `src/lib/__tests__/json-ld.test.ts` — tests for JSON-LD generators
- [x] `src/lib/__tests__/sitemap.test.ts` — tests for sitemap generation

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dev server starts cleanly | FNDN-01 | Requires full Node.js process | Run `pnpm dev`, verify no errors in terminal, visit http://localhost:3000 |
| URL routing resolves correctly | FNDN-04 | Requires running dev server | Navigate to `/services/residential/roof-repair/jersey-city/` in browser |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
