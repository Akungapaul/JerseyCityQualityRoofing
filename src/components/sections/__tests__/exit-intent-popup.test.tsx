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
  Phone: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "phone-icon", width: size, ...props }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => createElement("a", { href, ...props }, children),
}));

vi.mock("@/lib/constants", () => ({
  PHONE_NUMBER: "(201) 555-0123",
  PHONE_HREF: "tel:+12015550123",
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

  it("primary CTA uses next/link for /contact navigation", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain('href="/contact"');
    expect(html).toContain("Get My Free Quote");
  });

  it("close button has aria-label", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("Close popup");
  });

  it("phone CTA link uses tel: href", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("tel:+12015550123");
    expect(html).toContain("(201) 555-0123");
  });

  it("contains z-[60] overlay class", async () => {
    mockIsTriggered = true;
    const { ExitIntentPopup } = await import("../exit-intent-popup");
    const html = renderToStaticMarkup(createElement(ExitIntentPopup));
    expect(html).toContain("z-[60]");
  });
});
