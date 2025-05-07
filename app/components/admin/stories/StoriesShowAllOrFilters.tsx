"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFilmsContext } from "@/components/films/FilmsContext";
import {
  Filters,
  filterButtons,
  filterGrid,
} from "@/components/films/FilmFilters";

const StoriesShowAllOrFilters: FC = () => {
  const { setFragments, fragmentsResponse } = useFilmsContext();
  const [showAll, toggleShowAll] = useState(true);

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
      {!showAll && <Filters />}
    </>
  );
};
export default StoriesShowAllOrFilters;
