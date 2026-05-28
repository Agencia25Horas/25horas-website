import Image from "next/image";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { NichoBlock } from "@/components/sections/NichoBlock";
import { LOGOS } from "@/lib/logos";
import { NICHOS } from "@/lib/servicos";

/**
 * Home — dark, com Tomatino-faithful structure.
 *   01 HERO     bg preto + b25agency.png centrado (quadrado, transparente)
 *   02-07       6 NichoBlock alternados, título de cada nicho na cor de marca
 *   FOOTER      painel preto compacto
 */

export default function HomePage() {
  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      {/* ═══════════ 01 — HERO (preto + logo branco gigante) ═══════════ */}
      <section
        id="hero"
        className="relative w-full overflow-hidden min-h-[640px] md:min-h-[760px] flex items-start justify-center bg-canvas-black"
        aria-label="25 Horas Agency"
      >
        <div className="relative z-10 w-full flex items-center justify-center px-4 md:px-8 -mt-[60px]">
          <RevealOnScroll>
            <div className="relative w-[min(85vw,900px)] aspect-[3/2]">
              <Image
                src="/media/logos/b25agency.png"
                alt="25 Horas Agency"
                fill
                priority
                sizes="(min-width: 768px) 900px, 85vw"
                className="object-contain"
                quality={95}
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════ 02-07 — SEIS NICHOS (dark + cor de nicho no título) ═══════════ */}
      <div id="nichos">
        {NICHOS.map((nicho, i) => {
          const logo = LOGOS.find(
            (l) => l.href === `/servicos/${nicho.slug}`,
          );
          return (
            <NichoBlock
              key={nicho.slug}
              nicho={nicho}
              logo={logo}
              alignment={i % 2 === 0 ? "text-left" : "text-right"}
            />
          );
        })}
      </div>

      <SiteFooter />
    </main>
  );
}
