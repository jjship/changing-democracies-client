import NarrativesLayout from "@/components/narratives/NarrativesLayout";
import { narrativesApi } from "@/utils/cdApi";
import { NarrationPath, VideoDbEntry } from "@/types/videosAndFilms";
import { cache } from "react";
import { Suspense } from "react";
import { getVideo } from "@/utils/admin/bunny-methods";
import { serializeVideoSource } from "@/components/scrollDocumentary/videoSource";
import { VideoSource } from "@/types/scrollDocumentary";
import { locales, CDLanguages } from "@/utils/i18n/languages";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "../context/TranslationContext";
import { LangParam } from "@/types/langParam";

// Optimize cache time for better performance
const getNarrativesWithCaptions = cache(
  async ({
    lang,
  }: {
    lang: string;
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

    const availableLanguageLabels = locales.map((loc) => loc.toUpperCase());
    return {
      narratives: narrativesWithCaptions,
      availableLanguageLabels,
      initialLanguageLabel: lang,
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
  const dictionary = await getDictionary(lang.toLowerCase() as CDLanguages);
  const { narratives, availableLanguageLabels, initialLanguageLabel } =
    await getNarrativesWithCaptions({ lang });

  return (
    <TranslationProvider dictionary={dictionary}>
      <main>
        <NarrativesLayout
          narrationPaths={narratives}
          availableLanguageLabels={availableLanguageLabels}
          initialLanguageLabel={initialLanguageLabel}
        />
      </main>
    </TranslationProvider>
  );
}

export default function NarrativesPage({ params }: LangParam) {
  const { lang } = params;
  return (
    <Suspense fallback={<NarrativesLoading />}>
      <NarrativesContent lang={lang} />
    </Suspense>
  );
}
