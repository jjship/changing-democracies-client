import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_WHITE.svg";
import { LangParam } from "@/types/langParam";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "@/translation/TranslationContext";
import { Section } from "@/components/Section";
import Contact from "../../components/Contact";

export default async function Home({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang);

  return (
    <TranslationProvider dictionary={dictionary}>
      <Suspense>
        <div className="flex min-h-screen flex-col justify-between ">
          <NavigationContainer
            fontColor="yellow_secondary"
            bgColor="black_bg"
          />
          <Section theme="dark" id="team">
            <Contact />
          </Section>
          <Image
            src={logoDark}
            alt="Co-funded by the EU logo"
            className="m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
          />
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
