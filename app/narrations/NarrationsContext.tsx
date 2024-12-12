"use client";

import { FilmData } from "@/types/videosAndFilms";
import { createContext, useContext, useState } from "react";

type NarrationState = {
  films: FilmData[] | null;
  currentIndex: number;
  isPlaying: boolean;
  hasStarted: boolean;
  isEnded: boolean;
};

type NarrationsContextType = {
  state: NarrationState;
  setState: React.Dispatch<React.SetStateAction<NarrationState>>;
};

export const NarrationsContext = createContext<NarrationsContextType | null>(
  null,
);

export function NarrationsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<NarrationState>({
    films: null,
    currentIndex: 0,
    isPlaying: false,
    hasStarted: false,
    isEnded: false,
  });

  return (
    <NarrationsContext.Provider value={{ state, setState }}>
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
