import { ChromeTop } from "@/components/chrome/ChromeTop";
import { AgencyIntro } from "@/components/intro/AgencyIntro";
import { SplitScrollReel } from "@/components/reels/SplitScrollReel";
import { GaleriaReel } from "@/components/reels/GaleriaReel";

export default function HeroPage() {
  return (
    <main className="relative split-bg split-divider">
      <ChromeTop />
      <AgencyIntro />
      {/* Showcase dos 6 nichos. Cada slide leva a /servicos/[nicho]. */}
      <SplitScrollReel />
      <GaleriaReel />
    </main>
  );
}
