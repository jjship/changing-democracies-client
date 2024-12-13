"use client";

import { createContext, useContext, useState } from "react";
import { FilmData } from "@/types/videosAndFilms";

type NarrationContextType = {
  films: FilmData[] | null;
  setFilms: (films: FilmData[] | null) => void;
  // narrationsCollections: NarrationPath[] | null;
  isPlaying: boolean | null;
  setIsPlaying: (isPlaying: boolean | null) => void;
  isEnded: boolean | null;
  setIsEnded: (isEnded: boolean | null) => void;
  hasStarted: boolean | null;
  setHasStarted: (hasStarted: boolean | null) => void;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
};

export const NarrationContext = createContext<NarrationContextType | null>(
  null,
);

export function NarrationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [narrationsCollections] = useState<NarrationPath[] | null>(null);
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean | null>(false);
  const [isEnded, setIsEnded] = useState<boolean | null>(false);
  const [hasStarted, setHasStarted] = useState<boolean | null>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <NarrationContext.Provider
      value={{
        films,
        setFilms,
        // narrationsCollections,
        isPlaying,
        setIsPlaying,
        isEnded,
        setIsEnded,
        hasStarted,
        setHasStarted,
        currentIndex,
        setCurrentIndex,
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
