import { describe, it, expect, vi, beforeEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Mock hooks and motion
let mockIsPastFold = false;

vi.mock("@/hooks/use-scroll-past-fold", () => ({
  useScrollPastFold: () => mockIsPastFold,
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
  Phone: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "phone-icon", width: size, ...props }),
  X: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "x-icon", width: size, ...props }),
}));

vi.mock("@/lib/constants", () => ({
  PHONE_HREF: "tel:+12015550123",
}));

// Mock useState and useEffect for server rendering
let mockIsDismissed = false;
let mockIsNearForm = false;
let mockCtaHref = "#quote-form";

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...(actual as Record<string, unknown>),
    useState: (initial: unknown) => {
      if (typeof initial === "boolean" && initial === false) {
        // First boolean state is isDismissed, second is isNearForm
        if (!mockIsDismissed) {
          return [mockIsDismissed, vi.fn()] as const;
        }
        return [mockIsNearForm, vi.fn()] as const;
      }
      if (typeof initial === "string") {
        return [mockCtaHref, vi.fn()] as const;
      }
      return [initial, vi.fn()] as const;
    },
    useEffect: () => {},
  };
});

describe("FloatingCTA", () => {
  beforeEach(() => {
    mockIsPastFold = false;
    mockIsDismissed = false;
    mockIsNearForm = false;
    mockCtaHref = "#quote-form";
    vi.resetModules();
  });

  it("renders null when isPastFold is false (before scroll threshold)", async () => {
    mockIsPastFold = false;
    const { FloatingCTA } = await import("../floating-cta");
    const html = renderToStaticMarkup(createElement(FloatingCTA));
    expect(html).toBe("");
  });

  it("renders CTA container with role=complementary when isPastFold is true", async () => {
    mockIsPastFold = true;
    const { FloatingCTA } = await import("../floating-cta");
    const html = renderToStaticMarkup(createElement(FloatingCTA));
    expect(html).toContain('role="complementary"');
    expect(html).toContain("Quick quote request");
  });

  it("CTA link contains aria-label for mobile accessibility", async () => {
    mockIsPastFold = true;
    const { FloatingCTA } = await import("../floating-cta");
    const html = renderToStaticMarkup(createElement(FloatingCTA));
    expect(html).toContain("Get a free roofing quote");
  });

  it("renders Phone icon with aria-hidden", async () => {
    mockIsPastFold = true;
    const { FloatingCTA } = await import("../floating-cta");
    const html = renderToStaticMarkup(createElement(FloatingCTA));
    expect(html).toContain('aria-hidden="true"');
  });

  it("contains fixed bottom-6 right-6 z-40 positioning classes", async () => {
    mockIsPastFold = true;
    const { FloatingCTA } = await import("../floating-cta");
    const html = renderToStaticMarkup(createElement(FloatingCTA));
    expect(html).toContain("fixed");
    expect(html).toContain("bottom-6");
    expect(html).toContain("right-6");
    expect(html).toContain("z-40");
  });

  it("renders dismiss button with aria-label", async () => {
    mockIsPastFold = true;
    const { FloatingCTA } = await import("../floating-cta");
    const html = renderToStaticMarkup(createElement(FloatingCTA));
    expect(html).toContain("Dismiss quote button");
  });
});
