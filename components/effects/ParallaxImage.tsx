"use client";

import { useEffect, useRef } from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "ref"> & {
  /** Parallax strength: 0 = no movement, 0.3 = subtle, 0.8 = strong. Default 0.3. */
  strength?: number;
  /** Optional zoom-on-scroll factor. 1 = none, 1.15 = zooms 15% over scroll range. */
  zoom?: number;
  /** Extends the layer beyond its container top+bottom by this % so the parallax
   *  translate never reveals a gap (needed for full-bleed cover backgrounds).
   *  Default 0 = exact inset-0 (used by contained images like logos). */
  overscan?: number;
  /** Optional wrapper className (positioning, rounding). */
  wrapperClassName?: string;
  /** Optional inner <Image> className. Overrides default `object-cover`. */
  imgClassName?: string;
};

/**
 * Image with vertical parallax + optional zoom driven by scroll position.
 * The image translates slower than the page, creating depth.
 * Use inside a wrapper with `relative overflow-hidden` so the parallax movement is clipped.
 *
 * Respects prefers-reduced-motion — falls back to a static image.
 */
export function ParallaxImage({
  strength = 0.3,
  zoom = 1,
  overscan = 0,
  wrapperClassName = "",
  imgClassName,
  className,
  ...imgProps
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Estático só em reduced-motion. O GSAP continua a carregar on-demand
    // (1.º scroll/1500ms) — não pesa no arranque, e o depth funciona também
    // em mobile.
    if (reduce) return;

    let kill: (() => void) | null = null;
    let cancelled = false;

    // GSAP carregado on-demand (1.º scroll OU 1500ms) — fora do bundle inicial.
    const setup = async () => {
      if (cancelled || !wrapRef.current) return;
      const { gsap } = await import("@/lib/gsap-setup");
      if (cancelled || !wrapRef.current) return;
      const node = wrapRef.current;
      const tween = gsap.fromTo(
        node,
        { yPercent: -strength * 50, scale: 1 },
        {
          yPercent: strength * 50,
          scale: zoom,
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
  }, [strength, zoom]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-x-0 will-change-transform ${wrapperClassName}`}
      style={{ top: `${-overscan}%`, bottom: `${-overscan}%` }}
    >
      <Image
        {...imgProps}
        fill
        className={imgClassName ?? `object-cover ${className ?? ""}`}
      />
    </div>
  );
}
