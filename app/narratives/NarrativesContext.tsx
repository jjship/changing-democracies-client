import React, { createContext, useContext, useState } from "react";
import { NarrationPath } from "@/types/videosAndFilms";

const defaultContext: NarrativesContextType = {
  currentPath: null,
  setCurrentPath: () => {},
  narrationPaths: null,
  isPlaying: false,
  setIsPlaying: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
  showCountDown: true,
  setShowCountDown: () => {},
};

type NarrativesContextType = {
  currentPath: NarrationPath | null;
  setCurrentPath: (narrationPath: NarrationPath | null) => void;
  narrationPaths: NarrationPath[] | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  showCountDown: boolean;
  setShowCountDown: (showCountDown: boolean) => void;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
};

export const NarrativesContext =
  createContext<NarrativesContextType>(defaultContext);

export function NarrativesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null);
  const [narrationPaths] = useState<NarrationPath[] | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showCountDown, setShowCountDown] = useState<boolean>(true);

  return (
    <NarrativesContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        narrationPaths,
        isPlaying,
        setIsPlaying,
        currentIndex,
        setCurrentIndex,
        showCountDown,
        setShowCountDown,
      }}
    >
      {children}
    </NarrativesContext.Provider>
  );
}

export function useNarrativesContext() {
  const context = useContext(NarrativesContext);

  if (!context) {
    throw new Error(
      "useNarrativesContext must be used within a NarrativesContextProvider",
    );
  }

  return context;
}
