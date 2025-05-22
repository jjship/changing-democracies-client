"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";
import { FilmFilters, filterButtons, filterGrid } from "./FilmFilters";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

const ShowAllOrFilters: FC = () => {
  const { setFragments, fragmentsResponse } = useFilmsContext();
  const [showAll, toggleShowAll] = useState(true);
  const { dictionary } = useTranslation();

  // Reset to show all fragments when toggling back to "Show All"
  useEffect(() => {
    if (fragmentsResponse?.data && showAll) {
      setFragments(fragmentsResponse.data);
    }
  }, [showAll, fragmentsResponse, setFragments]);

  return (
    <>
      <div className={filterGrid}>
        <Button
          className={`bg-gray_light_secondary ${filterButtons} my-4`}
          onClick={() => toggleShowAll((prev) => !prev)}
        >
          {showAll ? "Filter stories" : "Show all"}
        </Button>
      </div>
      <p className="mt-4 pb-6 text-lg font-medium text-yellow_secondary">
        {showAll
          ? dictionary.freeBrowsing.description
          : dictionary.freeBrowsing.explanation}
      </p>
      {!showAll && <FilmFilters />}
    </>
  );
};
export default ShowAllOrFilters;
