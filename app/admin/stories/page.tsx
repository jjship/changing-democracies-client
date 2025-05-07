import { cache } from "react";
import { Suspense } from "react";
import { fragmentsApi, FragmentsResponse } from "@/utils/cdApi";
import { Stories } from "@/components/admin/stories/Stories";
import { sectionPadding } from "@/components/Section";
// Set this to true to disable caching for development testing
const DISABLE_CACHE = false;

// Cached version for production
const getFragments = cache(
  async (languageCode: string): Promise<FragmentsResponse> => {
    return await fragmentsApi.getFragments({
      languageCode,
      limit: 500, // Use a high limit to get all fragments
      disableCache: DISABLE_CACHE, // Pass the disable cache flag to the API
    });
  },
);

// Loading component
function StoriesLoading() {
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
async function StoriesContent() {
  const fragmentsResponse = await getFragments("en");

  return <Stories fragmentsResponse={fragmentsResponse} />;
}

export default async function StoriesPage() {
  return (
    <div
      className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  pb-5`}
    >
      <Suspense fallback={<StoriesLoading />}>
        <StoriesContent />
      </Suspense>
    </div>
  );
}
