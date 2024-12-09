import NarrationsLayout from "@/components/NarrationsLayout";
import { NarrationsView } from "@/components/NarrationVIew";
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
