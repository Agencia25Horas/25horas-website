import type { Metadata } from "next";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { BudgetForm } from "@/components/forms/BudgetForm";

export const metadata: Metadata = {
  title: "Pedir Orçamento — 25 Horas",
  description: "Quatro perguntas. Resposta em 24h, em PT ou EN.",
};

export default function OrcamentoPage() {
  return (
    <main className="relative bg-canvas-black min-h-[100svh]">
      <ChromeTop />
      <section
        data-reel="7"
        className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-12"
        aria-label="Pedir orçamento"
      >
        <div className="w-full max-w-2xl py-[calc(var(--chrome-h-mobile)+3rem)] md:py-[calc(var(--chrome-h)+4rem)]">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-8">
            PEDIR ORÇAMENTO
            <span className="block mt-1 h-px w-10 bg-type-dim/60" aria-hidden />
          </div>
          <BudgetForm />
        </div>
      </section>
      <ChromeBottom chapter={7} total={9} showCue={false} />
    </main>
  );
}
