import NarrativesLayout from "@/components/narratives/NarrativesLayout";
import { languagesApi, narrativesApi } from "@/lib/cdApi";
import { headers } from "next/headers";

export default async function NarrativesPage() {
  const browserLang =
    headers().get("x-browser-language")?.toUpperCase() || "EN";
  const narratives = await narrativesApi.getNarratives();
  const languages = await languagesApi.getLanguages();
  const availableLanguageLabels = languages.map((language) => language.label);
  const initialLanguageLabel =
    availableLanguageLabels.find((label) => label === browserLang) ?? "EN";

  if (!narratives || narratives.length === 0) {
    return <div>Error loading narratives: No narratives available</div>;
  }

  return (
    <main>
      <NarrativesLayout
        narrationPaths={narratives}
        availableLanguageLabels={availableLanguageLabels}
        initialLanguageLabel={initialLanguageLabel}
      />
    </main>
  );
}
