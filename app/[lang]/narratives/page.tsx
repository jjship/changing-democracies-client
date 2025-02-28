import NarrativesLayout from "@/components/narratives/NarrativesLayout";
import { narrativesApi } from "@/lib/cdApi";
import { NarrationPath, VideoDbEntry } from "@/types/videosAndFilms";
import { cache } from "react";
import { Suspense } from "react";
import { getVideo } from "@/utils/admin/bunny-methods";
import { serializeVideoSource } from "@/components/scrollDocumentary/videoSource";
import { VideoSource } from "@/types/scrollDocumentary";
import { locales } from "@/utils/i18n/languages";

// Optimize cache time for better performance
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

// Loading component
function NarrativesLoading() {
  return (
    <main>
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-yellow_secondary border-t-transparent"></div>
          <p>Loading narratives...</p>
        </div>
      </div>
    </main>
  );
}

// Narratives content component
async function NarrativesContent({ lang }: { lang: string }) {
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

export default function NarrativesPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <Suspense fallback={<NarrativesLoading />}>
      <NarrativesContent lang={lang} />
    </Suspense>
  );
}
