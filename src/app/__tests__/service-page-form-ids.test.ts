import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// CRO Phase 3 (2026-11-06, audit finding 12): service pages used to
// render TWO elements with id="quote-form" -- the hero's compact form
// AND a bare wrapper <div id="quote-form"> around the full QuoteForm,
// whose own section id is "full-quote-form". Browsers resolve #
// anchors to the FIRST match, so the wrapper was a dead duplicate.
// These source tests pin the fix: exactly one element per page may
// carry id="quote-form".
// The templates document the removal in JSX comments that quote the
// old markup; strip comments so assertions see only rendered elements.
const stripJsxComments = (source: string) =>
  source.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

const residentialTemplate = stripJsxComments(
  readFileSync(
    resolve(__dirname, "../(marketing)/_templates/residential-service-city.tsx"),
    "utf-8"
  )
);
const commercialTemplate = stripJsxComments(
  readFileSync(
    resolve(__dirname, "../(marketing)/_templates/commercial-service-city.tsx"),
    "utf-8"
  )
);
const compactForm = readFileSync(
  resolve(__dirname, "../../components/forms/compact-quote-form.tsx"),
  "utf-8"
);
const fullForm = readFileSync(
  resolve(__dirname, "../../components/forms/quote-form.tsx"),
  "utf-8"
);

describe("service page form ids (CRO Phase 3)", () => {
  it("residential template no longer wraps QuoteForm in a duplicate quote-form id", () => {
    expect(residentialTemplate).not.toContain('id="quote-form"');
  });

  it("commercial template no longer wraps QuoteForm in a duplicate quote-form id", () => {
    expect(commercialTemplate).not.toContain('id="quote-form"');
  });

  it("the compact form owns id=quote-form in its two mutually exclusive render paths", () => {
    // CompactQuoteForm renders EITHER embedded (SectionWrapper) or
    // standalone (plain div), never both, so exactly one element per
    // page carries the id. The two source occurrences are the two
    // render paths.
    const matches = compactForm.match(/id="quote-form"/g) ?? [];
    expect(matches).toHaveLength(2);
  });

  it("the full form owns id=full-quote-form exactly once", () => {
    const matches = fullForm.match(/id="full-quote-form"/g) ?? [];
    expect(matches).toHaveLength(1);
    expect(fullForm).not.toContain('id="quote-form"');
  });
});
