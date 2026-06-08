"use client";

import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { BudgetForm } from "@/components/forms/BudgetForm";
import Image from "next/image";
import { useLang } from "@/lib/language-context";

export function OrcamentoView() {
  const { t } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />

      {/* Título com DEPTH (mesmo efeito dos nichos) — full-bleed: a foto vai
          por trás do header; pt-[104px] empurra só o conteúdo de texto. */}
      <section
        className="relative w-full overflow-hidden h-[54svh] md:h-[60svh] flex items-center border-b border-canvas-white/10 pt-[104px] md:pt-[112px]"
        aria-label={t("orcamento.eyebrow")}
      >
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/media/nichos/budget.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-canvas-black/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.55) 80%, var(--canvas-black) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 py-14 md:py-18">
          <div className="max-w-[1100px] mx-auto">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/60">
              {t("orcamento.eyebrow")}
            </p>
            <h1 className="mt-4 font-display uppercase whitespace-pre-line text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white max-w-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
              {t("orcamento.title")}
            </h1>
            <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/85 max-w-xl">
              {t("orcamento.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="px-6 md:px-12 pt-10 md:pt-14 pb-8 md:pb-10">
        <div className="max-w-[1100px] mx-auto">
          <BudgetForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
