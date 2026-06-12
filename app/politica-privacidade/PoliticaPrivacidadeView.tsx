"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { useLang } from "@/lib/language-context";

// Data efetiva da política. Atualizar só quando a política muda (não a cada build).
const ULTIMA_ATUALIZACAO = "7 de junho de 2026";
const ULTIMA_ATUALIZACAO_EN = "7 June 2026";
const ULTIMA_ATUALIZACAO_ES = "7 de junio de 2026";
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
  const tr = (pt: string, en: string, es: string) =>
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
            {tr("Política de Privacidade", "Privacy Policy", "Política de Privacidad")}
          </h1>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-2xl">
            {tr(
              "Em português claro: quem somos, que dados tratamos, com que base, por quanto tempo, com quem partilhamos, e quais os teus direitos.",
              "In plain English: who we are, what data we process, on what legal basis, for how long, with whom we share it, and what your rights are.",
              "En lenguaje claro: quiénes somos, qué datos tratamos, con qué base, durante cuánto tiempo, con quién los compartimos y cuáles son tus derechos.",
            )}
          </p>

          <div className="mt-12 space-y-10 font-body text-[15px] leading-relaxed text-canvas-white/80">
            <Section
              title={tr(
                "1. Responsável pelo tratamento",
                "1. Data controller",
                "1. Responsable del tratamiento",
              )}
            >
              <p>
                <strong className="text-canvas-white">25 Horas Agency</strong>,
                {tr(
                  " NIF 517 769 034, com morada na Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires, Portugal.",
                  " tax ID (NIF) 517 769 034, with its registered address at Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires, Portugal.",
                  " NIF 517 769 034, con domicilio en Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires, Portugal.",
                )}
              </p>
              <p>
                {tr(
                  "Contacto para qualquer assunto de privacidade: ",
                  "Contact for any privacy matter: ",
                  "Contacto para cualquier asunto de privacidad: ",
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
                  ". No estamos obligados a designar un Delegado de Protección de Datos (DPD); para cualquier cuestión, escríbenos a este correo.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "2. Que dados recolhemos",
                "2. What data we collect",
                "2. Qué datos recogemos",
              )}
            >
              <p>
                <strong className="text-canvas-white">
                  {tr("Dados que nos dás", "Data you provide", "Datos que nos facilitas")}
                </strong>{" "}
                {tr("no formulário de", "in the", "en el formulario de")}{" "}
                <Link
                  href="/orcamento"
                  className="underline underline-offset-2 hover:text-canvas-white"
                >
                  {tr("pedido de orçamento", "quote request form", "solicitud de presupuesto")}
                </Link>
                {tr(
                  ": nome, email, telefone, mensagem/detalhes do pedido, e a área de negócio e pack que escolheste.",
                  ": name, email, phone number, message/details of your request, and the business area and package you selected.",
                  ": nombre, email, teléfono, mensaje/detalles de la solicitud, y el área de negocio y pack que has elegido.",
                )}
              </p>
              <p>
                <strong className="text-canvas-white">
                  {tr(
                    "Dados de utilização (anónimos)",
                    "Usage data (anonymous)",
                    "Datos de uso (anónimos)",
                  )}
                </strong>
                {tr(
                  ": só com o teu consentimento, estatísticas agregadas de visitas (ver ",
                  ": only with your consent, aggregated visit statistics (see ",
                  ": solo con tu consentimiento, estadísticas agregadas de visitas (ver ",
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
                  "). Son anónimas y no te identifican.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "3. Para que usamos e com que base legal",
                "3. Purposes and legal basis",
                "3. Para qué los usamos y con qué base legal",
              )}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-canvas-white">
                    {tr(
                      "Responder ao teu pedido de orçamento",
                      "Responding to your quote request",
                      "Responder a tu solicitud de presupuesto",
                    )}
                  </strong>{" "}
                  {tr(
                    "e dar seguimento ao contacto — base: ",
                    "and following up on your enquiry — legal basis: ",
                    "y dar seguimiento al contacto — base: ",
                  )}
                  <em>
                    {tr(
                      "diligências pré-contratuais a teu pedido",
                      "pre-contractual steps taken at your request",
                      "medidas precontractuales a petición tuya",
                    )}
                  </em>{" "}
                  {tr("e o nosso", "and our", "y nuestro")}{" "}
                  <em>{tr("interesse legítimo", "legitimate interest", "interés legítimo")}</em>{" "}
                  {tr(
                    "em responder a quem nos contacta (art. 6.º, n.º 1, alíneas b) e f) do RGPD).",
                    "in responding to those who contact us (Article 6(1)(b) and (f) GDPR).",
                    "en responder a quien nos contacta (art. 6, apdo. 1, letras b) y f) del RGPD).",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Estatísticas anónimas", "Anonymous statistics", "Estadísticas anónimas")}
                  </strong>{" "}
                  {tr("— base: o teu ", "— legal basis: your ", "— base: tu ")}
                  <em>{tr("consentimento", "consent", "consentimiento")}</em>{" "}
                  {tr(
                    "(art. 6.º, n.º 1, alínea a)).",
                    "(Article 6(1)(a) GDPR).",
                    "(art. 6, apdo. 1, letra a) del RGPD).",
                  )}
                </li>
              </ul>
              <p>
                {tr(
                  "Não vendemos os teus dados nem os usamos para marketing sem autorização.",
                  "We do not sell your data, nor do we use it for marketing without your authorisation.",
                  "No vendemos tus datos ni los usamos para marketing sin tu autorización.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "4. Com quem partilhamos (subcontratantes)",
                "4. Who we share with (processors)",
                "4. Con quién compartimos (encargados del tratamiento)",
              )}
            >
              <p>
                {tr(
                  "Para o site funcionar, usamos serviços de confiança que tratam dados em nosso nome:",
                  "To run the website, we use trusted services that process data on our behalf:",
                  "Para que la web funcione, usamos servicios de confianza que tratan datos en nuestro nombre:",
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-canvas-white">Resend</strong>{" "}
                  {tr("— envio do email do formulário", "— sending the form email", "— envío del email del formulario")}
                </li>
                <li>
                  <strong className="text-canvas-white">Vercel</strong>{" "}
                  {tr("— alojamento do site", "— website hosting", "— alojamiento de la web")}
                </li>
                <li>
                  <strong className="text-canvas-white">Sanity</strong>{" "}
                  {tr("— gestão do conteúdo", "— content management", "— gestión del contenido")}
                </li>
                <li>
                  <strong className="text-canvas-white">Plausible</strong>{" "}
                  {tr(
                    "— estatísticas anónimas (servidores na UE, sem cookies)",
                    "— anonymous statistics (EU-based servers, no cookies)",
                    "— estadísticas anónimas (servidores en la UE, sin cookies)",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">Google</strong>{" "}
                  {tr(
                    "— Analytics e Tag Manager (medição de audiência; só com o teu consentimento; pode tratar dados nos EUA)",
                    "— Analytics and Tag Manager (audience measurement; only with your consent; may process data in the USA)",
                    "— Analytics y Tag Manager (medición de audiencia; solo con tu consentimiento; puede tratar datos en EE. UU.)",
                  )}
                </li>
              </ul>
              <p>
                {tr(
                  "Não partilhamos os teus dados com mais ninguém.",
                  "We do not share your data with anyone else.",
                  "No compartimos tus datos con nadie más.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "5. Transferências para fora da UE",
                "5. Transfers outside the EU",
                "5. Transferencias fuera de la UE",
              )}
            >
              <p>
                {tr(
                  "Alguns destes serviços (ex.: Resend, Vercel, Sanity, Google) podem tratar dados",
                  "Some of these services (e.g. Resend, Vercel, Sanity, Google) may process data",
                  "Algunos de estos servicios (p. ej.: Resend, Vercel, Sanity, Google) pueden tratar datos",
                )}{" "}
                <strong className="text-canvas-white">
                  {tr(
                    "fora do Espaço Económico Europeu",
                    "outside the European Economic Area",
                    "fuera del Espacio Económico Europeo",
                  )}
                </strong>{" "}
                {tr(
                  "(nomeadamente nos EUA). Nesses casos, a transferência está protegida por",
                  "(namely in the USA). In such cases, the transfer is safeguarded by",
                  "(en particular en EE. UU.). En esos casos, la transferencia está protegida por",
                )}{" "}
                <strong className="text-canvas-white">
                  {tr(
                    "Cláusulas Contratuais-Tipo",
                    "Standard Contractual Clauses",
                    "Cláusulas Contractuales Tipo",
                  )}
                </strong>{" "}
                {tr(
                  "aprovadas pela Comissão Europeia e/ou pelo",
                  "approved by the European Commission and/or by the",
                  "aprobadas por la Comisión Europea y/o por el",
                )}{" "}
                <em>EU-US Data Privacy Framework</em>.{" "}
                {tr(
                  "O Plausible mantém os dados na UE.",
                  "Plausible keeps data within the EU.",
                  "Plausible mantiene los datos en la UE.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "6. Durante quanto tempo guardamos",
                "6. How long we keep your data",
                "6. Durante cuánto tiempo los guardamos",
              )}
            >
              <p>
                {tr(
                  "Guardamos os dados do teu pedido até",
                  "We retain the data from your request for up to",
                  "Guardamos los datos de tu solicitud hasta",
                )}{" "}
                <strong className="text-canvas-white">
                  {tr("24 meses", "24 months", "24 meses")}
                </strong>
                {tr(
                  ", ou até nos pedires para apagar — o que vier primeiro.",
                  ", or until you ask us to delete it — whichever comes first.",
                  ", o hasta que nos pidas que los borremos — lo que ocurra primero.",
                )}
              </p>
            </Section>

            <Section title={tr("7. Segurança", "7. Security", "7. Seguridad")}>
              <p>
                {tr(
                  "Tomamos medidas técnicas e organizativas razoáveis para proteger os teus dados contra perda, acesso indevido ou divulgação. Nenhum sistema é 100% infalível, mas levamos isto a sério.",
                  "We take reasonable technical and organisational measures to protect your data against loss, unauthorised access or disclosure. No system is 100% foolproof, but we take this seriously.",
                  "Tomamos medidas técnicas y organizativas razonables para proteger tus datos frente a pérdidas, accesos indebidos o divulgación. Ningún sistema es 100 % infalible, pero nos lo tomamos en serio.",
                )}
              </p>
            </Section>

            <Section
              title={tr("8. Os teus direitos", "8. Your rights", "8. Tus derechos")}
            >
              <p>
                {tr(
                  "Em qualquer momento, tens direito a:",
                  "At any time, you have the right to:",
                  "En cualquier momento, tienes derecho a:",
                )}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong className="text-canvas-white">
                    {tr("Aceder", "Access", "Acceder")}
                  </strong>{" "}
                  {tr(
                    "aos teus dados e saber o que temos",
                    "your data and find out what we hold",
                    "a tus datos y saber qué tenemos",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Retificar", "Rectify", "Rectificar")}
                  </strong>{" "}
                  {tr("(corrigir) dados errados", "(correct) inaccurate data", "(corregir) datos erróneos")}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Apagar", "Erase", "Suprimir")}
                  </strong>{" "}
                  {tr(
                    "os teus dados (“direito a ser esquecido”)",
                    "your data (the “right to be forgotten”)",
                    "tus datos (“derecho al olvido”)",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Limitar", "Restrict", "Limitar")}
                  </strong>{" "}
                  {tr("o tratamento", "the processing", "el tratamiento")}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Portabilidade", "Portability", "Portabilidad")}
                  </strong>{" "}
                  {tr(
                    "— receber os teus dados num formato comum",
                    "— receive your data in a common format",
                    "— recibir tus datos en un formato común",
                  )}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Opor-te", "Object", "Oponerte")}
                  </strong>{" "}
                  {tr("ao tratamento", "to the processing", "al tratamiento")}
                </li>
                <li>
                  <strong className="text-canvas-white">
                    {tr("Retirar o consentimento", "Withdraw consent", "Retirar el consentimiento")}
                  </strong>{" "}
                  {tr(
                    "a qualquer momento (sem afetar o que já foi tratado antes)",
                    "at any time (without affecting processing already carried out)",
                    "en cualquier momento (sin afectar a lo ya tratado antes)",
                  )}
                </li>
              </ul>
              <p>
                {tr(
                  "Para exercer qualquer um, envia um email para ",
                  "To exercise any of these, send an email to ",
                  "Para ejercer cualquiera de ellos, envía un email a ",
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
                  ". Respondemos en un plazo máximo de 1 mes.",
                )}
              </p>
            </Section>

            <Section title={tr("9. Reclamações", "9. Complaints", "9. Reclamaciones")}>
              <p>
                {tr(
                  "Se achares que não tratámos os teus dados como devíamos, podes reclamar à autoridade de controlo portuguesa — a ",
                  "If you believe we have not handled your data as we should, you can lodge a complaint with the Portuguese supervisory authority — the ",
                  "Si consideras que no hemos tratado tus datos como debíamos, puedes reclamar ante la autoridad de control portuguesa — la ",
                )}
                <strong className="text-canvas-white">
                  {tr(
                    "CNPD (Comissão Nacional de Proteção de Dados)",
                    "CNPD (Portuguese Data Protection Authority)",
                    "CNPD (Autoridad de Protección de Datos de Portugal)",
                  )}
                </strong>
                : <A href="https://www.cnpd.pt">www.cnpd.pt</A>.
              </p>
            </Section>

            <Section
              title={tr(
                "10. Decisões automatizadas e menores",
                "10. Automated decisions and minors",
                "10. Decisiones automatizadas y menores",
              )}
            >
              <p>
                {tr(
                  "Não tomamos decisões automatizadas nem fazemos “profiling” com os teus dados. O nosso serviço não se destina a menores de 16 anos e não recolhemos dados de menores conscientemente.",
                  "We do not make automated decisions, nor do we carry out “profiling” with your data. Our service is not intended for minors under the age of 16, and we do not knowingly collect data from minors.",
                  "No tomamos decisiones automatizadas ni hacemos “profiling” con tus datos. Nuestro servicio no está dirigido a menores de 16 años y no recogemos datos de menores de forma consciente.",
                )}
              </p>
            </Section>

            <Section
              title={tr(
                "11. Alterações a esta política",
                "11. Changes to this policy",
                "11. Cambios en esta política",
              )}
            >
              <p>
                {tr(
                  "Podemos atualizar esta política de tempos a tempos. A data em baixo indica a versão em vigor.",
                  "We may update this policy from time to time. The date below indicates the version in force.",
                  "Podemos actualizar esta política de vez en cuando. La fecha de abajo indica la versión en vigor.",
                )}
              </p>
            </Section>
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/60">
            {tr(
              `Última atualização: ${ULTIMA_ATUALIZACAO}`,
              `Last updated: ${ULTIMA_ATUALIZACAO_EN}`,
              `Última actualización: ${ULTIMA_ATUALIZACAO_ES}`,
            )}
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
