import { getVideo } from "@/utils/admin/bunny-methods";
import { cache } from "react";

import { serializeVideoSource } from "@/components/scrollDocumentary/videoSource";
import ScrollDocumentary from "@/components/scrollDocumentary/ScrollDocumentary";
import { VideoSource } from "@/types/scrollDocumentary";
import { VideoDbEntry } from "@/types/videosAndFilms";
import { slides } from "@/components/scrollDocumentary/slides/slides";

const getSerializedAndSortedVideos = cache(
  async ({ browserLang }: { browserLang: string }) => {
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

    const initialLanguageLabel = availableLanguageLabels.has(browserLang)
      ? browserLang
      : "EN";

    return {
      slidesWithSources,
      initialLanguageLabel,
      availableLanguageLabels: [...availableLanguageLabels],
    };
  },
);

export default async function ScrollDocumentaryPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  try {
    const { slidesWithSources, initialLanguageLabel, availableLanguageLabels } =
      await getSerializedAndSortedVideos({
        browserLang: lang.toUpperCase(),
      });

    return (
      <ScrollDocumentary
        slidesWithSources={slidesWithSources}
        initialLanguageLabel={initialLanguageLabel}
        availableLanguageLabels={availableLanguageLabels}
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
