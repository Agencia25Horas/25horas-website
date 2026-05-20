import type { Metadata } from "next";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { ProgrammeBlock } from "@/components/reels/ProgrammeBlock";
import { PROGRAMMES } from "@/lib/programa";

export const metadata: Metadata = {
  title: "Programa — 25 Horas",
  description:
    "Seis programas. Hospitalidade, música, desporto, institucional, imobiliário, eventos.",
};

export default function ProgramaPage() {
  return (
    <main className="relative bg-canvas-black snap-y snap-mandatory h-[100svh] overflow-y-auto">
      <ChromeTop />
      {PROGRAMMES.map((p, i) => (
        <ProgrammeBlock key={p.slug} programme={p} index={i} />
      ))}
      <ChromeBottom chapter={3} total={9} showCue={false} />
    </main>
  );
}
