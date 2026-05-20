"use client";

import { useEffect, useState } from "react";

// Returns true exactly once per browser, until `dismiss()` is called.
// Used to surface the SOM hint to first-time visitors only.
export function useFirstVisit(key: string) {
  const [first, setFirst] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(`25h.seen.${key}`);
    if (!seen) setFirst(true);
  }, [key]);

  const dismiss = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`25h.seen.${key}`, "1");
    setFirst(false);
  };

  return { first, dismiss };
}
