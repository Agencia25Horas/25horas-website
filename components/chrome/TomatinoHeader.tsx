"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CookieBanner } from "./CookieBanner";
import { Timecode } from "./Timecode";
import { AudioToggle } from "./AudioToggle";
import { LangToggle } from "./LangToggle";
import { useLang } from "@/lib/language-context";
import { StableLabel } from "./StableLabel";

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
  const [portfolioDropdown, setPortfolioDropdown] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, t } = useLang();

  const openDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setPortfolioDropdown(true);
  };
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setPortfolioDropdown(false), 120);
  };

  const NAV = [
    { key: "sobre",     pt: "Sobre",           en: "About",       es: "Nosotros",          href: "/sobre" },
    { key: "portfolio", pt: "Portefolio",       en: "Portfolio",   es: "Portafolio",        href: "/portfolio" },
    { key: "contactos", pt: "Contactos",        en: "Contact",     es: "Contacto",          href: "/contactos" },
    { key: "orcamento", pt: "Pedir orçamento",  en: "Get a quote", es: "Pedir presupuesto", href: "/orcamento" },
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
            aria-label={t("chrome.inicio")}
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
            {NAV.map((n) =>
              n.key === "portfolio" ? (
                <div
                  key={n.key}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={n.href}
                    className="text-canvas-white hover:text-accent-grade transition-colors"
                  >
                    <StableLabel pt={n.pt} en={n.en} es={n.es} lang={lang} />
                  </Link>

                  {portfolioDropdown && (
                    <div
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 min-w-[160px] rounded-lg border border-canvas-white/15 bg-black/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                      <Link
                        href="/portfolio/videos"
                        onClick={() => setPortfolioDropdown(false)}
                        className="flex items-center gap-2.5 px-5 py-3 text-canvas-white/80 hover:text-canvas-white hover:bg-canvas-white/[0.08] transition-colors"
                      >
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-current shrink-0" aria-hidden><polygon points="2,1 9,5 2,9"/></svg>
                        {t("nav.videos")}
                      </Link>
                      <div className="h-px bg-canvas-white/10 mx-3" />
                      <Link
                        href="/portfolio/fotografias"
                        onClick={() => setPortfolioDropdown(false)}
                        className="flex items-center gap-2.5 px-5 py-3 text-canvas-white/80 hover:text-canvas-white hover:bg-canvas-white/[0.08] transition-colors"
                      >
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-current shrink-0" aria-hidden><rect x="1" y="1" width="8" height="8" rx="1"/></svg>
                        {t("nav.fotografias")}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={n.key}
                  href={n.href}
                  className="text-canvas-white hover:text-accent-grade transition-colors"
                >
                  <StableLabel pt={n.pt} en={n.en} es={n.es} lang={lang} />
                </Link>
              )
            )}
          </nav>

          {/* SOM no extremo direito de tudo */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="w-px h-4 bg-canvas-white/20" aria-hidden />
            <AudioToggle />
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label={open ? t("chrome.fecharMenu") : t("chrome.abrirMenu")}
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
            {NAV.map((n) =>
              n.key === "portfolio" ? (
                <li key={n.key}>
                  <Link
                    href="/portfolio/videos"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-3 px-6 text-[14px] uppercase tracking-wider font-body font-semibold text-canvas-white hover:bg-canvas-white/10 hover:text-accent-grade transition-colors"
                  >
                    <span className="text-[10px] text-canvas-white/50">▶</span>
                    {t("nav.videos")}
                  </Link>
                  <Link
                    href="/portfolio/fotografias"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-3 px-6 text-[14px] uppercase tracking-wider font-body font-semibold text-canvas-white hover:bg-canvas-white/10 hover:text-accent-grade transition-colors"
                  >
                    <span className="text-[10px] text-canvas-white/50">◼</span>
                    {t("nav.fotografias")}
                  </Link>
                </li>
              ) : (
                <li key={n.key}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-6 text-[14px] uppercase tracking-wider font-body font-semibold text-canvas-white hover:bg-canvas-white/10 hover:text-accent-grade transition-colors"
                  >
                    <StableLabel pt={n.pt} en={n.en} es={n.es} lang={lang} />
                  </Link>
                </li>
              )
            )}
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
