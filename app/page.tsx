import Image from "next/image";
import { ChromeTop } from "@/components/chrome/ChromeTop";

/**
 * Tomatino-pivot draft — Hero + Sobre only.
 *
 * Patterns lifted from tomatino.pt:
 *  • Full-bleed background image with dark mask overlay (their "promo
 *    jarallax mask-dark-X" pattern).
 *  • Solid colour "pantone" block for narrative sections.
 *  • Centered serif headline + tighter sub-copy, lots of breathing room.
 *  • Vertical scroll, no sticky / counter-scroll mechanics.
 *
 * Only Hero + Sobre are wired here so the client can react to the visual
 * direction before the remaining 4 sections (Serviços / Portfolio / Processo
 * / Contactos) get built in the same language.
 */
export default function HomePage() {
  return (
    <main id="main" className="relative bg-canvas-black">
      <ChromeTop />

      {/* ────────────── 01 — Hero (full-bleed image + dark mask) ────────────── */}
      <section
        id="hero"
        data-reel="1"
        className="relative h-[100svh] w-full overflow-hidden"
        aria-label="25 Horas Agency"
      >
        {/* Background image — fills the section, dark mask layered on top. */}
        <Image
          src="/media/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Mask-dark-40 equivalent + bottom-heavy gradient for legibility. */}
        <div
          className="absolute inset-0 bg-canvas-black/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-canvas-black via-canvas-black/30 to-transparent"
          aria-hidden
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
          <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-white/65 mb-6">
            25 HORAS AGENCY · LISBOA
            <span
              className="block mx-auto mt-2 h-px w-12 bg-canvas-white/45"
              aria-hidden
            />
          </div>
          <h1
            lang="pt"
            className="font-serif font-light text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] text-canvas-white max-w-5xl"
          >
            Cinema
            <span className="text-accent-grade"> para marcas.</span>
          </h1>
          <p
            lang="pt"
            className="mt-8 font-body text-[15px] md:text-[19px] leading-relaxed text-canvas-white/85 max-w-xl"
          >
            25 frames por segundo. 25 horas por dia.
            <br />
            Uma produtora audiovisual com base em Lisboa.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
          <span className="font-mono text-[10px] tracking-mono-wider text-canvas-white/55 animate-pulse">
            ↓ SCROLL
          </span>
        </div>
      </section>

      {/* ────────────── 02 — Sobre (pantone block, solid bg) ────────────── */}
      <section
        id="sobre"
        data-reel="2"
        className="relative bg-canvas-white py-32 md:py-48 px-6 md:px-12"
        aria-label="Sobre"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
          {/* Texto */}
          <div>
            <div className="font-mono text-[10px] tracking-mono-wider text-canvas-black/55 mb-6">
              01 / 06 · SOBRE
              <span
                className="block mt-2 h-px w-12 bg-canvas-black/30"
                aria-hidden
              />
            </div>
            <h2
              lang="pt"
              className="font-serif font-light text-[clamp(2rem,5vw,4rem)] leading-[1.02] text-canvas-black"
            >
              Não fazemos vídeos.
              <br />
              <span className="text-accent-grade">Fazemos filmes</span> para
              marcas.
            </h2>
            <p
              lang="pt"
              className="mt-8 font-body text-[15px] md:text-[18px] leading-relaxed text-canvas-black/75 max-w-md"
            >
              Trabalhamos do briefing ao corte final. Vídeo, fotografia,
              design e gestão de redes — em registo cinematográfico, com
              equipa pequena e autoria clara.
            </p>
            <p
              lang="pt"
              className="mt-4 font-body text-[15px] md:text-[18px] leading-relaxed text-canvas-black/75 max-w-md"
            >
              Lisboa. Para marcas portuguesas que precisam de ser vistas em
              qualquer canal, em qualquer escala.
            </p>
          </div>

          {/* Imagem lateral */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
            <Image
              src="/media/bts-2.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-cover grayscale"
            />
            <div
              className="absolute inset-0 bg-gradient-to-tr from-canvas-black/10 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Restantes 4 secções (Serviços / Portfolio / Processo / Contactos)
          ficam por construir até cliente aprovar este registo visual. */}
    </main>
  );
}
