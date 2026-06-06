"use client";

import Image from "next/image";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import type { Nicho } from "@/lib/servicos";
import type { NichePack, PackIcon } from "@/lib/packs";
import { whatsappLink } from "@/lib/whatsapp";

/* ─── ÍCONES SVG INLINE ────────────────────────────────────────────────── */

const I: Record<PackIcon | "trend" | "target" | "pin" | "phone" | "mail" | "ig" | "fb" | "tk" | "wa", React.ReactElement> = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8h3l2-3h6l2 3h3v12H4z" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M16 4l4 4-12 12H4v-4z" />
      <path d="M14 6l4 4" />
    </svg>
  ),
  studio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="6" width="14" height="12" rx="1" />
      <circle cx="10" cy="12" r="3" />
      <path d="M19 10l3-2v8l-3-2z" />
    </svg>
  ),
  block: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M5 5l14 14" />
    </svg>
  ),
  reel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 17l6-6 4 4 7-8" />
      <path d="M14 7h6v6" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  ),
  ig: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 00-2.13 1.39A5.9 5.9 0 00.62 4.15C.32 4.9.12 5.78.06 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.9.31.8.73 1.48 1.39 2.14a5.9 5.9 0 002.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.9-.56.8-.31 1.48-.73 2.14-1.39a5.9 5.9 0 001.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.9a5.9 5.9 0 00-1.39-2.14A5.9 5.9 0 0019.85.62c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
  ),
  fb: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.14 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.9h-2.33v7c4.78-.76 8.44-4.9 8.44-9.9z" />
    </svg>
  ),
  tk: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 6.5a5.4 5.4 0 01-3.4-1.3 5.4 5.4 0 01-1.6-3H11v13a2.5 2.5 0 11-2.5-2.5c.2 0 .4 0 .6.1V9.6a5.7 5.7 0 00-.6 0 5.6 5.6 0 105.6 5.6V9.6a8.6 8.6 0 005 1.6V8.2a5.3 5.3 0 01-1.5-1.7z" />
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  ),
};

/* ─── COMPONENTE ───────────────────────────────────────────────────────── */

