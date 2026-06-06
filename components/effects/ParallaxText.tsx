"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap-setup";

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
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: -strength * 50 },
      {
        yPercent: strength * 50,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
