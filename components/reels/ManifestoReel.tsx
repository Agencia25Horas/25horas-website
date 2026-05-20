// The Manifesto reel. The anti-WebGL counter-punch — static, plain text,
// generous margins. Cinema is also stillness. Spec in CONCEPT_A_VISUAL.md §7.2.

export function ManifestoReel() {
  return (
    <section
      data-reel="2"
      className="relative min-h-[100svh] bg-canvas-white text-canvas-black flex items-center justify-center px-6"
      aria-label="Rolo 02 — Manifesto"
    >
      <div className="max-w-[36rem] w-full pt-[calc(var(--chrome-h-mobile)+2rem)] pb-[calc(var(--chrome-h-mobile)+2rem)] md:pt-[calc(var(--chrome-h)+3rem)] md:pb-[calc(var(--chrome-h)+3rem)]">
        <div className="font-mono text-[10px] tracking-mono-wider text-chrome-line mb-8">
          ROLO 02 — MANIFESTO
          <span className="block mt-1 h-px w-12 bg-chrome-line" aria-hidden />
        </div>

        <p
          lang="pt"
          className="font-serif font-light text-[clamp(1.75rem,4.6vw,3rem)] leading-[1.22] text-canvas-black"
        >
          Não fazemos vídeos.
          <br />
          Fazemos filmes para marcas.
        </p>

        <p
          lang="pt"
          className="mt-7 font-serif font-light text-[clamp(1.5rem,3.6vw,2.25rem)] leading-[1.3] text-canvas-black/85"
        >
          Cada projeto começa no slate
          <br />
          e termina no genérico final.
        </p>

        <p
          lang="pt"
          className="mt-7 font-serif font-light text-[clamp(1.5rem,3.6vw,2.25rem)] leading-[1.3] text-canvas-black/85"
        >
          25 frames por segundo.
          <br />
          25 horas por dia.
        </p>

        <div className="mt-12">
          <span className="block h-px w-20 bg-chrome-line mb-3" aria-hidden />
          <span className="font-mono text-[10px] tracking-mono-wider text-chrome-line">
            25 HORAS · LISBOA
          </span>
        </div>
      </div>
    </section>
  );
}
