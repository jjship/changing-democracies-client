import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { LangParam } from "@/types/langParam";
import { getDictionary } from "./dictionaries";
import { TranslationProvider } from "./context/TranslationContext";
import LandingPage from "@/components/landing/LandingPage";
import { Section } from "@/components/Section";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";

export default async function ({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang);

  return (
    <TranslationProvider dictionary={dictionary}>
      <div className="flex min-h-screen  flex-col justify-between bg-yellow_secondary">
        <NavigationContainer bgColor="yellow_secondary" fontColor="black_bg" />
        <LandingPage />
        <Image
          src={logoDark}
          alt="changing democracies logo"
          className="m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
        />
      </div>
    </TranslationProvider>
  );
}
