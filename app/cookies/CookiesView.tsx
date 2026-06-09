"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { CookieResetButton } from "@/components/chrome/CookieResetButton";
import { useLang } from "@/lib/language-context";

const ULTIMA_ATUALIZACAO = "7 de junho de 2026";
const LAST_UPDATED = "7 June 2026";
const ULTIMA_ACTUALIZACION_ES = "7 de junio de 2026";

export function CookiesView() {
  const { lang } = useLang();
  const tr = (pt: ReactNode, en: ReactNode, es: ReactNode) =>
    lang === "es" ? es : lang === "en" ? en : pt;

  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <article className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[760px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
            {tr("Legal · RGPD", "Legal · GDPR", "Legal · RGPD")}
          </p>
          <h1 className="mt-4 font-display uppercase text-[clamp(2rem,5vw,3.75rem)] leading-[0.95]">
            {tr("Política de Cookies", "Cookie Policy", "Política de Cookies")}
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-2xl">
            {tr(
              <>
                Usamos o mínimo possível. O essencial é{" "}
                <em>armazenamento local</em> (no teu navegador) e não te
                identifica. As estatísticas e o marketing só arrancam se
                autorizares — e, nesse caso, podem usar cookies. Aqui está tudo,
                ao detalhe.
              </>,
              <>
                We use as little as possible. The essentials are{" "}
                <em>local storage</em> (in your browser) and don&apos;t identify
                you. Statistics and marketing only kick in if you allow them —
                and, in that case, they may use cookies. Here&apos;s everything,
                in detail.
              </>,
              <>
                Usamos el mínimo posible. Lo esencial es el{" "}
                <em>almacenamiento local</em> (en tu navegador) y no te
                identifica. Las estadísticas y el marketing solo se activan si
                das tu permiso — y, en ese caso, pueden usar cookies. Aquí está
                todo, en detalle.
              </>,
            )}
          </p>

          <div className="mt-12 overflow-x-auto rounded-lg border border-canvas-white/15">
            <table className="w-full text-left font-body text-[14px] min-w-[560px]">
              <thead className="bg-canvas-white/5 font-mono text-[10px] uppercase tracking-[0.15em] text-canvas-white/60">
                <tr>
                  <th className="p-4 font-normal">
                    {tr("Categoria", "Category", "Categoría")}
                  </th>
                  <th className="p-4 font-normal">
                    {tr("Estado", "Status", "Estado")}
                  </th>
                  <th className="p-4 font-normal">
                    {tr("O que faz", "What it does", "Qué hace")}
                  </th>
                  <th className="p-4 font-normal">
                    {tr("Duração", "Duration", "Duración")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-canvas-white/80 align-top">
                <tr className="border-t border-canvas-white/10">
                  <td className="p-4 text-canvas-white whitespace-nowrap">
                    {tr("Essenciais", "Essential", "Esenciales")}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {tr("Sempre activos", "Always on", "Siempre activas")}
                  </td>
                  <td className="p-4 leading-relaxed">
                    {tr(
                      <>
                        Fazem o site funcionar: guardam a tua escolha de cookies,
                        o idioma (PT/EN) e o som ligado/desligado. É{" "}
                        <em>armazenamento local</em>, não te identifica e não
                        precisa de consentimento (é estritamente necessário).
                      </>,
                      <>
                        They make the site work: they save your cookie choice,
                        the language (PT/EN) and the sound on/off. It&apos;s{" "}
                        <em>local storage</em>, doesn&apos;t identify you and
                        needs no consent (it&apos;s strictly necessary).
                      </>,
                      <>
                        Hacen que el sitio funcione: guardan tu elección de
                        cookies, el idioma (PT/EN) y el sonido activado/desactivado.
                        Es <em>almacenamiento local</em>, no te identifica y no
                        necesita consentimiento (es estrictamente necesario).
                      </>,
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {tr(
                      "Até limpares",
                      "Until you clear them",
                      "Hasta que las borres",
                    )}
                  </td>
                </tr>
                <tr className="border-t border-canvas-white/10">
                  <td className="p-4 text-canvas-white whitespace-nowrap">
                    {tr("Analíticos", "Analytics", "Analíticos")}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {tr(
                      "Só com consentimento",
                      "Consent required",
                      "Solo con consentimiento",
                    )}
                  </td>
                  <td className="p-4 leading-relaxed">
                    {tr(
                      <>
                        <strong className="text-canvas-white">Plausible</strong>{" "}
                        — estatísticas anónimas,{" "}
                        <strong className="text-canvas-white">sem cookies</strong>
                        , servidores na UE.{" "}
                        <strong className="text-canvas-white">
                          Google Analytics / Tag Manager
                        </strong>{" "}
                        (quando ativo) — medição de audiência da Google; usa
                        cookies e pode transferir dados para os EUA. Tudo isto só
                        carrega se carregares em “Aceitar”.
                      </>,
                      <>
                        <strong className="text-canvas-white">Plausible</strong>{" "}
                        — anonymous statistics,{" "}
                        <strong className="text-canvas-white">no cookies</strong>
                        , servers in the EU.{" "}
                        <strong className="text-canvas-white">
                          Google Analytics / Tag Manager
                        </strong>{" "}
                        (when active) — Google audience measurement; uses cookies
                        and may transfer data to the US. All of this only loads if
                        you click “Accept”.
                      </>,
                      <>
                        <strong className="text-canvas-white">Plausible</strong>{" "}
                        — estadísticas anónimas,{" "}
                        <strong className="text-canvas-white">sin cookies</strong>
                        , servidores en la UE.{" "}
                        <strong className="text-canvas-white">
                          Google Analytics / Tag Manager
                        </strong>{" "}
                        (cuando está activo) — medición de audiencia de Google;
                        usa cookies y puede transferir datos a EE. UU. Todo esto
                        solo se carga si pulsas “Aceptar”.
                      </>,
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {tr("Até 24 meses", "Up to 24 months", "Hasta 24 meses")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 space-y-10 font-body text-[15px] leading-relaxed text-canvas-white/80">
            <section>
              <h2 className="font-display uppercase text-[clamp(1.1rem,2vw,1.5rem)] leading-tight text-canvas-white mb-3">
                {tr(
                  "Como gerir o teu consentimento",
                  "How to manage your consent",
                  "Cómo gestionar tu consentimiento",
                )}
              </h2>
              <p>
                {tr(
                  <>
                    Quando entras pela primeira vez, mostramos um banner com duas
                    opções:{" "}
                    <strong className="text-canvas-white">Aceitar</strong> ou{" "}
                    <strong className="text-canvas-white">
                      Rejeitar não-essenciais
                    </strong>
                    . Os analíticos só são ativados se aceitares — se rejeitares
                    (ou não escolheres), nada de analítico é carregado.
                  </>,
                  <>
                    When you arrive for the first time, we show a banner with two
                    options:{" "}
                    <strong className="text-canvas-white">Accept</strong> or{" "}
                    <strong className="text-canvas-white">
                      Reject non-essential
                    </strong>
                    . Analytics are only enabled if you accept — if you reject (or
                    don&apos;t choose), nothing analytical is loaded.
                  </>,
                  <>
                    Cuando entras por primera vez, te mostramos un banner con dos
                    opciones:{" "}
                    <strong className="text-canvas-white">Aceptar</strong> o{" "}
                    <strong className="text-canvas-white">
                      Rechazar las no esenciales
                    </strong>
                    . Los analíticos solo se activan si aceptas — si rechazas (o no
                    eliges), no se carga nada analítico.
                  </>,
                )}
              </p>
              <p>
                {tr(
                  <>
                    Podes mudar de ideias quando quiseres: carrega no botão abaixo
                    para repor o banner e escolher de novo. Também podes limpar o
                    armazenamento nas definições do teu navegador.
                  </>,
                  <>
                    You can change your mind whenever you want: click the button
                    below to reset the banner and choose again. You can also clear
                    storage in your browser settings.
                  </>,
                  <>
                    Puedes cambiar de opinión cuando quieras: pulsa el botón de
                    abajo para volver a mostrar el banner y elegir de nuevo.
                    También puedes borrar el almacenamiento desde los ajustes de
                    tu navegador.
                  </>,
                )}
              </p>
              <CookieResetButton />
            </section>

            <section>
              <h2 className="font-display uppercase text-[clamp(1.1rem,2vw,1.5rem)] leading-tight text-canvas-white mb-3">
                {tr("Mais informação", "More information", "Más información")}
              </h2>
              <p>
                {tr(
                  <>
                    Para saberes que dados pessoais tratamos e quais os teus
                    direitos, vê a{" "}
                    <Link
                      href="/politica-privacidade"
                      className="underline underline-offset-2 hover:text-canvas-white"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </>,
                  <>
                    To find out what personal data we process and what your rights
                    are, see the{" "}
                    <Link
                      href="/politica-privacidade"
                      className="underline underline-offset-2 hover:text-canvas-white"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </>,
                  <>
                    Para saber qué datos personales tratamos y cuáles son tus
                    derechos, consulta la{" "}
                    <Link
                      href="/politica-privacidade"
                      className="underline underline-offset-2 hover:text-canvas-white"
                    >
                      Política de Privacidad
                    </Link>
                    .
                  </>,
                )}
              </p>
            </section>
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/60">
            {tr(
              `Última actualização: ${ULTIMA_ATUALIZACAO}`,
              `Last updated: ${LAST_UPDATED}`,
              `Última actualización: ${ULTIMA_ACTUALIZACION_ES}`,
            )}
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
