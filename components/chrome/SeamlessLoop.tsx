"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "@/lib/lenis-provider";
import { useLang } from "@/lib/language-context";

// Rotas onde o loop infinito NÃO se aplica (forms / conteúdo curto destination).
// Em /orcamento o loop não faz sentido e atrapalhava o form. Acrescentar aqui
// outras se preciso (ex.: "/contactos").
const NO_LOOP_ROUTES = ["/orcamento"];

function shouldSkip(pathname: string) {
  return NO_LOOP_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );
}

/**
 * Loop visualmente infinito por CLONAGEM do DOM.
 *
 * Estratégia (sem teleporte perceptível):
 *   1. Após mount, clonamos o <main id="main"> via DOM e inserimos logo após.
 *   2. Quando scrollY passa o fim do original e entra no clone, o utilizador
 *      vê EXACTAMENTE o mesmo conteúdo (é uma cópia visual). Nesse momento
 *      teleportamos para a posição equivalente no original — o salto é
 *      invisível porque o conteúdo é igual pixel a pixel.
 *   3. Para scroll up no topo, interceptamos wheel/keyboard (o browser não
 *      permite scrollY < 0 nativo) e teleportamos para o equivalente no fim.
 *
 * Trade-offs aceites:
 *   • DOM duplicado (mais memória — aceitável neste site)
 *   • Scrollbar não reflecte o loop (mostra posição linear)
 *   • Clone é inert (sem interactividade) — só visual
 *   • aria-hidden + inert → screen readers e crawlers ignoram
 */
export function SeamlessLoop() {
  const lenis = useLenis();
  // O clone é um snapshot estático do #main no momento do efeito. Se a língua
  // mudar, o #main real re-renderiza mas o clone não — ficaria preso na língua
  // antiga (bug: PT selecionado mas o clone mostra EN no scroll infinito).
  // Depender de `lang` força o efeito a recriar o clone na língua atual.
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const cloneRef = useRef<HTMLElement | null>(null);
  const origHRef = useRef(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    // (#9) Skip em rotas destination (ex.: /orcamento) — loop não se aplica.
    // Como `pathname` está nas deps, ao navegar PARA cá o cleanup do efeito
    // anterior já correu e removeu o clone da página de onde viemos.
    if (shouldSkip(pathname)) return;
    const original = document.getElementById("main");
    if (!original) return;

    // ── Criar clone visual ──────────────────────────────────────
    const clone = original.cloneNode(true) as HTMLElement;
    clone.id = "main-clone";
    clone.setAttribute("aria-hidden", "true");
    clone.style.pointerEvents = "none";
    // CRÍTICO: remover o header fixo do clone — senão renderiza um header
    // fantasma sobreposto ao real (ambos são position:fixed top-0).
    clone.querySelector("#main-header")?.remove();
    // Remover IDs duplicados (anchors, form fields, secções, etc.)
    clone.querySelectorAll("[id]").forEach((el) => {
      (el as HTMLElement).removeAttribute("id");
    });
    // Forçar [data-reveal] visíveis no clone (sem re-animar)
    clone.querySelectorAll("[data-reveal]").forEach((el) => {
      (el as HTMLElement).setAttribute("data-reveal", "in");
    });
    // Remover UI stateful que não deve aparecer no clone (CookieBanner,
    // toasts, etc). Marca-se com data-no-clone na componente original.
    clone.querySelectorAll("[data-no-clone]").forEach((el) => el.remove());
    // Re-activar pointer events nas âncoras do clone para que cliques naveguem.
    // (#19) Para LINKS INTERNOS usamos router.push em vez do <a> nativo: a
    // navegação nativa do clone competia com o teleport de scroll → a 1ª
    // clicada "voltava ao topo da home" e só a 2ª funcionava. O router.push
    // navega de forma determinística, sem corrida com o teleport.
    // tabIndex=-1 mantém-nas fora da ordem do Tab (acessibilidade).
    clone.querySelectorAll("a[href]").forEach((a) => {
      const el = a as HTMLAnchorElement;
      el.style.pointerEvents = "auto";
      el.tabIndex = -1;
      const href = el.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("//")) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          router.push(href);
        });
      }
    });
    original.parentNode?.insertBefore(clone, original.nextSibling);
    cloneRef.current = clone;

    // ── Medir altura do original (recalcular em resize e load) ──
    const measure = () => {
      origHRef.current = original.offsetHeight;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(original);
    window.addEventListener("load", measure);

    // ── Teleporte helper ────────────────────────────────────────
    const teleport = (y: number) => {
      if (lenis) {
        lenis.scrollTo(y, { immediate: true, force: true, lock: true });
      } else {
        window.scrollTo({ top: y, behavior: "auto" });
      }
    };

    // ── Scroll listener: wrap quando passamos o original ────────
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = origHRef.current;
        if (h > 0 && y >= h) {
          teleport(y - h);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Wheel up no topo: jumpa para perto do fim do original ───
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY <= 0 && e.deltaY < 0) {
        e.preventDefault();
        const h = origHRef.current;
        if (h > 0) teleport(h + e.deltaY); // deltaY negativo → posição antes do fim
      }
    };
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    // ── Keyboard up no topo ─────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (
        window.scrollY <= 0 &&
        ["ArrowUp", "PageUp", "Home"].includes(e.key)
      ) {
        e.preventDefault();
        const h = origHRef.current;
        if (h > 0) teleport(h - window.innerHeight);
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey, { capture: true });
      window.removeEventListener("load", measure);
      ro.disconnect();
      clone.remove();
      cloneRef.current = null;
    };
    // (#13) `pathname` na dep array → o efeito re-corre em cada navegação
    // client-side: o cleanup remove o clone antigo e recria-se um fresco para
    // a nova página (ou salta, se for rota destination). Acaba com o bug do
    // "bloqueia depois de navegar entre várias páginas" (clone fantasma stale).
  }, [lenis, lang, pathname, router]);

  return null;
}
