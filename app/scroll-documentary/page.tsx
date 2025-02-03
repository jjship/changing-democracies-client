import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "@/utils/admin/bunny-methods";
import { serializeFilmsCollection } from "@/utils/films-methods";

import { serializeVideoSource } from "./videoSource";
import ScrollDocumentary from "./ScrollDocumentary";
import { cache } from "react";
import { VideoSource } from "../../types/scrollDocumentary";

const getSerializedAndSortedVideos = cache(async (videosData: any) => {
  return videosData.data
    .map((video: any) => serializeVideoSource(video))
    .sort((a: VideoSource, b: VideoSource) => {
      const aNum = parseInt(a.title?.match(/^(\d+)/)?.[1] || "0");
      const bNum = parseInt(b.title?.match(/^(\d+)/)?.[1] || "0");

      return aNum - bNum;
    });
});

export default async function ScrollDocumentaryPage() {
  try {
    const videosData = await getVideosPerCollection({
      cacheOptions: { next: { revalidate: 3600 } },
      collectionKey: "scroll-documentary",
    });

    const videoSources = await getSerializedAndSortedVideos(videosData);

    return <ScrollDocumentary videoSources={videoSources} />;
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
