---
phase: 10
slug: conversion-performance-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-29
---

# Phase 10 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `pnpm test` |
| **Full suite command** | `pnpm test` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm test`
- **After every plan wave:** Run `pnpm test && pnpm build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 10-01-01 | 01 | 1 | CRO-03 | unit | `pnpm test -- src/components/sections/__tests__/floating-cta.test.tsx -x` | ❌ W0 | ⬜ pending |
| 10-01-02 | 01 | 1 | CRO-05 | unit | `pnpm test -- src/hooks/__tests__/use-exit-intent.test.ts -x` | ❌ W0 | ⬜ pending |
| 10-01-03 | 01 | 1 | CRO-09 | unit | `pnpm test -- src/components/sections/__tests__/urgency-banner.test.tsx -x` | ❌ W0 | ⬜ pending |
| 10-02-01 | 02 | 1 | CRO-08 | unit | `pnpm test -- src/data/__tests__/gallery-projects.test.ts -x` | ❌ W0 | ⬜ pending |
| 10-02-02 | 02 | 1 | UX-07 | unit | `pnpm test -- src/components/sections/__tests__/faq-accordion.test.tsx -x` | ❌ W0 | ⬜ pending |
| 10-03-01 | 03 | 2 | SEO-12 | audit | Manual code audit (grep for `<img` without next/image) | Manual | ⬜ pending |
| 10-03-02 | 03 | 2 | SEO-13 | manual-only | Lighthouse in Chrome DevTools on heaviest page | Manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/hooks/__tests__/use-exit-intent.test.ts` — stubs for CRO-05 hook logic
- [ ] `src/hooks/__tests__/use-scroll-past-fold.test.ts` — stubs for CRO-03 scroll detection
- [ ] `src/data/__tests__/gallery-projects.test.ts` — stubs for CRO-08 data validation
- [ ] `src/components/sections/__tests__/urgency-banner.test.tsx` — stubs for CRO-09
- [ ] `src/components/sections/__tests__/faq-accordion.test.tsx` — stubs for UX-07
- [ ] `src/hooks/` directory creation — does not exist yet

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Core Web Vitals pass thresholds (LCP < 2.5s, INP < 200ms, CLS < 0.1) | SEO-13 | Requires real browser rendering with production build | Run Lighthouse in Chrome DevTools on heaviest service-in-city page with mobile throttling |
| All images use next/image with descriptive alt text | SEO-12 | Requires manual code audit across 150+ pages | `grep -r '<img ' src/` should return 0 results; all `alt=` attributes should be descriptive |

*All other phase behaviors have automated verification.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
