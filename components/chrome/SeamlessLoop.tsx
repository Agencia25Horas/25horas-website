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

    // ── REGRA DE OURO: nada aqui pode deixar o utilizador sem scroll. Toda a
    // init/medição/teleport está protegida; se QUALQUER coisa falhar, fazemos
    // fallback para scroll nativo (a página fica sempre scrollável). ─────────
    let dispose: (() => void) | null = null;
    try {
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
    // Tirar TODOS os elementos focáveis (não-âncora) da ordem de Tab: um
    // elemento aria-hidden não pode conter focáveis (WCAG 4.1.2 /
    // axe "aria-hidden-focus"). Os <a> tratam-se a seguir (mantêm-se
    // clicáveis mas com tabIndex=-1).
    clone
      .querySelectorAll<HTMLElement>(
        "button, input, select, textarea, iframe, [tabindex], [contenteditable]",
      )
      .forEach((el) => {
        el.tabIndex = -1;
      });
    // Hero do clone: o vídeo da FRENTE fica VIVO a tocar (do CACHE).
    // ANTES neutralizávamos TODOS os <video> do clone (removia src) → o hero do
    // clone ficava num FRAME CONGELADO no wrap. Mas os vídeos têm a MESMA URL dos
    // reais → o browser serve-os do disk cache (304, SEM re-download). Por isso
    // deixamos o vídeo da FRENTE a tocar (mudo, loop, playsinline) → o wrap parece
    // vivo como o hero real. Os restantes vídeos do clone (slot de trás + cards do
    // portfólio) ficam estáticos (poster) para poupar rede/decode.
    const heroClone = clone.querySelector<HTMLElement>("[data-hero-reel]");
    const heroCloneVideos = heroClone
      ? Array.from(heroClone.querySelectorAll("video"))
      : [];
    // Vídeo VIVO só no DESKTOP (hover-capable). No mobile o clone fica poster
    // estático — mais leve, sem decode extra de vídeo num device mais fraco.
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const liveVideo = hoverCapable
      ? heroCloneVideos.find((v) => {
          const op = (v as HTMLVideoElement).style.opacity;
          return op === "1" || op === "";
        }) ??
        heroCloneVideos[0] ??
        null
      : null;

    clone.querySelectorAll("video").forEach((v) => {
      const el = v as HTMLVideoElement;
      if (el === liveVideo) {
        // VIVO: toca do cache (mesma URL), SEMPRE mudo (sem fuga de áudio), loop.
        el.muted = true;
        el.defaultMuted = true;
        el.loop = true;
        el.setAttribute("playsinline", "");
        el.setAttribute("autoplay", "");
        el.preload = "auto";
      } else {
        el.removeAttribute("autoplay");
        el.removeAttribute("src");
        el.preload = "none";
        el.muted = true;
      }
    });
    // Estado de cor: desktop (hover) = P&B em repouso → cor no hover; mobile (sem
    // hover) = sempre cor. O toggle no hover do clone espelha o hero REAL (áudio +
    // cor via __heroHover); o vídeo VIVO do clone permanece SEMPRE mudo.
    const restFilter = hoverCapable ? "grayscale(1)" : "grayscale(0)";
    const setCloneFilter = (f: string) =>
      heroCloneVideos.forEach((v) => {
        (v as HTMLVideoElement).style.filter = f;
      });
    setCloneFilter(restFilter);
    const onHeroEnter = () => {
      setCloneFilter("grayscale(0)");
      window.__heroHover?.(true);
    };
    const onHeroLeave = () => {
      setCloneFilter(restFilter);
      window.__heroHover?.(false);
    };
    if (heroClone) {
      heroClone.style.pointerEvents = "auto";
      heroClone.addEventListener("mouseenter", onHeroEnter);
      heroClone.addEventListener("mouseleave", onHeroLeave);
    }
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

    // Arranca o vídeo VIVO do clone (já no DOM). O atributo autoplay+muted já
    // dispara sozinho na inserção; este play() é rede de segurança.
    if (liveVideo) {
      const p = liveVideo.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }

    // ── Medir altura do original — NÃO depende do vídeo estar carregado.
    // Se vier 0 (layout ainda não assentou), repete via rAF até ter valor
    // válido. Enquanto h<=0 o loop fica inerte (sem teleportes) → scroll nativo.
    const setH = () => {
      const h = original.offsetHeight;
      if (h > 0) origHRef.current = h;
    };
    let measureRaf = 0;
    const measureInit = () => {
      const h = original.offsetHeight;
      if (h > 0) origHRef.current = h;
      else measureRaf = requestAnimationFrame(measureInit);
    };
    measureInit();
    const ro = new ResizeObserver(setH);
    ro.observe(original);
    window.addEventListener("load", setH);

    // ── Teleporte helper (protegido) ────────────────────────────
    const teleport = (y: number) => {
      try {
        if (lenis) {
          lenis.scrollTo(y, { immediate: true, force: true });
        } else {
          window.scrollTo({ top: y, behavior: "auto" });
        }
      } catch {
        /* nunca deixar o teleport partir o scroll */
      }
    };

    // ── Scroll listener: wrap quando passamos o original ────────
    let ticking = false;
    const onScroll = () => {
      if (ticking || window.__montageActive) return;
      ticking = true;
      requestAnimationFrame(() => {
        try {
          const y = window.scrollY;
          const h = origHRef.current;
          if (h > 0 && y >= h) teleport(y - h);
        } catch {
          /* ignora */
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Wheel up no topo: jumpa para perto do fim do original ───
    // SÓ intercepta (preventDefault) se o loop está mesmo pronto a teleportar
    // (altura válida + clone existe). Caso contrário deixa o scroll nativo —
    // NUNCA prender o utilizador no topo.
    const onWheel = (e: WheelEvent) => {
      if (window.__montageActive) return;
      const h = origHRef.current;
      if (window.scrollY <= 0 && e.deltaY < 0 && h > 0 && cloneRef.current) {
        e.preventDefault();
        teleport(h + e.deltaY); // deltaY negativo → posição antes do fim
      }
    };
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });

    // ── Keyboard up no topo ─────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (window.__montageActive) return;
      const h = origHRef.current;
      if (
        window.scrollY <= 0 &&
        h > 0 &&
        cloneRef.current &&
        ["ArrowUp", "PageUp", "Home"].includes(e.key)
      ) {
        e.preventDefault();
        teleport(h - window.innerHeight);
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });

    dispose = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey, { capture: true });
      window.removeEventListener("load", setH);
      if (measureRaf) cancelAnimationFrame(measureRaf);
      if (heroClone) {
        heroClone.removeEventListener("mouseenter", onHeroEnter);
        heroClone.removeEventListener("mouseleave", onHeroLeave);
      }
      ro.disconnect();
      // Pára o decoder do vídeo vivo antes de remover o clone (sem órfãos ao
      // re-criar o clone em navegação / init do Lenis).
      if (liveVideo) {
        liveVideo.pause();
        liveVideo.removeAttribute("src");
      }
      clone.remove();
      cloneRef.current = null;
    };
    } catch (err) {
      // Init do loop falhou → FALLBACK total para scroll nativo. Limpa o que
      // tiver sido criado (clone órfão incluído) e não atribui listeners.
      if (typeof console !== "undefined") {
        console.warn(
          "[SeamlessLoop] desligado — fallback para scroll nativo:",
          err,
        );
      }
      try {
        dispose?.();
      } catch {
        /* ignora */
      }
      try {
        cloneRef.current?.remove();
        cloneRef.current = null;
      } catch {
        /* ignora */
      }
      dispose = null;
    }

    // (#13) `pathname` na dep array → o efeito re-corre em cada navegação
    // client-side: o cleanup remove o clone antigo e recria-se um fresco para
    // a nova página (ou salta, se for rota destination). Acaba com o bug do
    // "bloqueia depois de navegar entre várias páginas" (clone fantasma stale).
    return () => {
      try {
        dispose?.();
      } catch {
        /* ignora */
      }
    };
  }, [lenis, lang, pathname, router]);

  return null;
}
