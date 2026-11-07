import { describe, it, expect, vi, beforeEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Mock hooks
let mockIsTriggered = false;
const mockDismiss = vi.fn();

vi.mock("@/hooks/use-exit-intent", () => ({
  useExitIntent: () => ({
    isTriggered: mockIsTriggered,
    dismiss: mockDismiss,
  }),
}));

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
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

vi.mock("lucide-react", () => ({
  X: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "x-icon", width: size, ...props }),
}));

vi.mock("@/lib/constants", () => ({
  PHONE_NUMBER: "the quote form",
}));

vi.mock("@/components/ui/button-variants", () => ({
  buttonVariants: () => "button-variant-classes",
}));

vi.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}));

// Mock React hooks for server rendering
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...(actual as Record<string, unknown>),
    useEffect: () => {},
    useRef: (initial: unknown) => ({ current: initial }),
  };
});

describe("ExitIntentPopup", () => {
  beforeEach(() => {
    mockIsTriggered = false;
    mockDismiss.mockClear();
    vi.resetModules();
  });

  it("renders null when isTriggered is false", async () => {
    mockIsTriggered = false;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toBe("");
  });

  it("renders dialog with role=dialog and aria-modal=true when isTriggered is true", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
  });

  it("renders heading 'Before You Go...' with correct id", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("Before You Go...");
    expect(html).toContain('id="exit-popup-heading"');
  });

  // CRO Phase 3 (2026-11-06, audit 3.1/3.3): both popup CTAs changed
  // deliberately. They used to exit to /contact (the secondary styled
  // as a phone link with a tel: href in tests) even though the popup
  // only appears on service pages that already contain quote forms.
  // They are now buttons that dismiss the popup and scroll to the
  // on-page forms.
  it("primary CTA is a local scroll button, not a /contact link", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("Get My Free Quote");
    expect(html).not.toContain('href="/contact"');
  });

  it("close button has aria-label", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("Close popup");
  });

  it("secondary CTA shows the estimate label with no tel: href or phone icon", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("the quote form");
    expect(html).not.toContain("tel:");
    expect(html).not.toContain("phone-icon");
  });

  it("contains z-[60] overlay class", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("z-[60]");
  });
});
