import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "../../utils/admin/bunny-methods";
import { serializeFilmsCollection } from "../../utils/films-methods";
import { sectionPadding } from "../components/Section";

export default async function FreeBrowsingPage() {
  const filmsData = await getVideosPerCollection({
    next: { revalidate: 3600 },
  });

  const filmsCollection = serializeFilmsCollection({ videos: filmsData.data });

  return (
    <main>
      <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
      <div
        className={`m-auto max-w-[23.125rem] md:max-w-[64rem] xl:max-w-[90rem] ${sectionPadding.x} ${sectionPadding.y}`}
      >
        <FreeBrowsing filmsCollection={filmsCollection} />
      </div>
    </main>
  );
}
