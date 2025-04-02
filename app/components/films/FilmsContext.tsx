"use client";

import { createContext, useContext, useState } from "react";
import { ClientFragment, FragmentsResponse } from "@/lib/cdApi";

type FilmsContextType = {
  fragments: ClientFragment[] | null;
  setFragments: (fragments: ClientFragment[] | null) => void;
  fragmentsResponse: FragmentsResponse | null;
  nowPlaying: string | null;
  setNowPlaying: (fragmentId: string | null) => void;
};

export const FilmsContext = createContext<FilmsContextType | null>(null);

export function FilmsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fragments, setFragments] = useState<ClientFragment[] | null>(null);
  const [fragmentsResponse] = useState<FragmentsResponse | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  return (
    <FilmsContext.Provider
      value={{
        fragments,
        setFragments,
        fragmentsResponse,
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
