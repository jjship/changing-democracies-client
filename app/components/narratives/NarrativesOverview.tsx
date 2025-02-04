import { FC } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";
import Title from "@/components/Title";
import NarrativesLegend from "@/components/narratives/NarrativesLegend";
import { NarrativesList } from "@/components/narratives/NarrativesList";
import { NarrativesView } from "./NarrativesVIew";
import { Flex } from "@radix-ui/themes";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const { currentPath, switchPath } = useNarrativesContext();

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
