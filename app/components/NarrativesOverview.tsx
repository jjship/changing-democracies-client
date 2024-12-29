"use client";

import React, { FC, useState } from "react";
import { NarrationPath } from "../../types/videosAndFilms";
import Title from "./Title";
import NarrativesLegend from "@/components/NarrativesLegend";
import { NarrativesList } from "@/components/NarrativesList";
import NarrationsLayout from "./narrations/NarrationsLayout";
import { useNarrationContext } from "../narratives/NarrationsContext";
import { NarrationsView } from "./narrations/NarrationVIew";

export { NarrativesOverview };

const NarrativesOverview: FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const { currentPath } = useNarrationContext();
  console.log(currentPath);
  return (
    <>
      {currentPath ? (
        <NarrationsView narrationPath={currentPath} />
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
              <NarrativesList />
            </>
          ) : (
            <div className="h-full, bg-black_bg"></div>
          )}
        </>
      )}
    </>
  );
};
