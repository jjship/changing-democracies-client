"use client";

import { createContext, useContext, useState } from "react";
import { FilmData, NarrationPath } from "@/types/videosAndFilms";

type NarrationContextType = {
  films: FilmData[] | null;
  setFilms: (films: FilmData[] | null) => void;
  narrationsCollections: NarrationPath[] | null;
  isPlaying: boolean | null;
  setIsPlaying: (isPlaying: boolean | null) => void;
  isEnded: boolean | null;
  setIsEnded: (isEnded: boolean | null) => void;
  hasStarted: boolean | null;
  setHasStarted: (hasStarted: boolean | null) => void;
};

export const NarrationContext = createContext<NarrationContextType | null>(
  null,
);

export function NarrationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [narrationsCollections] = useState<NarrationPath[] | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [isEnded, setIsEnded] = useState<boolean | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean | null>(null);

  return (
    <NarrationContext.Provider
      value={{
        films,
        setFilms,
        narrationsCollections,
        isPlaying,
        setIsPlaying,
        isEnded,
        setIsEnded,
        hasStarted,
        setHasStarted,
      }}
    >
      {children}
    </NarrationContext.Provider>
  );
}

export function useNarrationContext() {
  const context = useContext(NarrationContext);

  if (!context) {
    throw new Error(
      "useFilmsContext must be used within a FilmsContextProvider",
    );
  }

  return context;
}
