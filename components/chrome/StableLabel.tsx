"use client";

import type { Lang } from "@/lib/i18n";

type Props = { pt: string; en: string; es: string; lang: Lang };

/**
 * Renderiza `current` sobre um texto invisível de largura máxima.
 * Ambos partilham a mesma célula de grid → o wrapper ocupa sempre a
 * largura da variante mais longa, independentemente do idioma activo.
 */
export function StableLabel({ pt, en, es, lang }: Props) {
  const current = lang === "en" ? en : lang === "es" ? es : pt;
  const longest = [pt, en, es].reduce((a, b) => (b.length > a.length ? b : a));
  return (
    <span className="inline-grid">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-nowrap"
      >
        {longest}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap text-center">
        {current}
      </span>
    </span>
  );
}
