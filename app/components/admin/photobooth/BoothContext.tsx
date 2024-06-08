import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Language } from "./boothConstats";

type BoothContextType = {
  stage: number;
  setStage: (nextStage: number) => void;
  currentLang: Language;
  setCurrentLang: (nextLanguage: Language) => void;
  location: string;
  setLocation: (nextLocation: string) => void;
  windowHeight: number;
  windowWidth: number;
  userName: string | null;
  setUserName: (name: string) => void;
  statement: string | null;
  setStatement: (statement: string) => void;
  filename: string | null;
  setFilename: (filename: string) => void;
};

export const BoothContext = createContext<BoothContextType | null>(null);

export function BoothContextProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<string>("");
  const [stage, setStage] = useState<number>(-2);
  const [currentLang, setCurrentLang] = useState<Language>("english");
  const [userName, setUserName] = useState<string | null>(null);
  const [statement, setStatement] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener("resize", handleResize);
    }
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BoothContext.Provider
      value={{
        stage,
        setStage,
        currentLang,
        setCurrentLang,
        location,
        setLocation,
        windowHeight: windowSize.height,
        windowWidth: windowSize.width,
        userName,
        setUserName,
        statement,
        setStatement,
        filename,
        setFilename,
      }}
    >
      {children}
    </BoothContext.Provider>
  );
}

export function useBoothContext() {
  const context = useContext(BoothContext);

  if (!context) {
    throw new Error(
      "useBoothContext must be used within a BoothContextProvider",
    );
  }

  return context;
}
