"use client";

import { useEffect, useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

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
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const trigger = el.parentElement || el;

    const tween = gsap.fromTo(
      el,
      { yPercent: -strength * 50, scale: 1 },
      {
        yPercent: strength * 50,
        scale: zoom,
        ease: "none",
        scrollTrigger: {
          trigger,
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
