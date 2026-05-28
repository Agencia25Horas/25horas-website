import Script from "next/script";

/**
 * Plausible analytics — privacy-friendly, sem cookies (não precisa de
 * consentimento GDPR para tracking, ao contrário do GA).
 *
 * Setup:
 *   1. Criar site em https://plausible.io (free trial 30 dias, depois ~9 €/mês)
 *      OU self-host (https://plausible.io/docs/self-hosting)
 *   2. Adicionar variável NEXT_PUBLIC_PLAUSIBLE_DOMAIN=25horasagency.com em .env.local
 *      (opcional: NEXT_PUBLIC_PLAUSIBLE_SRC para self-hosted; default = plausible.io)
 *   3. Deploy.
 *
 * Sem env var → componente não renderiza nada. Site continua a funcionar.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ||
    "https://plausible.io/js/script.outbound-links.js";

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
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

/** Helper para disparar eventos custom (form submit, CTA click, etc.). */
export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
