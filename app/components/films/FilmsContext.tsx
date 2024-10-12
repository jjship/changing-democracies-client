"use client";

import { createContext, useContext, useState } from "react";
import { FilmData, FilmsCollection } from "@/types/videosAndFilms";

type FilmsContextType = {
  films: FilmData[] | null;
  setFilms: (films: FilmData[] | null) => void;
  collection: FilmsCollection | null;
};

export const FilmsContext = createContext<FilmsContextType | null>(null);

export function FilmsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [collection, setCollection] = useState<FilmsCollection | null>(null);

  return (
    <FilmsContext.Provider
      value={{
        films,
        setFilms,
        collection,
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
