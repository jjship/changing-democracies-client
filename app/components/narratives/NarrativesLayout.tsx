"use client";
import { FC, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { NarrationPath } from "@/types/videosAndFilms";
import { sectionPadding } from "../Section";
import SequenceProgressBar from "./SequenceProgrwssBar";
import { NarrativesOverview } from "@/components/narratives/NarrativesOverview";
import { Archivo } from "next/font/google";
import NarrativesContext from "@/app/narratives/NarrativesContext";
import { Box } from "@radix-ui/themes/dist/esm/components/box.js";

const archivo = Archivo({ subsets: ["latin"] });

const NarrativesLayout: FC<{ narrationPaths: NarrationPath[] }> = ({
  narrationPaths,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<NarrationPath | null>(null);
  const [switchPath, setSwitchPath] = useState<boolean>(false);
  // TODO: remove scrolls visibility from all sites
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
        switchPath,
        setSwitchPath,
      }}
    >
      <div
        className={`${archivo.className} max-screen relative max-h-screen overflow-hidden`}
      >
        <Navigation bgColor="black_bg" fontColor="yellow_secondary" />
        <div
          className={`transition-height z-20 mx-auto w-[90vw] overflow-auto rounded-3xl bg-black_bg duration-1000 ease-linear ${
            sectionPadding.x
          } ${switchPath ? "h-[calc(65vh-40px)]" : "h-[calc(90vh-40px)]"}`}
        >
          {/*//TODO: max width query for mor than 1200px*/}
          <NarrativesOverview narrativesCollection={narrationPaths} />
        </div>
        <div
          className={`-z-[5] flex items-center justify-center bg-yellow_secondary px-[14vw] transition-all duration-1000 ease-linear ${
            switchPath ? "sticky bottom-0 h-[40vh]" : "sticky bottom-0 h-[15vh]"
          }`}
        ></div>

        <div
          className={`fixed transition-all duration-1000 ease-linear  ${
            switchPath ? "bottom-[28vh]" : "bottom-[3vh]"
          }  z-50 h-auto w-[100%] px-[14vw]`}
        >
          {currentPath && (
            <Box className={"bg-yellow relative"}>
              <SequenceProgressBar />
            </Box>
          )}
        </div>
      </div>
    </NarrativesContext.Provider>
  );
};

export default NarrativesLayout;


// h-[calc(${switchPath ? '65vh' : '90vh'}-40px)]
// ${switchPath ? 'h-[calc(65vh-40px)]' : 'h--[calc(90vh-40px)]'}
// ${switchPath ? 'h-[65vh]' : 'h-[90vh]'}