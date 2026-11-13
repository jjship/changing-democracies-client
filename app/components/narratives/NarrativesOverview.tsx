"use client";
import { FC } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import Title from "@/components/public/Title";
import NarrativesLegend from "@/components/narratives/NarrativesLegend";
import { NarrativesList } from "@/components/narratives/NarrativesList";
import { NarrativesListMobile } from "./NarrativesListMobile";
import { NarrativesView } from "./NarrativesVIew";
import { NarrativesViewMobile } from "./NarrativesViewMobile";
import { useIsMobileLayout } from "./hooks/useIsMobileLayout";
import { useTranslation } from "@/translation/TranslationContext";

export const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const { currentPath } = useNarrativesContext();
  const { dictionary: dict } = useTranslation();
  const isMobile = useIsMobileLayout();
  return (
    <>
      {currentPath ? (
        isMobile === null ? null : isMobile ? (
          <NarrativesViewMobile />
        ) : (
          <div className="mx-auto flex h-full w-full items-center justify-center">
            <NarrativesView />
          </div>
        )
      ) : (
        <>
          <h1 className="pt-4 text-4xl font-extrabold text-yellow_secondary desktop:hidden">
            {dict.narratives.title}
          </h1>
          <div className="hidden desktop:block">
            <Title
              text={`${dict.narratives.title}`}
              theme="dark"
              color="yellow_secondary"
              alt={true}
            />
          </div>
          <NarrativesLegend />
          <div className="hidden desktop:block">
            <NarrativesList />
          </div>
          <div className="desktop:hidden">
            <NarrativesListMobile />
          </div>
        </>
      )}
    </>
  );
};
