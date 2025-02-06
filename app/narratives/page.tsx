import NarrativesLayout from "@/components/narratives/NarrativesLayout";
import { narrativesApi } from "@/lib/narratives";

export default async function NarrativesPage() {
  const narratives = await narrativesApi.getNarratives();

  if (!narratives || narratives.length === 0) {
    return <div>Error loading narratives: No narratives available</div>;
  }

  return (
    <main>
      <NarrativesLayout narrationPaths={narratives} />
    </main>
  );
}
