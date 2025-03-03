import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { NarrationPath } from "@/types/videosAndFilms";

// Constant for localStorage key to maintain consistency across the app
const LANGUAGE_PREFERENCE_KEY = "changing-democracies-language";

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
  showSidePanel: false,
  setShowSidePanel: () => {},
  selectedLanguage: undefined,
  setSelectedLanguage: () => {},
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
  showSidePanel: boolean;
  setShowSidePanel: (showSidePanel: boolean) => void;
  selectedLanguage: string | undefined;
  setSelectedLanguage: (selectedLanguage: string | undefined) => void;
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
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedLanguage, setSelectedLanguageState] = useState<
    string | undefined
  >(undefined);

  // Custom setter that also updates localStorage
  const setSelectedLanguage = (language: string | undefined) => {
    setSelectedLanguageState(language);

    // Save to localStorage whenever language changes
    if (typeof window !== "undefined" && language) {
      localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
    }
  };

  // Initialize from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
      if (storedLanguage) {
        setSelectedLanguageState(storedLanguage);
      }
    }
  }, []);

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
    showSidePanel,
    setShowSidePanel,
    selectedLanguage,
    setSelectedLanguage,
  };

  return (
    <NarrativesContext.Provider value={value}>
      {children}
    </NarrativesContext.Provider>
  );
};

export default NarrativesContext;
