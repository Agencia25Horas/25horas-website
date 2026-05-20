"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

// Tune for a film-cut feel: shorter duration, tight exponential easing.
// The default Lenis 1.2s "lazy" ease is the cliché we explicitly refuse.
const easeOutExpoTight = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -8 * t));

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 0.8,
      easing: easeOutExpoTight,
      smoothWheel: !prefersReduced,
      // Lenis 1.3+: no smoothTouch flag — native touch scroll on mobile.
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
