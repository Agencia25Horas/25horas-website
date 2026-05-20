import Link from "next/link";
import type { Programme } from "@/lib/programa";

export function ProgrammeBlock({
  programme,
  index,
}: {
  programme: Programme;
  index: number;
}) {
  return (
    <section
      data-reel="3"
      className="relative h-[100svh] snap-start overflow-hidden"
      aria-label={`Programa ${programme.code} — ${programme.label}`}
    >
      {/* Full-bleed mood background */}
      <div
        className="absolute inset-0"
        style={{ background: programme.gradient }}
        aria-hidden
      />
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />

      {/* Text block — bottom-left, in the safe zone above the chrome */}
      <div className="absolute left-0 right-0 bottom-0 px-6 md:px-12 pb-[calc(var(--chrome-h-mobile)+2rem)] md:pb-[calc(var(--chrome-h)+3rem)]">
        <div className="max-w-3xl">
          <div className="font-mono text-[10px] tracking-mono-wider text-type-dim mb-3">
            PROGRAMA {programme.code}
            <span className="block mt-1 h-px w-10 bg-type-dim/40" aria-hidden />
          </div>

          <h2 className="font-serif font-light text-[clamp(3rem,8vw,6rem)] leading-[0.95] text-canvas-white">
            {programme.label}
          </h2>

          <p className="mt-4 font-mono text-[11px] tracking-mono-wider text-type-neutral">
            {programme.count} FILMES · {programme.yearFrom}–{programme.yearTo}
          </p>

          <p
            lang="pt"
            className="mt-4 font-serif font-light text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-type-neutral/85 max-w-md"
          >
            {programme.tagline}
          </p>

          <Link
            href={`/programa/${programme.slug}`}
            className="group inline-flex items-center mt-8 font-mono text-[11px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
          >
            VER PROGRAMA
            <span
              className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Top-right index marker — small, persistent */}
      <div className="absolute top-[calc(var(--chrome-h-mobile)+1rem)] md:top-[calc(var(--chrome-h)+1rem)] right-6 md:right-12 font-mono text-[10px] tracking-mono-wider text-type-dim">
        {String(index + 1).padStart(2, "0")} / 06
      </div>
    </section>
  );
}
