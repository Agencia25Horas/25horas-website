// Case catalogue — one demo case shipped, the rest stubbed until 25Horas
// delivers real footage and credits. Swap with Sanity-backed data later.

import type { Programme } from "./programa";

export type Case = {
  slug: string;
  programmeSlug: Programme["slug"];
  title: string;
  client: string;
  year: number;
  scene: string; // "CENA 02 · TAKE 01"
  director: string;
  dop: string;
  producer: string;
  editor: string;
  colorist: string;
  composer: string;
  durationFrames: string; // "00:01:32:14"
  location: string;
  date: string; // "2026.03"
  /** Hero film URL — uses placeholder for the demo case. */
  videoSrc: string;
  /** Behind-the-scenes stills with captions. */
  bts: Array<{ src: string; caption: string }>;
  /** Tagline shown under the case title on the poster. */
  tagline: string;
  /** Slug of the next case to surface at end. */
  nextSlug?: string;
};

export const CASES: Case[] = [
  {
    slug: "vila-gale-colecao",
    programmeSlug: "hospitalidade",
    title: "VILA GALÉ COLEÇÃO",
    client: "VILA GALÉ",
    year: 2026,
    scene: "CENA 02 · TAKE 01",
    director: "ANA P. SANTOS",
    dop: "JOÃO MENDES",
    producer: "MIGUEL ROCHA",
    editor: "25 HORAS · POST",
    colorist: "ESTÚDIO ATLÂNTICO",
    composer: "CARMINHO",
    durationFrames: "00:01:32:14",
    location: "ALGARVE",
    date: "2026.03",
    videoSrc: "/media/hero.mp4",
    bts: [
      { src: "/media/bts-02.jpg", caption: "Dia 1 · 04:14 · primeira luz" },
      { src: "/media/bts-06.jpg", caption: "Set · sala dos tetos" },
      { src: "/media/bts-11.jpg", caption: "Última take, 22:30" },
    ],
    tagline: "Um filme curto sobre hotéis que duram.",
  },
];

export function findCase(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug);
}
