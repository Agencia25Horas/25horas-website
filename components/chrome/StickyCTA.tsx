"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/language-context";

/**
 * CTA pill flutuante mobile-only — sempre visível para conversão.
 * Esconde nas páginas onde o CTA já é central (/orcamento, /contactos).
 */
const HIDE_ON: string[] = ["/orcamento", "/contactos"];

export function StickyCTA() {
  const pathname = usePathname();
  const { t } = useLang();

  if (HIDE_ON.includes(pathname)) return null;

  return (
    <div className="lg:hidden fixed bottom-4 inset-x-4 z-40 pointer-events-none">
      <Link
        href="/orcamento"
        className="pointer-events-auto block w-full text-center px-6 py-3.5 rounded-full bg-canvas-white text-canvas-black font-mono text-[12px] uppercase tracking-[0.15em] shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:opacity-90 transition-opacity"
      >
        {t("common.pedirOrcamento")}
      </Link>
    </div>
  );
}
