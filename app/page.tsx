import { HomeView } from "./HomeView";
import { fetchSiteContent } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const siteContent = await fetchSiteContent();
  return <HomeView siteContent={siteContent} />;
}
