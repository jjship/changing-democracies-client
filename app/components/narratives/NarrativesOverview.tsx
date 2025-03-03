"use client";
import { FC } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import Title from "@/components/Title";
import NarrativesLegend from "@/components/narratives/NarrativesLegend";
import { NarrativesList } from "@/components/narratives/NarrativesList";
import { NarrativesView } from "./NarrativesVIew";
import { Flex } from "@radix-ui/themes";
import { useTranslation } from "@/translation/TranslationContext";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const { currentPath } = useNarrativesContext();
  const { dictionary: dict } = useTranslation();
  return (
    <>
      {currentPath ? (
        <Flex
          width={"100%"}
          height={"100%"}
          justify={"center"}
          align={"center"}
        >
          <NarrativesView />
        </Flex>
      ) : (
        <>
          <Title
            text={`${dict.narratives.title}`}
            theme="dark"
            color="yellow_secondary"
            alt={true}
          />
          {narrativesCollection && (
            <>
              <NarrativesLegend />
              <NarrativesList />
            </>
          )}
        </>
      )}
    </>
  );
};
