import { FC } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useNarrationContext } from "@/app/narratives/NarrationsContext";
import Title from "@/components/Title";
import NarrativesLegend from "@/components/narrations/NarrativesLegend";
import { NarrativesList } from "@/components/narrations/NarrativesList";
import { NarrationsView } from "./NarrationVIew";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const { currentPath } = useNarrationContext();
  return (
    <>
      {currentPath ? (
        <NarrationsView />
      ) : (
        <>
          <Title
            text="Non-linear narrations"
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
