import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_WHITE.svg";
import { LangParam } from "@/types/langParam";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "../context/TranslationContext";
import Team from "@/components/Team";
import { Section } from "@/components/Section";
import { CDLanguages } from "@/utils/i18n/languages";
import PageFooter from "../../components/PageFooter";

export default async function Home({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang as CDLanguages);

  return (
    <TranslationProvider dictionary={dictionary}>
      <Suspense>
        <div className="flex min-h-screen flex-col justify-between ">
          <NavigationContainer
            fontColor="yellow_secondary"
            bgColor="black_bg"
          />
          <Section theme="dark" id="team">
            <Team />
          </Section>
          <PageFooter theme="dark" />
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
