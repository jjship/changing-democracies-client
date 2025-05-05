import { LangParam } from "@/types/langParam";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "../context/TranslationContext";
import { Section } from "@/components/Section";
import { CDLanguages } from "@/utils/i18n/languages";
import Project from "@/components/Project";

export default async function ProjectPage({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang as CDLanguages);

  return (
    <TranslationProvider dictionary={dictionary}>
      <Suspense>
        <div className="flex h-screen flex-col bg-purple_lightest_bg">
          <NavigationContainer
            fontColor="black_bg"
            bgColor="purple_lightest_bg"
          />
          <Section theme="light" id="project">
            <Project />
          </Section>
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
