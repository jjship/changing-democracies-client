import { getVideosPerCollection } from "@/utils/admin/bunny-methods";
import { cache } from "react";

import { serializeVideoSource } from "./videoSource";
import ScrollDocumentary from "./ScrollDocumentary";
import { VideoSource } from "../../types/scrollDocumentary";
import { VideoDbEntry } from "../../types/videosAndFilms";
import { assignVideoSourcesToSlides } from "./slides/slides";

const getSerializedAndSortedVideos = cache(
  async (videos: VideoDbEntry[], browserLang: string) => {
    const availableLanguageCodes: { [key: string]: string } = {};
    const videoSources = videos
      .map((video: VideoDbEntry) => {
        const serialized = serializeVideoSource(video);
        // Sort subtitles to prefer browser language
        if (serialized.availableSubtitles) {
          serialized.availableSubtitles.forEach(
            (sub) => (availableLanguageCodes[sub.label] = sub.languageCode),
          );
        }
        return serialized;
      })
      .sort((a: VideoSource, b: VideoSource) => {
        const aNum = parseInt(a.title?.match(/^(\d+)/)?.[1] || "0");
        const bNum = parseInt(b.title?.match(/^(\d+)/)?.[1] || "0");
        return aNum - bNum;
      });

    const slidesWithSources = assignVideoSourcesToSlides({ videoSources });

    const initialLanguageLabel = availableLanguageCodes[browserLang]
      ? browserLang
      : "EN";

    return { slidesWithSources, initialLanguageLabel, availableLanguageCodes };
  },
);

export default async function ScrollDocumentaryPage() {
  const browserLang = "EN";

  try {
    const videosData = await getVideosPerCollection({
      cacheOptions: { next: { revalidate: 5 * 60 } },
      collectionKey: "scroll-documentary",
    });

    const { slidesWithSources, initialLanguageLabel, availableLanguageCodes } =
      await getSerializedAndSortedVideos(videosData.data, browserLang);

    return (
      <ScrollDocumentary
        slidesWithSources={slidesWithSources}
        initialLanguageLabel={initialLanguageLabel}
        availableLanguageCodes={availableLanguageCodes}
      />
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
