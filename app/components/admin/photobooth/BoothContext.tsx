import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Open_Sans } from "next/font/google";

import { Language } from "./boothConstats";

type BoothContextType = {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  currentLang: Language;
  setCurrentLang: Dispatch<SetStateAction<Language>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  prevLocations: string[];
  setPrevLocations: Dispatch<SetStateAction<string[]>>;
  windowHeight: number;
  windowWidth: number;
  userName: string | null;
  setUserName: Dispatch<SetStateAction<string | null>>;
  statements: string[] | null;
  setStatements: Dispatch<SetStateAction<string[] | null>>;
  filename: string | null;
  setFilename: Dispatch<SetStateAction<string | null>>;
  font: { className: string; fontFamily: string };
  setFont: Dispatch<SetStateAction<{ className: string; fontFamily: string }>>;
};

export const BoothContext = createContext<BoothContextType | null>(null);

const openSans = Open_Sans({ subsets: ["greek"], weight: "700" });

export function BoothContextProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<string>("");
  const [prevLocations, setPrevLocations] = useState<string[]>([""]);
  const [stage, setStage] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<Language>("english");
  const [userName, setUserName] = useState<string | null>(null);
  const [statements, setStatements] = useState<string[] | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [font, setFont] = useState<{ className: string; fontFamily: string }>({
    className: openSans.className,
    fontFamily: openSans.style.fontFamily,
  });
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
        prevLocations,
        setPrevLocations,
        windowHeight: windowSize.height,
        windowWidth: windowSize.width,
        userName,
        setUserName,
        statements,
        setStatements,
        filename,
        setFilename,
        font,
        setFont,
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
