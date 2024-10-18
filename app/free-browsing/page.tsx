import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
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
      <div className="relative h-[100vh] overflow-clip">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto h-[85vh] max-w-[23.125rem] rounded-3xl bg-black_bg md:max-w-[64rem] xl:max-w-[90rem] ${sectionPadding.x}  overflow-auto pb-5 md:pb-14 xl:pb-40`}
        >
          <FreeBrowsing filmsCollection={filmsCollection} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
      </div>
    </main>
  );
}
