"use client";

import { useEffect, useState } from "react";
import FilmList from "./films/FilmList";
import Filters from "./films/FilmFilters";
import { Film, FilmsCollection } from "../../types/videos";
import { FilmsContext } from "./films/FilmsContext";
import Title from "./Title";

const FreeBrowsing = () => {
  const [collection, setCollection] = useState<FilmsCollection | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    fetch("/api/films")
      .then((response) => response.json())
      .then((data: FilmsCollection) => {
        setCollection(data);
      });
  }, []);

  return (
    <>
      <Title text="Free browsing" theme="dark" color="yellow_secondary" />
      <>
        <FilmsContext.Provider
          value={{ films, setFilms, collection, setCollection }}
        >
          {collection ? (
            <>
              <Filters />
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

export default FreeBrowsing;
