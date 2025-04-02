import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { sectionPadding } from "../../components/Section";
import { cache } from "react";
import { Suspense } from "react";
import { TranslationProvider } from "../context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "../dictionaries";
import { fragmentsApi, FragmentsResponse } from "@/lib/cdApi";

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

// Films content component
async function FilmsContent({ languageCode }: { languageCode: string }) {
  const fragmentsResponse = await getFragments(languageCode);
  console.log(
    `Fetched ${fragmentsResponse.data.length} fragments for language ${languageCode}`,
  );
  return <FreeBrowsing fragmentsResponse={fragmentsResponse} />;
}

export default async function FreeBrowsingPage({ params }: LangParam) {
  const { lang } = params;
  const dictionary = await getDictionary(lang.toLowerCase() as CDLanguages);
  // Get the two-letter language code for the API
  const languageCode = lang.toLowerCase().substring(0, 2);

  return (
    <TranslationProvider dictionary={dictionary}>
      <main>
        <div className="relative h-[100vh] overflow-clip">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <div
            className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[calc(90vh-40px)] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
          >
            <Suspense fallback={<FilmsLoading />}>
              <FilmsContent languageCode={languageCode} />
            </Suspense>
          </div>
          <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
          <Image
            src={logoDark}
            alt="changing democracies logo"
            className="sticky bottom-2 m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
          />
        </div>
      </main>
    </TranslationProvider>
  );
}
