"use client";

import { createContext, useCallback, useContext, useState } from "react";

type NavCtx = {
  open: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
};

const Ctx = createContext<NavCtx | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openNav = useCallback(() => setOpen(true), []);
  const closeNav = useCallback(() => setOpen(false), []);
  const toggleNav = useCallback(() => setOpen((v) => !v), []);
  return (
    <Ctx.Provider value={{ open, openNav, closeNav, toggleNav }}>
      {children}
    </Ctx.Provider>
  );
}

export function useNav() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNav must be used inside <NavProvider>");
  return v;
}
