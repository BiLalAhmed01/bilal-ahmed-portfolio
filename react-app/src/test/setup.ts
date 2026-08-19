import "@testing-library/jest-dom/vitest";

class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!("IntersectionObserver" in window)) {
  // @ts-expect-error jsdom has no real IntersectionObserver
  window.IntersectionObserver = MockObserver;
}
if (!("ResizeObserver" in window)) {
  // @ts-expect-error jsdom has no real ResizeObserver
  window.ResizeObserver = MockObserver;
}

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}
