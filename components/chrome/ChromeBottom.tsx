import { Timecode } from "./Timecode";
import { ChapterTag } from "./ChapterTag";
import { ScrollCue } from "./ScrollCue";

export function ChromeBottom({
  chapter = 1,
  total = 9,
  showCue = true,
}: {
  chapter?: number;
  total?: number;
  showCue?: boolean;
}) {
  return (
    <footer
      className="fixed bottom-0 inset-x-0 z-50 h-[var(--chrome-h-mobile)] md:h-[var(--chrome-h)] bg-canvas-black border-t border-chrome-line flex items-center justify-between px-4 md:px-6"
      role="contentinfo"
    >
      <Timecode />
      <div className="absolute inset-x-0 flex justify-center pointer-events-none">
        {showCue && <ScrollCue />}
      </div>
      <ChapterTag current={chapter} total={total} />
    </footer>
  );
}
