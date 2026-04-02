---
phase: 16
slug: silo-linking-breadcrumb-polish
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-02
---

# Phase 16 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (existing) + Next.js build |
| **Config file** | `vitest.config.ts` (existing) |
| **Quick run command** | `pnpm vitest run --reporter=verbose` |
| **Full suite command** | `pnpm vitest run && pnpm build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --reporter=verbose`
- **After every plan wave:** Run `pnpm vitest run && pnpm build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 16-00-01 | 00 | 1 | SEO-05 | unit | `pnpm vitest run src/lib/__tests__/silo-forward-links.test.ts` | Wave 0 | ⬜ pending |
| 16-00-02 | 00 | 1 | SEO-06 | unit | `pnpm vitest run src/components/layout/__tests__/breadcrumbs-labels.test.ts` | Wave 0 | ⬜ pending |
| 16-01-01 | 01 | 2 | CONT-08 | integration | `npx tsc --noEmit` | ✅ | ⬜ pending |
| 16-01-02 | 01 | 2 | CONT-08, SEO-05 | build+test | `pnpm build && pnpm vitest run src/lib/__tests__/silo-forward-links.test.ts` | ✅ | ⬜ pending |
| 16-02-01 | 02 | 2 | SEO-06 | test | `pnpm vitest run src/components/layout/__tests__/breadcrumbs-labels.test.ts` | ✅ | ⬜ pending |
| 16-02-02 | 02 | 2 | SEO-05 | grep | `grep -c "service-in-city" src/lib/internal-links.ts` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Two test stubs must be created in Plan 00 (Wave 1) before Plans 01 and 02 execute (Wave 2):

- [ ] `src/lib/__tests__/silo-forward-links.test.ts` — covers SEO-05 (all 8 services have forward link data)
- [ ] `src/components/layout/__tests__/breadcrumbs-labels.test.ts` — covers SEO-06 (SEGMENT_LABELS completeness)

Both Plans 01 and 02 have `depends_on: ["00"]` and `wave: 2`.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Forward links render visually on service pillar pages | CONT-08 | Visual layout check | Visit `/services/roof-repair`, verify "Related Articles" and "Cost Guide" sections appear below FAQ |
| Breadcrumb labels display human-readable text | SEO-06 | Visual rendering check | Visit `/guides/cost/roof-repair-cost`, verify breadcrumb shows "Cost Guides" not "Cost" |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
