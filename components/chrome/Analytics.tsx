"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent-v1";

/**
 * Plausible analytics — privacy-friendly, mas só carrega DEPOIS de
 * consentimento explícito (cookie-consent-v1 === "accepted"). Reage ao evento
 * "cookie-consent" disparado pelo CookieBanner, sem precisar de reload.
 * Sem env var OU sem consentimento → não renderiza nada.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const [consented, setConsented] = useState(false);
  // Só carrega quando o host é mesmo o domínio Plausible (produção) — nunca em
  // localhost nem nos previews .vercel.app.
  const [isProdHost, setIsProdHost] = useState(false);

  useEffect(() => {
    setIsProdHost(window.location.hostname === domain);
    const read = () =>
      setConsented(localStorage.getItem(CONSENT_KEY) === "accepted");
    read();
    window.addEventListener("cookie-consent", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("cookie-consent", read);
      window.removeEventListener("storage", read);
    };
  }, [domain]);

  if (!domain || !consented || !isProdHost) return null;

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ||
    "https://plausible.io/js/script.outbound-links.js";

  return (
    <Script defer data-domain={domain} src={src} strategy="afterInteractive" />
  );
}

/** Tipagem do `window.plausible` para event tracking custom. */
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

/** Dispara eventos custom (no-op se o Plausible não carregou — ex.: sem consent). */
export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  // Nunca dispara fora de produção (host !== domínio Plausible).
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (domain && window.location.hostname !== domain) return;
  window.plausible?.(event, props ? { props } : undefined);
}
