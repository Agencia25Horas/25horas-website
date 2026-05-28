"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/language-context";

const KEY = "25h-cookie-dismissed";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    setOpen(typeof window !== "undefined" && !localStorage.getItem(KEY));
  }, []);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={t("cookie.text")}
      data-no-clone
      className="bg-accent-grade text-canvas-white text-[11px] md:text-[12px] py-2 px-4 md:px-8"
    >
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-4">
        <p className="leading-tight">{t("cookie.text")}</p>
        <button
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setOpen(false);
          }}
          aria-label={t("cookie.close")}
          className="shrink-0 uppercase tracking-wider hover:opacity-80"
        >
          {t("cookie.close")}
        </button>
      </div>
    </div>
  );
}
