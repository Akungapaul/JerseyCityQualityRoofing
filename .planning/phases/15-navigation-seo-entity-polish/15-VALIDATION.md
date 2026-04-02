---
phase: 15
slug: navigation-seo-entity-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-02
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.1 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest --run` |
| **Full suite command** | `npx vitest --run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest --run`
- **After every plan wave:** Run `npx vitest --run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 15-01-01 | 01 | 0 | SEO-02/SEO-04 | unit | `npx vitest --run src/lib/__tests__/json-ld.test.ts` | Exists (add case) | ⬜ pending |
| 15-01-02 | 01 | 0 | SEO-09 | unit | `npx vitest --run src/app/api/og/__tests__/og-route.test.ts` | ❌ W0 | ⬜ pending |
| 15-01-03 | 01 | 0 | UX-08/SEO-05 | unit | `npx vitest --run src/components/layout/__tests__/mega-menu.test.tsx` | ❌ W0 | ⬜ pending |
| 15-01-04 | 01 | 0 | UX-08/SEO-05 | unit | `npx vitest --run src/components/layout/__tests__/footer.test.tsx` | ❌ W0 | ⬜ pending |
| 15-01-05 | 01 | 0 | UX-08/SEO-05 | unit | `npx vitest --run src/components/layout/__tests__/mobile-nav.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Add test case to `src/lib/__tests__/json-ld.test.ts` — @id entity anchor for SEO-02/SEO-04
- [ ] `src/app/api/og/__tests__/og-route.test.ts` — OG route city param for SEO-09
- [ ] `src/components/layout/__tests__/mega-menu.test.tsx` — MegaMenu Resources panel for UX-08/SEO-05
- [ ] `src/components/layout/__tests__/footer.test.tsx` — Footer Resources column for UX-08/SEO-05
- [ ] `src/components/layout/__tests__/mobile-nav.test.tsx` — MobileNav Resources accordion for UX-08/SEO-05

**Notes:**
- MegaMenu and MobileNav are client components — use vi.mock for motion/react and client hooks (Phase 8 pattern)
- OG route test should mock fetch (font loading) and test GET function logic (param reading, title composition)
- Footer is a Server Component — renderToStaticMarkup pattern applies

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| MegaMenu layout at lg breakpoint (1024px) | UX-08 | Visual overflow check | Open browser at 1024px width, verify 4 nav items fit without wrapping |
| OG image visual quality | SEO-09 | Image rendering quality | Visit /api/og?service=roof-repair&city=hoboken, verify city name renders correctly |
| Footer 5-column layout responsiveness | UX-08 | Visual grid check | Check footer at sm/md/lg breakpoints, verify columns stack and space correctly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
