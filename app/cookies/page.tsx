import type { Metadata } from "next";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { CookieResetButton } from "@/components/chrome/CookieResetButton";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Que cookies e armazenamento o site usa, e como gerir o teu consentimento.",
  alternates: { canonical: "/cookies" },
};

const ULTIMA_ATUALIZACAO = "7 de junho de 2026";

export default function CookiesPage() {
  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <article className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[760px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
            Legal · RGPD
          </p>
          <h1 className="mt-4 font-display uppercase text-[clamp(2rem,5vw,3.75rem)] leading-[0.95]">
            Política de Cookies
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-2xl">
            Usamos o mínimo possível. O essencial é{" "}
            <em>armazenamento local</em> (no teu navegador) e não te identifica.
            As estatísticas e o marketing só arrancam se autorizares — e, nesse
            caso, podem usar cookies. Aqui está tudo, ao detalhe.
          </p>

          <div className="mt-12 overflow-x-auto rounded-lg border border-canvas-white/15">
            <table className="w-full text-left font-body text-[14px] min-w-[560px]">
              <thead className="bg-canvas-white/5 font-mono text-[10px] uppercase tracking-[0.15em] text-canvas-white/60">
                <tr>
                  <th className="p-4 font-normal">Categoria</th>
                  <th className="p-4 font-normal">Estado</th>
                  <th className="p-4 font-normal">O que faz</th>
                  <th className="p-4 font-normal">Duração</th>
                </tr>
              </thead>
              <tbody className="text-canvas-white/80 align-top">
                <tr className="border-t border-canvas-white/10">
                  <td className="p-4 text-canvas-white whitespace-nowrap">
                    Essenciais
                  </td>
                  <td className="p-4 whitespace-nowrap">Sempre activos</td>
                  <td className="p-4 leading-relaxed">
                    Fazem o site funcionar: guardam a tua escolha de cookies, o
                    idioma (PT/EN) e o som ligado/desligado. É{" "}
                    <em>armazenamento local</em>, não te identifica e não precisa
                    de consentimento (é estritamente necessário).
                  </td>
                  <td className="p-4 whitespace-nowrap">Até limpares</td>
                </tr>
                <tr className="border-t border-canvas-white/10">
                  <td className="p-4 text-canvas-white whitespace-nowrap">
                    Analíticos
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    Só com consentimento
                  </td>
                  <td className="p-4 leading-relaxed">
                    <strong className="text-canvas-white">Plausible</strong> —
                    estatísticas anónimas,{" "}
                    <strong className="text-canvas-white">sem cookies</strong>,
                    servidores na UE.{" "}
                    <strong className="text-canvas-white">
                      Google Analytics / Tag Manager
                    </strong>{" "}
                    (quando ativo) — medição de audiência da Google; usa cookies
                    e pode transferir dados para os EUA. Tudo isto só carrega se
                    carregares em “Aceitar”.
                  </td>
                  <td className="p-4 whitespace-nowrap">Até 24 meses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 space-y-10 font-body text-[15px] leading-relaxed text-canvas-white/80">
            <section>
              <h2 className="font-display uppercase text-[clamp(1.1rem,2vw,1.5rem)] leading-tight text-canvas-white mb-3">
                Como gerir o teu consentimento
              </h2>
              <p>
                Quando entras pela primeira vez, mostramos um banner com duas
                opções: <strong className="text-canvas-white">Aceitar</strong> ou{" "}
                <strong className="text-canvas-white">
                  Rejeitar não-essenciais
                </strong>
                . Os analíticos só são ativados se aceitares — se rejeitares (ou
                não escolheres), nada de analítico é carregado.
              </p>
              <p>
                Podes mudar de ideias quando quiseres: carrega no botão abaixo
                para repor o banner e escolher de novo. Também podes limpar o
                armazenamento nas definições do teu navegador.
              </p>
              <CookieResetButton />
            </section>

            <section>
              <h2 className="font-display uppercase text-[clamp(1.1rem,2vw,1.5rem)] leading-tight text-canvas-white mb-3">
                Mais informação
              </h2>
              <p>
                Para saberes que dados pessoais tratamos e quais os teus direitos,
                vê a{" "}
                <Link
                  href="/politica-privacidade"
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/60">
            Última actualização: {ULTIMA_ATUALIZACAO}
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
