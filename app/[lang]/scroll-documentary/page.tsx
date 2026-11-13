import { getVideo } from "@/utils/bunny-stream";
import { Suspense } from "react";

import { serializeVideoSource } from "@/components/scrollDocumentary/videoSource";
import { ScrollDocumentary } from "@/components/scrollDocumentary/ScrollDocumentary";
import {
  slides,
  SlideWithSource,
} from "@/components/scrollDocumentary/slides/slides";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "../context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";

// Enable ISR: regenerate every 65 minutes (offset from narratives' 60min to avoid simultaneous revalidation bursts)
export const revalidate = 3900;

async function getSlidesWithSources(): Promise<SlideWithSource[]> {
  const videosResult = await Promise.all(
    slides.flatMap(({ videoId }) => (videoId ? [getVideo(videoId)] : [])),
  );

  const videoSources = new Map(
    videosResult
      .filter((res) => res.success)
      .flatMap((res) => res.data)
      .map((video) => [video.guid, serializeVideoSource(video)]),
  );

  return slides.map((slide) => ({
    ...slide,
    videoSource: slide.videoId ? videoSources.get(slide.videoId) : undefined,
  }));
}

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
    const slidesWithSources = await getSlidesWithSources();

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

export default async function ScrollDocumentaryPage(props: LangParam) {
  const { lang } = await props.params;

  return (
    <Suspense fallback={<DocumentaryLoading />}>
      <DocumentaryContent lang={lang} />
    </Suspense>
  );
}
