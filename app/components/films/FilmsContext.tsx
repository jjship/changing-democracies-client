"use client";

import { createContext, useContext, useState } from "react";
import { FilmData, FilmsCollection } from "@/types/videosAndFilms";

type FilmsContextType = {
  films: FilmData[] | null;
  setFilms: (films: FilmData[] | null) => void;
  filmsCollection: FilmsCollection | null;
  nowPlaying: string | null;
  setNowPlaying: (filmId: string | null) => void;
};

export const FilmsContext = createContext<FilmsContextType | null>(null);

export function FilmsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [filmsCollection] = useState<FilmsCollection | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  return (
    <FilmsContext.Provider
      value={{
        films,
        setFilms,
        filmsCollection,
        nowPlaying,
        setNowPlaying,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilmsContext() {
  const context = useContext(FilmsContext);

  if (!context) {
    throw new Error(
      "useFilmsContext must be used within a FilmsContextProvider",
    );
  }

  return context;
}
