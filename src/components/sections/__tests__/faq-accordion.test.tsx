import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { FAQ } from "@/data/types";

// Mock motion/react
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

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ChevronDown: ({ size, ...props }: { size: number; [key: string]: unknown }) =>
    createElement("svg", { "data-testid": "chevron-icon", width: size, ...props }),
}));

// Mock cn utility
vi.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined | boolean)[]) =>
    classes.filter((c) => typeof c === "string" && c).join(" "),
}));

// Mock useState to return defaultOpenIndex for server render
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...(actual as Record<string, unknown>),
    useState: (initial: unknown) => [initial, vi.fn()] as const,
  };
});

const testFaqs: readonly FAQ[] = [
  { question: "What is roof repair?", answer: "Roof repair fixes damaged areas." },
  { question: "How long does it take?", answer: "Most repairs take 1-2 days." },
  { question: "What does it cost?", answer: "Costs vary by scope and materials." },
] as const;

describe("FaqAccordion", () => {
  it("renders all FAQ questions", async () => {
    const { FaqAccordion } = await import("../faq-accordion");
    const html = renderToStaticMarkup(
      createElement(FaqAccordion, { faqs: testFaqs }),
    );
    expect(html).toContain("What is roof repair?");
    expect(html).toContain("How long does it take?");
    expect(html).toContain("What does it cost?");
  });

  it("has aria-expanded on buttons", async () => {
    const { FaqAccordion } = await import("../faq-accordion");
    const html = renderToStaticMarkup(
      createElement(FaqAccordion, { faqs: testFaqs }),
    );
    expect(html).toContain("aria-expanded");
  });

  it("has role=region on container", async () => {
    const { FaqAccordion } = await import("../faq-accordion");
    const html = renderToStaticMarkup(
      createElement(FaqAccordion, { faqs: testFaqs }),
    );
    expect(html).toContain('role="region"');
  });

  it("renders ChevronDown icons with aria-hidden", async () => {
    const { FaqAccordion } = await import("../faq-accordion");
    const html = renderToStaticMarkup(
      createElement(FaqAccordion, { faqs: testFaqs }),
    );
    expect(html).toContain('aria-hidden="true"');
  });

  it("renders aria-controls linking button to panel", async () => {
    const { FaqAccordion } = await import("../faq-accordion");
    const html = renderToStaticMarkup(
      createElement(FaqAccordion, { faqs: testFaqs }),
    );
    expect(html).toContain("aria-controls");
    expect(html).toContain("faq-panel-0");
    expect(html).toContain("faq-heading-0");
  });

  it("renders answer for default open index", async () => {
    const { FaqAccordion } = await import("../faq-accordion");
    const html = renderToStaticMarkup(
      createElement(FaqAccordion, { faqs: testFaqs, defaultOpenIndex: 0 }),
    );
    expect(html).toContain("Roof repair fixes damaged areas.");
  });

  describe.todo("interactive tests require jsdom environment");
});
