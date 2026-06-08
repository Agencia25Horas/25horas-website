"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Movimento de profundidade subtil para texto/elementos: translada lentamente
 * no scroll (parallax), dando a sensação de "densidade" sobre o fundo preto.
 * Usa o mesmo motor (GSAP + ScrollTrigger) do ParallaxImage, mas sem zoom.
 * Respeita prefers-reduced-motion (fica estático).
 */
export function ParallaxText({
  children,
  strength = 0.12,
  className = "",
}: {
  children: ReactNode;
  /** 0 = parado · 0.12 = subtil · 0.3 = forte. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // estático só em reduced-motion (mobile tem depth)

    let kill: (() => void) | null = null;
    let cancelled = false;

    const setup = async () => {
      if (cancelled || !ref.current) return;
      const { gsap } = await import("@/lib/gsap-setup");
      if (cancelled || !ref.current) return;
      const node = ref.current;
      const tween = gsap.fromTo(
        node,
        { yPercent: -strength * 50 },
        {
          yPercent: strength * 50,
          ease: "none",
          scrollTrigger: {
            trigger: node.parentElement || node,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    const onFirstScroll = () => setup();
    window.addEventListener("scroll", onFirstScroll, {
      once: true,
      passive: true,
    });
    const timer = window.setTimeout(setup, 1500);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onFirstScroll);
      window.clearTimeout(timer);
      kill?.();
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
