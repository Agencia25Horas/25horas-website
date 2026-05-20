// A minimal black panel hinting at the next reel. Replaced by the real
// Manifesto reel in Phase 2.
export function NextReelTeaser() {
  return (
    <section
      className="relative h-[100svh] flex items-center justify-center bg-canvas-black"
      aria-label="Rolo 02 — Manifesto (em breve)"
    >
      <div className="text-center px-6">
        <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-4">
          ROLO 02 — MANIFESTO
        </div>
        <div className="font-serif font-light text-[48px] leading-none text-type-neutral">
          em breve
        </div>
        <div className="mt-6 font-mono text-[9px] tracking-mono-wider text-type-dim">
          ░░ A SEGUIR ░░
        </div>
      </div>
    </section>
  );
}
