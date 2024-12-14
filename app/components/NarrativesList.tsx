"use client";
import React from "react";
import { NarrationPath } from "../../types/videosAndFilms";
import { Box } from "@radix-ui/themes";
import Image from "next/image";

export { NarrativesList };

const NarrativesList: React.FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  const images = ["q1.png", "q2.png", "q3.jpg", "q4.jpg", "q5.jpg"];

  return (
    <div className="mt-[10vh] flex flex-col items-center justify-center gap-8 md:gap-14">
      {narrativesCollection.map((narration, index) => (
        <div
          key={index}
          className="flex w-[90%] flex-col md:w-3/4 md:flex-row md:gap-8"
        >
          <Box className="relative w-full text-yellow_secondary md:w-1/3">
            <div className="origin-top-left scale-90 transform-gpu md:scale-75">
              <div className="group relative h-[300px] w-[300px]">
                <div className="absolute inset-0 z-10 rounded-full bg-black/50 transition-opacity duration-300 group-hover:opacity-0" />
                <Image
                  src={`/${images[index]}`}
                  alt={narration.title}
                  width={300}
                  height={300}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="mt-4 md:absolute md:bottom-16 md:right-[12vw]">
              <div className="flex w-full items-end justify-between md:w-[12vw]">
                <div>
                  <span className="text-xl font-bold md:text-3xl">
                    {narration.title}
                  </span>
                </div>
                <div className="self-end">
                  <a
                    className="mr-2 inline-block h-6 w-6 md:h-8 md:w-8"
                    href="#"
                    onClick={(e) => {}}
                  >
                    <Image
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
          <Box className="mt-6 flex flex-1 flex-col justify-center md:mt-12">
            <p className="text-sm text-white md:text-base">
              {narration.description}
            </p>
            <div className="relative mt-4 flex w-full flex-row items-center md:mt-8 md:w-1/2">
              <Image
                className="absolute"
                src="/watch video - icon.svg"
                alt="Watch video"
                width={32}
                height={32}
              />
              <div className="h-2 w-full rounded-2xl bg-green_accent" />
            </div>
          </Box>
        </div>
      ))}
    </div>
  );
};
