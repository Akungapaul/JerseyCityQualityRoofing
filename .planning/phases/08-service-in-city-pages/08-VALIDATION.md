---
phase: 8
slug: service-in-city-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.x |
| **Config file** | `vitest.config.ts` (exists) |
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
| 08-01-01 | 01 | 1 | LOC-03 | unit | `pnpm test -- src/data/__tests__/service-city-uniqueness.test.ts` | ❌ W0 | ⬜ pending |
| 08-01-02 | 01 | 1 | LOC-04 | unit | `pnpm test -- src/data/__tests__/service-city-content-data.test.ts` | ❌ W0 | ⬜ pending |
| 08-01-03 | 01 | 1 | SEO-16 | unit | `pnpm test -- src/data/__tests__/service-city-seo.test.ts` | ❌ W0 | ⬜ pending |
| 08-02-xx | 02 | 1 | LOC-02 | build | `pnpm build` | N/A | ⬜ pending |
| 08-03-xx | 03 | 2 | LOC-02 | build | `pnpm build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/__tests__/service-city-uniqueness.test.ts` — Jaccard similarity test across same-service different-city content (< 30% threshold); covers LOC-03
- [ ] `src/data/__tests__/service-city-content-data.test.ts` — validates ServiceInCityContent structure, word counts (3000+), FAQ counts (5+), voice/local-context checks; covers LOC-04
- [ ] `src/data/__tests__/service-city-seo.test.ts` — validates buildServiceInCityJsonLd output, breadcrumb chain, metadata generation; covers SEO-16

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| City name removal test | LOC-03 | Requires reading comprehension judgment | Remove all city name mentions from a page's content; verify remaining text is identifiably about a specific place (references neighborhoods, landmarks, building codes) |
| Visual differentiation | LOC-03 | Visual comparison not automatable | Screenshot 3 different city pages for the same service; verify they look different (different headings, different emphasis) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
