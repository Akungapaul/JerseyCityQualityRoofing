---
phase: 06-commercial-service-pages
plan: 03
subsystem: ui
tags: [nextjs, react, server-components, commercial-roofing, json-ld, seo, static-generation]

# Dependency graph
requires:
  - phase: 06-01
    provides: "4 commercial content data files (flat-roof-systems, roof-maintenance, commercial-repair, commercial-replacement)"
  - phase: 06-02
    provides: "CommercialRelatedServicesRow component for commercial service cross-linking"
  - phase: 05
    provides: "Section components (ServiceHero, ProcessTimeline, MaterialCards, etc.), StandardTemplate pattern, JSON-LD builders"
provides:
  - "Complete commercial service page at /services/commercial/[service] with 13-section standard template"
  - "4 statically generated commercial service pages: flat-roof-systems, roof-maintenance, commercial-repair, commercial-replacement"
  - "Service + FAQPage JSON-LD schemas on all commercial pages"
  - "OG image metadata via /api/og route for all commercial pages"
affects: [07-location-hub-pages, 08-service-in-city-pages, 09-internal-linking]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Commercial page uses ServiceContent-only CONTENT_MAP (no EmergencyContent union)"
    - "Commercial CTA copy pattern: 'Ready to Protect Your Building?' vs residential 'Ready to Protect Your Roof?'"
    - "CommercialRelatedServicesRow replaces residential RelatedServicesRow for commercial cross-linking"

key-files:
  created: []
  modified:
    - "src/app/(marketing)/services/commercial/[service]/page.tsx"

key-decisions:
  - "No emergency template branching in commercial page -- commercial services have no emergency variant"
  - "Commercial CTA uses building-focused copy instead of roof-focused copy"
  - "CONTENT_MAP typed as Record<string, ServiceContent> without EmergencyContent union for type safety"

patterns-established:
  - "Commercial page template: identical 13-section layout to residential StandardTemplate with CommercialRelatedServicesRow and commercial CTA copy"

requirements-completed: [COMM-01, COMM-02, COMM-03, COMM-04]

# Metrics
duration: 2min
completed: 2026-03-25
---

# Phase 06 Plan 03: Commercial Page Assembly Summary

**Full 13-section commercial service page wiring 4 content data files, CommercialRelatedServicesRow, and commercial-specific CTA copy with Service + FAQPage JSON-LD schemas**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-25T18:02:24Z
- **Completed:** 2026-03-25T18:04:36Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Replaced stub commercial page.tsx with full 13-section standard template matching residential layout
- Wired all 4 commercial content data files via CONTENT_MAP for O(1) slug lookup
- All 4 commercial service pages statically generated in production build (210 tests pass, zero type errors)

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite commercial page.tsx with full standard template** - `f85faa5` (feat)
2. **Task 2: Full build verification** - No commit (verification-only, no file changes)

## Files Created/Modified
- `src/app/(marketing)/services/commercial/[service]/page.tsx` - Complete commercial service page with 13-section StandardTemplate, 4 content imports, CommercialRelatedServicesRow, JSON-LD schemas, OG metadata, and commercial CTA copy (277 lines)

## Decisions Made
- No emergency template branching: commercial services have no emergency variant, so the page always renders StandardTemplate without the isEmergencyContent type guard or EmergencyTemplate function
- Commercial CTA uses "Ready to Protect Your Building?" and "free commercial roof assessment" to differentiate from residential "Ready to Protect Your Roof?" copy
- CONTENT_MAP typed as `Record<string, ServiceContent>` (not the residential `ServiceContent | EmergencyContent` union) for cleaner type safety

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 8 service pages (4 residential + 4 commercial) now have complete content and section layouts
- Location hub pages (Phase 7) can reference both residential and commercial service pages
- Service-in-city pages (Phase 8) can link to commercial service parent pages
- Internal linking infrastructure (Phase 9) has all commercial routes available

---
*Phase: 06-commercial-service-pages*
*Completed: 2026-03-25*
