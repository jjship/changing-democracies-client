"use client";

import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/FreeBrowsing";
import { sectionPadding } from "./Section";
import { CDLanguages } from "@/utils/i18n/languages";
import { FragmentsResponse } from "@/utils/cdApi";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import PageFooter from "./PageFooter";

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
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg md:max-w-[90vw] xl:max-w-[90rem] ${sectionPadding.x} h-[calc(90vh-55px)] overflow-auto pb-5`}
        >
          <FreeBrowsing fragmentsResponse={fragmentsResponse} />
        </div>
        <div className="sticky bottom-0 -z-10 h-[15vh] bg-yellow_secondary"></div>
        <div className="sticky bottom-0">
          <PageFooter theme="light" />
        </div>
      </div>
    </main>
  );
}
