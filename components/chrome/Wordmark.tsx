import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="font-mono text-[12px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-8"
      aria-label="25 Horas — home"
    >
      <span>25</span>
      <span className="wordmark-colon mx-[0.18em] text-type-dim">:</span>
      <span>HORAS</span>
    </Link>
  );
}
