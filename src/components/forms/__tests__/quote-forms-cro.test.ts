import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// Source-level guards for the CRO form fixes (2026-11-06, audit
// sections 2 and 5). The forms are large client components whose full
// interactive behavior needs a browser; these tests pin the wiring
// that must not regress: GA4 fires only on a server-confirmed lead
// (a result carrying a leadId), Turnstile errors are wired and
// rendered, thrown action errors are caught, and the dead "call us"
// fallback copy is gone (the site has no phone number).
const compactSource = readFileSync(
  resolve(__dirname, "../compact-quote-form.tsx"),
  "utf-8"
);
const fullSource = readFileSync(
  resolve(__dirname, "../quote-form.tsx"),
  "utf-8"
);

describe.each([
  ["CompactQuoteForm", () => compactSource],
  ["QuoteForm", () => fullSource],
])("%s CRO wiring", (_name, getSource) => {
  it("fires generate_lead via trackGenerateLead", () => {
    expect(getSource()).toContain("trackGenerateLead");
    expect(getSource()).toContain('from "@/lib/analytics"');
  });

  it("gates the GA4 event on a returned lead ID (success only, never honeypot)", () => {
    // The event fires inside the success branch, nested under a
    // leadId check: honeypot and failure results carry no leadId, so
    // they can never fire it.
    const source = getSource();
    expect(source).toMatch(/if \(result\.success\)/);
    expect(source).toMatch(/if \(result\.leadId\)/);
    expect(source).toContain("leadId: result.leadId");
  });

  it("catches thrown Server Action errors into a visible banner", () => {
    expect(getSource()).toContain("catch");
    expect(getSource()).toContain("FormErrorBanner");
  });

  it("wires Turnstile onError and renders the error state", () => {
    expect(getSource()).toContain("onError=");
    expect(getSource()).toContain("FormTurnstileError");
    expect(getSource()).toContain("setTurnstileError");
  });

  it("renders the privacy microcopy near the submit button", () => {
    expect(getSource()).toContain("FormPrivacyNote");
  });

  it("contains no phone fallback copy or icons", () => {
    const source = getSource();
    expect(source).not.toContain("Call us");
    expect(source).not.toContain("PHONE_NUMBER");
    expect(source).not.toContain("PHONE_HREF");
  });
});

describe("QuoteForm progressive disclosure (audit 5.4)", () => {
  it("optional fields sit behind an Add details (optional) toggle", () => {
    expect(fullSource).toContain("Add details (optional)");
    expect(fullSource).toContain("showDetails");
  });

  it("optional fields are labeled as optional", () => {
    expect(fullSource).toContain("Email Address (Optional)");
    expect(fullSource).toContain("Property Address (Optional)");
    expect(fullSource).toContain("Tell Us About Your Project (Optional)");
  });

  it("auto-expands the optional section when an optional field errors", () => {
    expect(fullSource).toContain("errors.email");
    expect(fullSource).toContain("setShowDetails(true)");
  });
});

describe("CompactQuoteForm offer line (audit 5.1)", () => {
  it("states the confirmed offer next to the form", () => {
    // JSX line-wraps the sentence; compare with whitespace normalized.
    const normalized = compactSource.replace(/\s+/g, " ");
    expect(normalized).toContain(
      "Every estimate is free and includes a full roof inspection and a written, itemized proposal."
    );
  });
});
