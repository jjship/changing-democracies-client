"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";

export { NarrativesList };

const NarrativesList: FC = () => {
  const [isClient, setIsClient] = useState(false);
  const images = [
    "q1.png",
    "q2.png",
    "q3.png",
    "q4.png",
    "q5.png",
    "q6.png",
    "q7.png",
    "q8.png",
    "q9.png",
    "q10.png",
  ];
  const { narrationPaths, setCurrentPath, setCurrentIndex, selectedLanguage } =
    useNarrativesContext();

  const getDescriptionInLanguage = useMemo(
    () => (descriptions: { languageCode: string; description: string[] }[]) => {
      return (
        descriptions.find((desc) => desc.languageCode === selectedLanguage)
          ?.description ||
        descriptions.find((desc) => desc.languageCode === "EN")?.description
      );
    },
    [selectedLanguage],
  );

  return (
    <div className="mt-[5vh] flex flex-col items-center justify-center gap-4 sm:mt-[8vh] sm:gap-8 md:mt-[10vh] md:gap-14">
      {narrationPaths?.map((narrativePath, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPath(narrativePath);
            setCurrentIndex(0);
          }}
          className="ml-40 block w-[80%]" // ml-40 is a hack
          style={{ textDecoration: "none" }}
        >
          <div className="group flex w-[90%] flex-col items-center md:w-3/4 md:flex-row md:gap-8">
            <Box className="relative w-full text-yellow_secondary md:w-1/3">
              <div className="origin-top-left scale-90 transform-gpu md:scale-75">
                <div
                  className="relative h-[300px] w-[300px] rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/${images[index] ?? images[0]})`,
                  }}
                >
                  <div className="absolute inset-0 z-10 rounded-full bg-black/50 transition-opacity duration-300 group-hover:opacity-0" />
                </div>
              </div>
              <div className="mt-4 md:absolute md:bottom-16 md:right-[8vw]">
                <div className="flex w-full items-end justify-between md:w-[16vw]">
                  <div className={"relative right-6 min-w-[14vw] text-right"}>
                    <span className="text-xl font-bold md:text-3xl">
                      {narrativePath.title}
                    </span>
                  </div>
                  <div className="self-end">
                    <button
                      className="mr-2 inline-block h-12 w-12 md:h-12 md:w-12"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPath(narrativePath);
                      }}
                      style={{ background: "none", border: "none", padding: 0 }}
                    >
                      <div
                        className="m-2 h-14 w-12 bg-cover bg-center"
                        style={{
                          backgroundImage: "url('./watch video - icon.svg')",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Box>
            <Box className="flex h-[280px] flex-1 flex-col justify-center">
              {narrativePath.descriptions?.length
                ? getDescriptionInLanguage(narrativePath.descriptions)?.map(
                    (line, i) => (
                      <p key={i.toString()} className="text-white">
                        {line}
                      </p>
                    ),
                  )
                : null}
              <div className="relative top-6 flex w-full flex-row items-center md:mt-8 md:w-1/2">
                <p className="absolute bottom-2 w-full self-end text-end text-xl font-bold text-yellow_secondary md:text-xl">
                  {`${narrativePath.fragments.length} videos, ${Math.floor(
                    narrativePath.total_length / 60,
                  )} min`}
                </p>
                <div
                  className="absolute h-10 w-8 bg-cover bg-center"
                  style={{ backgroundImage: "url('./watch video - icon.svg')" }}
                />
                <div className="h-2 w-full rounded-2xl bg-green_accent" />
              </div>
            </Box>
          </div>
        </a>
      ))}
    </div>
  );
};
