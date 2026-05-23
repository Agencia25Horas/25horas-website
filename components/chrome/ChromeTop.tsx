import { Wordmark } from "./Wordmark";
import { LangToggle } from "./LangToggle";
import { NavOpener } from "./NavOpener";
import { AudioToggle } from "./AudioToggle";
import { ChromeThemeProvider, type ChromeTheme } from "@/lib/chrome-theme";

export function ChromeTop({ theme = "dark" }: { theme?: ChromeTheme }) {
  const surface =
    theme === "light"
      ? "bg-canvas-white border-b border-black/10"
      : "bg-canvas-black border-b border-chrome-line";

  return (
    <ChromeThemeProvider theme={theme}>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[var(--chrome-h-mobile)] md:h-[var(--chrome-h)] ${surface} flex items-center justify-between px-4 md:px-6`}
        role="banner"
      >
        <Wordmark />
        <nav className="flex items-center gap-4 md:gap-6" aria-label="Chrome">
          <LangToggle />
          <NavOpener />
          <AudioToggle />
        </nav>
      </header>
    </ChromeThemeProvider>
  );
}
