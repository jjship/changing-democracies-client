import { NarrationPath } from "@/types/videosAndFilms";
import { narrationPathThree } from "@/app/narratives/thirdPath";
import { narrationPathTwo } from "@/app/narratives/secondPath";
import { narrationPathFour } from "@/app/narratives/fourthPath";
import { narrationPathOne } from "@/app/narratives/firstPath";
import { narrationPathFive } from "./fifthPath";
import NarrativesLayout from "@/components/narratives/NarrativesLayout";

export default async function NarrativesPage() {
  const narrationCollection: NarrationPath[] = [
    narrationPathOne,
    narrationPathTwo,
    narrationPathThree,
    narrationPathFour,
    narrationPathFive,
  ];

  return (
    <main>
      <NarrativesLayout narrationPaths={narrationCollection} />
    </main>
  );
}

