"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
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
  const address = siteContent?.contact_address || FALLBACK.address;

  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
              {t("contactos.eyebrow")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <h1 className="mt-4 font-display uppercase whitespace-pre-line text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white">
              {t("contactos.title")}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-canvas-white/80 max-w-2xl">
              {t("contactos.subtitle")}
            </p>
          </RevealOnScroll>
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
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <RevealOnScroll>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
                {t("contactos.localizacaoLabel")}
              </p>
              <p className="mt-3 font-display uppercase whitespace-pre-line text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-canvas-white">
                {address}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
                {t("contactos.redesLabel")}
              </p>
              <ul className="mt-3 space-y-2 font-body text-[16px]">
                <li>
                  <a
                    href="https://www.instagram.com/25horas.agency/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 text-canvas-white hover:opacity-60 transition-opacity"
                  >
                    @25horas.agency · Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/25horasaudiovisuais/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 text-canvas-white hover:opacity-60 transition-opacity"
                  >
                    25Horas Agency · Facebook
                  </a>
                </li>
              </ul>
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
