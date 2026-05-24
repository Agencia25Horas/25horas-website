"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap-setup";

type Poster = {
  src: string;
  title: string;
  label: string;
  desc: string;
  href: string;
  cta: string;
  external?: boolean;
};

// Four cinematic posters that double as the navigation menu. Each poster
// is a clickable link to one of the site's four primary destinations.
// Parallax background drifts based on viewport position — tomatino pattern.
const POSTERS: Poster[] = [
  {
    src: "/media/bg-2.jpg",
    title: "Sobre",
    label: "SOBRE",
    desc: "Um colectivo de realização e produção, com base em Lisboa.",
    href: "/manifesto",
    cta: "ABRIR",
  },
  {
    src: "/media/bg-4.jpg",
    title: "Portfolio",
    label: "PORTFOLIO",
    desc: "Seis programas, dezenas de filmes para marcas.",
    href: "/programa",
    cta: "ABRIR",
  },
  {
    src: "/media/bg-6.jpg",
    title: "Contactos",
    label: "CONTACTOS",
    desc: "atendimento@25horasagency.com · +351 963 869 519.",
    href: "mailto:atendimento@25horasagency.com",
    cta: "ESCREVER",
    external: true,
  },
  {
    src: "/media/bg-8.jpg",
    title: "Pedir Orçamento",
    label: "PEDIR ORÇAMENTO",
    desc: "Quatro perguntas. Resposta em 24 horas, em PT ou EN.",
    href: "/orcamento",
    cta: "ABRIR",
  },
];

export function GaleriaReel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>(".poster-item"),
    );
    const PARALLAX_RANGE_PX = 70;
    // Scale must cover the parallax overshoot at both extremes, otherwise the
    // page split-bg leaks through the top/bottom of each frame as a dark band.
    // Required: scale ≥ 1 + 2*PARALLAX_RANGE / frame_height. With aspect-scope
    // (2.39:1) and a ~768px frame, 1.5 is the safe minimum.
    const BG_SCALE = 1.5;

    const update = () => {
      const vh = window.innerHeight;
      const half = vh / 2;
      items.forEach((item) => {
        const bg = item.querySelector<HTMLElement>(".poster-bg");
        if (!bg) return;
        const rect = item.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        const center = rect.top + rect.height / 2;
        const offsetNorm = (center - half) / half;
        const translate = -offsetNorm * PARALLAX_RANGE_PX;
        bg.style.transform = `scale(${BG_SCALE}) translate3d(0, ${translate.toFixed(2)}px, 0)`;
      });
    };

    gsap.ticker.add(update);
    update();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reel="8"
      className="relative py-28 md:py-40"
      aria-label="Rolo 08 — Atalhos"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="space-y-32 md:space-y-48">
          {POSTERS.map((p, i) => {
            // Title and description use .split-text so they read correctly
            // whether they stay on one half or cross the page divider. Label
            // stays on the left edge of the card (always page-left → cream),
            // CTA stays on the right edge (always page-right → black).
            const alignLeft = i % 2 === 0;

            return (
              <Link
                key={p.src}
                href={p.href}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                className={`poster-item group block max-w-3xl ${
                  alignLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                } focus:outline-none focus:ring-1 focus:ring-accent-grade`}
                aria-label={p.title}
              >
                {/* Number label — always hugs the left edge of the card and
                    sits on the page's black half → static cream. */}
                <div className="font-mono text-[10px] tracking-mono-wider text-canvas-white/65 mb-4">
                  {String(i + 1).padStart(2, "0")} / {String(POSTERS.length).padStart(2, "0")} · {p.label}
                </div>

                {/* Parallax image frame — 2.39:1 anamorphic.
                    leading-none on the wrapper + block on the <img> kill the
                    inline-block baseline gap that Next/Image inherits, which
                    otherwise leaks the page bg through as a 1-2px dark band.
                    z-10 puts the frame above the .split-divider::after hairline
                    (z-1) so the divider doesn't slice through each image. */}
                <div className="relative z-10 aspect-scope overflow-hidden leading-none">
                  <div
                    className="poster-bg absolute inset-0 will-change-transform transition-transform duration-f-50 ease-cinema"
                    style={{ transform: "scale(1.5)" }}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover block align-bottom"
                      priority={false}
                    />
                  </div>
                  {/* Hover veil — subtle warm tint on focus/hover */}
                  <div
                    className="absolute inset-0 bg-canvas-black/0 group-hover:bg-canvas-black/10 group-focus:bg-canvas-black/10 transition-colors duration-f-25"
                    aria-hidden
                  />
                </div>

                {/* Title row — split-text adapts colour to viewport position
                    (cream on left half, black on right half), so titles that
                    cross the divider stay legible on both sides. */}
                <div className="mt-6 flex items-end justify-between gap-6">
                  <h3
                    lang="pt"
                    className="split-text font-serif font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] group-hover:text-accent-grade transition-colors duration-f-25"
                  >
                    {p.title}
                  </h3>
                  <span className="shrink-0 inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-black/65 group-hover:text-accent-grade transition-colors duration-f-25 pb-2">
                    {p.cta}
                    <span
                      className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-25"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>

                {/* Description — split-text for the same reason as the title;
                    on right-aligned posters the description can cross the
                    page divider, so cream-on-left / black-on-right keeps it
                    legible end-to-end. */}
                <p
                  lang="pt"
                  className="split-text mt-3 font-body text-[14px] md:text-[15px] leading-snug max-w-md"
                >
                  {p.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
