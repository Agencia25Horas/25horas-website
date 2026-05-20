import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { HeroSequence } from "@/components/reels/HeroSequence";
import { NextReelTeaser } from "@/components/reels/NextReelTeaser";

export default function HeroPage() {
  return (
    <main className="relative bg-canvas-black">
      <ChromeTop />
      <HeroSequence />
      <NextReelTeaser />
      <ChromeBottom chapter={1} total={9} showCue={false} />
    </main>
  );
}
