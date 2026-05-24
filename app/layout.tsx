import type { Metadata } from "next";
import { Fraunces, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/lib/audio-context";
import { LenisProvider } from "@/lib/lenis-provider";
import { NavProvider } from "@/lib/nav-context";
import { NavOverlay } from "@/components/chrome/NavOverlay";

// Fraunces stands in for Adobe's Ivypresto Text (the serif Tomatino uses for
// titles). Modern high-contrast serif with optical sizing — closest free match.
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Nunito stands in for Adobe's Atten Round New (the rounded sans Tomatino uses
// for body / UI). Rounded geometric sans — closest free match.
const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "25 Horas — Cinema para marcas",
  description:
    "Não fazemos vídeos. Fazemos filmes para marcas. 25 frames por segundo, 25 horas por dia.",
  metadataBase: new URL("https://25horasagency.com"),
  openGraph: {
    title: "25 Horas",
    description: "Cinema para marcas.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${serif.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-body bg-canvas-black text-type-neutral antialiased"
        suppressHydrationWarning
      >
        <LenisProvider>
          <NavProvider>
            <AudioProvider>
              {children}
              <NavOverlay />
            </AudioProvider>
          </NavProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
