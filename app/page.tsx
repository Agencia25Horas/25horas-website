import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { HeroSequence } from "@/components/reels/HeroSequence";
import { ManifestoReel } from "@/components/reels/ManifestoReel";

export default function HeroPage() {
  return (
    <main className="relative bg-canvas-black">
      <ChromeTop />
      <HeroSequence />
      <ManifestoReel />
      <ChromeBottom total={9} showCue={false} />
    </main>
  );
}
