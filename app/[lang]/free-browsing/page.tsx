import { cache, Suspense } from "react";
import { TranslationProvider } from "../context/TranslationContext";
import { LangParam } from "@/types/langParam";
import { CDLanguages } from "@/utils/i18n/languages";
import { getDictionary } from "../dictionaries";
import {
  fragmentsApi,
  FragmentsResponse,
  tagCategoriesApi,
  TagCategoriesResponse,
} from "@/utils/cdApi";
import { FreeBrowsingLayout } from "@/components/public/FreeBrowsingLayout";

// Prerendered per locale and regenerated in the background (ISR). The open
// film (?id=) is read on the client, so nothing here depends on the request.
// Fetch errors are left to propagate: at build time they fail the build, and
// during regeneration Next keeps serving the last good version.
export const revalidate = 3600;

const getFragments = cache(
  async (languageCode: string): Promise<FragmentsResponse> =>
    fragmentsApi.getFragments({ languageCode, limit: 500 }),
);

const getTagCategories = cache(
  async (languageCode: string): Promise<TagCategoriesResponse> =>
    tagCategoriesApi.getTagCategories(languageCode),
);

function FilmsLoading() {
  return (
    <main>
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-yellow_secondary border-t-transparent"></div>
          <p>Loading fragments...</p>
        </div>
      </div>
    </main>
  );
}

async function FilmsContent({ lang }: { lang: CDLanguages }) {
  const [dictionary, fragmentsResponse, tagCategoriesResponse] =
    await Promise.all([
      getDictionary(lang),
      getFragments(lang),
      getTagCategories(lang),
    ]);

  return (
    <TranslationProvider dictionary={dictionary}>
      <FreeBrowsingLayout
        fragmentsResponse={fragmentsResponse}
        tagCategoriesResponse={tagCategoriesResponse}
        languageCode={lang}
      />
    </TranslationProvider>
  );
}

export default async function FreeBrowsingPage(props: LangParam) {
  const { lang } = await props.params;

  return (
    <Suspense fallback={<FilmsLoading />}>
      <FilmsContent lang={lang} />
    </Suspense>
  );
}
