---
phase: 16
slug: silo-linking-breadcrumb-polish
status: draft
nyquist_compliant: false
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
| 16-01-01 | 01 | 1 | CONT-08 | integration | `pnpm vitest run src/lib/__tests__/internal-links.test.ts` | ✅ | ⬜ pending |
| 16-01-02 | 01 | 1 | CONT-08 | build | `pnpm build` | ✅ | ⬜ pending |
| 16-02-01 | 02 | 1 | SEO-05 | grep | `grep -c 'guides\|cost\|materials\|problems\|gallery' src/components/layout/breadcrumbs.tsx` | ✅ | ⬜ pending |
| 16-02-02 | 02 | 1 | SEO-06 | grep | `grep -c "service-in-city" src/lib/content-registry.ts` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No new test framework or test stubs needed — `src/lib/__tests__/internal-links.test.ts` already tests `getSiloArticles()`, `getBlogArticlesForService()`, and `getCostGuideForService()`.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Forward links render visually on service pillar pages | CONT-08 | Visual layout check | Visit `/services/roof-repair`, verify "Related Articles" and "Cost Guide" sections appear below FAQ |
| Breadcrumb labels display human-readable text | SEO-05 | Visual rendering check | Visit `/guides/roof-maintenance-guide`, verify breadcrumb shows "Guides" not "guides" |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
