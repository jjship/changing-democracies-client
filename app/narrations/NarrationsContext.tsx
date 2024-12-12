"use client";

import { FilmData } from "@/types/videosAndFilms";
import { createContext, useContext, useState } from "react";

type NarrationsContextType = {
  films: FilmData[] | null;
  setFilms: (films: FilmData[] | null) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
  isEnded: boolean;
  setIsEnded: (isEnded: boolean) => void;
};

export const NarrationsContext = createContext<NarrationsContextType | null>(
  null,
);

export function NarrationsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [films, setFilms] = useState<FilmData[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  return (
    <NarrationsContext.Provider
      value={{
        films,
        setFilms,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        hasStarted,
        setHasStarted,
        isEnded,
        setIsEnded,
      }}
    >
      {children}
    </NarrationsContext.Provider>
  );
}

export function useNarrationsContext() {
  const context = useContext(NarrationsContext);

  if (!context) {
    throw new Error(
      "useNarrationsContext must be used within a NarrationsContextProvider",
    );
  }

  return context;
}
