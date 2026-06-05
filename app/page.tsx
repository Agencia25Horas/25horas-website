import { HomeView } from "./HomeView";
import { fetchSiteContent, fetchNichePhotos } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [siteContent, nichePhotos] = await Promise.all([
    fetchSiteContent(),
    fetchNichePhotos(),
  ]);
  return <HomeView siteContent={siteContent} nichePhotos={nichePhotos} />;
}
