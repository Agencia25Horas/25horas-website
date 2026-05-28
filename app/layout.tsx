import type { Metadata } from "next";
import { Anton, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/lib/audio-context";
import { LanguageProvider } from "@/lib/language-context";
import { LenisProvider } from "@/lib/lenis-provider";
import { Analytics } from "@/components/chrome/Analytics";
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
  display: "swap",
});

const SITE_URL = "https://25horasagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "25 Horas — Cinema para marcas",
    template: "%s — 25 Horas",
  },
  description:
    "Não fazemos vídeos. Fazemos filmes para marcas. 25 frames por segundo, 25 horas por dia. Lisboa, Portugal.",
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
    alternateLocale: ["en_US"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
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
      </body>
    </html>
  );
}
