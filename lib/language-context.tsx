"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  NICHE_CONTENT,
  SERVICE_ITEMS_EN,
  TRANSLATIONS,
  type Lang,
} from "./i18n";

const LS_KEY = "25h.lang";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tNiche: (slug: string) => { label: string; tagline: string };
  tItem: (ptString: string) => string;
};

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LS_KEY) as Lang | null;
    if (stored === "pt" || stored === "en") setLangState(stored);
  }, []);

  // Sincroniza <html lang> com a língua actual.
  // Server-render começa com "pt" (default no layout); ao hidratar, este
  // efeito actualiza para "en" se o utilizador tinha escolhido EN — screen
  // readers e Google passam a respeitar a língua real.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LS_KEY, l);
    }
  };

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang,
      t: (key) => TRANSLATIONS[lang][key] ?? TRANSLATIONS.pt[key] ?? key,
      tNiche: (slug) =>
        NICHE_CONTENT[lang][slug] ??
        NICHE_CONTENT.pt[slug] ?? { label: slug, tagline: "" },
      tItem: (pt) => (lang === "en" ? SERVICE_ITEMS_EN[pt] ?? pt : pt),
    }),
    [lang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang must be used inside <LanguageProvider>");
  return v;
}
