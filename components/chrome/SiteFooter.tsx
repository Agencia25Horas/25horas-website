"use client";

import { useLang } from "@/lib/language-context";

function IconLink({
  href,
  label,
  d,
  viewBox = "0 0 24 24",
}: {
  href: string;
  label: string;
  d: string;
  viewBox?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-canvas-white/60 hover:bg-canvas-white hover:text-canvas-black transition-colors"
    >
      <svg viewBox={viewBox} className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer
      id="contactos"
      className="bg-canvas-black text-canvas-white text-center py-6 md:py-8 px-6"
      role="contentinfo"
    >
      <div className="max-w-3xl mx-auto">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <IconLink
              href="https://facebook.com/25horas.agency"
              label="Facebook"
              d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.14 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.9h-2.33v7c4.78-.76 8.44-4.9 8.44-9.9z"
            />
          </li>
          <li aria-hidden className="text-canvas-white/60">•</li>
          <li>
            <IconLink
              href="https://instagram.com/25horas.agency"
              label="Instagram"
              d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.15C.32 4.9.12 5.78.06 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.9.31.8.73 1.48 1.39 2.14a5.9 5.9 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.9-.56.8-.31 1.48-.73 2.14-1.39a5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.9a5.9 5.9 0 0 0-1.39-2.14A5.9 5.9 0 0 0 19.85.62c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
            />
          </li>
          <li aria-hidden className="text-canvas-white/60">•</li>
          <li>
            <IconLink
              href="https://www.livroreclamacoes.pt"
              label="Livro de Reclamações"
              d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.42l-4.83-4.83A2 2 0 0 0 14.17 2H5zm0 2h9v4a2 2 0 0 0 2 2h4v10H5V5zm2 8v2h10v-2H7zm0 4v2h7v-2H7z"
            />
          </li>
        </ul>

        <p className="mt-4 font-body text-[12px] opacity-80">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
