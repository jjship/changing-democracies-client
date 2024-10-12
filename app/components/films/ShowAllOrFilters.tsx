"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";
import { Filters, filterButtons, filterGrid } from "./FilmFilters";

const ShowAllOrFilters: FC = () => {
  const { setFilms, filmsCollection } = useFilmsContext();
  const [showAll, toggleShowAll] = useState(true);

  useEffect(() => {
    if (filmsCollection && showAll) {
      setFilms(filmsCollection.films);
    }
  }, [filmsCollection, setFilms, showAll]);

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
export default ShowAllOrFilters;
