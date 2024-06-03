"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";
import Filters, { filterButtons, filterGrid } from "./FilmFilters";

const ShowAllOrFilters: React.FC = () => {
  const { setFilms, collection } = useFilmsContext();
  const [showAll, toggleShowAll] = useState(true);

  useEffect(() => {
    if (collection && showAll) {
      setFilms(collection.films);
    }
  }, [collection, setFilms, showAll]);

  return (
    <>
      <div className={filterGrid}>
        <Button
          className={`${
            showAll ? "bg-gray_light_secondary" : "bg-green_accent"
          } ${filterButtons} my-4`}
          onClick={() => toggleShowAll((prev) => !prev)}
        >
          {showAll ? "Filter stories" : "Show all"}
        </Button>
      </div>
      {!showAll && <Filters />}
    </>
  );
};
export default ShowAllOrFilters;
