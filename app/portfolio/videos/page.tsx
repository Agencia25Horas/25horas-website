import { redirect } from "next/navigation";

// Rota antiga (FOTOGRAFIAS/VÍDEOS no topo) → agora o portefólio é nicho-primeiro.
export default function VideosRedirect() {
  redirect("/portfolio");
}
