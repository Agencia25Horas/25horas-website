import type { Metadata } from "next";
import { NotFoundView } from "./NotFoundView";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
