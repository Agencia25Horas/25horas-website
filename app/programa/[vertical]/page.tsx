import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { findProgramme, PROGRAMMES } from "@/lib/programa";

export function generateStaticParams() {
  return PROGRAMMES.map((p) => ({ vertical: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const p = findProgramme(vertical);
  if (!p) return { title: "Programa — 25 Horas" };
  return {
    title: `${capitalise(p.label)} — Programa — 25 Horas`,
    description: p.tagline,
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const programme = findProgramme(vertical);
  if (!programme) return notFound();

  return (
    <main className="relative bg-canvas-black min-h-[100svh]">
      <ChromeTop />

      <section
        data-reel="4"
        className="relative h-[100svh] overflow-hidden flex items-center"
        aria-label={`Programa ${programme.code} — ${programme.label}`}
      >
        <div
          className="absolute inset-0"
          style={{ background: programme.gradient }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
          }}
          aria-hidden
        />

        <div className="relative max-w-3xl px-6 md:px-12">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
            PROGRAMA {programme.code}
            <span className="block mt-1 h-px w-10 bg-type-dim/40" aria-hidden />
          </div>

          <h1 className="font-serif font-light text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] text-canvas-white">
            {programme.label}
          </h1>

          <p className="mt-6 font-mono text-[11px] tracking-mono-wider text-type-neutral">
            {programme.count} FILMES · {programme.yearFrom}–{programme.yearTo}
          </p>

          <p
            lang="pt"
            className="mt-6 font-serif font-light text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-type-neutral/85 max-w-md"
          >
            {programme.tagline}
          </p>

          <div className="mt-12 max-w-md">
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
              CARTAZ EM CONSTRUÇÃO
              <span className="block mt-1 h-px w-10 bg-type-dim/40" aria-hidden />
            </div>
            <p className="font-serif font-light text-[clamp(1rem,1.4vw,1.25rem)] text-type-neutral/70 leading-snug">
              O programa completo deste rolo entra em cena em breve.
              Entretanto, marque uma sessão directa.
            </p>

            <div className="mt-6 flex items-center gap-5">
              <Link
                href="/marcar"
                className="font-mono text-[11px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
              >
                MARCAR REUNIÃO &nbsp;→
              </Link>
              <Link
                href="/programa"
                className="font-mono text-[11px] tracking-mono-wider text-type-dim hover:text-canvas-white transition-colors duration-f-12"
              >
                ← VOLTAR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ChromeBottom chapter={4} total={9} showCue={false} />
    </main>
  );
}

function capitalise(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}
