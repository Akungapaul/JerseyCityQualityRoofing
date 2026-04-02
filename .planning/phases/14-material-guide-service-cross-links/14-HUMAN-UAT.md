---
status: partial
phase: 14-material-guide-service-cross-links
source: [14-VERIFICATION.md]
started: 2026-04-02T00:25:00Z
updated: 2026-04-02T00:25:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Visual rendering of service link section
expected: Start dev server (pnpm dev), navigate to /guides/materials/asphalt-shingles. A card (bg-secondary, border-accent) appears between FAQ and Related Guides with heading "Professional Asphalt Shingles Services", narrative paragraph, two pill-shaped links (Roof Replacement, Roof Repair with ArrowRight icons), and a phone number link below.
result: [pending]

### 2. Commercial path correctness at runtime
expected: Navigate to /guides/materials/tpo-membrane. Click the "Flat Roof Systems" service link pill. Browser navigates to /services/commercial/flat-roof-systems (NOT /services/residential/flat-roof-systems).
result: [pending]

## Summary

total: 2
passed: 0
issues: 0
pending: 2
skipped: 0
blocked: 0

## Gaps
