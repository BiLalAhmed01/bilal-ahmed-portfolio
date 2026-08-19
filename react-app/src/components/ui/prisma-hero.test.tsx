import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { PrismaHero } from "./prisma-hero";

const originalMatchMedia = window.matchMedia;

describe("PrismaHero", () => {
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("autoplays with preload=auto when the visitor has no reduced-data preference", () => {
    const { container } = render(<PrismaHero />);
    const video = container.querySelector("video")!;
    expect(video.autoplay).toBe(true);
    expect(video.preload).toBe("auto");
  });

  it("skips autoplay and only preloads metadata when prefers-reduced-data is set", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-data: reduce)",
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;

    const { container } = render(<PrismaHero />);
    const video = container.querySelector("video")!;
    expect(video.autoplay).toBe(false);
    expect(video.preload).toBe("metadata");
  });
});
