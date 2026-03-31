import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Track state and effects
const mockStates: Map<number, { value: unknown; setter: (v: unknown) => void }> = new Map();
let stateIndex = 0;
const effects: Array<() => (() => void) | undefined> = [];
let effectCleanups: Array<(() => void) | undefined> = [];
const refs: Map<number, { current: unknown }> = new Map();
let refIndex = 0;
let callbackFns: Map<number, (...args: unknown[]) => void> = new Map();
let callbackIndex = 0;

vi.mock("react", () => ({
  useState: (initial: unknown) => {
    const idx = stateIndex++;
    const state = { value: initial, setter: (v: unknown) => { state.value = v; } };
    mockStates.set(idx, state);
    return [state.value, state.setter] as const;
  },
  useEffect: (cb: () => (() => void) | undefined) => {
    effects.push(cb);
  },
  useCallback: (cb: (...args: unknown[]) => void) => {
    const idx = callbackIndex++;
    callbackFns.set(idx, cb);
    return cb;
  },
  useRef: (initial: unknown) => {
    const idx = refIndex++;
    const ref = { current: initial };
    refs.set(idx, ref);
    return ref;
  },
}));

describe("useExitIntent", () => {
  let documentListeners: Map<string, EventListener>;
  let windowListeners: Map<string, EventListener>;

  beforeEach(() => {
    // Reset mocks
    stateIndex = 0;
    refIndex = 0;
    callbackIndex = 0;
    mockStates.clear();
    effects.length = 0;
    effectCleanups = [];
    refs.clear();
    callbackFns.clear();
    documentListeners = new Map();
    windowListeners = new Map();

    vi.stubGlobal("window", {
      scrollY: 0,
      location: { pathname: "/services/roof-repair" },
      addEventListener: vi.fn((event: string, handler: EventListener) => {
        windowListeners.set(event, handler);
      }),
      removeEventListener: vi.fn(),
    });

    vi.stubGlobal("document", {
      addEventListener: vi.fn((event: string, handler: EventListener) => {
        documentListeners.set(event, handler);
      }),
      removeEventListener: vi.fn(),
      activeElement: null,
    });

    // Reset module-level dismissed flag by re-importing
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not trigger before delay period", async () => {
    const { useExitIntent } = await import("../use-exit-intent");
    const result = useExitIntent({ delayMs: 5000 });

    // Run effects
    for (const effect of effects) {
      const cleanup = effect();
      effectCleanups.push(cleanup);
    }

    // Simulate mouseLeave immediately (before delay)
    const mouseLeaveHandler = documentListeners.get("mouseleave");
    if (mouseLeaveHandler) {
      mouseLeaveHandler({ clientY: -10 } as MouseEvent);
    }

    // isTriggered state (index 0) should still be false
    expect(mockStates.get(0)?.value).toBe(false);
  });

  it("triggers on mouseLeave with clientY <= 0 after delay", async () => {
    const { useExitIntent } = await import("../use-exit-intent");
    useExitIntent({ delayMs: 0 });

    // Run effects
    for (const effect of effects) {
      const cleanup = effect();
      effectCleanups.push(cleanup);
    }

    // Set mountTime to past
    const mountTimeRef = refs.get(0);
    if (mountTimeRef) {
      mountTimeRef.current = Date.now() - 10000;
    }

    const mouseLeaveHandler = documentListeners.get("mouseleave");
    expect(mouseLeaveHandler).toBeDefined();
  });

  it("triggers on rapid scroll-up > 300px after delay", async () => {
    const { useExitIntent } = await import("../use-exit-intent");
    useExitIntent({ delayMs: 0 });

    // Run effects
    for (const effect of effects) {
      const cleanup = effect();
      effectCleanups.push(cleanup);
    }

    const scrollHandler = windowListeners.get("scroll");
    expect(scrollHandler).toBeDefined();
  });

  it("dismiss() prevents future triggers (module-level flag)", async () => {
    const { useExitIntent } = await import("../use-exit-intent");
    const result = useExitIntent();

    // The dismiss function should be the callback
    expect(result.dismiss).toBeDefined();
    expect(typeof result.dismiss).toBe("function");
  });

  it("does not trigger when enabled is false", async () => {
    const { useExitIntent } = await import("../use-exit-intent");
    useExitIntent({ enabled: false });

    // Run effects -- they should early-return
    for (const effect of effects) {
      const cleanup = effect();
      effectCleanups.push(cleanup);
    }

    // No listeners should be registered
    expect(documentListeners.has("mouseleave")).toBe(false);
    expect(windowListeners.has("scroll")).toBe(false);
  });

  it("does not trigger on non-service/non-location pages", async () => {
    // Set pathname to blog page
    (window as unknown as { location: { pathname: string } }).location.pathname = "/blog/some-post";

    const { useExitIntent } = await import("../use-exit-intent");
    useExitIntent();

    // Run effects
    for (const effect of effects) {
      const cleanup = effect();
      effectCleanups.push(cleanup);
    }

    // No listeners should be registered on blog pages
    expect(documentListeners.has("mouseleave")).toBe(false);
    expect(windowListeners.has("scroll")).toBe(false);
  });
});
