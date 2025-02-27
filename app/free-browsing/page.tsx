import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "../../utils/admin/bunny-methods";
import { serializeFilmsCollection } from "../../utils/films-methods";
import { sectionPadding } from "../components/Section";
import { cache } from "react";

const getFilmsCollection = cache(async () => {
  const filmsData = await getVideosPerCollection({
    collectionKey: "default",
    cacheOptions: {
      next: { revalidate: 3600 },
    },
  });
  return serializeFilmsCollection({ videos: filmsData.data });
});

export default async function FreeBrowsingPage() {
  const filmsCollection = await getFilmsCollection();

  return (
    <main>
      <div className="relative h-[100vh] overflow-clip">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[calc(90vh-40px)] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
        >
          <FreeBrowsing filmsCollection={filmsCollection} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
        <Image
          src={logoDark}
          alt="changing democracies logo"
          className="sticky bottom-2 m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
        />
      </div>
    </main>
  );
}
