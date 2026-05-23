"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

// Reel 02 — "Visão". Parallax interlude between the hero (cinema) and
// the split-scroll (brand reveal). Three layers move at different speeds
// as the user scrolls past, creating tomatino-style depth.
//
// Layers (front to back, slow to fast translate):
//   1. Background still      — large image, slowest, scales 1.3 so the
//                              parallax translation doesn't expose edges
//   2. Serif phrase          — middle, normal-ish scroll
//   3. Mono details / chrome — foreground, fastest (subtle)
export function VisaoReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const middle = middleRef.current;
    const details = detailsRef.current;
    if (!section || !bg || !middle || !details) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // All triggers share the same span: section enters viewport bottom →
    // exits viewport top. Inside that span, each layer translates at its
    // own range. Scrub gives the silky tomatino feel.
    const triggerOpts = {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    };

    const bgTween = gsap.fromTo(
      bg,
      { yPercent: -12 },
      { yPercent: 12, ease: "none", scrollTrigger: triggerOpts },
    );

    const middleTween = gsap.fromTo(
      middle,
      { yPercent: 8 },
      { yPercent: -8, ease: "none", scrollTrigger: triggerOpts },
    );

    const detailsTween = gsap.fromTo(
      details,
      { yPercent: 20 },
      { yPercent: -20, ease: "none", scrollTrigger: triggerOpts },
    );

    return () => {
      bgTween.scrollTrigger?.kill();
      middleTween.scrollTrigger?.kill();
      detailsTween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reel="2"
      className="relative h-[150vh] overflow-hidden bg-canvas-black"
      aria-label="Rolo 02 — Visão"
    >
      {/* Background — full-bleed still, scaled 1.3x so the translate
          range never exposes the section edges. Slowest parallax. */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.3)" }}
      >
        <Image
          src="/media/bts-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        {/* Dim overlay so the serif sits cleanly on top */}
        <div className="absolute inset-0 bg-canvas-black/55" aria-hidden />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.45) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Middle — the serif phrase. Centred, large display type. */}
      <div
        ref={middleRef}
        className="absolute inset-0 flex items-center justify-center px-6 md:px-12 will-change-transform pointer-events-none"
      >
        <div className="max-w-4xl text-center">
          <h2
            lang="pt"
            className="font-serif font-light text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] text-canvas-white"
          >
            Vemos antes
            <br />
            de filmar.
          </h2>
          <p
            lang="pt"
            className="mt-8 font-serif font-light text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-type-neutral max-w-xl mx-auto"
          >
            Cada projeto começa no enquadramento. O resto é técnica.
          </p>
        </div>
      </div>

      {/* Foreground — slate-style chrome details. Fastest parallax. */}
      <div
        ref={detailsRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-[calc(var(--chrome-h-mobile)+1.5rem)] md:top-[calc(var(--chrome-h)+2rem)] left-6 md:left-12 font-mono text-[10px] tracking-mono-wider text-canvas-white/85">
          ROLO 02 — VISÃO
          <span className="block mt-1 h-px w-10 bg-canvas-white/40" aria-hidden />
        </div>
        <div className="absolute top-[calc(var(--chrome-h-mobile)+1.5rem)] md:top-[calc(var(--chrome-h)+2rem)] right-6 md:right-12 font-mono text-[10px] tracking-mono-wider text-canvas-white/70">
          02 / 09
        </div>
        <div className="absolute bottom-[calc(var(--chrome-h-mobile)+1.5rem)] md:bottom-[calc(var(--chrome-h)+2rem)] left-6 md:left-12 font-mono text-[10px] tracking-mono-wider text-canvas-white/70 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-grade" aria-hidden />
          BTS · 00:00:08:14
        </div>
        <div className="absolute bottom-[calc(var(--chrome-h-mobile)+1.5rem)] md:bottom-[calc(var(--chrome-h)+2rem)] right-6 md:right-12 font-mono text-[10px] tracking-mono-wider text-canvas-white/70">
          F2.8 · 50mm
        </div>
      </div>
    </section>
  );
}
