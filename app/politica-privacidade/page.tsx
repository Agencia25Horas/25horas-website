import type { Metadata } from "next";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a 25 Horas Agency trata os teus dados pessoais — RGPD, em português simples.",
  alternates: { canonical: "/politica-privacidade" },
};

// Data efetiva da política. Atualizar só quando a política muda (não a cada build).
const ULTIMA_ATUALIZACAO = "7 de junho de 2026";
const EMAIL = "agencia25horas@gmail.com";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display uppercase text-[clamp(1.1rem,2vw,1.5rem)] leading-tight text-canvas-white mb-3">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-2 hover:text-canvas-white"
  >
    {children}
  </a>
);

export default function PoliticaPrivacidadePage() {
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
            Política de Privacidade
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-2xl">
            Em português claro: quem somos, que dados tratamos, com que base,
            por quanto tempo, com quem partilhamos, e quais os teus direitos.
          </p>

          <div className="mt-12 space-y-10 font-body text-[15px] leading-relaxed text-canvas-white/80">
            <Section title="1. Responsável pelo tratamento">
              <p>
                <strong className="text-canvas-white">25 Horas Agency</strong>,
                NIF 517 769 034, com morada na Avenida da Siderurgia Nacional
                Nº1, Sala 105, 2840-075 Aldeia de Paio Pires, Portugal.
              </p>
              <p>
                Contacto para qualquer assunto de privacidade:{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  {EMAIL}
                </a>
                . Não estamos obrigados a ter um Encarregado de Proteção de Dados
                (DPO); para qualquer questão, fala connosco por este email.
              </p>
            </Section>

            <Section title="2. Que dados recolhemos">
              <p>
                <strong className="text-canvas-white">
                  Dados que nos dás
                </strong>{" "}
                no formulário de{" "}
                <Link
                  href="/orcamento"
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  pedido de orçamento
                </Link>
                : nome, email, telefone, mensagem/detalhes do pedido, e o nicho
                e pack que escolheste.
              </p>
              <p>
                <strong className="text-canvas-white">
                  Dados de utilização (anónimos)
                </strong>
                : só com o teu consentimento, estatísticas agregadas de visitas
                (ver{" "}
                <Link
                  href="/cookies"
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  Cookies
                </Link>
                ). São anónimas e não te identificam.
              </p>
            </Section>

            <Section title="3. Para que usamos e com que base legal">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-canvas-white">
                    Responder ao teu pedido de orçamento
                  </strong>{" "}
                  e dar seguimento ao contacto — base:{" "}
                  <em>diligências pré-contratuais a teu pedido</em> e o nosso{" "}
                  <em>interesse legítimo</em> em responder a quem nos contacta
                  (art. 6.º, n.º 1, alíneas b) e f) do RGPD).
                </li>
                <li>
                  <strong className="text-canvas-white">
                    Estatísticas anónimas
                  </strong>{" "}
                  — base: o teu <em>consentimento</em> (art. 6.º, n.º 1, alínea
                  a)).
                </li>
              </ul>
              <p>
                Não vendemos os teus dados nem os usamos para marketing sem
                autorização.
              </p>
            </Section>

            <Section title="4. Com quem partilhamos (subcontratantes)">
              <p>
                Para o site funcionar, usamos serviços de confiança que tratam
                dados em nosso nome:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-canvas-white">Resend</strong> — envio
                  do email do formulário
                </li>
                <li>
                  <strong className="text-canvas-white">Vercel</strong> —
                  alojamento do site
                </li>
                <li>
                  <strong className="text-canvas-white">Sanity</strong> — gestão
                  do conteúdo
                </li>
                <li>
                  <strong className="text-canvas-white">Plausible</strong> —
                  estatísticas anónimas (servidores na UE, sem cookies)
                </li>
                <li>
                  <strong className="text-canvas-white">Google</strong> —
                  Analytics e Tag Manager (medição de audiência; só com o teu
                  consentimento; pode tratar dados nos EUA)
                </li>
              </ul>
              <p>Não partilhamos os teus dados com mais ninguém.</p>
            </Section>

            <Section title="5. Transferências para fora da UE">
              <p>
                Alguns destes serviços (ex.: Resend, Vercel, Sanity, Google)
                podem tratar dados{" "}
                <strong className="text-canvas-white">
                  fora do Espaço Económico Europeu
                </strong>{" "}
                (nomeadamente nos EUA). Nesses casos,
                a transferência está protegida por{" "}
                <strong className="text-canvas-white">
                  Cláusulas Contratuais-Tipo
                </strong>{" "}
                aprovadas pela Comissão Europeia e/ou pelo{" "}
                <em>EU-US Data Privacy Framework</em>. O Plausible mantém os dados
                na UE.
              </p>
            </Section>

            <Section title="6. Durante quanto tempo guardamos">
              <p>
                Guardamos os dados do teu pedido até{" "}
                <strong className="text-canvas-white">24 meses</strong>, ou até
                nos pedires para apagar — o que vier primeiro.
              </p>
            </Section>

            <Section title="7. Segurança">
              <p>
                Tomamos medidas técnicas e organizativas razoáveis para proteger
                os teus dados contra perda, acesso indevido ou divulgação. Nenhum
                sistema é 100% infalível, mas levamos isto a sério.
              </p>
            </Section>

            <Section title="8. Os teus direitos">
              <p>Em qualquer momento, tens direito a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-canvas-white">Aceder</strong> aos teus
                  dados e saber o que temos
                </li>
                <li>
                  <strong className="text-canvas-white">Retificar</strong>{" "}
                  (corrigir) dados errados
                </li>
                <li>
                  <strong className="text-canvas-white">Apagar</strong> os teus
                  dados (“direito a ser esquecido”)
                </li>
                <li>
                  <strong className="text-canvas-white">Limitar</strong> o
                  tratamento
                </li>
                <li>
                  <strong className="text-canvas-white">Portabilidade</strong> —
                  receber os teus dados num formato comum
                </li>
                <li>
                  <strong className="text-canvas-white">Opor-te</strong> ao
                  tratamento
                </li>
                <li>
                  <strong className="text-canvas-white">
                    Retirar o consentimento
                  </strong>{" "}
                  a qualquer momento (sem afetar o que já foi tratado antes)
                </li>
              </ul>
              <p>
                Para exercer qualquer um, envia um email para{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  {EMAIL}
                </a>
                . Respondemos no prazo máximo de 1 mês.
              </p>
            </Section>

            <Section title="9. Reclamações">
              <p>
                Se achares que não tratámos os teus dados como devíamos, podes
                reclamar à autoridade de controlo portuguesa — a{" "}
                <strong className="text-canvas-white">
                  CNPD (Comissão Nacional de Proteção de Dados)
                </strong>
                : <A href="https://www.cnpd.pt">www.cnpd.pt</A>.
              </p>
            </Section>

            <Section title="10. Decisões automatizadas e menores">
              <p>
                Não tomamos decisões automatizadas nem fazemos “profiling” com os
                teus dados. O nosso serviço não se destina a menores de 16 anos e
                não recolhemos dados de menores conscientemente.
              </p>
            </Section>

            <Section title="11. Alterações a esta política">
              <p>
                Podemos atualizar esta política de tempos a tempos. A data em
                baixo indica a versão em vigor.
              </p>
            </Section>
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
