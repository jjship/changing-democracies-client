import { FC } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";
import Title from "@/components/Title";
import NarrativesLegend from "@/components/narratives/NarrativesLegend";
import { NarrativesList } from "@/components/narratives/NarrativesList";
import { NarrativesView } from "./NarrativesVIew";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const { currentPath } = useNarrativesContext();
  return (
    <>
      {currentPath ? (
        <NarrativesView />
      ) : (
        <>
          <Title
            text="Non-linear narratives"
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
