import { ChromeTop } from "@/components/chrome/ChromeTop";
import { HeroSequence } from "@/components/reels/HeroSequence";
import { SplitScrollReel } from "@/components/reels/SplitScrollReel";
import { GaleriaReel } from "@/components/reels/GaleriaReel";

export default function HeroPage() {
  return (
    <main className="relative bg-canvas-black">
      <ChromeTop />
      <HeroSequence />
      {/* SplitScrollReel passa a ser o showcase oficial dos 6 nichos +
          2 sub-marcas (AGENCY, PRODUÇÕES). Cada slide leva a /servicos/[nicho]. */}
      <SplitScrollReel />
      <GaleriaReel />
    </main>
  );
}
