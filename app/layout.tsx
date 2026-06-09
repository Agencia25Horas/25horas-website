import type { Metadata, Viewport } from "next";
import { Anton, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/lib/audio-context";
import { LanguageProvider } from "@/lib/language-context";
import { LenisProvider } from "@/lib/lenis-provider";
import { Analytics } from "@/components/chrome/Analytics";
import { GoogleTags } from "@/components/chrome/GoogleTags";
import { StickyCTA } from "@/components/chrome/StickyCTA";
import { SeamlessLoop } from "@/components/chrome/SeamlessLoop";

// Display — Anton 400 (heavy condensed). Tomatino-Heavy stand-in.
const fontDisplay = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

// Body — Source Serif 4. Editorial serif para tagline/corpo.
const fontBody = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  // utilitário (labels/eyebrows) — optional evita re-paint se a fonte chega
  // tarde; o display/body ficam em swap (não queremos texto invisível).
  display: "optional",
});

const SITE_URL = "https://25horasagency.com";

// Tema escuro forçado — diz ao browser para usar controlos nativos (inputs,
// autofill, scrollbars) em dark, evitando texto escuro-sobre-escuro.
export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "25 Horas — Cinema para marcas",
    template: "%s | 25 Horas Agency",
  },
  description:
    "Não fazemos vídeos. Fazemos filmes para marcas. 25 horas por dia. Lisboa, Portugal.",
  applicationName: "25 Horas Agency",
  keywords: [
    "agência audiovisual",
    "produção vídeo Lisboa",
    "vídeo de marca",
    "fotografia comercial",
    "gestão redes sociais",
    "restaurantes",
    "desporto",
    "imobiliário",
    "travel",
    "corporate",
    "saúde",
  ],
  authors: [{ name: "25 Horas Agency" }],
  creator: "25 Horas Agency",
  publisher: "25 Horas Agency",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "25 Horas Agency",
    title: "25 Horas — Cinema para marcas",
    description:
      "Não fazemos vídeos. Fazemos filmes para marcas. Lisboa, Portugal.",
    locale: "pt_PT",
    alternateLocale: ["en_US", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: "25 Horas — Cinema para marcas",
    description:
      "Não fazemos vídeos. Fazemos filmes para marcas. Lisboa, Portugal.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// JSON-LD LocalBusiness — schema.org markup para SEO local. Aparece no
// <head> em todas as páginas. Ajuda Google a apresentar rich snippets
// (knowledge panel, mapa, etc.).
const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "25 Horas Agency",
  description:
    "Agência audiovisual em Lisboa. Cinema para marcas — vídeo, fotografia, design e gestão de redes sociais.",
  url: SITE_URL,
  logo: `${SITE_URL}/media/logos/b25agency.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: "agencia25horas@gmail.com",
  telephone: "+351912707015",
  vatID: "PT517769034",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida da Siderurgia Nacional Nº1, Sala 105",
    addressLocality: "Aldeia de Paio Pires",
    postalCode: "2840-075",
    addressCountry: "PT",
  },
  sameAs: [
    "https://www.instagram.com/25horas.agency/",
    "https://www.facebook.com/25horasaudiovisuais/",
  ],
  areaServed: { "@type": "Country", name: "Portugal" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-PT"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect a domínios que servem assets críticos. Reduz handshake
            TLS antes da primeira request de imagem. */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_LD) }}
        />
        {/* Sem JS, os elementos com reveal-on-scroll ficariam a opacity:0.
            Este fallback garante que o conteúdo aparece à mesma. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        {/* Esconde o cookie banner ANTES do paint para quem já decidiu (sem
            flash). Para visitantes novos o banner fica visível e pinta no FCP. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('cookie-consent-v1'))document.documentElement.classList.add('cc-consented')}catch(e){}",
          }}
        />
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: "html.cc-consented .cookie-banner{display:none!important}",
          }}
        />
      </head>
      <body
        className="font-body bg-canvas-black text-canvas-white antialiased"
        suppressHydrationWarning
      >
        <a href="#main" className="skip-link">
          Saltar para o conteúdo
        </a>
        <LenisProvider>
          <LanguageProvider>
            <AudioProvider>
              {children}
              <StickyCTA />
              <SeamlessLoop />
            </AudioProvider>
          </LanguageProvider>
        </LenisProvider>
        <Analytics />
        <GoogleTags />
      </body>
    </html>
  );
}
