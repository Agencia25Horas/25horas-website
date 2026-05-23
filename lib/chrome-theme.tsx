"use client";

import { createContext, useContext, type ReactNode } from "react";

export type ChromeTheme = "dark" | "light";

const Ctx = createContext<ChromeTheme>("dark");

export function ChromeThemeProvider({
  theme,
  children,
}: {
  theme: ChromeTheme;
  children: ReactNode;
}) {
  return <Ctx.Provider value={theme}>{children}</Ctx.Provider>;
}

export function useChromeTheme(): ChromeTheme {
  return useContext(Ctx);
}
