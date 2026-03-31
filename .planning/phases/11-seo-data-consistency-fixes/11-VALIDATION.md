---
phase: 11
slug: seo-data-consistency-fixes
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 11 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `pnpm vitest run --reporter=verbose` |
| **Full suite command** | `pnpm vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --reporter=verbose`
- **After every plan wave:** Run `pnpm vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 11-01-01 | 01 | 1 | SEO-04 | unit | `pnpm vitest run src/lib/__tests__/json-ld.test.ts -x` | Partial — needs @id assertion | ⬜ pending |
| 11-01-02 | 01 | 1 | SEO-14 | unit | `pnpm vitest run src/lib/__tests__/nap-consistency.test.ts -x` | Partial — needs OG route assertion | ⬜ pending |
| 11-01-03 | 01 | 1 | FNDN-02, SEO-06 | smoke | `pnpm vitest run src/lib/__tests__/sitemap.test.ts -x` | No — Wave 0 | ⬜ pending |
| 11-01-04 | 01 | 1 | FNDN-02 | build | `pnpm build` | N/A — build verifies pages compile | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/json-ld.test.ts` — add test: `buildRoofingContractorJsonLd` includes `@id` equal to `${BASE_URL}/#organization`
- [ ] `src/lib/__tests__/nap-consistency.test.ts` — add test: OG route file content does not contain literal phone/company strings (verify constants import exists)
- [ ] `src/lib/__tests__/sitemap.test.ts` — add test: sitemap includes `/services`, `/services/residential`, `/services/commercial` URLs

*Existing infrastructure covers most requirements; three new test assertions needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Silo index pages render correctly | FNDN-02, SEO-06 | Visual layout verification | 1. Run `pnpm dev` 2. Visit `/services`, `/services/residential`, `/services/commercial` 3. Verify hero, service cards, CTA render 4. Click breadcrumb links on child pages to confirm navigation |
| Breadcrumb links resolve (no 404s) | SEO-06 | Browser navigation test | 1. Visit any residential service page (e.g. `/services/residential/roof-repair`) 2. Click each breadcrumb link 3. Verify no 404 errors |
| OG image renders with correct text | SEO-14 | Visual OG image inspection | 1. Visit `/api/og?title=Test` 2. Verify company name and phone from constants (not hardcoded values) |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
