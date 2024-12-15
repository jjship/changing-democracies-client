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
  const images = ["q1.png", "q2.png", "q3.png", "q4.png", "q5.png"];

  const handleClick = (narration: NarrationPath) => {
    setSelectedNarration(narration);
  };

  return (
    <div className="mt-[10vh] flex flex-col items-center justify-center space-y-14">
      {narrativesCollection.map((narration, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick(narration);
          }}
          className="ml-40 block w-full" // ml-40 is a hack
          style={{ textDecoration: "none" }}
        >
          <div className="flex w-3/4 flex-row gap-8  border-4 border-solid border-red-300">
            <Box className="relative w-1/3 border-4 border-solid border-yellow-300 text-yellow_secondary">
              <div className="relative">
                <Image
                  src={`/${images[index]}`}
                  alt={narration.title}
                  layout="responsive"
                  width={300}
                  height={300}
                />
                <div className="absolute inset-0 bg-black_bg opacity-50"></div>
              </div>
              <div className="absolute bottom-4 flex  w-full items-center justify-between border-4  border-solid  border-red-500 text-xl">
                {/* <div className=""> */}
                <div className="relative right-12 w-1/2 border-4 border-solid border-green-500">
                  <span className="text-3xl font-bold">{narration.title}</span>
                </div>
                <div className="w-1/2 self-end border-4 border-solid border-blue-500">
                  <Image
                    src="/watch video - icon.svg"
                    alt="Watch video"
                    layout="responsive"
                    width={32}
                    height={32}
                  />
                </div>
                {/* </div> */}
              </div>
            </Box>
            <Box className="flex flex-1 border-4 border-solid border-blue-300">
              <div className="relative top-6 flex h-full flex-col justify-end">
                <div className="">
                  {narration.description?.length ? (
                    narration.description.map((line, i) => (
                      <p key={`${line}-${i}`} className="text-white">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-white"></p>
                  )}
                </div>
                <div className="relative mt-8 flex w-1/2 flex-row items-center border-4 border-solid border-blue-500">
                  <Image
                    className="absolute"
                    src="/watch video - icon.svg"
                    alt="Watch video"
                    width={32}
                    height={32}
                  />
                  {/* TODO NIKOLA add number of videos <narration.fragments.length> and length <narration.total_length%60> */}
                  <div
                    className={"h-2 w-full rounded-2xl bg-green_accent"}
                  ></div>
                </div>
              </div>
            </Box>
          </div>
        </a>
      ))}
    </div>
  );
};
