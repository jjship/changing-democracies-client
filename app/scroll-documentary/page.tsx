import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "@/utils/admin/bunny-methods";
import { serializeFilmsCollection } from "@/utils/films-methods";
import { sectionPadding } from "../components/Section";
import { serializeVideoSource } from "./videoSource";
import ScrollDocumentary from "./ScrollDocumentary";

export default async function FreeBrowsingPage() {
  try {
    const videosData = await getVideosPerCollection({
      cacheOptions: { next: { revalidate: 3600 } },
      collectionKey: "default",
    });

    const videoSources = videosData.data.map((video) =>
      serializeVideoSource(video),
    ); // TODO JAC change to take all sources

    return (
      <main>
        <div className="relative h-[100vh] overflow-clip">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <div
            className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[calc(90vh-40px)] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
          >
            <ScrollDocumentary videoSources={[videoSources[0]]} />
          </div>
        </div>
      </main>
    );
  } catch (err) {
    console.error("Failed to fetch video sources:", err);
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Failed to load content</h1>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }
}
