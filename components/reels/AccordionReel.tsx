"use client";

import Link from "next/link";
import { useState } from "react";

type Panel = {
  num: string;
  label: string;
  title: string;
  desc: string;
  href: string;
  external?: boolean;
  gradient: string;
  /** Optional: dark-text mode for panels with light backgrounds (default true). */
  light?: boolean;
};

const PANELS: Panel[] = [
  {
    num: "01",
    label: "SOBRE",
    title: "Sobre nós",
    desc: "Um colectivo de realização e produção em Lisboa. Fazemos filmes curtos para marcas que sabem que duram.",
    href: "/manifesto",
    gradient:
      "radial-gradient(ellipse at 30% 60%, #f4e8dc 0%, #ece4d8 50%, #e2dccf 100%)",
    light: true,
  },
  {
    num: "02",
    label: "PORTFOLIO",
    title: "Portfolio",
    desc: "Seis programas, dezenas de filmes. Hospitalidade, música, desporto, institucional, imobiliário, eventos.",
    href: "/programa",
    gradient:
      "radial-gradient(ellipse at 70% 40%, #e8ecf0 0%, #dfe4ea 50%, #d1d8e0 100%)",
    light: true,
  },
  {
    num: "03",
    label: "CONTACTOS",
    title: "Contactos",
    desc: "atendimento@25horasagency.com · +351 963 869 519. Por filme, por proposta, por café.",
    href: "mailto:atendimento@25horasagency.com",
    external: true,
    gradient:
      "radial-gradient(ellipse at 40% 50%, #efe7d8 0%, #e5dcca 50%, #d8ceb9 100%)",
    light: true,
  },
  {
    num: "04",
    label: "PEDIR ORÇAMENTO",
    title: "Pedir orçamento",
    desc: "Quatro perguntas. Resposta em 24 horas, em PT ou EN. Vamos rever o pedido e responder.",
    href: "/orcamento",
    // accent terracotta gradient — the CTA panel stays warm + saturated
    gradient:
      "radial-gradient(ellipse at 60% 50%, #d96a3a 0%, #b8512a 60%, #8b3a1c 100%)",
    light: false, // dark text would clash on the terracotta — white reads better
  },
];

export function AccordionReel() {
  const [active, setActive] = useState(0);

  return (
    <section
      data-reel="9"
      className="relative bg-canvas-white px-6 md:px-12 py-24 md:py-32"
      aria-label="Rolo 09 — Atalhos"
    >
      <div className="max-w-7xl mx-auto">
        <div className="accordion-wrap flex gap-2 h-[70vh] min-h-[460px] max-h-[640px]">
          {PANELS.map((p, i) => (
            <PanelComponent
              key={p.num}
              panel={p}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelComponent({
  panel,
  isActive,
  onActivate,
}: {
  panel: Panel;
  isActive: boolean;
  onActivate: () => void;
}) {
  const lightPanel = panel.light !== false;

  const textPrimary = lightPanel ? "text-canvas-black" : "text-canvas-white";
  const textSecondary = lightPanel
    ? "text-canvas-black/65"
    : "text-canvas-white/80";
  const numColor = lightPanel ? "text-accent-grade" : "text-canvas-white";
  const collapsedColor = lightPanel ? "text-canvas-black" : "text-canvas-white";
  const ctaColor = lightPanel ? "text-canvas-black" : "text-canvas-white";
  const vignette = lightPanel
    ? "linear-gradient(to top, rgba(244,240,232,0.65) 0%, rgba(244,240,232,0.2) 35%, transparent 55%)"
    : "linear-gradient(to top, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.15) 35%, transparent 55%)";

  const inner = (
    <>
      {/* Background gradient */}
      <div
        className="panel-bg absolute inset-0"
        style={{ background: panel.gradient }}
        aria-hidden
      />
      {/* Subtle grain — opacity tuned per theme */}
      <div
        className={`absolute inset-0 mix-blend-multiply ${
          lightPanel ? "opacity-[0.06]" : "opacity-[0.04]"
        }`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />
      {/* Soft vignette to keep text legible */}
      <div className="absolute inset-0" style={{ background: vignette }} aria-hidden />

      {/* Collapsed: vertical mono label, bottom-left */}
      <div
        className={`panel-label-collapsed absolute bottom-6 left-4 font-mono text-[11px] tracking-mono-wider ${collapsedColor}`}
      >
        {panel.label}
      </div>

      {/* Expanded: number, title, description, arrow */}
      <div className="panel-body absolute left-6 right-6 bottom-6 md:left-8 md:right-8 md:bottom-8 z-10">
        <div className={`font-mono text-[10px] tracking-mono-wider ${numColor} mb-2`}>
          {panel.num}
        </div>
        <h3
          className={`font-serif font-light text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight ${textPrimary} mb-3`}
        >
          {panel.title}
        </h3>
        <p
          lang="pt"
          className={`font-body text-[13px] md:text-[14px] leading-snug ${textSecondary} max-w-md mb-4`}
        >
          {panel.desc}
        </p>
        <span
          className={`inline-flex items-center font-mono text-[10px] tracking-mono-wider ${ctaColor}`}
        >
          {panel.external ? "ESCREVER" : "ABRIR"}
          <span className="ml-2" aria-hidden>
            →
          </span>
        </span>
      </div>
    </>
  );

  const className = `accordion-panel relative overflow-hidden rounded-2xl cursor-pointer ${
    isActive ? "is-active" : ""
  } block focus:outline-none focus:ring-1 focus:ring-accent-grade`;

  return (
    <Link
      href={panel.href}
      target={panel.external ? "_blank" : undefined}
      rel={panel.external ? "noopener noreferrer" : undefined}
      className={className}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-label={panel.title}
    >
      {inner}
    </Link>
  );
}
