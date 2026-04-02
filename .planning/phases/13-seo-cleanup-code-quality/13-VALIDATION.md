---
phase: 13
slug: seo-cleanup-code-quality
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 13 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `pnpm test` |
| **Full suite command** | `pnpm type-check && pnpm lint && pnpm test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm type-check && pnpm lint && pnpm test`
- **After every plan wave:** Run `pnpm type-check && pnpm lint && pnpm test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 13-01-01 | 01 | 1 | SEO-06 | grep | `grep -r "buildBreadcrumbJsonLd" src/app/ --include="*.tsx" \| wc -l` (expect 0) | N/A | ⬜ pending |
| 13-01-02 | 01 | 1 | SEO-06 | unit | `pnpm vitest run src/lib/__tests__/sitemap.test.ts -x` | Existing (update) | ⬜ pending |
| 13-02-01 | 02 | 1 | N/A | tsc | `pnpm type-check` (0 errors in types.ts) | Implicit | ⬜ pending |
| 13-02-02 | 02 | 1 | N/A | lint | `pnpm lint` (0 react-hooks/refs errors) | Implicit | ⬜ pending |
| 13-02-03 | 02 | 1 | N/A | tsc | `pnpm type-check` (0 errors in urgency-banner.test.tsx) | Existing (fix) | ⬜ pending |
| 13-02-04 | 02 | 1 | N/A | tsc | `pnpm type-check` (0 errors in gallery-comparison-card.tsx) | Existing (fix) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No new test files required for Wave 0.

- [ ] Update `src/lib/__tests__/sitemap.test.ts` — add assertion that `/testimonials` is NOT in sitemap output

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Layout Breadcrumbs renders correct labels for all segments | SEO-06 | Visual inspection of breadcrumb trail | Navigate to 3+ pages, verify breadcrumb text matches expected labels |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
