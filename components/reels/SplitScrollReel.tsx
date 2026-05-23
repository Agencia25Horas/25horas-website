"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { useLenis } from "@/lib/lenis-provider";
import { LOGOS } from "@/lib/logos";
import { NICHOS, GESTAO_REDES } from "@/lib/servicos";

// Phase 2 — content from lib/servicos.ts. 8 slides; each accordion has
// VÍDEO / FOTOGRAFIA / (DESIGN?) / GESTÃO DE REDES SOCIAIS panels.

// Fallback imagery — Phase 3 swaps for niche-specific imagery.
const PANEL_IMAGES: Record<string, string> = {
  "VÍDEO":
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop",
  "FOTOGRAFIA":
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop",
  "DESIGN":
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop",
  "GESTÃO DE REDES SOCIAIS":
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
};

type OpenState = { slide: number; entry: number } | null;

export function SplitScrollReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const lenis = useLenis();
  const [open, setOpen] = useState<OpenState>(null);

  // Counter-scroll com leading enter — left sobe de baixo, right desce de topo.
  // Section 900vh dá 100vh inicial para os slides 0/7 entrarem na viewport.
  // Reference: items/split-scroll.html lines 70-71.
  useEffect(() => {
    const section = sectionRef.current;
    const left = leftColRef.current;
    const right = rightColRef.current;
    if (!section || !left || !right) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isStacked = window.matchMedia("(max-width: 767px)").matches;
    if (prefersReduced || isStacked) return;

    const count = LOGOS.length; // 8

    triggersRef.current = [];

    const leftTween = gsap.fromTo(
      left,
      { y: window.innerHeight },
      {
        y: -(count - 1) * window.innerHeight,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );
    if (leftTween.scrollTrigger)
      triggersRef.current.push(leftTween.scrollTrigger);

    const rightTween = gsap.fromTo(
      right,
      { y: -count * window.innerHeight },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      },
    );
    if (rightTween.scrollTrigger)
      triggersRef.current.push(rightTween.scrollTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  // Lock — pause Lenis + disable ScrollTrigger while an entry is open.
  useEffect(() => {
    if (open) {
      triggersRef.current.forEach((t) => t.disable(false));
      lenis?.stop();
    } else {
      triggersRef.current.forEach((t) => t.enable());
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [open, lenis]);

  // ESC closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section
      ref={sectionRef}
      data-reel="3"
      className="relative md:h-[900vh] bg-canvas-black"
      aria-label="Rolo 03 — Nichos"
    >
      {/* MOBILE — vertical stack, no sticky */}
      <div className="md:hidden">
        {LOGOS.map((logo, i) => (
          <div
            key={logo.label}
            className="border-b border-chrome-line py-12 px-6"
          >
            <div className="bg-canvas-white p-8 mb-8 flex items-center justify-center">
              <div className="relative w-[180px] h-[180px]">
                <Image
                  src={logo.src}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </div>
            <SlidePanel
              index={i}
              open={open}
              setOpen={setOpen}
              locked={false}
            />
          </div>
        ))}
      </div>

      {/* DESKTOP — sticky split scroll, synced columns. The sticky div MUST be
          a direct child of the 900vh section, not nested in a wrapper without
          height — otherwise sticky has no taller ancestor and collapses. */}
      <div className="hidden md:flex sticky top-0 h-[100svh] flex-row overflow-hidden">
        {/* LEFT — niche header + accordion */}
        <div className="flex-1 overflow-hidden relative bg-canvas-black">
          <div
            ref={leftColRef}
            className="absolute inset-x-0 will-change-transform"
          >
            {LOGOS.map((_, i) => (
              <div
                key={i}
                className="h-[100svh] flex items-center justify-center px-8"
              >
                <SlidePanel
                  index={i}
                  open={open}
                  setOpen={setOpen}
                  locked
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-chrome-line shrink-0" aria-hidden />

        {/* RIGHT — logo only. Reversed iteration so counter-scroll lands the
            matching logo opposite each accordion slide. */}
        <div className="flex-1 overflow-hidden relative bg-canvas-white">
          <div
            ref={rightColRef}
            className="absolute inset-x-0 will-change-transform"
          >
            {[...LOGOS].reverse().map((logo) => (
              <div
                key={logo.label}
                className="h-[100svh] flex items-center justify-center px-8"
              >
                <div className="relative w-[clamp(220px,30vw,420px)] h-[clamp(220px,30vw,420px)]">
                  <Image
                    src={logo.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 80vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

type SlidePanelProps = {
  index: number;
  open: OpenState;
  setOpen: (v: OpenState) => void;
  /** Desktop locks scroll + listens for outside-click. Mobile doesn't. */
  locked: boolean;
};

function SlidePanel({ index, open, setOpen, locked }: SlidePanelProps) {
  const accordionRef = useRef<HTMLDivElement>(null);
  const isOpenSlide = open?.slide === index;

  // Outside-click closes — only when this slide's accordion is open AND
  // we're on the locked (desktop) layout.
  useEffect(() => {
    if (!isOpenSlide || !locked) return;
    const onMouseDown = (e: MouseEvent) => {
      const ref = accordionRef.current;
      if (ref && !ref.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpenSlide, locked, setOpen]);

  const nicho = NICHOS[index];
  if (!nicho) return null;

  // 3 or 4 panels — DESIGN only when the niche offers it. GESTÃO is always last.
  const entries: Array<{ label: string; emoji: string; items: readonly string[] }> = [
    { label: "VÍDEO", emoji: "🎥", items: nicho.video },
    { label: "FOTOGRAFIA", emoji: "📸", items: nicho.fotografia },
  ];
  if (nicho.design) {
    entries.push({ label: "DESIGN", emoji: "🎨", items: nicho.design });
  }
  entries.push({
    label: GESTAO_REDES.label,
    emoji: GESTAO_REDES.emoji,
    items: GESTAO_REDES.items,
  });

  return (
    <div className="w-full max-w-md text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
          {nicho.code} / {String(NICHOS.length).padStart(2, "0")}
          <span
            className="block mx-auto mt-2 h-px w-8 bg-type-dim/60"
            aria-hidden
          />
        </div>
        <div className="font-mono text-[14px] tracking-mono-wider text-canvas-white">
          {nicho.emoji} {nicho.label}
        </div>
        <p
          lang="pt"
          className="mt-4 font-serif font-light text-[clamp(1rem,1.4vw,1.25rem)] leading-snug text-type-neutral/85 max-w-sm mx-auto"
        >
          {nicho.tagline}
        </p>
      </div>

      {/* Vertical accordion-slider — CSS-only hover; React handles click-lock.
          Reference: items/accordion-slider.html lines 117-170, 252-293. */}
      <div
        ref={accordionRef}
        className={`${
          locked ? "v-acc-bounded" : "v-acc-flow"
        } ${open?.slide === index ? "has-active" : ""}`}
      >
        {entries.map((entry, eIdx) => {
          const isActive = open?.slide === index && open?.entry === eIdx;
          const img = PANEL_IMAGES[entry.label];

          return (
            <div
              key={entry.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(isActive ? null : { slide: index, entry: eIdx });
              }}
              className={`v-panel ${isActive ? "active" : ""}`}
              role="button"
              aria-expanded={isActive}
            >
              <div
                className="v-bg"
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
              <div className="v-overlay" aria-hidden />
              <div className="v-collapsed">
                {String(eIdx + 1).padStart(2, "0")} — {entry.label}
              </div>
              <div
                className="v-expanded"
                {...(isActive ? { "data-lenis-prevent": "" } : {})}
              >
                <h3>
                  {entry.emoji} {entry.label}
                </h3>
                <p className="v-items">
                  {entry.items.map((item, i) => (
                    <span key={item}>
                      {i > 0 && <span className="v-sep">{" * "}</span>}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
