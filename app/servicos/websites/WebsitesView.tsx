"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import type { Lang } from "@/lib/i18n";

const ACCENT = "#1E90FF"; // azul elétrico — cor de marca do departamento WEBSITES

type Service = {
  title: string;
  body: string;
  includes: string[];
  idealFor: string[];
};

type WebsitesCopy = {
  eyebrow: string;
  title: string;
  intro1: string;
  intro2: string;
  includesLabel: string;
  idealForLabel: string;
  services: Service[];
  closingNote: string;
  closingBody: string;
  pricing: string;
  cta: string;
};

const COPY: Record<Lang, WebsitesCopy> = {
  pt: {
    eyebrow: "25Horas Websites",
    title: "CRIAÇÃO DE\nWEBSITES",
    intro1:
      "A 25Horas Agency desenha e desenvolve websites rápidos, bonitos e pensados para converter — de sites institucionais a lojas online, landing pages e plataformas à medida.",
    intro2:
      "Cada projeto começa com a sua marca e os seus objetivos. Tratamos de tudo: design, desenvolvimento, conteúdos, SEO e manutenção.",
    includesLabel: "O que inclui",
    idealForLabel: "Ideal para",
    services: [
      {
        title: "Sites Institucionais",
        body: "A sua marca online com identidade própria — uma presença profissional que inspira confiança a partir do primeiro segundo.",
        includes: [
          "Design à medida da marca",
          "100% responsivo (telemóvel, tablet, desktop)",
          "Multi-idioma",
          "Formulário de contacto",
          "Integração com redes sociais",
          "Otimização de velocidade",
        ],
        idealFor: [
          "Empresas e PME",
          "Profissionais liberais",
          "Restaurantes e clínicas",
          "Marcas que querem destacar-se",
        ],
      },
      {
        title: "Lojas Online (E-commerce)",
        body: "Venda 24 horas por dia com uma loja rápida, segura e simples de gerir.",
        includes: [
          "Catálogo de produtos",
          "Carrinho e checkout",
          "Pagamentos (MB Way, cartão, PayPal)",
          "Gestão de stock e encomendas",
          "Cupões e promoções",
          "Painel de gestão fácil",
        ],
        idealFor: [
          "Marcas de produto",
          "Retalho e marcas locais",
          "Quem quer vender online",
        ],
      },
      {
        title: "Landing Pages",
        body: "Páginas focadas num único objetivo: converter visitantes em clientes.",
        includes: [
          "Copy persuasiva",
          "Design orientado à conversão",
          "Formulários e CTAs",
          "Integração com analytics",
          "Carregamento ultra-rápido",
          "Pronta para campanhas pagas",
        ],
        idealFor: [
          "Campanhas de anúncios",
          "Lançamentos de produto",
          "Eventos",
          "Captação de leads",
        ],
      },
      {
        title: "Plataformas & Web Apps",
        body: "Quando precisa de mais do que um site — áreas de cliente, reservas, dashboards e ferramentas à medida do seu negócio.",
        includes: [
          "Desenvolvimento 100% à medida",
          "Áreas de login e perfis",
          "Bases de dados e integrações",
          "Ligação a APIs e ferramentas",
          "Dashboards e relatórios",
          "Preparado para escalar",
        ],
        idealFor: [
          "Startups e SaaS",
          "Negócios com processos próprios",
          "Reservas e marcações",
        ],
      },
      {
        title: "SEO & Performance",
        body: "Apareça no Google e carregue num instante — porque o site mais bonito não serve de nada se ninguém o encontra.",
        includes: [
          "Otimização on-page",
          "Estrutura técnica de SEO",
          "Velocidade e Core Web Vitals",
          "Meta tags e Open Graph",
          "Sitemap e indexação",
          "Acompanhamento de resultados",
        ],
        idealFor: [
          "Negócios que querem ser encontrados",
          "Lojas online",
          "Sites com tráfego",
        ],
      },
      {
        title: "Manutenção & Suporte",
        body: "O seu site sempre atualizado, seguro e no ar — sem preocupações.",
        includes: [
          "Atualizações de segurança",
          "Backups regulares",
          "Monitorização de uptime",
          "Alterações de conteúdo",
          "Suporte prioritário",
          "Relatórios periódicos",
        ],
        idealFor: [
          "Sites em produção",
          "Lojas online",
          "Plataformas e web apps",
        ],
      },
    ],
    closingNote: "Estes são os pontos de partida — não o limite.",
    closingBody:
      "Da ideia ao lançamento, construímos praticamente tudo o que vive num browser. Se imagina, nós desenvolvemos.",
    pricing: "Cada projeto é único. Orçamento sob consulta.",
    cta: "Pedir orçamento →",
  },
  en: {
    eyebrow: "25Horas Websites",
    title: "WEBSITE\nDESIGN & BUILD",
    intro1:
      "25Horas Agency designs and builds websites that are fast, beautiful and built to convert — from corporate sites to online stores, landing pages and custom platforms.",
    intro2:
      "Every project starts with your brand and your goals. We handle everything: design, development, content, SEO and maintenance.",
    includesLabel: "What's included",
    idealForLabel: "Ideal for",
    services: [
      {
        title: "Corporate Websites",
        body: "Your brand online with its own identity — a professional presence that builds trust from the very first second.",
        includes: [
          "Custom brand design",
          "Fully responsive (mobile, tablet, desktop)",
          "Multi-language",
          "Contact form",
          "Social media integration",
          "Speed optimisation",
        ],
        idealFor: [
          "Companies and SMEs",
          "Independent professionals",
          "Restaurants and clinics",
          "Brands that want to stand out",
        ],
      },
      {
        title: "Online Stores (E-commerce)",
        body: "Sell 24 hours a day with a fast, secure store that's simple to manage.",
        includes: [
          "Product catalogue",
          "Cart and checkout",
          "Payments (MB Way, card, PayPal)",
          "Stock and order management",
          "Coupons and promotions",
          "Easy admin panel",
        ],
        idealFor: [
          "Product brands",
          "Retail and local brands",
          "Anyone selling online",
        ],
      },
      {
        title: "Landing Pages",
        body: "Pages focused on a single goal: turning visitors into customers.",
        includes: [
          "Persuasive copy",
          "Conversion-driven design",
          "Forms and CTAs",
          "Analytics integration",
          "Ultra-fast loading",
          "Ready for paid campaigns",
        ],
        idealFor: [
          "Ad campaigns",
          "Product launches",
          "Events",
          "Lead generation",
        ],
      },
      {
        title: "Platforms & Web Apps",
        body: "When you need more than a website — client areas, bookings, dashboards and tools built around your business.",
        includes: [
          "Fully custom development",
          "Login areas and profiles",
          "Databases and integrations",
          "API and tool connections",
          "Dashboards and reports",
          "Built to scale",
        ],
        idealFor: [
          "Startups and SaaS",
          "Businesses with unique processes",
          "Bookings and scheduling",
        ],
      },
      {
        title: "SEO & Performance",
        body: "Show up on Google and load in an instant — because the most beautiful site is worthless if no one finds it.",
        includes: [
          "On-page optimisation",
          "Technical SEO structure",
          "Speed and Core Web Vitals",
          "Meta tags and Open Graph",
          "Sitemap and indexing",
          "Results tracking",
        ],
        idealFor: [
          "Businesses that want to be found",
          "Online stores",
          "Sites with traffic",
        ],
      },
      {
        title: "Maintenance & Support",
        body: "Your site always up to date, secure and online — worry-free.",
        includes: [
          "Security updates",
          "Regular backups",
          "Uptime monitoring",
          "Content changes",
          "Priority support",
          "Periodic reports",
        ],
        idealFor: [
          "Live websites",
          "Online stores",
          "Platforms and web apps",
        ],
      },
    ],
    closingNote: "These are starting points — not the limit.",
    closingBody:
      "From idea to launch, we build practically anything that lives in a browser. If you can imagine it, we can develop it.",
    pricing: "Every project is unique. Pricing on request.",
    cta: "Get a quote →",
  },
  es: {
    eyebrow: "25Horas Websites",
    title: "CREACIÓN DE\nSITIOS WEB",
    intro1:
      "25Horas Agency diseña y desarrolla sitios web rápidos, bonitos y pensados para convertir — desde webs corporativas hasta tiendas online, landing pages y plataformas a medida.",
    intro2:
      "Cada proyecto empieza con tu marca y tus objetivos. Nos encargamos de todo: diseño, desarrollo, contenidos, SEO y mantenimiento.",
    includesLabel: "Qué incluye",
    idealForLabel: "Ideal para",
    services: [
      {
        title: "Webs Corporativas",
        body: "Tu marca online con identidad propia — una presencia profesional que genera confianza desde el primer segundo.",
        includes: [
          "Diseño a medida de la marca",
          "100% responsive (móvil, tablet, escritorio)",
          "Multi-idioma",
          "Formulario de contacto",
          "Integración con redes sociales",
          "Optimización de velocidad",
        ],
        idealFor: [
          "Empresas y pymes",
          "Profesionales independientes",
          "Restaurantes y clínicas",
          "Marcas que quieren destacar",
        ],
      },
      {
        title: "Tiendas Online (E-commerce)",
        body: "Vende 24 horas al día con una tienda rápida, segura y fácil de gestionar.",
        includes: [
          "Catálogo de productos",
          "Carrito y checkout",
          "Pagos (MB Way, tarjeta, PayPal)",
          "Gestión de stock y pedidos",
          "Cupones y promociones",
          "Panel de gestión sencillo",
        ],
        idealFor: [
          "Marcas de producto",
          "Retail y marcas locales",
          "Quien quiere vender online",
        ],
      },
      {
        title: "Landing Pages",
        body: "Páginas centradas en un único objetivo: convertir visitantes en clientes.",
        includes: [
          "Copy persuasivo",
          "Diseño orientado a la conversión",
          "Formularios y CTAs",
          "Integración con analytics",
          "Carga ultrarrápida",
          "Lista para campañas de pago",
        ],
        idealFor: [
          "Campañas de anuncios",
          "Lanzamientos de producto",
          "Eventos",
          "Captación de leads",
        ],
      },
      {
        title: "Plataformas & Web Apps",
        body: "Cuando necesitas más que una web — áreas de cliente, reservas, dashboards y herramientas a medida de tu negocio.",
        includes: [
          "Desarrollo 100% a medida",
          "Áreas de login y perfiles",
          "Bases de datos e integraciones",
          "Conexión con APIs y herramientas",
          "Dashboards e informes",
          "Preparado para escalar",
        ],
        idealFor: [
          "Startups y SaaS",
          "Negocios con procesos propios",
          "Reservas y citas",
        ],
      },
      {
        title: "SEO & Rendimiento",
        body: "Aparece en Google y carga en un instante — porque la web más bonita no sirve de nada si nadie la encuentra.",
        includes: [
          "Optimización on-page",
          "Estructura técnica de SEO",
          "Velocidad y Core Web Vitals",
          "Meta tags y Open Graph",
          "Sitemap e indexación",
          "Seguimiento de resultados",
        ],
        idealFor: [
          "Negocios que quieren ser encontrados",
          "Tiendas online",
          "Webs con tráfico",
        ],
      },
      {
        title: "Mantenimiento & Soporte",
        body: "Tu web siempre actualizada, segura y online — sin preocupaciones.",
        includes: [
          "Actualizaciones de seguridad",
          "Copias de seguridad periódicas",
          "Monitorización de uptime",
          "Cambios de contenido",
          "Soporte prioritario",
          "Informes periódicos",
        ],
        idealFor: [
          "Webs en producción",
          "Tiendas online",
          "Plataformas y web apps",
        ],
      },
    ],
    closingNote: "Estos son puntos de partida — no el límite.",
    closingBody:
      "De la idea al lanzamiento, construimos prácticamente todo lo que vive en un navegador. Si lo imaginas, lo desarrollamos.",
    pricing: "Cada proyecto es único. Presupuesto bajo consulta.",
    cta: "Pedir presupuesto →",
  },
};

