"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent-v1";

/**
 * Google Tag Manager + Google Analytics 4 — só carregam DEPOIS de
 * consentimento explícito (cookie-consent-v1 === "accepted"), tal como o
 * Plausible. Reage ao evento "cookie-consent" do CookieBanner sem reload.
 *
 * Ativam-se por env var (definir só em produção, na Vercel):
 *   • NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX   (container do Tag Manager)
 *   • NEXT_PUBLIC_GA_ID  = G-XXXXXXXXXX  (GA4 — opcional se o GA já estiver
 *                                          configurado DENTRO do GTM)
 * Sem env var → não renderiza nada (zero impacto em dev/preview).
 *
 * Nota: se medires o GA4 a partir de uma tag dentro do GTM, NÃO definas
 * também NEXT_PUBLIC_GA_ID (senão contas page views em duplicado).
 */
export function GoogleTags() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () =>
      setConsented(localStorage.getItem(CONSENT_KEY) === "accepted");
    read();
    window.addEventListener("cookie-consent", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("cookie-consent", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  if (!consented || (!gtmId && !gaId)) return null;

  return (
    <>
      {gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
