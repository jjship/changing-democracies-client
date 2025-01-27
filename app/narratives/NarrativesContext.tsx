import { createContext, FC, ReactNode, useContext, useState } from "react";
import { NarrationPath } from "@/types/videosAndFilms";

const defaultContext: NarrativesContextType = {
  currentPath: null,
  setCurrentPath: () => {},
  narrationPaths: null,
  isPlaying: false,
  setIsPlaying: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
  switchPath: false,
  setSwitchPath: () => {},
};

type NarrativesContextType = {
  currentPath: NarrationPath | null;
  setCurrentPath: (narrationPath: NarrationPath | null) => void;
  narrationPaths: NarrationPath[] | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  switchPath: boolean;
  setSwitchPath: (switchPath: boolean) => void;
};

const NarrativesContext = createContext<NarrativesContextType>(defaultContext);

export function useNarrativesContext() {
  const context = useContext(NarrativesContext);

  if (!context) {
    throw new Error(
      "useNarrativesContext must be used within a NarrativesContextProvider",
    );
  }

  return context;
}

interface NarrativesProviderProps {
  children: ReactNode;
  initialNarrationPaths?: NarrationPath[] | null;
}

export const NarrativesProvider: FC<NarrativesProviderProps> = ({
  children,
  initialNarrationPaths = null,
}) => {
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null);
  const [narrationPaths] = useState<NarrationPath[] | null>(
    initialNarrationPaths,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [switchPath, setSwitchPath] = useState(false);

  const value = {
    currentPath,
    setCurrentPath,
    narrationPaths,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    switchPath,
    setSwitchPath,
  };

  return (
    <NarrativesContext.Provider value={value}>
      {children}
    </NarrativesContext.Provider>
  );
};

export default NarrativesContext;
