"use client";

import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { sectionPadding } from "./Section";
import { CDLanguages } from "@/utils/i18n/languages";
import { FragmentsResponse } from "@/lib/cdApi";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

export function FreeBrowsingLayout({
  fragmentsResponse,
  languageCode,
}: {
  fragmentsResponse: FragmentsResponse;
  languageCode: string;
}) {
  const { setLanguage } = useTranslation();

  // Handle language change
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as CDLanguages);
  };

  return (
    <main>
      <div className="relative h-[100vh] overflow-clip">
        <Navigation
          bgColor="black_bg"
          fontColor="yellow_secondary"
          selectedLanguage={languageCode}
          onLanguageChange={handleLanguageChange}
        />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x}  mb-9 h-[calc(90vh-40px)] overflow-auto pb-5 md:pb-14 xl:pb-40 `}
        >
          <FreeBrowsing fragmentsResponse={fragmentsResponse} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
        <Image
          src={logoDark}
          alt="changing democracies logo"
          className="sticky bottom-2 m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
        />
      </div>
    </main>
  );
}
