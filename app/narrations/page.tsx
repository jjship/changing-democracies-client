import NarrationsLayout from "@/components/narrations/NarrationsLayout";
import { NarrationsView } from "@/components/narrations/NarrationVIew";
import { narrationPath as narrationPathData } from "@/app/narrations/firstPath";
import { NarrationPath } from "@/types/videosAndFilms";

export default async function NarrationsPage() {
  const narrationPath: NarrationPath = narrationPathData;

  return (
    <NarrationsLayout narrationPath={narrationPath}>
      <NarrationsView narrationPath={narrationPath} />
    </NarrationsLayout>
  );
}
