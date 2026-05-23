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
        bg.style.transform = `scale(1.18) translate3d(0, ${translate.toFixed(2)}px, 0)`;
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
      className="relative bg-canvas-white py-28 md:py-40"
      aria-label="Rolo 08 — Atalhos"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="space-y-32 md:space-y-48">
          {POSTERS.map((p, i) => (
            <Link
              key={p.src}
              href={p.href}
              target={p.external ? "_blank" : undefined}
              rel={p.external ? "noopener noreferrer" : undefined}
              className={`poster-item group block max-w-3xl ${
                i % 2 === 0 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
              } focus:outline-none focus:ring-1 focus:ring-accent-grade`}
              aria-label={p.title}
            >
              {/* Number label */}
              <div className="font-mono text-[10px] tracking-mono-wider text-canvas-black/45 mb-4">
                {String(i + 1).padStart(2, "0")} / {String(POSTERS.length).padStart(2, "0")} · {p.label}
                <span
                  className="block mt-1 h-px w-8 bg-canvas-black/15"
                  aria-hidden
                />
              </div>

              {/* Parallax image frame — 2.39:1 anamorphic */}
              <div className="relative aspect-scope overflow-hidden">
                <div
                  className="poster-bg absolute inset-0 will-change-transform transition-transform duration-f-50 ease-cinema"
                  style={{ transform: "scale(1.18)" }}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                {/* Hover veil — subtle warm tint on focus/hover */}
                <div
                  className="absolute inset-0 bg-canvas-black/0 group-hover:bg-canvas-black/10 group-focus:bg-canvas-black/10 transition-colors duration-f-25"
                  aria-hidden
                />
              </div>

              {/* Title row — large serif + cta */}
              <div className="mt-6 flex items-end justify-between gap-6">
                <h3
                  lang="pt"
                  className="font-serif font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-canvas-black group-hover:text-accent-grade transition-colors duration-f-25"
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

              {/* Description */}
              <p
                lang="pt"
                className="mt-3 font-body text-[14px] md:text-[15px] leading-snug text-canvas-black/60 max-w-md"
              >
                {p.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
