"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { useLang } from "@/lib/language-context";

// Data efetiva da política. Atualizar só quando a política muda (não a cada build).
const ULTIMA_ATUALIZACAO = "7 de junho de 2026";
const ULTIMA_ATUALIZACAO_EN = "7 June 2026";
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

export function PoliticaPrivacidadeView() {
  const { lang } = useLang();
  const tr = (pt: string, en: string) => (lang === "en" ? en : pt);

  return (
    <main id="main" className="bg-canvas-black text-canvas-white min-h-[100svh]">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <article className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[760px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
            {tr("Legal · RGPD", "Legal · GDPR")}
          </p>
          <h1 className="mt-4 font-display uppercase text-[clamp(2rem,5vw,3.75rem)] leading-[0.95]">
            {tr("Política de Privacidade", "Privacy Policy")}
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-2xl">
            {tr(
              "Em português claro: quem somos, que dados tratamos, com que base, por quanto tempo, com quem partilhamos, e quais os teus direitos.",
              "In plain English: who we are, what data we process, on what legal basis, for how long, with whom we share it, and what your rights are.",
            )}
          </p>

          <div className="mt-12 space-y-10 font-body text-[15px] leading-relaxed text-canvas-white/80">
            <Section
              title={tr(
                "1. Responsável pelo tratamento",
                "1. Data controller",
              )}
            >
              <p>
                <strong className="text-canvas-white">25 Horas Agency</strong>,
                {tr(
                  " NIF 517 769 034, com morada na Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires, Portugal.",
                  " tax ID (NIF) 517 769 034, with its registered address at Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires, Portugal.",
                )}
              </p>
              <p>
                {tr(
                  "Contacto para qualquer assunto de privacidade: ",
                  "Contact for any privacy matter: ",
                )}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  {EMAIL}
                </a>
                {tr(
                  ". Não estamos obrigados a ter um Encarregado de Proteção de Dados (DPO); para qualquer questão, fala connosco por este email.",
                  ". We are not required to appoint a Data Protection Officer (DPO); for any question, please reach out to us at this email.",
                )}
              </p>
            </Section>

            <Section
              title={tr("2. Que dados recolhemos", "2. What data we collect")}
            >
              <p>
                <strong className="text-canvas-white">
                  {tr("Dados que nos dás", "Data you provide")}
                </strong>{" "}
                {tr("no formulário de", "in the")}{" "}
                <Link
                  href="/orcamento"
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  {tr("pedido de orçamento", "quote request form")}
                </Link>
                {tr(
                  ": nome, email, telefone, mensagem/detalhes do pedido, e o nicho e pack que escolheste.",
                  ": name, email, phone number, message/details of your request, and the niche and package you selected.",
                )}
              </p>
              <p>
                <strong className="text-canvas-white">
                  {tr(
                    "Dados de utilização (anónimos)",
                    "Usage data (anonymous)",
                  )}
                </strong>
                {tr(
                  ": só com o teu consentimento, estatísticas agregadas de visitas (ver ",
                  ": only with your consent, aggregated visit statistics (see ",
                )}
                <Link
                  href="/cookies"
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  Cookies
                </Link>
                {tr(
                  "). São anónimas e não te identificam.",
                  "). They are anonymous and do not identify you.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "3. Para que usamos e com que base legal",
                "3. Purposes and legal basis",
              )}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-canvas-white">
                    {tr(
                      "Responder ao teu pedido de orçamento",
                      "Responding to your quote request",
                    )}
                  </strong>{" "}
                  {tr(
                    "e dar seguimento ao contacto — base: ",
                    "and following up on your enquiry — legal basis: ",
                  )}
                  <em>
                    {tr(
                      "diligências pré-contratuais a teu pedido",
                      "pre-contractual steps taken at your request",
                    )}
                  </em>{" "}
                  {tr("e o nosso", "and our")}{" "}
                  <em>{tr("interesse legítimo", "legitimate interest")}</em>{" "}
                  {tr(
                    "em responder a quem nos contacta (art. 6.º, n.º 1, alíneas b) e f) do RGPD).",
                    "in responding to those who contact us (Article 6(1)(b) and (f) GDPR).",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Estatísticas anónimas", "Anonymous statistics")}
                  </strong>{" "}
                  {tr("— base: o teu ", "— legal basis: your ")}
                  <em>{tr("consentimento", "consent")}</em>{" "}
                  {tr(
                    "(art. 6.º, n.º 1, alínea a)).",
                    "(Article 6(1)(a) GDPR).",
                  )}
                </li>
              </ul>
              <p>
                {tr(
                  "Não vendemos os teus dados nem os usamos para marketing sem autorização.",
                  "We do not sell your data, nor do we use it for marketing without your authorisation.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "4. Com quem partilhamos (subcontratantes)",
                "4. Who we share with (processors)",
              )}
            >
              <p>
                {tr(
                  "Para o site funcionar, usamos serviços de confiança que tratam dados em nosso nome:",
                  "To run the website, we use trusted services that process data on our behalf:",
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-canvas-white">Resend</strong>{" "}
                  {tr("— envio do email do formulário", "— sending the form email")}
                </li>
                <li>
                  <strong className="text-canvas-white">Vercel</strong>{" "}
                  {tr("— alojamento do site", "— website hosting")}
                </li>
                <li>
                  <strong className="text-canvas-white">Sanity</strong>{" "}
                  {tr("— gestão do conteúdo", "— content management")}
                </li>
                <li>
                  <strong className="text-canvas-white">Plausible</strong>{" "}
                  {tr(
                    "— estatísticas anónimas (servidores na UE, sem cookies)",
                    "— anonymous statistics (EU-based servers, no cookies)",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">Google</strong>{" "}
                  {tr(
                    "— Analytics e Tag Manager (medição de audiência; só com o teu consentimento; pode tratar dados nos EUA)",
                    "— Analytics and Tag Manager (audience measurement; only with your consent; may process data in the USA)",
                  )}
                </li>
              </ul>
              <p>
                {tr(
                  "Não partilhamos os teus dados com mais ninguém.",
                  "We do not share your data with anyone else.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "5. Transferências para fora da UE",
                "5. Transfers outside the EU",
              )}
            >
              <p>
                {tr(
                  "Alguns destes serviços (ex.: Resend, Vercel, Sanity, Google) podem tratar dados",
                  "Some of these services (e.g. Resend, Vercel, Sanity, Google) may process data",
                )}{" "}
                <strong className="text-canvas-white">
                  {tr(
                    "fora do Espaço Económico Europeu",
                    "outside the European Economic Area",
                  )}
                </strong>{" "}
                {tr(
                  "(nomeadamente nos EUA). Nesses casos, a transferência está protegida por",
                  "(namely in the USA). In such cases, the transfer is safeguarded by",
                )}{" "}
                <strong className="text-canvas-white">
                  {tr(
                    "Cláusulas Contratuais-Tipo",
                    "Standard Contractual Clauses",
                  )}
                </strong>{" "}
                {tr(
                  "aprovadas pela Comissão Europeia e/ou pelo",
                  "approved by the European Commission and/or by the",
                )}{" "}
                <em>EU-US Data Privacy Framework</em>.{" "}
                {tr(
                  "O Plausible mantém os dados na UE.",
                  "Plausible keeps data within the EU.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "6. Durante quanto tempo guardamos",
                "6. How long we keep your data",
              )}
            >
              <p>
                {tr(
                  "Guardamos os dados do teu pedido até",
                  "We retain the data from your request for up to",
                )}{" "}
                <strong className="text-canvas-white">
                  {tr("24 meses", "24 months")}
                </strong>
                {tr(
                  ", ou até nos pedires para apagar — o que vier primeiro.",
                  ", or until you ask us to delete it — whichever comes first.",
                )}
              </p>
            </Section>

            <Section title={tr("7. Segurança", "7. Security")}>
              <p>
                {tr(
                  "Tomamos medidas técnicas e organizativas razoáveis para proteger os teus dados contra perda, acesso indevido ou divulgação. Nenhum sistema é 100% infalível, mas levamos isto a sério.",
                  "We take reasonable technical and organisational measures to protect your data against loss, unauthorised access or disclosure. No system is 100% foolproof, but we take this seriously.",
                )}
              </p>
            </Section>

            <Section
              title={tr("8. Os teus direitos", "8. Your rights")}
            >
              <p>
                {tr(
                  "Em qualquer momento, tens direito a:",
                  "At any time, you have the right to:",
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-canvas-white">
                    {tr("Aceder", "Access")}
                  </strong>{" "}
                  {tr(
                    "aos teus dados e saber o que temos",
                    "your data and find out what we hold",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Retificar", "Rectify")}
                  </strong>{" "}
                  {tr("(corrigir) dados errados", "(correct) inaccurate data")}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Apagar", "Erase")}
                  </strong>{" "}
                  {tr(
                    "os teus dados (“direito a ser esquecido”)",
                    "your data (the “right to be forgotten”)",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Limitar", "Restrict")}
                  </strong>{" "}
                  {tr("o tratamento", "the processing")}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Portabilidade", "Portability")}
                  </strong>{" "}
                  {tr(
                    "— receber os teus dados num formato comum",
                    "— receive your data in a common format",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Opor-te", "Object")}
                  </strong>{" "}
                  {tr("ao tratamento", "to the processing")}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Retirar o consentimento", "Withdraw consent")}
                  </strong>{" "}
                  {tr(
                    "a qualquer momento (sem afetar o que já foi tratado antes)",
                    "at any time (without affecting processing already carried out)",
                  )}
                </li>
              </ul>
              <p>
                {tr(
                  "Para exercer qualquer um, envia um email para ",
                  "To exercise any of these, send an email to ",
                )}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  {EMAIL}
                </a>
                {tr(
                  ". Respondemos no prazo máximo de 1 mês.",
                  ". We respond within a maximum of 1 month.",
                )}
              </p>
            </Section>

            <Section title={tr("9. Reclamações", "9. Complaints")}>
              <p>
                {tr(
                  "Se achares que não tratámos os teus dados como devíamos, podes reclamar à autoridade de controlo portuguesa — a ",
                  "If you believe we have not handled your data as we should, you can lodge a complaint with the Portuguese supervisory authority — the ",
                )}
                <strong className="text-canvas-white">
                  {tr(
                    "CNPD (Comissão Nacional de Proteção de Dados)",
                    "CNPD (Portuguese Data Protection Authority)",
                  )}
                </strong>
                : <A href="https://www.cnpd.pt">www.cnpd.pt</A>.
              </p>
            </Section>

            <Section
              title={tr(
                "10. Decisões automatizadas e menores",
                "10. Automated decisions and minors",
              )}
            >
              <p>
                {tr(
                  "Não tomamos decisões automatizadas nem fazemos “profiling” com os teus dados. O nosso serviço não se destina a menores de 16 anos e não recolhemos dados de menores conscientemente.",
                  "We do not make automated decisions, nor do we carry out “profiling” with your data. Our service is not intended for minors under the age of 16, and we do not knowingly collect data from minors.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "11. Alterações a esta política",
                "11. Changes to this policy",
              )}
            >
              <p>
                {tr(
                  "Podemos atualizar esta política de tempos a tempos. A data em baixo indica a versão em vigor.",
                  "We may update this policy from time to time. The date below indicates the version in force.",
                )}
              </p>
            </Section>
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/60">
            {tr(
              `Última actualização: ${ULTIMA_ATUALIZACAO}`,
              `Last updated: ${ULTIMA_ATUALIZACAO_EN}`,
            )}
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
