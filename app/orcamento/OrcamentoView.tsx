"use client";

import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { BudgetForm } from "@/components/forms/BudgetForm";
import { useLang } from "@/lib/language-context";

export function OrcamentoView() {
  const { t } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-12 pt-12 md:pt-16 pb-8 md:pb-10" aria-label={t("orcamento.eyebrow")}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
            {t("orcamento.eyebrow")}
          </p>
          <h1 className="mt-4 font-display uppercase whitespace-pre-line text-[clamp(2rem,5vw,3.75rem)] leading-[0.95] text-canvas-white max-w-3xl">
            {t("orcamento.title")}
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-xl">
            {t("orcamento.subtitle")}
          </p>

          <div className="mt-10 md:mt-14">
            <BudgetForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
