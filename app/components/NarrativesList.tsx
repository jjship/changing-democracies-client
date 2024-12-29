"use client";
import React from "react";
import { NarrationPath } from "../../types/videosAndFilms";
import { Box } from "@radix-ui/themes";
import Image from "next/image";
import { floor } from "@floating-ui/utils";
import { useNarrationContext } from "../narratives/NarrationsContext";

export { NarrativesList };

const NarrativesList: React.FC = () => {
  const images = ["q1.png", "q2.png", "q3.png", "q4.png", "q5.png"];

  const { narrationPaths, setCurrentPath } = useNarrationContext();

  return (
    <div className="mt-[10vh] flex flex-col items-center justify-center gap-8 md:gap-14">
      {narrationPaths?.map((narration, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPath(narration);
          }}
          className="ml-40 block w-[80%]" // ml-40 is a hack
          style={{ textDecoration: "none" }}
        >
          <div className="group flex w-[90%] flex-col items-center md:w-3/4 md:flex-row md:gap-8">
            <Box className="relative w-full text-yellow_secondary md:w-1/3">
              <div className="origin-top-left scale-90 transform-gpu md:scale-75">
                <div className=" relative h-[300px] w-[300px]">
                  <div className="absolute inset-0 z-10 rounded-full bg-black/50 transition-opacity duration-300 group-hover:opacity-0" />
                  <Image
                    src={`/${images[index]}`}
                    alt={narration.title}
                    width={300}
                    height={300}
                    layout="responsive"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className=" mt-4 md:absolute md:bottom-16 md:right-[8vw]">
                <div className="flex w-full items-end justify-between md:w-[16vw]">
                  <div className={"relative right-6 min-w-[14vw] text-right"}>
                    <span className="text-xl font-bold  md:text-3xl">
                      {narration.title}
                    </span>
                  </div>
                  <div className="self-end">
                    <a
                      className="mr-2 inline-block h-12 w-12 md:h-12 md:w-12"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPath(narration);
                      }}
                    >
                      <Image
                        className={"m-2"}
                        src="/watch video - icon.svg"
                        alt="Watch video"
                        width={48}
                        height={48}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </Box>
            <Box className="flex h-[280px] flex-1 flex-col justify-center">
              {narration.description?.length ? (
                narration.description.map((line, i) => (
                  <p key={(line.length + i).toString()} className="text-white">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-white"></p>
              )}
              <div className="relative top-6 flex w-full flex-row items-center md:mt-8 md:w-1/2">
                <p className="absolute bottom-2 w-full self-end text-end text-xl font-bold text-yellow_secondary md:text-xl">
                  {`${narration.fragments.length - 1} videos, ${floor(
                    narration.total_length / 60,
                  )} min`}
                </p>
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
        </a>
      ))}
    </div>
  );
};
