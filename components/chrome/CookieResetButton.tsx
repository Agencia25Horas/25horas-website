"use client";

/** Limpa o consentimento guardado e recarrega → o banner volta a aparecer. */
export function CookieResetButton() {
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem("cookie-consent-v1");
        window.location.reload();
      }}
      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-canvas-white/30 font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white hover:bg-canvas-white hover:text-canvas-black transition-colors"
    >
      Repor preferências de cookies
    </button>
  );
}
