import Image from "next/image";
import Link from "next/link";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ScrollFade } from "@/components/effects/ScrollFade";

/**
 * Tomatino-faithful clone v4 — denser imagery + scroll motion.
 *
 * Section alternation (mirrors tomatino's "promo jarallax" + "promo pantone"):
 *
 *   01  HERO          image fullbleed (kenburns) + dark mask + bottom headline
 *   02  MANIFESTO     pantone cream + text + 3 stacked stills (B&W)
 *   03  SERVIÇOS      image fullbleed (kenburns) + bottom headline + thumb strip
 *   04  NICHOS        pantone black + niche list as big serif rows
 *   05  PORTFOLIO     pantone cream + headline + 6-image grid (B&W → colour)
 *   06  CONTACTOS     pantone black + contacts + CTAs
 *
 * Movement layer:
 *   - .kenburns CSS animation on every full-bleed bg image (24s loop)
 *   - <ScrollFade> wraps every block of text — fades + slides in on scroll
 */
export default function HomePage() {
  return (
    <main id="main" className="relative bg-canvas-black">
      <ChromeTop />

      {/* ────────── 01 — HERO ────────── */}
      <section
        id="hero"
        data-reel="1"
        className="relative h-[100svh] w-full overflow-hidden"
        aria-label="25 Horas Agency"
      >
        <div className="absolute inset-0 kenburns">
          <Image
            src="/media/bg-2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-canvas-black/55" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-canvas-black via-canvas-black/35 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto w-full">
            <ScrollFade>
              <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-white/70 mb-6">
                25 HORAS AGENCY · LISBOA
                <span
                  className="block mt-2 h-px w-12 bg-canvas-white/45"
                  aria-hidden
                />
              </div>
            </ScrollFade>
            <ScrollFade delay={120}>
              <h1
                lang="pt"
                className="font-serif font-light text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] text-canvas-white max-w-5xl"
              >
                Cinema
                <br />
                para marcas.
              </h1>
            </ScrollFade>
            <ScrollFade delay={260}>
              <p
                lang="pt"
                className="mt-8 font-body text-[15px] md:text-[19px] leading-relaxed text-canvas-white/85 max-w-xl"
              >
                25 frames por segundo. 25 horas por dia. Uma produtora
                audiovisual com base em Lisboa.
              </p>
            </ScrollFade>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
          <span className="font-mono text-[10px] tracking-mono-wider text-canvas-white/55 animate-pulse">
            ↓ SCROLL
          </span>
        </div>
      </section>

      {/* ────────── 02 — MANIFESTO (pantone cream) ────────── */}
      <section
        id="sobre"
        data-reel="2"
        className="relative bg-canvas-white py-28 md:py-44 px-6 md:px-16"
        aria-label="Manifesto"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-14 md:gap-24 items-center">
          <div>
            <ScrollFade>
              <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-black/55 mb-6">
                01 · MANIFESTO
                <span
                  className="block mt-2 h-px w-12 bg-canvas-black/30"
                  aria-hidden
                />
              </div>
            </ScrollFade>
            <ScrollFade delay={100}>
              <h2
                lang="pt"
                className="font-serif font-light text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-canvas-black"
              >
                Não fazemos vídeos.
                <br />
                Fazemos filmes para marcas.
              </h2>
            </ScrollFade>
            <ScrollFade delay={220}>
              <p
                lang="pt"
                className="mt-8 font-body text-[15px] md:text-[17px] leading-relaxed text-canvas-black/70 max-w-md"
              >
                Trabalhamos do briefing ao corte final. Vídeo, fotografia,
                design e gestão de redes — em registo cinematográfico.
              </p>
            </ScrollFade>
            <ScrollFade delay={320}>
              <p
                lang="pt"
                className="mt-4 font-body text-[15px] md:text-[17px] leading-relaxed text-canvas-black/70 max-w-md"
              >
                Equipa pequena. Autoria clara. Lisboa para marcas portuguesas
                que precisam de ser vistas em qualquer canal, em qualquer
                escala.
              </p>
            </ScrollFade>
          </div>

          {/* 3 stills empilhadas (B&W) */}
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {(["bts-1", "bts-2", "bts-3"] as const).map((id, i) => (
              <ScrollFade key={id} delay={i * 120}>
                <div
                  className={`relative overflow-hidden ${
                    i === 1 ? "aspect-[16/9]" : "aspect-[5/3]"
                  }`}
                >
                  <Image
                    src={`/media/${id}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover grayscale"
                  />
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── 03 — SERVIÇOS INTRO (image fullbleed) ────────── */}
      <section
        id="servicos"
        data-reel="3"
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
        aria-label="Serviços"
      >
        <div className="absolute inset-0 kenburns">
          <Image
            src="/media/bg-4.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-canvas-black/60" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-canvas-black via-canvas-black/45 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto w-full">
            <ScrollFade>
              <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-white/70 mb-6">
                02 · SERVIÇOS
                <span
                  className="block mt-2 h-px w-12 bg-canvas-white/45"
                  aria-hidden
                />
              </div>
            </ScrollFade>
            <ScrollFade delay={120}>
              <h2
                lang="pt"
                className="font-serif font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-canvas-white max-w-5xl"
              >
                Seis nichos.
                <br />
                Um vocabulário.
              </h2>
            </ScrollFade>
            <ScrollFade delay={240}>
              <p
                lang="pt"
                className="mt-6 font-body text-[15px] md:text-[18px] leading-relaxed text-canvas-white/80 max-w-xl"
              >
                Vídeo, fotografia e design — em registo afinado para cada
                sector.
              </p>
            </ScrollFade>

            {/* Strip de 6 miniaturas dos nichos */}
            <ScrollFade delay={420}>
              <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
                {[
                  "restaurantes",
                  "desporto",
                  "real-estate",
                  "travel",
                  "corporate",
                  "saude",
                ].map((slug) => (
                  <div
                    key={slug}
                    className="relative aspect-square overflow-hidden bg-chrome-line/40"
                  >
                    <Image
                      src={`/media/nichos/${slug}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 12vw, 30vw"
                      className="object-cover grayscale opacity-90"
                    />
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ────────── 04 — NICHOS LIST (pantone black) ────────── */}
      <section
        id="nichos"
        data-reel="4"
        className="relative bg-canvas-black py-28 md:py-44 px-6 md:px-16"
        aria-label="Onde trabalhamos"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-white/55 mb-6">
              OS NICHOS
              <span
                className="block mt-2 h-px w-12 bg-canvas-white/45"
                aria-hidden
              />
            </div>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2
              lang="pt"
              className="font-serif font-light text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-canvas-white max-w-3xl"
            >
              Onde trabalhamos.
            </h2>
          </ScrollFade>

          <ul className="mt-14 md:mt-20 border-t border-chrome-line">
            {[
              { label: "Restaurantes", emoji: "🍽️", img: "restaurantes" },
              { label: "Desporto", emoji: "⚽", img: "desporto" },
              { label: "Real State", emoji: "🏠", img: "real-estate" },
              { label: "Travel", emoji: "✈️", img: "travel" },
              { label: "Corporate", emoji: "🏢", img: "corporate" },
              { label: "Saúde & Família", emoji: "💆", img: "saude" },
            ].map((n, i) => (
              <ScrollFade key={n.img} delay={i * 80}>
                <li className="group grid grid-cols-[1fr_auto] md:grid-cols-[80px_1fr_auto] items-center gap-4 md:gap-8 border-b border-chrome-line py-6 md:py-8">
                  <div className="hidden md:block relative aspect-square w-20 overflow-hidden">
                    <Image
                      src={`/media/nichos/${n.img}.jpg`}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-f-25 ease-cinema"
                    />
                  </div>
                  <h3
                    lang="pt"
                    className="font-serif font-light text-[clamp(1.75rem,4vw,3.25rem)] leading-tight text-canvas-white group-hover:text-accent-grade transition-colors duration-f-12"
                  >
                    {n.label}
                  </h3>
                  <span className="font-mono text-[20px] md:text-[28px] text-type-dim group-hover:text-accent-grade transition-colors duration-f-12">
                    {n.emoji}
                  </span>
                </li>
              </ScrollFade>
            ))}
          </ul>

          <ScrollFade delay={200}>
            <p
              lang="pt"
              className="mt-10 font-body text-[14px] leading-relaxed text-type-dim max-w-lg"
            >
              Em todos: gestão de redes sociais transversal. Planeamento,
              copywriting, agendamento em Instagram, Facebook e TikTok.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* ────────── 05 — PORTFOLIO (pantone cream + grid) ────────── */}
      <section
        id="portfolio"
        data-reel="5"
        className="relative bg-canvas-white py-28 md:py-44 px-6 md:px-16"
        aria-label="Portfolio"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollFade>
            <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-black/55 mb-6">
              03 · PORTFOLIO
              <span
                className="block mt-2 h-px w-12 bg-canvas-black/30"
                aria-hidden
              />
            </div>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2
              lang="pt"
              className="font-serif font-light text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-canvas-black max-w-3xl"
            >
              Trabalhos recentes.
            </h2>
          </ScrollFade>
          <ScrollFade delay={220}>
            <p
              lang="pt"
              className="mt-6 font-body text-[15px] md:text-[17px] leading-relaxed text-canvas-black/70 max-w-xl"
            >
              Selecção de filmes e campanhas. Mais conteúdo em{" "}
              <a
                href="https://instagram.com/25horas.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-accent-grade transition-colors duration-f-12"
              >
                @25horas.agency
              </a>
              .
            </p>
          </ScrollFade>

          {/* Grid 3×2 de stills */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {[
              { src: "/media/bg-3.jpg", label: "RESTAURANTES" },
              { src: "/media/bg-5.jpg", label: "DESPORTO" },
              { src: "/media/bg-1.jpg", label: "REAL STATE" },
              { src: "/media/bg-7.jpg", label: "TRAVEL" },
              { src: "/media/bg-8.jpg", label: "CORPORATE" },
              { src: "/media/bts-3.jpg", label: "SAÚDE & FAMÍLIA" },
            ].map((tile, i) => (
              <ScrollFade key={tile.src} delay={i * 80}>
                <div className="group relative aspect-[4/5] overflow-hidden bg-chrome-line">
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-f-50 ease-cinema"
                  />
                  <div
                    className="absolute inset-0 bg-canvas-black/15 group-hover:bg-canvas-black/0 transition-colors duration-f-25"
                    aria-hidden
                  />
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 font-mono text-[9px] md:text-[10px] tracking-mono-wider text-canvas-white">
                    {tile.label}
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── 06 — CONTACTOS (pantone black) ────────── */}
      <section
        id="contactos"
        data-reel="6"
        className="relative bg-canvas-black py-32 md:py-48 px-6 md:px-16"
        aria-label="Contactos"
      >
        <div className="max-w-4xl mx-auto">
          <ScrollFade>
            <div className="font-mono text-[10px] md:text-[11px] tracking-mono-wider text-canvas-white/55 mb-6">
              04 · FALAMOS
              <span
                className="block mt-2 h-px w-12 bg-canvas-white/45"
                aria-hidden
              />
            </div>
          </ScrollFade>
          <ScrollFade delay={120}>
            <h2
              lang="pt"
              className="font-serif font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-canvas-white"
            >
              Vamos a isto.
            </h2>
          </ScrollFade>
          <ScrollFade delay={240}>
            <div className="mt-12 space-y-3">
              <a
                href="mailto:atendimento@25horasagency.com"
                className="block font-serif font-light text-[clamp(1.25rem,2.6vw,2.25rem)] text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
              >
                atendimento@25horasagency.com
              </a>
              <a
                href="tel:+351963869519"
                className="block font-serif font-light text-[clamp(1.25rem,2.6vw,2.25rem)] text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
              >
                +351 963 869 519
              </a>
              <p className="font-mono text-[11px] tracking-mono-wider text-type-dim pt-2">
                LISBOA · PORTUGAL
              </p>
            </div>
          </ScrollFade>
          <ScrollFade delay={380}>
            <div className="mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <Link
                href="/orcamento"
                className="inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white bg-accent-grade hover:bg-accent-grade/85 transition-colors duration-f-12 px-6 py-3"
              >
                PEDIR ORÇAMENTO →
              </Link>
              <Link
                href="/marcar"
                className="inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white/85 hover:text-accent-grade transition-colors duration-f-12 underline underline-offset-4"
              >
                Marcar chamada →
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    </main>
  );
}
