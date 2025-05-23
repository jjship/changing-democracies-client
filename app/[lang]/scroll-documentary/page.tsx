import { getVideo } from "@/utils/admin/bunny-methods";
import { cache } from "react";
import { Suspense } from "react";

import { serializeVideoSource } from "@/components/scrollDocumentary/videoSource";
import ScrollDocumentary from "@/components/scrollDocumentary/ScrollDocumentary";
import { VideoSource } from "@/types/scrollDocumentary";
import { VideoDbEntry } from "@/types/videosAndFilms";
import { slides } from "@/components/scrollDocumentary/slides/slides";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "../context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";

// Increase cache time and optimize data fetching
const getSerializedAndSortedVideos = cache(
  async ({ lang }: { lang: string }) => {
    const langLabel = lang.toUpperCase();
    const videosResult = await Promise.all(
      slides
        .filter(({ videoId }) => videoId !== undefined)
        .map((slide) => getVideo(slide.videoId as string)),
    );

    const videos = videosResult
      .filter((res) => res.success)
      .flatMap((res) => res.data);

    const videoSources = videos.reduce(
      (prev, video: VideoDbEntry) =>
        prev.set(video.guid, serializeVideoSource(video)),
      new Map<string, VideoSource>(),
    );

    const availableLanguageLabels = new Set<string>(
      videos.flatMap((vs) => vs.captions.map((cap) => cap.label)),
    );

    const slidesWithSources = slides.map((slide) => ({
      ...slide,
      videoSource: slide.videoId ? videoSources.get(slide.videoId) : undefined,
    }));

    const initialLanguageLabel = availableLanguageLabels.has(langLabel)
      ? langLabel
      : "EN";

    return {
      slidesWithSources,
      initialLanguageLabel,
      availableLanguageLabels: Array.from(availableLanguageLabels),
    };
  },
);

// Loading component
function DocumentaryLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-yellow_secondary border-t-transparent"></div>
        <p>Loading documentary...</p>
      </div>
    </div>
  );
}

// Documentary content component
async function DocumentaryContent({ lang }: { lang: string }) {
  try {
    const dictionary = await getDictionary(lang.toLowerCase() as CDLanguages);
    const { slidesWithSources } = await getSerializedAndSortedVideos({
      lang,
    });

    return (
      <TranslationProvider dictionary={dictionary}>
        <ScrollDocumentary slidesWithSources={slidesWithSources} />
      </TranslationProvider>
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

export default function ScrollDocumentaryPage({ params: { lang } }: LangParam) {
  return (
    <Suspense fallback={<DocumentaryLoading />}>
      <DocumentaryContent lang={lang} />
    </Suspense>
  );
}
