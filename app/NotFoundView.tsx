"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { useLang } from "@/lib/language-context";

export function NotFoundView() {
  const { lang } = useLang();
  const en = lang === "en";
  const ctas = [
    { href: "/", label: en ? "Home" : "Início" },
    { href: "/servicos", label: en ? "Services" : "Serviços" },
    { href: "/orcamento", label: en ? "Get a quote" : "Pedir orçamento" },
  ];

  return (
    <main
      id="main"
      className="bg-canvas-black text-canvas-white min-h-[100svh] flex flex-col"
    >
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="flex-1 flex items-center px-6 md:px-12 py-20">
        <div className="max-w-[760px] mx-auto w-full text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-grade">
            {en ? "Error 404" : "Erro 404"}
          </p>
          <p
            className="mt-6 font-display uppercase leading-[0.8] text-accent-grade text-[clamp(5rem,22vw,15rem)] drop-shadow-[0_4px_24px_rgba(232,93,58,0.25)]"
            aria-hidden
          >
            404
          </p>
          <h1 className="mt-2 font-display uppercase text-[clamp(1.75rem,5vw,3.5rem)] leading-[0.95] text-canvas-white">
            {en ? "Page not found" : "Página não encontrada"}
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-canvas-white/70 max-w-md mx-auto">
            {en
              ? "The link you followed may be broken, or the page has moved. No stress — pick where to go next:"
              : "O link que seguiste pode estar partido ou a página foi movida. Sem stress — escolhe por onde seguir:"}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {ctas.map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={
                  i === 0
                    ? "inline-flex items-center px-7 py-3.5 rounded-full bg-accent-grade text-canvas-black font-mono text-[12px] uppercase tracking-[0.15em] hover:opacity-85 transition-opacity"
                    : "inline-flex items-center px-7 py-3.5 rounded-full border border-canvas-white/30 text-canvas-white font-mono text-[12px] uppercase tracking-[0.15em] hover:border-canvas-white transition-colors"
                }
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
