import NarrativesLayout from "@/components/narratives/NarrativesLayout";
import { languagesApi, narrativesApi } from "@/lib/cdApi";
import { headers } from "next/headers";
import { NarrationPath, VideoDbEntry } from "../../types/videosAndFilms";
import { cache } from "react";
import { getVideo } from "../../utils/admin/bunny-methods";
import { serializeVideoSource } from "../scroll-documentary/videoSource";
import { VideoSource } from "../../types/scrollDocumentary";

const getNarrativesWithCaptions = cache(
  async ({
    browserLang,
  }: {
    browserLang: string;
  }): Promise<{
    narratives: NarrationPath[];
    availableLanguageLabels: string[];
    initialLanguageLabel: string;
  }> => {
    const narratives = await narrativesApi.getNarratives();
    const languages = await languagesApi.getLanguages();
    const videoIds = new Set(
      narratives.flatMap((narrative) =>
        narrative.fragments.map((fragment) => fragment.guid),
      ),
    );

    const videosResult = await Promise.all(
      [...videoIds].map((videoId) => getVideo(videoId)),
    );

    const videosData = videosResult
      .filter((res) => res.success)
      .flatMap((res) => res.data);

    const videoSources = videosData.reduce(
      (prev, video: VideoDbEntry) =>
        prev.set(video.guid, serializeVideoSource(video)),
      new Map<string, VideoSource>(),
    );

    const narrativesWithCaptions = narratives.map((narrative) => ({
      ...narrative,
      fragments: narrative.fragments.map((fragment) => {
        const video = videoSources.get(fragment.guid);
        return video
          ? {
              ...fragment,
              ...video,
            }
          : fragment;
      }),
    }));

    const availableLanguageLabels = languages.map((language) => language.label);

    return {
      narratives: narrativesWithCaptions,
      availableLanguageLabels,
      initialLanguageLabel:
        availableLanguageLabels.find((label) => label === browserLang) ?? "EN",
    };
  },
);

export default async function NarrativesPage() {
  const browserLang =
    headers().get("x-browser-language")?.toUpperCase() || "EN";

  const { narratives, availableLanguageLabels, initialLanguageLabel } =
    await getNarrativesWithCaptions({ browserLang });
  return (
    <main>
      <NarrativesLayout
        narrationPaths={narratives}
        availableLanguageLabels={availableLanguageLabels}
        initialLanguageLabel={initialLanguageLabel}
      />
    </main>
  );
}
