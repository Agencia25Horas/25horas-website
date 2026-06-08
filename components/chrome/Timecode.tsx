"use client";

import { useEffect, useState } from "react";

/**
 * Counter sempre fixo em "25:00:SS" — os segundos correm 00→59 e voltam a 00,
 * SEM parar nem reiniciar ao mudar de página: usa o relógio real, por isso é
 * contínuo entre navegações. Reflecte o conceito da marca: são sempre 25 horas.
 */
export function Timecode() {
  // Começa em 0 no SSR (sem mismatch de hidratação); o valor real entra no mount.
  const [s, setS] = useState(0);

  useEffect(() => {
    const tick = () => setS(new Date().getSeconds());
    tick();
    const id = window.setInterval(tick, 1000);
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
