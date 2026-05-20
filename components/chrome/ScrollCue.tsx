export function ScrollCue({ label = "ROLAR" }: { label?: string }) {
  return (
    <span className="font-mono text-[11px] tracking-mono-wider text-type-neutral">
      ↓&nbsp;<span className="underline underline-offset-4 decoration-type-dim">{label}</span>
    </span>
  );
}