export function NichePackView({
  nicho,
  pack,
}: {
  nicho: Nicho;
  pack: NichePack;
}) {
  const { lang, t, tNiche } = useLang();
  const accent = nicho.accentColor;
  const data = pack;

  // Bilingual string picker — keeps the JSX uncluttered.
  const s = (b: { pt: string; en: string }) => b[lang];

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative w-full overflow-hidden min-h-[80svh] flex items-center">
        <Image
          src={nicho.image}
          alt={`Produção audiovisual para ${nicho.label.toLowerCase()} — 25 Horas Agency`}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-canvas-black via-canvas-black/80 to-canvas-black/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle at 75% 60%, ${accent}44 0%, transparent 55%)`,
          }}
          aria-hidden
        />

        <div className="relative z-10 w-full px-6 md:px-12">
          <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-10">
            <div>
              <RevealOnScroll>
                <div className="relative w-[180px] md:w-[240px] aspect-[3/2] mb-8">
                  <Image
                    src={data.logoSrc}
                    alt={`25H ${nicho.label}`}
                    fill
                    sizes="240px"
                    className="object-contain object-left"
                  />
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={80}>
                <h1 className="font-display uppercase text-canvas-white text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
                  {s(data.hero.titleL1)}
                  <br />
                  {s(data.hero.titleL2)}
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={160}>
                <p
                  className="mt-4 font-display uppercase text-[clamp(1rem,1.6vw,1.5rem)] tracking-wide"
                  style={{ color: accent }}
                >
                  {s(data.hero.subtitle)}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={240}>
                <p className="mt-6 font-body text-[15px] md:text-[17px] leading-relaxed text-canvas-white/80 max-w-xl">
                  {s(data.hero.description)}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={320}>
                <div className="mt-6 flex items-center gap-6 text-canvas-white/85">
                  <a
                    href="https://instagram.com/25horas.agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] hover:opacity-70 transition-opacity"
                  >
                    <span className="w-4 h-4">{I.ig}</span>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/25horasaudiovisuais/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] hover:opacity-70 transition-opacity"
                  >
                    <span className="w-4 h-4">{I.fb}</span>
                    Facebook
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={300}>
              <div
                className="hidden md:flex flex-col items-center justify-center rounded-full w-36 h-36 lg:w-44 lg:h-44 shrink-0"
                style={{ backgroundColor: accent }}
              >
                <span className="w-7 h-7 text-canvas-white mb-2">
                  {I.calendar}
                </span>
                <span className="font-display uppercase text-canvas-white text-[18px] lg:text-[20px] leading-tight tracking-wide text-center">
                  {s(data.plano.l1)}
                  <br />
                  {s(data.plano.l2)}
                </span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════ PACKS ═══════════ */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {data.packs.map((pack, i) => (
              <RevealOnScroll key={pack.name} delay={i * 80}>
                <PackCard pack={pack} accent={accent} s={s} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MÍNIMOS MENSAIS ═══════════ */}
      <section className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-[1320px] mx-auto">
          <div
            className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
            style={{
              backgroundColor: `${accent}1a`,
              borderLeft: `4px solid ${accent}`,
            }}
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-lg shrink-0"
              style={{ backgroundColor: accent }}
            >
              <span className="w-8 h-8 text-canvas-white">{I.trend}</span>
            </div>
            <div className="flex-1">
              <p
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-3"
                style={{ color: accent }}
              >
                {s(data.minimums.eyebrow)}
              </p>
              <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
                {data.minimums.items.map((m) => (
                  <li key={m.value + s(m.label)} className="flex items-center gap-3">
                    <span className="w-5 h-5 text-canvas-white/70">
                      {I[m.icon]}
                    </span>
                    <span className="font-display text-canvas-white text-[clamp(1.5rem,2.5vw,2rem)] leading-none">
                      {m.value}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/75">
                      {s(m.label)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ OBJECTIVO + TAGLINE ═══════════ */}
      <section className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-[1320px] mx-auto">
          <div
            className="rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            style={{ border: `1px solid ${accent}55` }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                <span className="w-6 h-6">{I.target}</span>
              </div>
              <div>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2"
                  style={{ color: accent }}
                >
                  {s(data.objective.eyebrow)}
                </p>
                <p className="font-display uppercase text-canvas-white text-[clamp(1rem,1.6vw,1.4rem)] leading-snug">
                  {s(data.objective.text)}
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="font-display text-canvas-white text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight italic">
                {s(data.tagline.l1)}
                <br />
                <span style={{ color: accent }}>{s(data.tagline.l2)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section
        className="px-6 md:px-12 py-14 md:py-16 border-t-[3px]"
        style={{ borderColor: accent }}
      >
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {t("common.proximoPasso")}
            </p>
            <h2 className="mt-3 font-display uppercase text-canvas-white text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05]">
              {s(data.ctaTitle)}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 self-start">
            <a
              href={whatsappLink(s(data.whatsappText))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-canvas-black font-mono text-[14px] uppercase tracking-[0.15em] hover:opacity-85 transition-opacity"
              style={{ backgroundColor: accent }}
            >
              <span className="w-4 h-4">{I.wa}</span>
              WhatsApp
            </a>
            <Link
              href={`/orcamento?nicho=${nicho.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-mono text-[14px] uppercase tracking-[0.15em] text-canvas-white border hover:bg-canvas-white/5 transition-colors"
              style={{ borderColor: `${accent}88` }}
            >
              {t("common.pedirOrcamento")}
            </Link>
          </div>
        </div>
      </section>

      {/* Link discreto p/ a página de portfolio dedicada do nicho (#18 — re-link) */}
      <div className="px-6 md:px-12 mt-2 mb-4 flex justify-center">
        <Link
          href={`/servicos/${nicho.slug}/portfolio`}
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/60 hover:text-canvas-white transition-colors"
        >
          {t("common.verPortfolioCompleto")}{" "}
          {tNiche(nicho.slug).label.toLowerCase()}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
            style={{ color: accent }}
          >
            →
          </span>
        </Link>
      </div>

      {/* ═══════════ CONTACTOS ═══════════ */}
      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-10 font-body text-[14px] text-canvas-white/75">
          <div className="relative w-[110px] h-10 shrink-0">
            <Image
              src={data.logoSrc}
              alt={`25H ${nicho.label}`}
              fill
              sizes="110px"
              className="object-contain object-left"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 flex-wrap">
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 text-canvas-white/55">{I.pin}</span>
              Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires
            </span>
            <a
              href="tel:+351912707015"
              className="inline-flex items-center gap-2 hover:text-canvas-white transition-colors"
            >
              <span className="w-4 h-4 text-canvas-white/55">{I.phone}</span>
              +351 912 707 015
            </a>
            <a
              href="mailto:agencia25horas@gmail.com"
              className="inline-flex items-center gap-2 hover:text-canvas-white transition-colors"
            >
              <span className="w-4 h-4 text-canvas-white/55">{I.mail}</span>
              agencia25horas@gmail.com
            </a>
          </div>
        </div>
      </section>

      <div className="text-center pb-12">
        <Link
          href="/servicos"
          className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 hover:text-canvas-white transition-colors"
        >
          {t("common.todosNichos")}
        </Link>
      </div>

      <SiteFooter />
    </main>
  );
}

/* ─── PACK CARD ─────────────────────────────────────────────────────────── */

function PackCard({
  pack,
  accent,
  s,
}: {
  pack: import("@/lib/packs").Pack;
  accent: string;
  s: (b: { pt: string; en: string }) => string;
}) {
  const border = pack.highlighted ? accent : "rgba(255,255,255,0.12)";
  return (
    <div
      className="relative h-full rounded-xl p-6 md:p-7 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1.5px solid ${border}`,
      }}
    >
      <div className="flex justify-center mb-5">
        <span
          className="px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            color: pack.highlighted ? accent : "rgba(255,255,255,0.85)",
            border: `1px solid ${pack.highlighted ? accent : "rgba(255,255,255,0.15)"}`,
          }}
        >
          {pack.name}
        </span>
      </div>

      <p className="text-center font-display uppercase whitespace-pre-line text-canvas-white text-[clamp(1.25rem,1.8vw,1.5rem)] leading-tight mb-6">
        {s(pack.subtitle)}
      </p>

      <ul className="space-y-4 flex-1">
        {pack.features.map((f, i) => (
          <li
            key={i}
            className="flex items-start gap-3"
            style={
              f.accent
                ? {
                    backgroundColor: `${accent}1a`,
                    border: `1px solid ${accent}55`,
                    borderRadius: 8,
                    padding: 12,
                    marginLeft: -12,
                    marginRight: -12,
                  }
                : undefined
            }
          >
            <span
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: f.accent ? accent : "rgba(255,255,255,0.55)" }}
            >
              {I[f.icon]}
            </span>
            <div className="flex-1">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.12em] mb-1"
                style={{ color: f.accent ? accent : "rgba(255,255,255,0.92)" }}
              >
                {s(f.title)}
              </p>
              {s(f.desc) && (
                <p className="font-body text-[12.5px] leading-snug text-canvas-white/70">
                  {s(f.desc)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
