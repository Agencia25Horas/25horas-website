"use client";

import Link from "next/link";
import { ParallaxImage } from "@/components/effects/ParallaxImage";
import { useLang } from "@/lib/language-context";
import type { LogoEntry } from "@/lib/logos";
import type { Nicho } from "@/lib/servicos";

/** Menu compacto de categorias oferecidas neste nicho. */
function CategoryMenu({
  design,
  accent,
  t,
}: {
  design: boolean;
  accent: string;
  t: (k: string) => string;
}) {
  const categories = [
    t("cat.video"),
    t("cat.fotografia"),
    ...(design ? [t("cat.design")] : []),
    t("cat.gestao"),
  ];
  return (
    <ul
      className="mt-3 space-y-2 max-w-md mx-auto border-t pt-4"
      style={{ borderColor: `${accent}33` }}
    >
      {categories.map((c, i) => (
        <li key={c} className="flex items-baseline justify-center gap-4">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] w-6 shrink-0 text-right"
            style={{ color: accent }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display uppercase text-[clamp(1rem,1.4vw,1.25rem)] leading-tight text-canvas-white">
            {c}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function NichoBlock({
  nicho,
  logo,
  alignment,
  photoSrc,
  photoPosition,
  photoOverscan,
  photoZoom,
  photoFit,
}: {
  nicho: Nicho;
  logo?: LogoEntry;
  alignment: "text-left" | "text-right";
  /** Foto de fundo opcional (com depth/parallax) — usada só nalguns nichos. */
  photoSrc?: string;
  /** Classe object-position da foto (ex.: "object-top" p/ mostrar o topo). Default centro. */
  photoPosition?: string;
  /** Overscan da foto (% que a camada estica além do bloco). Menor = mostra mais do topo/fundo.
   *  Default 16. Útil baixar p/ fotos landscape onde o topo (ex.: cabeças) seria escondido. */
  photoOverscan?: number;
  /** Zoom-no-scroll da foto. Default 1.16. Pôr 1 desliga o zoom (a escala do parallax
   *  cresce a partir do centro e empurra o topo p/ fora — 1 mantém o topo no sítio). */
  photoZoom?: number;
  /** Ajuste da foto. Default "cover" (preenche, corta). "contain" mostra a foto
   *  inteira (zoom-out total) — útil p/ fotos portrait num bloco landscape. */
  photoFit?: "cover" | "contain";
}) {
  const textOnLeft = alignment === "text-left";
  const { t, tNiche } = useLang();
  const { label, tagline } = tNiche(nicho.slug);
  const accent = nicho.accentColor;

  return (
    <section
      id={`nicho-${nicho.slug}`}
      aria-label={label}
      className="relative w-full overflow-hidden bg-canvas-black min-h-[80svh] md:min-h-[90svh] border-b-[5px] border-canvas-white/10 last:border-b-0"
    >
      {/* Foto de fundo com DEPTH (parallax + zoom no scroll) — só quando passada.
          Scrim escuro para legibilidade + fade de opacidade em baixo. */}
      {photoSrc && (
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxImage
            src={photoSrc}
            alt=""
            sizes="100vw"
            strength={0.22}
            zoom={photoZoom ?? 1.16}
            overscan={photoOverscan ?? 16}
            imgClassName={`${photoFit === "contain" ? "object-contain" : "object-cover"} ${photoPosition ?? "object-[center_30%] md:object-center"}`}
          />
          {/* scrim para o texto/heading se manterem legíveis sobre a foto */}
          <div className="absolute inset-0 bg-canvas-black/55" />
          {/* "opacidade em baixo": a foto desvanece para preto no rodapé */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 32%, rgba(10,10,10,0.6) 76%, var(--canvas-black) 100%)",
            }}
          />
        </div>
      )}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[80svh] md:min-h-[90svh]">
        {/* TEXT half — centrado em ambos os lados (esq/dir) */}
        <div
          className={`flex flex-col items-center justify-center text-center gap-5 px-10 md:px-16 py-12 ${
            textOnLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          <h2
            className="font-display uppercase text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
            style={{ color: accent }}
          >
            {label}
          </h2>
          <p className="font-body text-[16px] md:text-[18px] leading-relaxed text-canvas-white/75 max-w-md">
            {tagline}
          </p>

          <CategoryMenu design={Boolean(nicho.design)} accent={accent} t={t} />

          <Link
            href={`/servicos/${nicho.slug}`}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full font-mono text-[14px] uppercase tracking-[0.15em] text-canvas-black hover:opacity-85 transition-opacity"
            style={{ backgroundColor: accent }}
          >
            {t("common.verMais")}
          </Link>
        </div>

        {/* LOGO half — sub-marca centrada com leve parallax depth */}
        <div
          className={`relative w-full h-[55svh] md:h-full overflow-hidden flex items-center justify-center ${
            photoSrc ? "" : "bg-canvas-black"
          } ${textOnLeft ? "md:order-2" : "md:order-1"}`}
        >
          {/* Glow accent radial (subtil) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background: `radial-gradient(circle at center, ${accent}55 0%, transparent 55%)`,
            }}
          />
          {logo && (
            <div className="relative w-[min(80%,600px)] aspect-square drop-shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
              <ParallaxImage
                src={logo.src}
                alt={`${label} — sub-marca 25 Horas`}
                sizes="(min-width: 768px) 45vw, 90vw"
                strength={0.5}
                zoom={1.12}
                imgClassName="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
