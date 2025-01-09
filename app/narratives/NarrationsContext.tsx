import React, { createContext, useContext, useState } from "react";
import { NarrationPath } from "@/types/videosAndFilms";

type NarrationContextType = {
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

const defaultContext: NarrationContextType = {
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

export const NarrationContext =
  createContext<NarrationContextType>(defaultContext);

export function NarrationContextProvider({
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
    <NarrationContext.Provider
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
    </NarrationContext.Provider>
  );
}

export function useNarrationContext() {
  const context = useContext(NarrationContext);

  if (!context) {
    throw new Error(
      "useNarrationContext must be used within a NarrationContextProvider",
    );
  }

  return context;
}
