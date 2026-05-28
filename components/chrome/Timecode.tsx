"use client";

import { useEffect, useState } from "react";

/**
 * Counter sempre fixo em "25:00:SS" — segundos correm de 00→59 e voltam a 00.
 * Reflecte o conceito da marca: são sempre 25 horas.
 */
export function Timecode() {
  const [s, setS] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setS((prev) => (prev + 1) % 60);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className="font-mono text-[11px] tracking-[0.05em] text-canvas-white/70 tabular-nums"
      aria-label="Timecode 25 horas"
    >
      25:00:{String(s).padStart(2, "0")}
    </span>
  );
}
