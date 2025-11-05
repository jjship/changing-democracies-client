import { cache } from "react";
import { Suspense } from "react";
import { TranslationProvider } from "../context/TranslationContext";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "../dictionaries";
import {
  fragmentsApi,
  FragmentsResponse,
  tagCategoriesApi,
  TagCategoriesResponse,
} from "@/utils/cdApi";
import { FreeBrowsingLayout } from "@/components/FreeBrowsingLayout";

// Enable ISR: regenerate page every hour (3600 seconds)
// This ensures pages are statically generated at build time for fast indexing
export const revalidate = 3600;

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

// Cached version for tag categories
const getCachedTagCategories = cache(
  async (languageCode: string): Promise<TagCategoriesResponse> => {
    return await tagCategoriesApi.getTagCategories(languageCode);
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

// Films content component with language handling
async function FilmsContent({
  params: { lang },
  searchParams,
}: LangParam & { searchParams: { id?: string } }) {
  const dictionary = await getDictionary(lang);

  try {
    const [fragmentsResponse, tagCategoriesResponse] = await Promise.all([
      getFragments(lang),
      getCachedTagCategories(lang),
    ]);
    const { id: fragmentId } = searchParams;

    return (
      <TranslationProvider dictionary={dictionary}>
        <FreeBrowsingLayout
          fragmentsResponse={fragmentsResponse}
          tagCategoriesResponse={tagCategoriesResponse}
          languageCode={lang}
          initialFragmentId={fragmentId}
        />
      </TranslationProvider>
    );
  } catch (error) {
    console.error("Error loading fragments:", error);
    // Return empty state to prevent 5xx errors
    const emptyFragmentsResponse: FragmentsResponse = {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 500,
        pages: 0,
      },
    };
    const emptyTagCategoriesResponse: TagCategoriesResponse = {
      tagCategories: [],
    };
    const { id: fragmentId } = searchParams;

    return (
      <TranslationProvider dictionary={dictionary}>
        <FreeBrowsingLayout
          fragmentsResponse={emptyFragmentsResponse}
          tagCategoriesResponse={emptyTagCategoriesResponse}
          languageCode={lang}
          initialFragmentId={fragmentId}
        />
      </TranslationProvider>
    );
  }
}

export default async function FreeBrowsingPage({
  params: { lang },
  searchParams,
}: LangParam & { searchParams: { id?: string } }) {
  return (
    <Suspense fallback={<FilmsLoading />}>
      <FilmsContent params={{ lang }} searchParams={searchParams} />
    </Suspense>
  );
}
