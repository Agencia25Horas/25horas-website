"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { ParallaxImage } from "@/components/effects/ParallaxImage";
import { useLang } from "@/lib/language-context";
import type { SanitySiteContent } from "@/lib/sanity/types";

const FALLBACK = {
  // POR ENQUANTO: gmail do cliente (domínio 25horasagency.com ainda não live).
  email: "agencia25horas@gmail.com",
  phone: "+351 912 707 015",
  address: "Lisboa, Portugal",
};

function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function ContactosView({
  siteContent,
}: {
  siteContent: SanitySiteContent | null;
}) {
  const { t } = useLang();
  const email = siteContent?.contact_email || FALLBACK.email;
  const phone = siteContent?.contact_phone || FALLBACK.phone;

  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="relative w-full overflow-hidden min-h-[60svh] md:min-h-[72svh] flex items-center border-b border-canvas-white/10">
        {/* Foto de fundo com DEPTH (parallax + zoom no scroll) — mesmo efeito
            dos nichos da home. Scrim + fade em baixo para o texto ser legível. */}
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <ParallaxImage
            src="/media/nichos/vamosfalar.png"
            alt=""
            sizes="100vw"
            strength={0.22}
            zoom={1.16}
            overscan={16}
            imgClassName="object-cover object-[center_calc(50%_-_18px)]"
          />
          <div className="absolute inset-0 bg-canvas-black/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.55) 80%, var(--canvas-black) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/60">
                {t("contactos.eyebrow")}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <h1 className="mt-4 font-display uppercase whitespace-pre-line text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
                {t("contactos.title")}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-canvas-white/85 max-w-2xl">
                {t("contactos.subtitle")}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <RevealOnScroll>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
                {t("contactos.emailLabel")}
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-3 block font-display uppercase text-[clamp(1.25rem,2.2vw,1.875rem)] leading-tight text-canvas-white hover:opacity-60 transition-opacity break-words"
              >
                {email}
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
                {t("contactos.telefoneLabel")}
              </p>
              <a
                href={telHref(phone)}
                className="mt-3 block font-display uppercase text-[clamp(1.25rem,2.2vw,1.875rem)] leading-tight text-canvas-white hover:opacity-60 transition-opacity"
              >
                {phone}
              </a>
              <p className="mt-2 font-body text-[13px] text-canvas-white/65">
                {t("contactos.telefoneNota")}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-12 py-12 md:py-16 border-t border-canvas-white/15">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
              {t("contactos.redesLabel")}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/25horas.agency/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-canvas-white/60 text-canvas-white hover:bg-canvas-white hover:text-canvas-black transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.15C.32 4.9.12 5.78.06 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.9.31.8.73 1.48 1.39 2.14a5.9 5.9 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.9-.56.8-.31 1.48-.73 2.14-1.39a5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.9a5.9 5.9 0 0 0-1.39-2.14A5.9 5.9 0 0 0 19.85.62c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/25horasaudiovisuais/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-canvas-white/60 text-canvas-white hover:bg-canvas-white hover:text-canvas-black transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.14 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.9h-2.33v7c4.78-.76 8.44-4.9 8.44-9.9z" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20 border-t border-canvas-white/15">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
              {t("contactos.projectoEmMente")}
            </p>
            <h2 className="mt-3 font-display uppercase text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] text-canvas-white">
              {t("contactos.faz")}
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-canvas-white/75">
              {t("contactos.quatroPerguntas")}
            </p>
          </div>
          <Link
            href="/orcamento"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-canvas-white text-canvas-black font-mono text-[12px] uppercase tracking-[0.15em] hover:opacity-85 transition-opacity self-start"
          >
            {t("common.pedirOrcamento")}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
