import NarrativesLayout from "@/components/narratives/NarrativesLayout";
import { narrativesApi } from "@/lib/cdApi";
import { NarrationPath, VideoDbEntry } from "@/types/videosAndFilms";
import { cache } from "react";
import { getVideo } from "@/utils/admin/bunny-methods";
import { serializeVideoSource } from "@/components/scrollDocumentary/videoSource";
import { VideoSource } from "@/types/scrollDocumentary";
import { locales } from "@/utils/i18n/languages";

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

    const availableLanguageLabels = locales;

    return {
      narratives: narrativesWithCaptions,
      availableLanguageLabels,
      initialLanguageLabel:
        availableLanguageLabels.find((label) => label === browserLang) ?? "EN",
    };
  },
);

export default async function NarrativesPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { narratives, availableLanguageLabels, initialLanguageLabel } =
    await getNarrativesWithCaptions({ browserLang: lang.toUpperCase() });
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
