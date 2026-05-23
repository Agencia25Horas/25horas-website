"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useNav } from "@/lib/nav-context";
import { useAudio } from "@/lib/audio-context";
import { playSlateClap } from "@/lib/audio";

const PORTFOLIO: Array<[code: string, label: string, href: string]> = [
  ["01", "HOSPITALIDADE", "/programa/hospitalidade"],
  ["02", "MÚSICA", "/programa/musica"],
  ["03", "DESPORTO", "/programa/desporto"],
  ["04", "INSTITUCIONAL", "/programa/institucional"],
  ["05", "IMOBILIÁRIO", "/programa/imobiliario"],
  ["06", "EVENTOS", "/programa/eventos"],
];

const ATENDIMENTO: Array<[label: string, href: string]> = [
  ["SOBRE", "/manifesto"],
  ["SERVIÇOS", "/servicos"],
  ["CONTACTO", "/contacto"],
  ["PEDIR ORÇAMENTO", "/orcamento"],
];

export function NavOverlay() {
  const { open, closeNav } = useNav();
  const { on } = useAudio();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ESC to close + body scroll-lock + focus shift
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (on) playSlateClap();
        closeNav();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // give focus to ✕ for keyboard users
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, on, closeNav]);

  const handleClose = () => {
    if (on) playSlateClap();
    closeNav();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navegação"
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] bg-canvas-black transition-opacity duration-f-12 ease-cinema ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Top bar inside the overlay — mirrors chrome but with ✕ */}
      <div className="absolute top-0 inset-x-0 h-[var(--chrome-h-mobile)] md:h-[var(--chrome-h)] flex items-center justify-between px-4 md:px-6 border-b border-chrome-line">
        <Link
          href="/"
          onClick={handleClose}
          className="font-mono text-[12px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-8"
        >
          25<span className="wordmark-colon mx-[0.18em] text-type-dim">:</span>HORAS
        </Link>
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Fechar navegação"
          className="font-mono text-[16px] text-canvas-white opacity-70 hover:opacity-100 transition-opacity duration-f-8"
        >
          ✕
        </button>
      </div>

      {/* Body — two-column index */}
      <div
        className="absolute inset-x-0 top-[var(--chrome-h-mobile)] bottom-[var(--chrome-h-mobile)] md:top-[var(--chrome-h)] md:bottom-[var(--chrome-h)] overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* PORTFOLIO */}
          <section aria-label="Portfolio">
            <Heading>PORTFOLIO</Heading>
            <ul className="space-y-2 md:space-y-3">
              {PORTFOLIO.map(([code, label, href]) => (
                <li key={code}>
                  <NavLink href={href} onClick={handleClose}>
                    <span className="text-type-dim mr-4 inline-block w-6 tabular-nums">
                      {code}
                    </span>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>

          {/* ATENDIMENTO */}
          <section aria-label="Atendimento">
            <Heading>ATENDIMENTO</Heading>
            <ul className="space-y-2 md:space-y-3">
              {ATENDIMENTO.map(([label, href]) => (
                <li key={href}>
                  <NavLink href={href} onClick={handleClose}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Bottom mirror */}
      <div className="absolute bottom-0 inset-x-0 h-[var(--chrome-h-mobile)] md:h-[var(--chrome-h)] flex items-center justify-center px-4 md:px-6 border-t border-chrome-line">
        <span className="font-mono text-[10px] tracking-mono-wider text-type-dim">
          25:HORAS · LISBOA
        </span>
      </div>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-5">
      {children}
      <span className="block mt-1 h-px w-10 bg-chrome-line" aria-hidden />
    </div>
  );
}

function NavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group inline-flex items-center font-serif font-light text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
    >
      {children}
      <span
        className="ml-3 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12 text-type-dim group-hover:text-accent-grade"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}
