"use client";

import { createContext, useContext, useState } from "react";
import { Film, FilmsCollection } from "@/types/videos";

type FilmsContextType = {
  films: Film[] | null;
  setFilms: (films: Film[] | null) => void;
  collection: FilmsCollection | null;
  setCollection: (collection: FilmsCollection | null) => void;
};

export const FilmsContext = createContext<FilmsContextType | null>(null);

export function FilmsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [films, setFilms] = useState<Film[] | null>(null);
  const [collection, setCollection] = useState<FilmsCollection | null>(null);

  return (
    <FilmsContext.Provider
      value={{
        films,
        setFilms,
        collection,
        setCollection,
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
