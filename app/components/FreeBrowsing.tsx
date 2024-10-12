"use client";

import { FC, useState } from "react";
import FilmList from "./films/FilmList";
import { FilmData, FilmsCollection } from "../../types/videosAndFilms";
import { FilmsContext } from "./films/FilmsContext";
import Title from "./Title";
import ShowAllOrFilters from "./films/ShowAllOrFilters";

export { FreeBrowsing };

const FreeBrowsing: FC<{
  filmsCollection: FilmsCollection;
}> = ({ filmsCollection }) => {
  const [collection] = useState<FilmsCollection>(filmsCollection);
  const [films, setFilms] = useState<FilmData[] | null>(null);

  return (
    <>
      <Title text="Free browsing" theme="dark" color="yellow_secondary" />
      <>
        <FilmsContext.Provider value={{ films, setFilms, collection }}>
          {collection ? (
            <>
              <ShowAllOrFilters />
              <FilmList />
            </>
          ) : (
            <div className="h-full, bg-black_bg"></div>
          )}
        </FilmsContext.Provider>
      </>
    </>
  );
};
