"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CookieBanner } from "./CookieBanner";
import { Timecode } from "./Timecode";
import { AudioToggle } from "./AudioToggle";
import { LangToggle } from "./LangToggle";
import { useLang } from "@/lib/language-context";

/**
 * Header preto fixo:
 *   ESQUERDA:  logo 25Horas (alta resolução, sem scale CSS) + Timecode 25:00:XX
 *   CENTRO/DIR: LangToggle (PT·EN) · nav inline · AudioToggle (SOM)
 *   Cookie banner em cima (in-flow).
 *
 * Logo renderizado num inner-div maior que o container + overflow-hidden:
 * Next/Image pede a resolução adequada (sizes="800px", quality=95) — sem CSS scale.
 */
export function TomatinoHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  const NAV = [
    { key: "sobre", label: t("header.sobre"), href: "/sobre" },
    { key: "portfolio", label: t("header.portfolio"), href: "/portfolio" },
    { key: "contactos", label: t("header.contactos"), href: "/contactos" },
    { key: "orcamento", label: t("header.orcamento"), href: "/orcamento" },
  ];

  return (
    <header
      id="main-header"
      className="fixed top-0 inset-x-0 z-50 bg-black border-b border-canvas-white/10"
      role="banner"
    >
      <CookieBanner />
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
        {/* LEFT — logo + timecode */}
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <Link
            href="/"
            aria-label="25 Horas — Início"
            onClick={() => setOpen(false)}
            className="inline-flex items-center -ml-1 md:-ml-2 shrink-0"
          >
            <div className="relative h-20 md:h-24 w-[200px] md:w-[260px] flex items-center justify-start">
              <Image
                src="/media/logos/b25agency.png"
                alt="25 Horas Agency"
                fill
                priority
                sizes="260px"
                quality={95}
                className="object-contain object-left"
              />
            </div>
          </Link>
          <div className="hidden sm:block">
            <Timecode />
          </div>
        </div>

        {/* RIGHT — lang + nav + som + hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* LangToggle no extremo esquerdo do cluster direito (ao lado de "Sobre") */}
          <div className="hidden sm:block">
            <LangToggle />
          </div>

          <nav
            className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-wider font-body font-semibold"
            aria-label="Principal"
          >
            {NAV.map((n) => (
              <Link
                key={n.key}
                href={n.href}
                className="text-canvas-white hover:text-accent-grade transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* SOM no extremo direito de tudo */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="w-px h-4 bg-canvas-white/20" aria-hidden />
            <AudioToggle />
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[2px] w-6 bg-canvas-white transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-canvas-white transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-canvas-white transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="lg:hidden bg-black border-t border-canvas-white/10"
          aria-label="Principal — mobile"
        >
          <ul className="flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-6 text-[14px] uppercase tracking-wider font-body font-semibold text-canvas-white hover:bg-canvas-white/10 hover:text-accent-grade transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-6 py-4 border-t border-canvas-white/10">
            <LangToggle />
            <AudioToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
