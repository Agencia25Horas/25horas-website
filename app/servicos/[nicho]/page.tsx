import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import {
  BASE_TRANSVERSAL,
  NICHOS,
  findNicho,
  type NichoSlug,
} from "@/lib/servicos";

type Params = { nicho: string };

export function generateStaticParams() {
  return NICHOS.map((n) => ({ nicho: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) return { title: "Serviços — 25 Horas" };
  return {
    title: `${n.label.toLowerCase()} — 25 Horas`,
    description: n.tagline,
  };
}

export default async function NichoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { nicho } = await params;
  const n = findNicho(nicho as NichoSlug);
  if (!n) notFound();

  const idx = NICHOS.findIndex((x) => x.slug === n.slug);
  const prev = idx > 0 ? NICHOS[idx - 1] : NICHOS[NICHOS.length - 1];
  const next = idx < NICHOS.length - 1 ? NICHOS[idx + 1] : NICHOS[0];

  return (
    <main className="relative bg-canvas-black text-canvas-white min-h-screen">
      <ChromeTop />

      {/* ───── HERO ANAMÓRFICO ───── */}
      <section
        aria-label={`${n.label} — hero`}
        className="relative w-full aspect-scope min-h-[60svh] overflow-hidden"
      >
        <Image
          src={n.image}
          alt={n.label}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-canvas-black via-canvas-black/55 to-canvas-black/20"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] tracking-mono-wider text-canvas-white/65 mb-3">
              {n.code} / {String(NICHOS.length).padStart(2, "0")} · NICHO {n.emoji}
              <span
                className="block mt-1 h-px w-12 bg-canvas-white/30"
                aria-hidden
              />
            </div>
            <h1
              lang="pt"
              className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-canvas-white"
            >
              {n.label}
            </h1>
            <p
              lang="pt"
              className="mt-4 font-body text-[15px] md:text-[18px] leading-relaxed text-canvas-white/80 max-w-2xl"
            >
              {n.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ───── CORPO ───── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Base transversal */}
        <section
          aria-label="Base transversal"
          className="mb-20 md:mb-28 border border-chrome-line p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16">
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
                className="font-serif font-light text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-canvas-white"
              >
                {BASE_TRANSVERSAL.label}
              </h2>
              <p
                lang="pt"
                className="mt-3 font-body text-[14px] leading-relaxed text-type-neutral max-w-md"
              >
                Em todos os nichos, gerimos as redes do {n.label.toLowerCase()}:
                planeamento, copy, agendamento, IG, Facebook e TikTok.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-10 self-start">
              <div>
                <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-2">
                  PILARES
                </div>
                <ul className="space-y-1.5">
                  {BASE_TRANSVERSAL.pillars.map((p) => (
                    <li
                      key={p}
                      className="font-body text-[13px] text-canvas-white/85"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 font-mono text-[10px] tracking-mono-wider text-type-dim mb-2">
                  CANAIS
                </div>
                <div className="font-body text-[13px] text-canvas-white/85">
                  {BASE_TRANSVERSAL.channels.join(" · ")}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-2">
                  CADÊNCIA
                </div>
                <dl className="space-y-3">
                  {BASE_TRANSVERSAL.cadence.map((c) => (
                    <div key={c.label}>
                      <dt className="font-mono text-[10px] tracking-mono-wider text-type-dim">
                        {c.label}
                      </dt>
                      <dd className="font-serif font-light text-[clamp(1.25rem,2vw,1.75rem)] leading-none text-canvas-white">
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Especialização */}
        <section aria-label={`Especialização ${n.label}`}>
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-4">
            ESPECIALIZAÇÃO
            <span className="block mt-1 h-px w-12 bg-type-dim/60" aria-hidden />
          </div>
          <h2
            lang="pt"
            className="font-serif font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-canvas-white max-w-3xl"
          >
            Vídeo, fotografia e design feitos por dentro do {n.label.toLowerCase()}.
          </h2>

          <div
            className={`mt-12 md:mt-16 grid grid-cols-1 gap-10 md:gap-14 ${
              n.design ? "md:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            <DepartmentColumn title="VÍDEO" tag="🎥" items={n.video} />
            <DepartmentColumn
              title="FOTOGRAFIA"
              tag="📸"
              items={n.fotografia}
            />
            {n.design && (
              <DepartmentColumn title="DESIGN" tag="🎨" items={n.design} />
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label="Pedir orçamento"
          className="mt-24 md:mt-32 border-t border-chrome-line pt-16 md:pt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p
            lang="pt"
            className="font-serif font-light text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-canvas-white max-w-2xl"
          >
            Vamos alinhar o teu calendário e orçamento para {n.label.toLowerCase()}.
          </p>
          <div className="flex gap-4 shrink-0">
            <Link
              href={`/orcamento?nicho=${n.slug}`}
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

        {/* Navegação entre nichos */}
        <nav
          aria-label="Outros nichos"
          className="mt-24 md:mt-32 border-t border-chrome-line pt-10 grid grid-cols-2 gap-6"
        >
          <Link
            href={`/servicos/${prev.slug}`}
            className="group block"
          >
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-2">
              ← ANTERIOR
            </div>
            <div className="font-serif font-light text-[clamp(1.25rem,2.4vw,1.75rem)] text-canvas-white/80 group-hover:text-accent-grade transition-colors duration-f-12">
              {prev.label}
            </div>
          </Link>
          <Link
            href={`/servicos/${next.slug}`}
            className="group block text-right"
          >
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-2">
              SEGUINTE →
            </div>
            <div className="font-serif font-light text-[clamp(1.25rem,2.4vw,1.75rem)] text-canvas-white/80 group-hover:text-accent-grade transition-colors duration-f-12">
              {next.label}
            </div>
          </Link>
        </nav>

        {/* Voltar ao índice */}
        <div className="mt-10 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center font-mono text-[10px] tracking-mono-wider text-type-dim hover:text-canvas-white transition-colors duration-f-12"
          >
            ← TODOS OS NICHOS
          </Link>
        </div>
      </div>

      <ChromeBottom chapter={4} total={9} showCue={false} />
    </main>
  );
}

function DepartmentColumn({
  title,
  tag,
  items,
}: {
  title: string;
  tag: string;
  items: readonly string[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-4">
        {title} <span className="ml-1 opacity-80">{tag}</span>
        <span className="block mt-1 h-px w-8 bg-type-dim/40" aria-hidden />
      </div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li
            key={it}
            className="font-body text-[14px] leading-snug text-canvas-white/85"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
