"use client";

import { FC, useState } from "react";
import FilmList from "./films/FilmList";
import { FilmData, FilmsCollection } from "../../types/videosAndFilms";
import { FilmsContext } from "./films/FilmsContext";
import Title from "./Title";
import ShowAllOrFilters from "./films/ShowAllOrFilters";
import { FilmPlayer } from "./films/FilmPlayer";

export { FreeBrowsing };

const FreeBrowsing: FC<{
  filmsCollection: FilmsCollection;
  title?: boolean;
}> = ({ filmsCollection, title = true }) => {
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  return (
    <>
      {title && (
        <Title
          text="Free browsing"
          theme="dark"
          color="yellow_secondary"
          alt={true}
        />
      )}
      <FilmsContext.Provider
        value={{
          films,
          setFilms,
          filmsCollection,
          nowPlaying,
          setNowPlaying,
        }}
      >
        {filmsCollection ? (
          <>
            <ShowAllOrFilters />
            <FilmList />
            <FilmPlayer />
          </>
        ) : (
          <div className="h-full, bg-black_bg"></div>
        )}
      </FilmsContext.Provider>
    </>
  );
};
