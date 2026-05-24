import Image from "next/image";
import Link from "next/link";
import { ChromeTop } from "@/components/chrome/ChromeTop";

/**
 * Tomatino-faithful clone v3 — literal structure mimicry.
 *
 * Section pattern alternation (matches tomatino's "promo jarallax" + "promo
 * pantone" structure):
 *
 *   1  image fullbleed + dark mask + bottom headline
 *   2  pantone (solid colour) + asymmetric text + small image
 *   3  image fullbleed + dark mask + bottom headline
 *   4  pantone (solid colour) + list/text
 *   5  image fullbleed + dark mask + bottom headline
 *   6  pantone (solid colour) — contactos block
 *
 * Each section is ~100vh so the page reads as a sequence of stills.
 */
export default function HomePage() {
  return (
    <main id="main" className="relative bg-canvas-black">
      <ChromeTop />

      {/* ────────── 01 — HERO image fullbleed ────────── */}
      <FullBleedSection
        image="/media/bg-2.jpg"
        eyebrow="25 HORAS AGENCY · LISBOA"
        headline={
          <>
            Cinema
            <br />
            para marcas.
          </>
        }
        body="25 frames por segundo. 25 horas por dia."
        priority
      />

      {/* ────────── 02 — PANTONE bloco cream ────────── */}
      <PantoneSection
        surface="cream"
        eyebrow="01 · MANIFESTO"
        headline={
          <>
            Não fazemos vídeos.
            <br />
            Fazemos filmes para marcas.
          </>
        }
        body={[
          "Trabalhamos do briefing ao corte final. Vídeo, fotografia, design e gestão de redes — em registo cinematográfico.",
          "Equipa pequena. Autoria clara. Lisboa para marcas portuguesas que precisam de ser vistas em qualquer canal, em qualquer escala.",
        ]}
        sideImage="/media/bts-2.jpg"
      />

      {/* ────────── 03 — IMAGE fullbleed (Serviços) ────────── */}
      <FullBleedSection
        image="/media/bg-4.jpg"
        eyebrow="02 · SERVIÇOS"
        headline={
          <>
            Seis nichos.
            <br />
            Um vocabulário.
          </>
        }
        body="Vídeo, fotografia e design — em registo afinado para cada sector."
      />

      {/* ────────── 04 — PANTONE bloco preto (lista de nichos) ────────── */}
      <PantoneSection
        surface="black"
        eyebrow="OS NICHOS"
        headline={<>Onde trabalhamos.</>}
        list={[
          "Restaurantes",
          "Desporto",
          "Real State",
          "Travel",
          "Corporate",
          "Saúde & Família",
        ]}
        footnote="Em todos: gestão de redes sociais transversal. Planeamento, copywriting, agendamento."
      />

      {/* ────────── 05 — IMAGE fullbleed (Portfolio) ────────── */}
      <FullBleedSection
        image="/media/bg-6.jpg"
        eyebrow="03 · PORTFOLIO"
        headline={
          <>
            Trabalhos
            <br />
            recentes.
          </>
        }
        body="Selecção de filmes e campanhas. Mais conteúdo em @25horas.agency."
      />

      {/* ────────── 06 — PANTONE bloco cream (Contactos) ────────── */}
      <PantoneSection
        surface="cream"
        eyebrow="04 · FALAMOS"
        headline={<>Vamos a isto.</>}
        contacts={{
          email: "atendimento@25horasagency.com",
          phone: "+351 963 869 519",
        }}
        cta={{ label: "PEDIR ORÇAMENTO →", href: "/orcamento" }}
        secondaryCta={{ label: "Marcar chamada →", href: "/marcar" }}
      />
    </main>
  );
}

/* ───────────────────────────────────────────────────────────── *
 *  Section primitives — mimic tomatino's two patterns           *
 * ───────────────────────────────────────────────────────────── */

