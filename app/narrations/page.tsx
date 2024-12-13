import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "@/components/Section";
import { narrationPath as narrationPathData } from "@/app/narrations/secondPath";
import { NarrativesOverview } from "@/components/NarrativesOverview";

export default async function NarrationsPage() {
  const narrationPath: NarrationPath = narrationPathData;

  return (
    <main>
      <div className="relative h-[100vh] overflow-clip">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[85vh] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
        >
          <NarrativesOverview narrativesCollection={[narrationPath]} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
      </div>
    </main>
  );
}
