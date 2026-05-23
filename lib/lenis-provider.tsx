"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

// Tune for a film-cut feel: shorter duration, tight exponential easing.
// The default Lenis 1.2s "lazy" ease is the cliché we explicitly refuse.
const easeOutExpoTight = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -8 * t));

const LenisContext = createContext<Lenis | null>(null);

/**
 * Returns the active Lenis instance, or null before mount / after unmount /
 * when prefers-reduced-motion disabled the smooth scroll.
 *
 * Used by components that need to lock the page (e.g. the SplitScrollReel
 * accordion) — call `lenis.stop()` to pause smooth scroll, `lenis.start()`
 * to resume. Disabling ScrollTrigger alone is NOT enough — Lenis still
 * processes wheel events independently.
 */
export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const instance = new Lenis({
      duration: prefersReduced ? 0 : 0.8,
      easing: easeOutExpoTight,
      smoothWheel: !prefersReduced,
      // Lenis 1.3+: no smoothTouch flag — native touch scroll on mobile.
    });

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      instance.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
