import Image from "next/image";

/**
 * Intro slate — 25 Horas Agency wordmark sitting centred on the page split.
 *
 * Single PNG with both halves already authored using the page's exact
 * colours (canvas-black left + canvas-white/cream right, seam at 50%).
 * Wrapper aspect matches the PNG. No mix-blend-mode, no clip-path, no
 * transforms — the PNG matches the page bg perfectly.
 */
export function AgencyIntro() {
  return (
    <section
      aria-label="25 Horas Agency"
      className="relative z-10 w-full h-[80vh] flex items-center justify-center"
    >
      <div
        className="relative w-[clamp(500px,65vw,1100px)] aspect-[1835/1024]"
        style={{ transform: "translateX(-2px)" }}
      >
        <Image
          src="/media/logos/agency-bw.png"
          alt="25 Horas Agency"
          fill
          sizes="(min-width: 768px) 65vw, 90vw"
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
}
