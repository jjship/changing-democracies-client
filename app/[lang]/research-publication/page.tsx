import { LangParam } from "@/types/langParam";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "@/translation/TranslationContext";
import { Section } from "@/components/Section";
import ResearchPublication from "@/components/ResearchPublication";
import PageFooter from "../../components/PageFooter";

export default async function EduResources({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang);

  return (
    <TranslationProvider dictionary={dictionary}>
      <Suspense>
        <div className="flex min-h-screen flex-col justify-between bg-purple_lightest_bg">
          <NavigationContainer
            fontColor="black_bg"
            bgColor="purple_lightest_bg"
          />
          <Section theme="light" id="edu-resources">
            <ResearchPublication />
          </Section>
          <PageFooter theme="light" />
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
