"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type Lenis from "lenis";

// Tune for a film-cut feel: shorter duration, tight exponential easing.
const easeOutExpoTight = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -8 * t));

const LenisContext = createContext<Lenis | null>(null);

/**
 * Returns the active Lenis instance, or null:
 *  • em mobile (scroll nativo — Lenis pesa e o toque já é fluido),
 *  • antes do init diferido (1.º scroll / 1500ms),
 *  • com prefers-reduced-motion.
 * Componentes que dependem disto (ex.: SeamlessLoop) já tratam o null
 * (fazem fallback para window.scrollTo nativo).
 */
export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile =
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.innerWidth <= 768;
    // Mobile / reduced-motion → scroll nativo, e o GSAP NEM CARREGA aqui.
    if (reduce || isMobile) return;

    let instance: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let gsapMod: typeof import("@/lib/gsap-setup") | null = null;
    let cancelled = false;

    // Carrega Lenis + GSAP só quando preciso (1.º scroll OU 1500ms) — fora
    // do bundle inicial, para não atrasar a hidratação / LCP.
    const init = async () => {
      if (cancelled || instance) return;
      const [lenisMod, gsap] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap-setup"),
      ]);
      if (cancelled) return;
      gsapMod = gsap;
      const Lenis = lenisMod.default;
      instance = new Lenis({
        duration: 0.8,
        easing: easeOutExpoTight,
        smoothWheel: true,
      });
      const onScroll = () => gsap.ScrollTrigger.update();
      instance.on("scroll", onScroll);
      tick = (time: number) => instance?.raf(time * 1000);
      gsap.gsap.ticker.add(tick);
      gsap.gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };

    const onFirstScroll = () => init();
    window.addEventListener("scroll", onFirstScroll, {
      once: true,
      passive: true,
    });
    const timer = window.setTimeout(init, 1500);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onFirstScroll);
      window.clearTimeout(timer);
      if (instance && gsapMod && tick) gsapMod.gsap.ticker.remove(tick);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
