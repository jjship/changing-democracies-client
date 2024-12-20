import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "@/components/Section";
import { NarrativesOverview } from "@/components/NarrativesOverview";
import { narrationPathThree } from "@/app/narratives/thirdPath";
import { narrationPathOne } from "@/app/narratives/firstPath";
import { narrationPathTwo } from "@/app/narratives/secondPath";
import { narrationPathFour } from "@/app/narratives/fourthPath";
import { narrationPathFive } from "@/app/narratives/fifthPath";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

export default async function NarrativesPage() {
  const narrationCollection: NarrationPath[] = [
    narrationPathOne,
    narrationPathTwo,
    narrationPathThree,
    narrationPathFour,
    narrationPathFive,
  ];

  return (
    <main className={`/*${archivo.className}*/ /*bg-black_bg */antialiased`}>
      <div className="relative h-[100vh] overflow-clip">
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[85vh] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
        >
          <NarrativesOverview narrativesCollection={narrationCollection} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
      </div>
    </main>
  );
}
