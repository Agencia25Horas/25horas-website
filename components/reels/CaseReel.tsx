"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GradedVideo } from "@/components/effects/GradedVideo";
import { Slate } from "@/components/primitives/Slate";
import type { Case } from "@/lib/cases";
import { findCase } from "@/lib/cases";

// The five-section scroll story for a case study. Natural scroll, no
// snap — the user controls pacing like a reader, not a slideshow viewer.
export function CaseReel({ caseEntry }: { caseEntry: Case }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const next = caseEntry.nextSlug ? findCase(caseEntry.nextSlug) : undefined;

  return (
    <>
      {/* CENA 01 — Slate */}
      <section
        data-reel="5"
        className="relative h-[100svh] flex items-center justify-center bg-canvas-black px-6"
        aria-label={`${caseEntry.title} — slate`}
      >
        <div className="max-w-md w-full">
          <Slate
            variant="case"
            rows={[
              ["CLIENTE", caseEntry.client],
              ["ANO", String(caseEntry.year)],
              ["ROLO", `03 · HOSPITALIDADE`],
              ["CENA", caseEntry.scene],
              ["DIR.", caseEntry.director],
              ["DOP", caseEntry.dop],
              ["DURAÇÃO", caseEntry.durationFrames],
            ]}
          />
        </div>

        {/* persistent caption above bottom chrome */}
        <div className="absolute inset-x-0 bottom-[calc(var(--chrome-h-mobile)+1.5rem)] md:bottom-[calc(var(--chrome-h)+1.5rem)] flex justify-center pointer-events-none">
          <span className="font-mono text-[10px] tracking-mono-wider text-type-dim">
            ↓ ROLAR PARA O FILME
          </span>
        </div>
      </section>

      {/* CENA 02 — Hero film */}
      <section
        data-reel="5"
        className="relative h-[100svh] overflow-hidden bg-canvas-black"
        aria-label={`${caseEntry.title} — filme`}
      >
        <GradedVideo
          src={caseEntry.videoSrc}
          videoRef={videoRef}
        />
        {/* Title overlay during the case film — subtle, mono, top-left of stage */}
        <div className="absolute top-[calc(var(--chrome-h-mobile)+1.5rem)] md:top-[calc(var(--chrome-h)+1.5rem)] left-6 md:left-12 max-w-md">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim">
            EM EXIBIÇÃO
            <span className="block mt-1 h-px w-10 bg-type-dim/60" aria-hidden />
          </div>
          <h1 className="mt-2 font-serif font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] text-canvas-white">
            {caseEntry.title}
          </h1>
        </div>
      </section>

      {/* CENA 03 — Credits */}
      <section
        data-reel="5"
        className="relative min-h-[100svh] flex items-center bg-canvas-black px-6 md:px-12"
        aria-label={`${caseEntry.title} — créditos`}
      >
        <div className="max-w-2xl mx-auto py-[calc(var(--chrome-h-mobile)+3rem)] md:py-[calc(var(--chrome-h)+4rem)] w-full">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-8">
            CRÉDITOS
            <span className="block mt-1 h-px w-10 bg-type-dim/60" aria-hidden />
          </div>

          <dl className="font-mono uppercase text-[12px] tracking-mono-wider text-type-neutral space-y-3">
            <CreditRow label="REALIZAÇÃO" value={caseEntry.director} />
            <CreditRow label="DIRECÇÃO DE FOTOGRAFIA" value={caseEntry.dop} />
            <CreditRow label="PRODUÇÃO" value={caseEntry.producer} />
            <CreditRow label="MONTAGEM" value={caseEntry.editor} />
            <CreditRow label="COR" value={caseEntry.colorist} />
            <CreditRow label="MÚSICA" value={caseEntry.composer} />
            <CreditRow label="CLIENTE" value={caseEntry.client} />
            <CreditRow label="LOCAL" value={`${caseEntry.location} · ${caseEntry.date}`} />
          </dl>

          <div className="mt-10 font-mono text-[10px] tracking-mono-wider text-type-dim">
            <span className="block h-px w-16 bg-type-dim/60 mb-3" aria-hidden />
            UMA PRODUÇÃO 25 HORAS
          </div>
        </div>
      </section>

      {/* CENA 04 — Bastidores */}
      <section
        data-reel="5"
        className="relative min-h-[100svh] bg-canvas-black px-6 md:px-12 flex items-center"
        aria-label={`${caseEntry.title} — bastidores`}
      >
        <div className="max-w-6xl mx-auto py-[calc(var(--chrome-h-mobile)+3rem)] md:py-[calc(var(--chrome-h)+4rem)] w-full">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-8">
            BASTIDORES
            <span className="block mt-1 h-px w-10 bg-type-dim/60" aria-hidden />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {caseEntry.bts.map((still) => (
              <figure key={still.src} className="space-y-2">
                <div className="relative aspect-scope overflow-hidden bg-chrome-line">
                  <Image
                    src={still.src}
                    alt={still.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="font-mono text-[10px] tracking-mono-wider text-type-dim">
                  {still.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CENA 05 — A seguir */}
      <section
        data-reel="5"
        className="relative h-[100svh] overflow-hidden bg-canvas-black flex items-end"
        aria-label="A seguir"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #2c2418 0%, #16110a 55%, #0a0a0a 100%)",
          }}
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

        <div className="relative px-6 md:px-12 pb-[calc(var(--chrome-h-mobile)+3rem)] md:pb-[calc(var(--chrome-h)+3rem)] max-w-3xl">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
            A SEGUIR
            <span className="block mt-1 h-px w-10 bg-type-dim/60" aria-hidden />
          </div>

          <h2 className="font-serif font-light text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] text-canvas-white">
            {next ? next.title : "PROGRAMA HOSPITALIDADE"}
          </h2>

          <p
            lang="pt"
            className="mt-4 font-serif font-light text-[clamp(1.125rem,1.8vw,1.5rem)] text-type-neutral/85 max-w-md"
          >
            {next?.tagline ??
              "Todos os filmes deste programa, num só sítio."}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href={next ? `/caso/${next.slug}` : `/programa/${caseEntry.programmeSlug}`}
              className="group inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
            >
              {next ? "VER CASO" : "VER PROGRAMA"}
              <span
                className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
                aria-hidden
              >
                →
              </span>
            </Link>
            <Link
              href="/programa"
              className="font-mono text-[11px] tracking-mono-wider text-type-dim hover:text-canvas-white transition-colors duration-f-12"
            >
              ← TODOS OS PROGRAMAS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CreditRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[12rem_1fr] md:grid-cols-[16rem_1fr] gap-4 items-baseline">
      <dt className="text-type-dim">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
