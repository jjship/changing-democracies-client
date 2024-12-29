"use client";

import { createContext, useContext, useState } from "react";
import { FilmData, NarrationPath } from "@/types/videosAndFilms";
import { narrationPathOne } from "./firstPath";

type NarrationContextType = {
  currentPath: NarrationPath | null;
  setCurrentPath: (narrationPath: NarrationPath | null) => void;
  films: FilmData[] | null;
  setFilms: (films: FilmData[] | null) => void;
  narrationPaths: NarrationPath[] | null;
  isPlaying: boolean | null;
  setIsPlaying: (isPlaying: boolean | null) => void;
  isEnded: boolean | null;
  setIsEnded: (isEnded: boolean | null) => void;
  hasStarted: boolean | null;
  setHasStarted: (hasStarted: boolean | null) => void;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  isVisible: boolean;
  setIsVisible: (hasStarted: boolean) => void;
  currentFilmId: string | null;
  setCurrentFilmId: (currentId: string | null) => void;
};

export const NarrationContext = createContext<NarrationContextType | null>(
  null,
);

export function NarrationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null); // lets leave the firstPath hardcoded so we are sure that at least one is available
  const [narrationPaths] = useState<NarrationPath[] | null>(null);
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean | null>(false);
  const [isEnded, setIsEnded] = useState<boolean | null>(false);
  const [hasStarted, setHasStarted] = useState<boolean | null>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentFilmId, setCurrentFilmId] = useState<string | null>(null);

  return (
    <NarrationContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        films,
        setFilms,
        narrationPaths,
        isPlaying,
        setIsPlaying,
        isEnded,
        setIsEnded,
        hasStarted,
        setHasStarted,
        currentIndex,
        setCurrentIndex,
        isVisible,
        setIsVisible,
        currentFilmId,
        setCurrentFilmId,
      }} // here we define the shape of the context and it's default values
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
