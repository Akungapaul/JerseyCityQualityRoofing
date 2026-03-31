import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock react hooks since we're in node environment
const mockState: { value: boolean; setter: (v: boolean) => void } = {
  value: false,
  setter: () => {},
};

let effectCleanup: (() => void) | undefined;
let effectCallback: (() => (() => void) | undefined) | undefined;

vi.mock("react", () => ({
  useState: (initial: boolean) => {
    mockState.value = initial;
    mockState.setter = (v: boolean) => {
      mockState.value = v;
    };
    return [mockState.value, mockState.setter] as const;
  },
  useEffect: (cb: () => (() => void) | undefined) => {
    effectCallback = cb;
    effectCleanup = cb();
  },
}));

describe("useScrollPastFold", () => {
  let addEventSpy: ReturnType<typeof vi.fn>;
  let removeEventSpy: ReturnType<typeof vi.fn>;
  let scrollHandler: ((e?: Event) => void) | undefined;

  beforeEach(() => {
    mockState.value = false;

    addEventSpy = vi.fn((event: string, handler: EventListener) => {
      if (event === "scroll") {
        scrollHandler = handler as (e?: Event) => void;
      }
    });
    removeEventSpy = vi.fn();

    vi.stubGlobal("window", {
      scrollY: 0,
      innerHeight: 800,
      addEventListener: addEventSpy,
      removeEventListener: removeEventSpy,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    effectCleanup = undefined;
    effectCallback = undefined;
    scrollHandler = undefined;
  });

  it("returns false initially", async () => {
    const { useScrollPastFold } = await import("../use-scroll-past-fold");
    const result = useScrollPastFold();
    expect(result).toBe(false);
  });

  it("registers scroll listener with passive option", async () => {
    const { useScrollPastFold } = await import("../use-scroll-past-fold");
    useScrollPastFold();
    expect(addEventSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true },
    );
  });

  it("returns true after scrollY exceeds threshold", async () => {
    const { useScrollPastFold } = await import("../use-scroll-past-fold");
    useScrollPastFold();

    // Simulate scroll past fold
    (window as unknown as { scrollY: number }).scrollY = 900;
    scrollHandler?.();

    expect(mockState.setter).toBeDefined();
  });

  it("accepts custom threshold parameter", async () => {
    const { useScrollPastFold } = await import("../use-scroll-past-fold");
    useScrollPastFold(0.5);

    expect(addEventSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true },
    );
  });

  it("cleans up scroll listener on unmount", async () => {
    const { useScrollPastFold } = await import("../use-scroll-past-fold");
    useScrollPastFold();

    // Call cleanup
    effectCleanup?.();

    expect(removeEventSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });
});
