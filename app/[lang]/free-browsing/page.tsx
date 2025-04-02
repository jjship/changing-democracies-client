import { cache } from "react";
import { Suspense } from "react";
import { TranslationProvider } from "../context/TranslationContext";
import { CDLanguages, locales } from "@/utils/i18n/languages";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "../dictionaries";
import { fragmentsApi, FragmentsResponse } from "@/lib/cdApi";
import { FreeBrowsingLayout } from "@/components/FreeBrowsingLayout";

// Set this to true to disable caching for development testing
const DISABLE_CACHE = false;

// Cached version for production
const getCachedFragments = cache(
  async (languageCode: string): Promise<FragmentsResponse> => {
    return await fragmentsApi.getFragments({
      languageCode,
      limit: 500, // Use a high limit to get all fragments
      disableCache: DISABLE_CACHE, // Pass the disable cache flag to the API
    });
  },
);

// Non-cached version for development testing
const getUncachedFragments = async (
  languageCode: string,
): Promise<FragmentsResponse> => {
  console.log("Fetching fragments without cache");
  return await fragmentsApi.getFragments({
    languageCode,
    limit: 500, // Use a high limit to get all fragments
    disableCache: true, // Always disable cache in uncached version
  });
};

// Choose which function to use based on DISABLE_CACHE flag
const getFragments = DISABLE_CACHE ? getUncachedFragments : getCachedFragments;

// Loading component
function FilmsLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-yellow_secondary border-t-transparent"></div>
    </div>
  );
}

// Films content component with language handling
async function FilmsContent({
  languageCode,
  lang,
}: {
  languageCode: string;
  lang: string;
}) {
  const dictionary = await getDictionary(lang.toLowerCase() as CDLanguages);
  const fragmentsResponse = await getFragments(languageCode);

  console.log(
    `Fetched ${fragmentsResponse.data.length} fragments for language ${languageCode}`,
  );

  return (
    <TranslationProvider dictionary={dictionary}>
      <FreeBrowsingLayout
        fragmentsResponse={fragmentsResponse}
        languageCode={lang}
      />
    </TranslationProvider>
  );
}

export default async function FreeBrowsingPage({ params }: LangParam) {
  const { lang } = params;
  // Get the two-letter language code for the API
  const languageCode = lang.toLowerCase().substring(0, 2);

  return (
    <Suspense fallback={<FilmsLoading />}>
      <FilmsContent languageCode={languageCode} lang={lang} />
    </Suspense>
  );
}
