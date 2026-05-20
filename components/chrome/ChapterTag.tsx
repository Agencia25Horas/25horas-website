export function ChapterTag({ current, total }: { current: number; total: number }) {
  const c = current.toString().padStart(2, "0");
  const t = total.toString().padStart(2, "0");
  return (
    <span className="font-mono text-[11px] tracking-mono-wide text-type-dim">
      {c} / {t}
    </span>
  );
}
