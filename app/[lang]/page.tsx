import { LangParam } from "@/types/langParam";
import { getDictionary } from "./dictionaries";
import { TranslationProvider } from "./context/TranslationContext";
import LandingPage from "@/components/landing/LandingPage";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { CDLanguages } from "@/utils/i18n/languages";
import PageFooter from "../components/PageFooter";

export default async function Home({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang as CDLanguages);

  return (
    <TranslationProvider dictionary={dictionary}>
      <Suspense>
        <div className="flex min-h-screen flex-col justify-between bg-yellow_secondary">
          <NavigationContainer
            bgColor="yellow_secondary"
            fontColor="black_bg"
          />
          <LandingPage />
          <PageFooter theme="light" />
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
