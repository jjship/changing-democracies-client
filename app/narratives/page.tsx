import { NarrationPath } from "@/types/videosAndFilms";
import { narrationPathThree } from "@/app/narratives/thirdPath";
import { narrationPathTwo } from "@/app/narratives/secondPath";
import { narrationPathFour } from "@/app/narratives/fourthPath";
import { narrationPathOne } from "@/app/narratives/firstPath";
import { narrationPathFive } from "./fifthPath";
import { Archivo } from "next/font/google";
import NarrationsLayout from "../components/narrations/NarrationsLayout";

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
    <main>
      <NarrationsLayout narrationPaths={narrationCollection} />
    </main>
  );
}

