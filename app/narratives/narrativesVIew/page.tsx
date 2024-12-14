import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "@/components/Section";
import { narrationPathTwo } from "@/app/narratives/secondPath";
import { narrationPathFive } from "@/app/narratives/fifthPathMOCK";
import { narrationPathThree } from "@/app/narratives/thirdPathMOCK";
import { narrationPathFour } from "@/app/narratives/fourthPathMOCK";
import { narrationPath } from "@/app/narratives/firstPath";
import { NarrationsView } from "@/components/NarrationVIew";
import { useSearchParams } from "next/navigation";

export default function NarrativesViewPage() {
  const narrationCollection: NarrationPath[] = [
    narrationPath,
    narrationPathTwo,
    narrationPathThree,
    narrationPathFour,
    narrationPathFive,
  ];

  const searchParams = useSearchParams();
  const narration = searchParams.get("narration");

  return (
    <main>
      <div className="relative h-[100vh] overflow-clip">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[85vh] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
        >
          <NarrationsView narrationPath={narration} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
      </div>
    </main>
  );
}
