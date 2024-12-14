"use client";

import React, { FC, useState } from "react";
import { FilmData, NarrationPath } from "../../types/videosAndFilms";
import Title from "./Title";
import NarrativesLegend from "@/components/NarrativesLegend";
import { NarrativesList } from "@/components/NarrativesList";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const [films, setFilms] = useState<FilmData[] | null>(null);

  return (
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
          <NarrativesList narrativesCollection={narrativesCollection} />
        </>
      ) : (
        <div className="h-full, bg-black_bg"></div>
      )}
    </>
  );
};
