"use client";

import Image from "next/image";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import type { Lang } from "@/lib/i18n";

const ACCENT = "#76F020"; // verde do nicho STUDIO (lib/servicos.ts)

type Space = {
  title: string;
  body: string;
  equipment: string[];
  modalities: string[];
};

type StudioCopy = {
  eyebrow: string;
  title: string;
  intro1: string;
  intro2: string;
  equipmentLabel: string;
  modalitiesLabel: string;
  spaces: Space[];
  booking: string;
  pricing: string;
  cta: string;
};

const COPY: Record<Lang, StudioCopy> = {
  pt: {
    eyebrow: "25Horas Studio",
    title: "ALUGUER DE ESPAÇOS\nE ESTÚDIOS",
    intro1:
      "A 25Horas Agency disponibiliza espaços profissionais para fotografia, vídeo, podcast, música, ensaios, formações e workshops, totalmente preparados para criadores de conteúdo, empresas, artistas e profissionais.",
    intro2:
      "Todos os espaços estão disponíveis com ou sem operador técnico. Os preços são fornecidos mediante consulta.",
    equipmentLabel: "Equipamento Disponível",
    modalitiesLabel: "Modalidades",
    spaces: [
      {
        title: "Estúdio de Fotografia",
        body: "Espaço preparado para sessões fotográficas profissionais, catálogos, retratos, produtos, moda e campanhas publicitárias.",
        equipment: [
          "Fundo branco infinito",
          "Diferentes cenários temáticos",
          "Iluminação flash profissional",
          "Softboxes e modificadores de luz",
          "Tripés e acessórios de apoio",
        ],
        modalities: ["Aluguer do espaço", "Aluguer com operador técnico"],
      },
      {
        title: "Estúdio de Vídeo",
        body: "Espaço ideal para produção de conteúdos digitais, publicidade, entrevistas, cursos online e vídeos para redes sociais.",
        equipment: [
          "Luzes contínuas profissionais",
          "Tripés de vídeo",
          "Cenários variados",
          "Fundo branco infinito",
          "Espaço preparado para gravações comerciais e institucionais",
        ],
        modalities: ["Aluguer do espaço", "Aluguer com operador técnico"],
      },
      {
        title: "Estúdio de Podcast",
        body: "Espaço totalmente equipado para gravação de podcasts, entrevistas e conteúdos audiovisuais.",
        equipment: [
          "Microfones profissionais",
          "Mesa de som",
          "Sistema de gravação de áudio",
          "Iluminação profissional",
          "Ambiente tratado acusticamente",
          "Captação multicâmara (opcional)",
        ],
        modalities: ["Aluguer do espaço", "Aluguer com operador técnico"],
      },
      {
        title: "Estúdio de Música",
        body: "Espaço destinado à gravação e produção musical.",
        equipment: [
          "Sistema de gravação profissional",
          "Tratamento acústico",
          "Microfones especializados",
          "Monitorização de áudio",
          "Ambiente preparado para produção musical",
        ],
        modalities: ["Aluguer do espaço", "Aluguer com operador técnico"],
      },
      {
        title: "Estúdio de Ensaio Vocal",
        body: "Espaço dedicado a cantores, grupos vocais, coros e preparação artística.",
        equipment: [
          "Sistema de som profissional",
          "Microfones para ensaio",
          "Monitores de retorno",
          "Tratamento acústico",
          "Espaço confortável para preparação vocal",
        ],
        modalities: ["Aluguer do espaço", "Aluguer com operador técnico"],
      },
      {
        title: "Sala de Formação",
        body: "Espaço preparado para ações de formação, workshops, reuniões, apresentações e eventos corporativos.",
        equipment: [
          "Mesas e cadeiras",
          "Projetor ou televisão de apoio",
          "Ligação à internet",
          "Quadro de apoio",
          "Ambiente climatizado",
        ],
        modalities: ["Aluguer da sala", "Aluguer da sala com apoio técnico"],
      },
    ],
    booking: "Disponibilidade mediante marcação prévia.",
    pricing: "Preços sob consulta.",
    cta: "Pedir orçamento →",
  },
  en: {
    eyebrow: "25Horas Studio",
    title: "SPACE & STUDIO\nRENTAL",
    intro1:
      "25Horas Agency offers professional spaces for photography, video, podcast, music, rehearsals, training sessions and workshops, fully equipped for content creators, companies, artists and professionals.",
    intro2:
      "All spaces are available with or without a technical operator. Pricing is provided on request.",
    equipmentLabel: "Available Equipment",
    modalitiesLabel: "Rental Options",
    spaces: [
      {
        title: "Photography Studio",
        body: "A space prepared for professional photo sessions, catalogues, portraits, product, fashion and advertising campaigns.",
        equipment: [
          "Infinity white backdrop",
          "Different themed sets",
          "Professional flash lighting",
          "Softboxes and light modifiers",
          "Tripods and support accessories",
        ],
        modalities: ["Space rental", "Rental with technical operator"],
      },
      {
        title: "Video Studio",
        body: "An ideal space for digital content production, advertising, interviews, online courses and social media videos.",
        equipment: [
          "Professional continuous lighting",
          "Video tripods",
          "Varied sets",
          "Infinity white backdrop",
          "Space prepared for commercial and corporate shoots",
        ],
        modalities: ["Space rental", "Rental with technical operator"],
      },
      {
        title: "Podcast Studio",
        body: "A fully equipped space for recording podcasts, interviews and audiovisual content.",
        equipment: [
          "Professional microphones",
          "Mixing desk",
          "Audio recording system",
          "Professional lighting",
          "Acoustically treated room",
          "Multi-camera capture (optional)",
        ],
        modalities: ["Space rental", "Rental with technical operator"],
      },
      {
        title: "Music Studio",
        body: "A space dedicated to music recording and production.",
        equipment: [
          "Professional recording system",
          "Acoustic treatment",
          "Specialised microphones",
          "Audio monitoring",
          "Room prepared for music production",
        ],
        modalities: ["Space rental", "Rental with technical operator"],
      },
      {
        title: "Vocal Rehearsal Studio",
        body: "A space dedicated to singers, vocal groups, choirs and artistic preparation.",
        equipment: [
          "Professional sound system",
          "Rehearsal microphones",
          "Stage monitors",
          "Acoustic treatment",
          "Comfortable space for vocal preparation",
        ],
        modalities: ["Space rental", "Rental with technical operator"],
      },
      {
        title: "Training Room",
        body: "A space prepared for training sessions, workshops, meetings, presentations and corporate events.",
        equipment: [
          "Tables and chairs",
          "Projector or support TV",
          "Internet connection",
          "Whiteboard",
          "Air-conditioned room",
        ],
        modalities: ["Room rental", "Room rental with technical support"],
      },
    ],
    booking: "Availability subject to prior booking.",
    pricing: "Pricing on request.",
    cta: "Get a quote →",
  },
  es: {
    eyebrow: "25Horas Studio",
    title: "ALQUILER DE ESPACIOS\nY ESTUDIOS",
    intro1:
      "25Horas Agency pone a tu disposición espacios profesionales para fotografía, vídeo, podcast, música, ensayos, formaciones y workshops, totalmente preparados para creadores de contenido, empresas, artistas y profesionales.",
    intro2:
      "Todos los espacios están disponibles con o sin operador técnico. Los precios se facilitan bajo consulta.",
    equipmentLabel: "Equipamiento Disponible",
    modalitiesLabel: "Modalidades",
    spaces: [
      {
        title: "Estudio de Fotografía",
        body: "Espacio preparado para sesiones fotográficas profesionales, catálogos, retratos, producto, moda y campañas publicitarias.",
        equipment: [
          "Fondo blanco infinito",
          "Diferentes escenarios temáticos",
          "Iluminación flash profesional",
          "Softboxes y modificadores de luz",
          "Trípodes y accesorios de apoyo",
        ],
        modalities: ["Alquiler del espacio", "Alquiler con operador técnico"],
      },
      {
        title: "Estudio de Vídeo",
        body: "Espacio ideal para la producción de contenidos digitales, publicidad, entrevistas, cursos online y vídeos para redes sociales.",
        equipment: [
          "Luces continuas profesionales",
          "Trípodes de vídeo",
          "Escenarios variados",
          "Fondo blanco infinito",
          "Espacio preparado para grabaciones comerciales e institucionales",
        ],
        modalities: ["Alquiler del espacio", "Alquiler con operador técnico"],
      },
      {
        title: "Estudio de Podcast",
        body: "Espacio totalmente equipado para la grabación de podcasts, entrevistas y contenidos audiovisuales.",
        equipment: [
          "Micrófonos profesionales",
          "Mesa de sonido",
          "Sistema de grabación de audio",
          "Iluminación profesional",
          "Sala tratada acústicamente",
          "Captación multicámara (opcional)",
        ],
        modalities: ["Alquiler del espacio", "Alquiler con operador técnico"],
      },
      {
        title: "Estudio de Música",
        body: "Espacio destinado a la grabación y producción musical.",
        equipment: [
          "Sistema de grabación profesional",
          "Tratamiento acústico",
          "Micrófonos especializados",
          "Monitorización de audio",
          "Sala preparada para producción musical",
        ],
        modalities: ["Alquiler del espacio", "Alquiler con operador técnico"],
      },
      {
        title: "Estudio de Ensayo Vocal",
        body: "Espacio dedicado a cantantes, grupos vocales, coros y preparación artística.",
        equipment: [
          "Sistema de sonido profesional",
          "Micrófonos para ensayo",
          "Monitores de retorno",
          "Tratamiento acústico",
          "Espacio cómodo para la preparación vocal",
        ],
        modalities: ["Alquiler del espacio", "Alquiler con operador técnico"],
      },
      {
        title: "Sala de Formación",
        body: "Espacio preparado para acciones formativas, workshops, reuniones, presentaciones y eventos corporativos.",
        equipment: [
          "Mesas y sillas",
          "Proyector o televisión de apoyo",
          "Conexión a internet",
          "Pizarra de apoyo",
          "Sala climatizada",
        ],
        modalities: ["Alquiler de la sala", "Alquiler de la sala con apoyo técnico"],
      },
    ],
    booking: "Disponibilidad previa reserva.",
    pricing: "Precios bajo consulta.",
    cta: "Pedir presupuesto →",
  },
};

