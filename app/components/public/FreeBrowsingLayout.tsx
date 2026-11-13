"use client";

import { Navigation } from "@/components/navigation/Navigation";
import { FreeBrowsing } from "@/components/public/FreeBrowsing";
import { sectionPadding } from "./Section";
import { CDLanguages } from "@/utils/i18n/languages";
import { FragmentsResponse, TagCategoriesResponse } from "@/types/api";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import PageFooter from "./PageFooter";
import { FC } from "react";

export const FreeBrowsingLayout: FC<{
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
  languageCode: string;
}> = ({ fragmentsResponse, tagCategoriesResponse, languageCode }) => {
  const { setLanguage } = useTranslation();

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as CDLanguages);
  };

  return (
    <main>
      <div className="relative desktop:h-[100vh] desktop:overflow-clip">
        <Navigation
          bgColor="black_bg"
          fontColor="yellow_secondary"
          selectedLanguage={languageCode}
          onLanguageChange={handleLanguageChange}
        />
        <div
          className={`z-20 mx-auto max-w-[90vw] rounded-3xl bg-black_bg xl:max-w-[90rem] ${sectionPadding.x} pb-5 desktop:h-[calc(90vh-55px)] desktop:overflow-auto mobile:max-w-none mobile:rounded-none`}
        >
          <FreeBrowsing
            fragmentsResponse={fragmentsResponse}
            tagCategoriesResponse={tagCategoriesResponse}
          />
        </div>
        <div className="sticky bottom-0 -z-10 hidden h-[15vh] bg-yellow_secondary desktop:block"></div>
        <div className="bg-yellow_secondary desktop:sticky desktop:bottom-0 desktop:bg-transparent">
          <PageFooter theme="light" />
        </div>
      </div>
    </main>
  );
};
