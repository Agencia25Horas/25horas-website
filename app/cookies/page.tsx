import type { Metadata } from "next";
import { CookiesView } from "./CookiesView";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Que cookies e armazenamento o site usa, e como gerir o teu consentimento.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <CookiesView />;
}
