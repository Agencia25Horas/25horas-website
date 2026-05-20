import type { Metadata } from "next";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";

export const metadata: Metadata = {
  title: "Marcar Reunião — 25 Horas",
  description: "Reunião de 30 minutos, online. Sem compromisso.",
};

// Until 25Horas wires their Cal.com / Calendly account we ship a themed
// placeholder. The real embed swaps in at <CalEmbed /> later.
export default function MarcarPage() {
  return (
    <main className="relative bg-canvas-black min-h-[100svh]">
      <ChromeTop />
      <section
        data-reel="8"
        className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-12"
        aria-label="Marcar reunião"
      >
        <div className="w-full max-w-2xl py-[calc(var(--chrome-h-mobile)+3rem)] md:py-[calc(var(--chrome-h)+4rem)]">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-8">
            MARCAR REUNIÃO
            <span className="block mt-1 h-px w-10 bg-type-dim/60" aria-hidden />
          </div>

          <h1
            lang="pt"
            className="font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-canvas-white"
          >
            30 minutos.
            <br />
            Online. Sem compromisso.
          </h1>

          <p
            lang="pt"
            className="mt-6 font-serif font-light text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-type-neutral/85 max-w-md"
          >
            Falamos do projecto, do tom, do prazo, do orçamento — e dizemos
            logo se faz sentido trabalharmos juntos.
          </p>

          {/* Placeholder slate for the Cal.com embed. The real widget
              drops in here once the agency wires their calendar account. */}
          <div className="mt-12 slate-frame font-mono text-[10px] tracking-mono-wider text-type-dim">
            <span className="corner-tr" aria-hidden />
            <span className="corner-bl" aria-hidden />
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-chrome-line">
              <span>CAL.COM · 30 MIN · ONLINE</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full border border-type-dim"
                  aria-hidden
                />
                <span>EM BREVE</span>
              </span>
            </div>
            <p className="text-type-neutral normal-case tracking-normal leading-relaxed">
              A reserva directa entra em cena assim que a 25 Horas activar o
              calendário. Até lá, escrevam: respondemos no mesmo dia.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="mailto:atendimento@25horasagency.com?subject=Marcar%20reuni%C3%A3o"
              className="group inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
            >
              ATENDIMENTO@25HORASAGENCY.COM
              <span
                className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
                aria-hidden
              >
                →
              </span>
            </a>
          </div>

          <div className="mt-3 font-mono text-[10px] tracking-mono-wider text-type-dim">
            +351 963 869 519
          </div>
        </div>
      </section>
      <ChromeBottom chapter={8} total={9} showCue={false} />
    </main>
  );
}
