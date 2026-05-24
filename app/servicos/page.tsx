import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import {
  BASE_TRANSVERSAL,
  DESIGN_TRANSVERSAL,
  NICHOS,
} from "@/lib/servicos";
import { LOGOS } from "@/lib/logos";

export const metadata: Metadata = {
  title: "Serviços — 25 Horas",
  description:
    "Uma base transversal de gestão de redes e seis nichos especializados em vídeo, fotografia e design.",
};

export default function ServicosIndex() {
  return (
    <main className="relative bg-canvas-black text-canvas-white min-h-screen">
      <ChromeTop />

      <div className="pt-[calc(var(--chrome-h-mobile)+2rem)] md:pt-[calc(var(--chrome-h)+3rem)] pb-[calc(var(--chrome-h-mobile)+4rem)] md:pb-[calc(var(--chrome-h)+6rem)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Hero */}
          <header className="mb-20 md:mb-28">
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-5">
              ROLO 04 — SERVIÇOS
              <span
                className="block mt-1 h-px w-12 bg-type-dim/60"
                aria-hidden
              />
            </div>
            <h1
              lang="pt"
              className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-canvas-white max-w-4xl"
            >
              Uma base transversal.
              <br />
              <span className="text-type-dim">Seis nichos.</span> Cada um com a
              sua especialização.
            </h1>
            <p
              lang="pt"
              className="mt-8 font-body text-[15px] md:text-[17px] leading-relaxed text-type-neutral max-w-2xl"
            >
              Em todos os projectos gerimos as redes sociais. Depois, cada nicho
              ganha o seu vocabulário próprio em vídeo, fotografia e design.
            </p>
          </header>

          {/* Base transversal — banda compacta */}
          <section
            aria-label="Base transversal"
            className="mb-24 md:mb-32 border border-chrome-line p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16">
              <div>
                <div className="font-mono text-[10px] tracking-mono-wider text-accent-grade mb-4">
                  {BASE_TRANSVERSAL.code} · BASE TRANSVERSAL
                  <span
                    className="block mt-1 h-px w-10 bg-accent-grade/40"
                    aria-hidden
                  />
                </div>
                <h2
                  lang="pt"
                  className="font-serif font-light text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-canvas-white"
                >
                  {BASE_TRANSVERSAL.label}
                </h2>
                <p
                  lang="pt"
                  className="mt-4 font-body text-[14px] md:text-[15px] leading-relaxed text-type-neutral max-w-md"
                >
                  {BASE_TRANSVERSAL.tagline} Os números abaixo são o standard
                  mensal — escalável conforme o projecto.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 md:gap-12 self-start">
                <div>
                  <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
                    PILARES
                  </div>
                  <ul className="space-y-2">
                    {BASE_TRANSVERSAL.pillars.map((p) => (
                      <li
                        key={p}
                        className="font-body text-[14px] leading-snug text-canvas-white/90"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 font-mono text-[10px] tracking-mono-wider text-type-dim mb-2">
                    CANAIS
                  </div>
                  <div className="font-body text-[14px] text-canvas-white/90">
                    {BASE_TRANSVERSAL.channels.join(" · ")}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
                    CADÊNCIA
                  </div>
                  <dl className="space-y-4">
                    {BASE_TRANSVERSAL.cadence.map((c) => (
                      <div key={c.label}>
                        <dt className="font-mono text-[10px] tracking-mono-wider text-type-dim">
                          {c.label}
                        </dt>
                        <dd className="font-serif font-light text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none text-canvas-white">
                          {c.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>

          {/* Niche grid — cada card leva à página dedicada */}
          <section aria-label="Nichos">
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
              ESPECIALIZAÇÃO POR NICHO
              <span
                className="block mt-1 h-px w-12 bg-type-dim/60"
                aria-hidden
              />
            </div>
            <p
              lang="pt"
              className="font-serif font-light text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-canvas-white/90 max-w-2xl mb-12 md:mb-16"
            >
              A mesma exigência. Vocabulários diferentes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {NICHOS.map((n) => {
                // Match by label so we keep using the LOGOS array as the
                // single source of truth for logo files.
                const logo = LOGOS.find((l) => l.label === n.label);
                const logoSrc = logo?.src ?? n.image;
                return (
                  <Link
                    key={n.slug}
                    href={`/servicos/${n.slug}`}
                    className="group block focus:outline-none focus:ring-1 focus:ring-accent-grade"
                    aria-label={n.label}
                  >
                    <div className="relative aspect-scope overflow-hidden bg-canvas-white">
                      <Image
                        src={logoSrc}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 48vw, 92vw"
                        className="object-contain p-8 md:p-12 scale-[1.0] group-hover:scale-[1.03] transition-transform duration-f-25 ease-cinema"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                        <div className="font-mono text-[10px] tracking-mono-wider text-canvas-black/55">
                          {n.code} / {String(NICHOS.length).padStart(2, "0")} ·{" "}
                          {n.emoji}
                        </div>
                        <h3
                          lang="pt"
                          className="mt-1 font-serif font-light text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.02] text-canvas-black group-hover:text-accent-grade transition-colors duration-f-12"
                        >
                          {n.label}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <p
                        lang="pt"
                        className="font-body text-[14px] leading-snug text-type-neutral/90 max-w-md"
                      >
                        {n.tagline}
                      </p>
                      <span className="shrink-0 inline-flex items-center font-mono text-[10px] tracking-mono-wider text-canvas-white/65 group-hover:text-accent-grade transition-colors duration-f-12">
                        ABRIR
                        <span
                          className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
                          aria-hidden
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Design transversal */}
          <section
            aria-label="Design transversal"
            className="mt-28 md:mt-36 border-t border-chrome-line pt-16 md:pt-20"
          >
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-5">
              TRANSVERSAL · {DESIGN_TRANSVERSAL.label}
              <span
                className="block mt-1 h-px w-12 bg-type-dim/60"
                aria-hidden
              />
            </div>
            <h2
              lang="pt"
              className="font-serif font-light text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-canvas-white max-w-2xl"
            >
              {DESIGN_TRANSVERSAL.tagline}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {DESIGN_TRANSVERSAL.items.map((it) => (
                <li
                  key={it}
                  className="font-mono text-[11px] tracking-mono-wider text-canvas-white/80 border border-chrome-line px-3 py-2"
                >
                  {it}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section
            aria-label="Pedir orçamento"
            className="mt-24 md:mt-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p
              lang="pt"
              className="font-serif font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-canvas-white max-w-2xl"
            >
              Vamos alinhar o teu nicho, o teu calendário e o teu orçamento.
            </p>
            <div className="flex gap-4 shrink-0">
              <Link
                href="/orcamento"
                className="inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-black bg-canvas-white hover:bg-accent-grade hover:text-canvas-white transition-colors duration-f-12 px-5 py-3"
              >
                PEDIR ORÇAMENTO →
              </Link>
              <Link
                href="/marcar"
                className="inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white/80 hover:text-accent-grade border-b border-canvas-white/30 hover:border-accent-grade pb-2 transition-colors duration-f-12"
              >
                MARCAR CHAMADA →
              </Link>
            </div>
          </section>
        </div>
      </div>

      <ChromeBottom chapter={4} total={9} showCue={false} />
    </main>
  );
}