function FullBleedSection({
  image,
  eyebrow,
  headline,
  body,
  priority = false,
}: {
  image: string;
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  priority?: boolean;
}) {
  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label={eyebrow}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-canvas-black/55" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-canvas-black via-canvas-black/35 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-white/70 mb-6">
            {eyebrow}
            <span
              className="block mt-2 h-px w-12 bg-canvas-white/45"
              aria-hidden
            />
          </div>
          <h2
            lang="pt"
            className="font-serif font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-canvas-white max-w-5xl"
          >
            {headline}
          </h2>
          <p
            lang="pt"
            className="mt-6 font-body text-[15px] md:text-[18px] leading-relaxed text-canvas-white/80 max-w-xl"
          >
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

function PantoneSection({
  surface,
  eyebrow,
  headline,
  body,
  list,
  footnote,
  sideImage,
  contacts,
  cta,
  secondaryCta,
}: {
  surface: "cream" | "black";
  eyebrow: string;
  headline: React.ReactNode;
  body?: string[];
  list?: string[];
  footnote?: string;
  sideImage?: string;
  contacts?: { email: string; phone: string };
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  const bg = surface === "cream" ? "bg-canvas-white" : "bg-canvas-black";
  const text = surface === "cream" ? "text-canvas-black" : "text-canvas-white";
  const textMuted =
    surface === "cream" ? "text-canvas-black/70" : "text-canvas-white/75";
  const textDim =
    surface === "cream" ? "text-canvas-black/55" : "text-canvas-white/55";
  const divider =
    surface === "cream" ? "bg-canvas-black/30" : "bg-canvas-white/45";

  return (
    <section
      className={`relative ${bg} py-28 md:py-44 px-6 md:px-16`}
      aria-label={eyebrow}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid grid-cols-1 ${
            sideImage ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-1"
          } gap-14 md:gap-24 items-start`}
        >
          <div>
            <div
              className={`font-mono text-[10px] md:text-[11px] tracking-mono-wider ${textDim} mb-6`}
            >
              {eyebrow}
              <span
                className={`block mt-2 h-px w-12 ${divider}`}
                aria-hidden
              />
            </div>
            <h2
              lang="pt"
              className={`font-serif font-light text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] ${text}`}
            >
              {headline}
            </h2>

            {body && (
              <div className="mt-8 space-y-4 max-w-md">
                {body.map((p, i) => (
                  <p
                    key={i}
                    lang="pt"
                    className={`font-body text-[15px] md:text-[17px] leading-relaxed ${textMuted}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {list && (
              <ul className="mt-10 space-y-4">
                {list.map((item) => (
                  <li
                    key={item}
                    className={`font-serif font-light text-[clamp(1.5rem,3vw,2.5rem)] leading-tight ${text}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {footnote && (
              <p
                lang="pt"
                className={`mt-10 font-body text-[14px] leading-relaxed ${textMuted} max-w-md`}
              >
                {footnote}
              </p>
            )}

            {contacts && (
              <div className="mt-10 space-y-3">
                <a
                  href={`mailto:${contacts.email}`}
                  className={`block font-serif font-light text-[clamp(1.25rem,2.4vw,2rem)] ${text} hover:text-accent-grade transition-colors duration-f-12`}
                >
                  {contacts.email}
                </a>
                <a
                  href={`tel:${contacts.phone.replace(/\s/g, "")}`}
                  className={`block font-serif font-light text-[clamp(1.25rem,2.4vw,2rem)] ${text} hover:text-accent-grade transition-colors duration-f-12`}
                >
                  {contacts.phone}
                </a>
              </div>
            )}

            {(cta || secondaryCta) && (
              <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                {cta && (
                  <Link
                    href={cta.href}
                    className="inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white bg-accent-grade hover:bg-accent-grade/85 transition-colors duration-f-12 px-6 py-3"
                  >
                    {cta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className={`inline-flex items-center font-mono text-[11px] tracking-mono-wider ${textMuted} hover:text-accent-grade transition-colors duration-f-12 underline underline-offset-4`}
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {sideImage && (
            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
              <Image
                src={sideImage}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-cover grayscale"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
