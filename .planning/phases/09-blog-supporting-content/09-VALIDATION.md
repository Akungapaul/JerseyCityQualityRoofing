---
phase: 9
slug: blog-supporting-content
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` (root) |
| **Quick run command** | `pnpm test` |
| **Full suite command** | `pnpm test && pnpm build` |
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
| 09-01-01 | 01 | 0 | CONT-01, CONT-02, CONT-03 | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | ❌ W0 | ⬜ pending |
| 09-01-02 | 01 | 0 | CONT-04 | unit | `pnpm test -- src/data/__tests__/cost-guide-content.test.ts -x` | ❌ W0 | ⬜ pending |
| 09-01-03 | 01 | 0 | CONT-05 | unit | `pnpm test -- src/data/__tests__/material-guide-content.test.ts -x` | ❌ W0 | ⬜ pending |
| 09-01-04 | 01 | 0 | CONT-06 | unit | `pnpm test -- src/data/__tests__/problem-content.test.ts -x` | ❌ W0 | ⬜ pending |
| 09-01-05 | 01 | 0 | SEO-05 | unit | `pnpm test -- src/lib/__tests__/internal-links.test.ts -x` | ❌ W0 | ⬜ pending |
| 09-02-01 | 02 | 1 | CONT-01 | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | W0 | ⬜ pending |
| 09-02-02 | 02 | 1 | CONT-02 | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | W0 | ⬜ pending |
| 09-02-03 | 02 | 1 | CONT-03 | unit | `pnpm test -- src/data/__tests__/blog-content.test.ts -x` | W0 | ⬜ pending |
| 09-03-01 | 03 | 1 | CONT-04 | unit | `pnpm test -- src/data/__tests__/cost-guide-content.test.ts -x` | W0 | ⬜ pending |
| 09-03-02 | 03 | 1 | CONT-05 | unit | `pnpm test -- src/data/__tests__/material-guide-content.test.ts -x` | W0 | ⬜ pending |
| 09-03-03 | 03 | 1 | CONT-06 | unit | `pnpm test -- src/data/__tests__/problem-content.test.ts -x` | W0 | ⬜ pending |
| 09-04-01 | 04 | 2 | SEO-05 | unit | `pnpm test -- src/lib/__tests__/internal-links.test.ts -x` | W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/__tests__/blog-content.test.ts` — stubs for CONT-01, CONT-02, CONT-03
- [ ] `src/data/__tests__/cost-guide-content.test.ts` — stubs for CONT-04
- [ ] `src/data/__tests__/material-guide-content.test.ts` — stubs for CONT-05
- [ ] `src/data/__tests__/problem-content.test.ts` — stubs for CONT-06
- [ ] `src/lib/__tests__/internal-links.test.ts` — stubs for SEO-05

*Framework install: Not needed — Vitest 4.1.1 already installed and configured.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Blog articles render correctly with full content sections | CONT-01 | Visual layout verification | Navigate to `/blog/[slug]`, verify 15+ sections render, heading hierarchy h1>h2>h3, silo breadcrumb links work |
| Cost guide pricing tables render with location-specific data | CONT-04 | Visual layout + data accuracy | Navigate to `/guides/cost/[slug]`, verify pricing tables, FAQ accordion, CTA sections |
| Material guide pages render with comparison data | CONT-05 | Visual layout verification | Navigate to `/guides/materials/[slug]`, verify material property tables, pros/cons sections |
| Internal links render in correct positions on all page types | SEO-05 | Cross-page navigation verification | Verify related articles appear on service pages, blog articles link to pillar pages, hub pages list all children |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