export function StudioView() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />

      {/* Hero full-bleed — mesmo padrão do /sobre (foto atrás do header) */}
      <section className="relative w-full overflow-hidden h-[54svh] md:h-[60svh] flex items-center border-b border-canvas-white/10 pt-[104px] md:pt-[112px]">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/media/nichos/studioop.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
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
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <h1 className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] whitespace-pre-line drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {c.title}
              </h1>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <p className="font-body text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-canvas-white/85 max-w-3xl">
              {c.intro1}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p className="mt-6 font-body text-[16px] leading-relaxed text-canvas-white/60 max-w-3xl">
              {c.intro2}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Espaços */}
      <section className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-[1100px] mx-auto space-y-0">
          {c.spaces.map((space, i) => (
            <RevealOnScroll key={space.title} delay={i * 40}>
              <article className="border-t border-canvas-white/10 py-12 md:py-14 grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8 md:gap-12">
                <div>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display uppercase text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05]">
                    {space.title}
                  </h2>
                  <p className="mt-4 font-body text-[15px] leading-relaxed text-canvas-white/70 max-w-md">
                    {space.body}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 mb-4">
                      {c.equipmentLabel}
                    </h3>
                    <ul className="space-y-2.5">
                      {space.equipment.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 font-body text-[14px] leading-snug text-canvas-white/85"
                        >
                          <span
                            className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: ACCENT }}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 mb-4">
                      {c.modalitiesLabel}
                    </h3>
                    <ul className="space-y-2.5">
                      {space.modalities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 font-body text-[14px] leading-snug text-canvas-white/85"
                        >
                          <span
                            className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: ACCENT }}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Nota final + CTA */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[1100px] mx-auto border-t border-canvas-white/10 pt-12 md:pt-14">
          <RevealOnScroll>
            <p className="font-body text-[16px] leading-relaxed text-canvas-white/85">
              {c.booking}
              <br />
              <span className="text-canvas-white/60">{c.pricing}</span>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <Link
              href="/orcamento"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-canvas-white text-canvas-black font-mono text-[12px] uppercase tracking-[0.15em] hover:opacity-85 transition-opacity"
            >
              {c.cta}
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
