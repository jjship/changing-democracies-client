"use client";

import React, { FC, useState } from "react";
import { NarrationPath } from "../../types/videosAndFilms";
import Title from "./Title";
import NarrativesLegend from "@/components/NarrativesLegend";
import { NarrativesList } from "@/components/NarrativesList";
import { NarrationsView } from "@/components/NarrationVIew";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const [selectedNarration, setSelectedNarration] =
    useState<NarrationPath | null>(null);

  return (
    <>
      {selectedNarration ? (
        <NarrationsView narrationPath={selectedNarration} />
      ) : (
        <>
          <Title
            text="Non-linear narrations"
            theme="dark"
            color="yellow_secondary"
            alt={true}
          />
          {narrativesCollection ? (
            <>
              <NarrativesLegend />
              <NarrativesList
                setSelectedNarration={setSelectedNarration}
                narrativesCollection={narrativesCollection}
              />
            </>
          ) : (
            <div className="h-full, bg-black_bg"></div>
          )}
        </>
      )}
    </>
  );
};
