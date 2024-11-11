import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "../../utils/admin/bunny-methods";
import { serializeFilmsCollection } from "../../utils/films-methods";
import { sectionPadding } from "../components/Section";
import NarrationsContinueView from "@/components/NarrationsContinueView";

export default async function FreeBrowsingPage() {
  // const fragment = await getNationsFragment({
  //   next: { revalidate: 3600 },
  // });
  const fragment = {
    sequence: 8,
    otherPaths: [],
    description: "lorem ipsum",
    guid: "d14be9c5-e330-413a-8436-145a853e5e18",
    title: "CD_GREECE_Petros Pizanias_Quote 4.mp4",
    length: 15,
    tags: [],
    person: "Petros Pizanias",
    country: "GREECE",
    playerUrl:
      "https://iframe.mediadelivery.net/embed/226154/d14be9c5-e330-413a-8436-145a853e5e18?autoplay=false",
    thumbnailUrl:
      "https://vz-eb5d6b10-75c.b-cdn.net/d14be9c5-e330-413a-8436-145a853e5e18/thumbnail.jpg",
  };
  return (
    <main>
      <div className="relative h-[100vh] overflow-clip">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[calc(90vh-40px)] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
        >
          <NarrationsContinueView fragment={fragment} />
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
