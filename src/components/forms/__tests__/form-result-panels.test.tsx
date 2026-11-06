import { describe, it, expect, vi } from "vitest";
import { createElement, createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => createElement("div", props, children),
  },
}));

import {
  FormSuccessPanel,
  FormErrorBanner,
  FormTurnstileError,
  FormPrivacyNote,
} from "../form-result-panels";

// CRO Phases 0-2 (2026-11-06): the success panel shows the visitor
// their lead reference ID and an expectation line built from the
// published business hours; the error banner replaces the old "call
// us" fallback (there is no phone number) with the published email.
describe("FormSuccessPanel", () => {
  it("shows the lead reference ID when one is provided", () => {
    const html = renderToStaticMarkup(
      createElement(FormSuccessPanel, {
        ref: createRef<HTMLDivElement>(),
        leadId: "JCQR-ABCDEF12",
      })
    );
    expect(html).toContain("Thank You!");
    expect(html).toContain("Your reference number is");
    expect(html).toContain("JCQR-ABCDEF12");
  });

  it("omits the reference line when no lead ID exists", () => {
    const html = renderToStaticMarkup(
      createElement(FormSuccessPanel, { ref: createRef<HTMLDivElement>() })
    );
    expect(html).toContain("Thank You!");
    expect(html).not.toContain("reference number");
  });

  it("sets expectations from the published business hours only", () => {
    const html = renderToStaticMarkup(
      createElement(FormSuccessPanel, {
        ref: createRef<HTMLDivElement>(),
        leadId: "JCQR-ABCDEF12",
      })
    );
    expect(html).toContain("within 24 hours");
    expect(html).toContain("We reply during business hours");
    expect(html).toContain("Mon-Fri 7:00 AM - 6:00 PM");
    expect(html).toContain("Sat 8:00 AM - 2:00 PM");
    // No invented faster response-time promises.
    expect(html).not.toContain("within 1 hour");
    expect(html).not.toContain("within an hour");
  });
});

describe("FormErrorBanner", () => {
  it("shows the message with an email fallback, never a phone fallback", () => {
    const html = renderToStaticMarkup(
      createElement(FormErrorBanner, {
        message: "We could not deliver your request. Please try again.",
      })
    );
    expect(html).toContain("We could not deliver your request.");
    expect(html).toContain("info@jerseycityqualityroofing.com");
    expect(html).toContain(
      'href="mailto:info@jerseycityqualityroofing.com"'
    );
    expect(html).not.toContain("Call us");
    expect(html).not.toContain("tel:");
  });
});

describe("FormTurnstileError", () => {
  it("renders the error message with role=alert", () => {
    const html = renderToStaticMarkup(
      createElement(FormTurnstileError, {
        message: "The security check did not finish.",
      })
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain("The security check did not finish.");
  });

  it("renders nothing when there is no error", () => {
    const html = renderToStaticMarkup(
      createElement(FormTurnstileError, { message: "" })
    );
    expect(html).toBe("");
  });
});

describe("FormPrivacyNote", () => {
  it("uses only claims the site already makes", () => {
    const html = renderToStaticMarkup(createElement(FormPrivacyNote));
    expect(html).toContain(
      "We reply from info@jerseycityqualityroofing.com. No spam, no obligation."
    );
  });
});
