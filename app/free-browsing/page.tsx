import Section from "@/components/Section";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "../../utils/admin/bunny-methods";
import { serializeFilmsCollection } from "../../utils/films-methods";

export default async function FreeBrowsingPage() {
  const filmsData = await getVideosPerCollection({
    next: { revalidate: 3600 },
  });

  const filmsCollection = serializeFilmsCollection({ videos: filmsData.data });

  return (
    <main>
      <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
      <Section id="free_browsing" theme="dark">
        <div className="h-m"></div>
        <FreeBrowsing filmsCollection={filmsCollection} />
      </Section>
    </main>
  );
}
