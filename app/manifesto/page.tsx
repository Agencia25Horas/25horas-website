import type { Metadata } from "next";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { ManifestoReel } from "@/components/reels/ManifestoReel";

export const metadata: Metadata = {
  title: "Manifesto — 25 Horas",
  description:
    "Não fazemos vídeos. Fazemos filmes para marcas. 25 frames por segundo, 25 horas por dia.",
};

export default function ManifestoPage() {
  return (
    <main className="relative bg-canvas-black">
      <ChromeTop />
      <ManifestoReel />
      <ChromeBottom chapter={2} total={9} showCue={false} />
    </main>
  );
}
