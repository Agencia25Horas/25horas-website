"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/language-context";

const CONSENT_KEY = "cookie-consent-v1";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    setOpen(
      typeof window !== "undefined" && !localStorage.getItem(CONSENT_KEY),
    );
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    // Avisa o Analytics (que carrega/não carrega o Plausible) sem reload.
    window.dispatchEvent(new Event("cookie-consent"));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={t("cookie.text")}
      data-no-clone
      className="bg-accent-grade text-canvas-black text-[11px] md:text-[12px] py-2.5 px-4 md:px-8"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="leading-snug">
          {t("cookie.text")}{" "}
          <Link
            href="/cookies"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {t("cookie.saberMais")}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="uppercase tracking-wider hover:opacity-80"
          >
            {t("cookie.rejeitar")}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="uppercase tracking-wider font-semibold bg-canvas-white text-canvas-black px-3 py-1 rounded-full hover:opacity-85"
          >
            {t("cookie.aceitar")}
          </button>
        </div>
      </div>
    </div>
  );
}
