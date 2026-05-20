type SlateRow = [label: string, value: string];

export function Slate({
  rows,
  variant = "hero",
  showRec = true,
}: {
  rows: SlateRow[];
  variant?: "hero" | "section" | "transition" | "case";
  showRec?: boolean;
}) {
  const dense = variant === "transition";

  return (
    <div
      className={`relative font-mono uppercase tracking-mono-wider text-canvas-white slate-frame ${
        dense ? "text-[10px]" : "text-[12px]"
      }`}
      role="presentation"
    >
      <span className="corner-tr" aria-hidden />
      <span className="corner-bl" aria-hidden />

      {/* Header row: production name + REC dot */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-chrome-line">
        <span className="text-[10px] tracking-mono-wider text-type-dim">
          PROD · 25 HORAS
        </span>
        {showRec && (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-accent-grade rec-dot"
              aria-hidden
            />
            <span className="text-[9px] tracking-mono-wider text-type-dim">
              REC
            </span>
          </span>
        )}
      </div>

      {/* Body rows */}
      <div className="slate-grid">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <span className="text-type-dim">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      {/* Footer: SMPTE color reference, restrained */}
      <div className="mt-4 pt-3 border-t border-chrome-line">
        <div className="flex h-2 gap-px" aria-hidden>
          {SMPTE.map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c, opacity: 0.6 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SMPTE = [
  "#B7B0A4",
  "#C4B53C",
  "#3CA1B5",
  "#3C7F3C",
  "#9C3C9C",
  "#B53C3C",
  "#3C3CB5",
  "#1F1D1A",
];
