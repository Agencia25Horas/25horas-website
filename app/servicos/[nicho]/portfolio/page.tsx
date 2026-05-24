import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { findNicho, NICHOS, type NichoSlug } from "@/lib/servicos";
import { PORTFOLIO } from "@/lib/portfolio";
import { PortfolioGrid } from "./PortfolioGrid";

type Params = { nicho: string };

export async function generateStaticParams() {
  return NICHOS.map((n) => ({ nicho: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) return { title: "Portfolio — 25 Horas" };
  return {
    title: `Portfolio · ${n.label} — 25 Horas`,
    description: `Portfolio de trabalhos no nicho ${n.label}.`,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) notFound();

  const items = PORTFOLIO[n.slug as NichoSlug] ?? [];

  return (
    <main className="relative bg-canvas-black text-canvas-white min-h-screen">
      <ChromeTop />

      <div className="pt-[calc(var(--chrome-h-mobile)+2rem)] md:pt-[calc(var(--chrome-h)+3rem)] pb-[calc(var(--chrome-h-mobile)+4rem)] md:pb-[calc(var(--chrome-h)+6rem)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <header className="mb-12 md:mb-16">
            <Link
              href={`/servicos/${n.slug}`}
              className="inline-flex items-center font-mono text-[10px] tracking-mono-wider text-type-dim hover:text-canvas-white transition-colors duration-f-12 mb-6"
            >
              ← {n.label}
            </Link>
            <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-4">
              PORTFOLIO · {n.code} / {String(NICHOS.length).padStart(2, "0")}
              <span
                className="block mt-1 h-px w-12 bg-type-dim/60"
                aria-hidden
              />
            </div>
            <h1
              lang="pt"
              className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-canvas-white"
            >
              {n.emoji} {n.label}
            </h1>
            <p
              lang="pt"
              className="mt-6 font-serif font-light text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-type-neutral/85 max-w-2xl"
            >
              {n.tagline}
            </p>
          </header>

          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <PortfolioGrid items={items} />
          )}
        </div>
      </div>

      <ChromeBottom chapter={4} total={9} showCue={false} />
    </main>
  );
}

function EmptyState() {
  return (
    <div className="border border-chrome-line p-8 md:p-12 max-w-2xl">
      <div className="font-mono text-[10px] tracking-mono-wider text-accent-grade mb-3">
        EM CONSTRUÇÃO
      </div>
      <p
        lang="pt"
        className="font-serif font-light text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-canvas-white/90"
      >
        Brevemente vais encontrar aqui os trabalhos deste nicho.
      </p>
      <p
        lang="pt"
        className="mt-4 font-body text-[14px] leading-relaxed text-type-neutral max-w-md"
      >
        Para adicionar posts, edita{" "}
        <code className="font-mono text-[12px] text-canvas-white/80">
          lib/portfolio.ts
        </code>{" "}
        com URLs de embed de Instagram, YouTube, TikTok ou Facebook.
      </p>
    </div>
  );
}