export function WebsitesView() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />

      {/* Hero full-bleed — gradiente azul + grelha digital (sem foto). Para usar
          uma imagem depois, troque este bloco por um <Image fill> como em
          StudioView, com /media/nichos/websitesop.jpg. */}
      <section className="relative w-full overflow-hidden h-[54svh] md:h-[60svh] flex items-center border-b border-canvas-white/10 pt-[104px] md:pt-[112px]">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 0% 0%, rgba(30,144,255,0.38), transparent 55%), radial-gradient(120% 120% at 100% 100%, rgba(30,144,255,0.16), transparent 50%), var(--canvas-black)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
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

      {/* Serviços */}
      <section className="px-6 md:px-12 pb-16 md:pb-20">
        <div className="max-w-[1100px] mx-auto space-y-0">
          {c.services.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 40}>
              <article className="border-t border-canvas-white/10 py-12 md:py-14 grid gap-8 md:gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display uppercase text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05]">
                    {service.title}
                  </h2>
                  <p className="mt-4 font-body text-[15px] leading-relaxed text-canvas-white/70 max-w-md">
                    {service.body}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 mb-4">
                      {c.includesLabel}
                    </h3>
                    <ul className="space-y-2.5">
                      {service.includes.map((item) => (
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
                      {c.idealForLabel}
                    </h3>
                    <ul className="space-y-2.5">
                      {service.idealFor.map((item) => (
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
            <p className="font-display uppercase text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.1] max-w-2xl">
              {c.closingNote}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={60}>
            <p className="mt-5 font-body text-[16px] leading-relaxed text-canvas-white/70 max-w-2xl">
              {c.closingBody}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.15em] text-canvas-white/50">
              {c.pricing}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
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
