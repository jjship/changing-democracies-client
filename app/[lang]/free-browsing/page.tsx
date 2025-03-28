import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { getVideosPerCollection } from "@/utils/admin/bunny-methods";
import { serializeFilmsCollection } from "@/utils/films-methods";
import { sectionPadding } from "../../components/Section";
import { cache } from "react";
import { Suspense } from "react";
import { TranslationProvider } from "../context/TranslationContext";
import { CDLanguages } from "@/utils/i18n/languages";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "../dictionaries";

// Increase revalidation time to reduce API calls
const getFilmsCollection = cache(async () => {
  const filmsData = await getVideosPerCollection({
    collectionKey: "default",
    cacheOptions: {
      next: { revalidate: 86400 }, // Cache for 24 hours instead of 1 hour
    },
  });
  return serializeFilmsCollection({ videos: filmsData.data });
});

// Loading component
function FilmsLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-yellow_secondary border-t-transparent"></div>
    </div>
  );
}

// Films content component
async function FilmsContent() {
  const filmsCollection = await getFilmsCollection();
  return <FreeBrowsing filmsCollection={filmsCollection} />;
}

export default async function FreeBrowsingPage({ params }: LangParam) {
  const { lang } = params;
  const dictionary = await getDictionary(lang.toLowerCase() as CDLanguages);
  return (
    <TranslationProvider dictionary={dictionary}>
      <main>
        <div className="relative h-[100vh] overflow-clip">
          <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
          <div
            className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[calc(90vh-40px)] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
          >
            <Suspense fallback={<FilmsLoading />}>
              <FilmsContent />
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
