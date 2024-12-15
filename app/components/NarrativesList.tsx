"use client";
import React from "react";
import { NarrationPath } from "../../types/videosAndFilms";
import { Box } from "@radix-ui/themes";
import Image from "next/image";

export { NarrativesList };

const NarrativesList: React.FC<{
  narrativesCollection: NarrationPath[];
  setSelectedNarration: (narration: NarrationPath) => void;
}> = ({ narrativesCollection, setSelectedNarration }) => {
  const images = ["q1.png", "q2.png", "q3.jpg", "q4.jpg", "q5.jpg"];

  const handleClick = (narration: NarrationPath) => {
    setSelectedNarration(narration);
  };

  return (
    <div className="mt-[10vh] flex flex-col items-center justify-center  space-y-14">
      {narrativesCollection.map((narration, index) => (
        <div key={index} className="flex w-3/4 flex-row gap-8">
          <Box className="relative w-1/3 text-yellow_secondary">
            <Image
              src={`/${images[index]}`}
              alt={narration.title}
              width={300}
              height={300}
            />
            <div className="absolute bottom-4 right-[12vw] text-xl">
              <div className="flex w-[12vw] items-center justify-between">
                <div>
                  <span className="text-3xl font-bold">{narration.title}</span>
                </div>
                <div className="self-end">
                  <a
                    className="mr-2 inline-block h-8 w-8"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(narration);
                    }}
                  >
                    <Image
                      className={""}
                      src="/watch video - icon.svg"
                      alt="Watch video"
                      width={32}
                      height={32}
                    />
                  </a>
                </div>
              </div>
            </div>
          </Box>
          <Box className="flex flex-1 flex-col justify-center">
            {narration.description?.length ? (
              narration.description.map((line) => (
                <p className="text-white">{line}</p>
              ))
            ) : (
              <p className="text-white">""</p>
            )}
            <div className="relative mt-8 flex w-1/2 flex-row items-center">
              <Image
                className="absolute"
                src="/watch video - icon.svg"
                alt="Watch video"
                width={32}
                height={32}
              />
              <div className={"h-2 w-full rounded-2xl bg-green_accent"}></div>
            </div>
          </Box>
        </div>
      ))}
    </div>
  );
};
