import { describe, expect, it } from "vite-plus/test";
import { clamp, getHeroFrame, getServiceFrame, smoothStep } from "./motion";

describe("cinematic motion math", () => {
  it("clamps scroll progress and smooths its midpoint", () => {
    expect(clamp(-2)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(0.4)).toBe(0.4);
    expect(smoothStep(0)).toBe(0);
    expect(smoothStep(0.5)).toBe(0.5);
    expect(smoothStep(1)).toBe(1);
  });

  it("opens the desktop portrait into a full-screen frame", () => {
    const initial = getHeroFrame(0);
    const final = getHeroFrame(1);

    expect(initial.clip).toBe(
      "inset(13.00% 4.50% 9.00% 55.00% round 190.0px 190.0px 49.4px 49.4px)",
    );
    expect(initial.imageTransform).toBe("translate3d(8.00%, 0.00%, 0) scale(1.090)");
    expect(initial.expanded).toBe(false);
    expect(final.clip).toBe("inset(0.00% 0.00% 0.00% 0.00% round 0.0px 0.0px 0.0px 0.0px)");
    expect(final.imageTransform).toBe("translate3d(0.00%, 0.00%, 0) scale(1.020)");
    expect(final.expanded).toBe(true);
  });

  it("uses a mobile-specific portrait composition and clamps overscroll", () => {
    const initial = getHeroFrame(-1, true);
    const final = getHeroFrame(2, true);

    expect(initial.progress).toBe(0);
    expect(initial.clip).toContain("42.00% 5.00% 5.00% 48.00%");
    expect(initial.imageTransform).toBe("translate3d(0.00%, 42.00%, 0) scale(1.140)");
    expect(final.progress).toBe(1);
    expect(final.imageTransform).toBe("translate3d(0.00%, 0.00%, 0) scale(1.020)");
  });

  it("moves through three service chapters with crossfades", () => {
    expect(getServiceFrame(0, 3)).toMatchObject({ activeIndex: 0, opacities: [1, 0, 0] });
    expect(getServiceFrame(0.25, 3)).toMatchObject({ activeIndex: 1, opacities: [0.5, 0.5, 0] });
    expect(getServiceFrame(0.5, 3)).toMatchObject({ activeIndex: 1, opacities: [0, 1, 0] });
    expect(getServiceFrame(0.75, 3)).toMatchObject({ activeIndex: 2, opacities: [0, 0.5, 0.5] });
    expect(getServiceFrame(1, 3)).toMatchObject({ activeIndex: 2, opacities: [0, 0, 1] });
  });
});
