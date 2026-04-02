import { describe, it, expect, vi, afterEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Mock lucide-react
vi.mock("lucide-react", () => ({
  AlertTriangle: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "alert-icon", width: size, ...props }),
  Phone: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "phone-icon", width: size, ...props }),
}));

vi.mock("@/lib/constants", () => ({
  PHONE_NUMBER: "(201) 555-0123",
  PHONE_HREF: "tel:+12015550123",
}));

vi.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" "),
}));

describe("UrgencyBanner", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  it("emergency variant always renders banner with role=alert", async () => {
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "emergency" }),
    );
    expect(html).toContain('role="alert"');
  });

  it("emergency variant contains '24/7 Emergency Service Available'", async () => {
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "emergency" }),
    );
    expect(html).toContain("24/7 Emergency Service Available");
  });

  it("emergency variant contains phone number link with tel: href", async () => {
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "emergency" }),
    );
    expect(html).toContain("tel:+12015550123");
    expect(html).toContain("(201) 555-0123");
  });

  it("emergency variant has bg-[#d4782f] background", async () => {
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "emergency" }),
    );
    expect(html).toContain("bg-[#d4782f]");
  });

  it("storm-season variant returns null outside storm season", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 15)); // January 15

    vi.resetModules();
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "storm-season" }),
    );
    expect(html).toBe("");
  });

  it("storm-season variant renders during storm season", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 15)); // July 15

    vi.resetModules();
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "storm-season" }),
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain("Storm Season Alert");
  });

  it("storm-season variant contains 'Storm Season Alert' text", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 15)); // August 15

    vi.resetModules();
    const { UrgencyBanner } = await import("../urgency-banner");
    const html = renderToStaticMarkup(
      createElement(UrgencyBanner, { variant: "storm-season" }),
    );
    expect(html).toContain("Storm Season Alert: Schedule Your Free Roof Inspection");
  });
});
