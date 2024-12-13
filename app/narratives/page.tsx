import NarrationsLayout from "@/components/narrations/NarrationsLayout";
import { firstPath as narrationPathData } from "@/app/narratives/firstPath";
import { NarrationPath } from "@/types/videosAndFilms";

export default async function NarrationsPage() {
  const narrationPaths: NarrationPath[] = [narrationPathData]; // this is a server component so its better to fetch here

  return <NarrationsLayout narrationPaths={narrationPaths} />;
}
