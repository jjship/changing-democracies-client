"use client";
import React from "react";
import { NarrationPath } from "../../types/videosAndFilms";
import { Box } from "@radix-ui/themes";
import Image from "next/image";

export { NarrativesList };

const NarrativesList: React.FC<{
  narrativesCollection: NarrationPath[];
}> = ({ narrativesCollection }) => {
  // const { films, setNowPlaying } = useFilmsContext();
  const images = ["q1.png", "q2.png", "q3.jpg", "q4.jpg", "q5.jpg"];
  return (
    <div className="mt-[10vh] flex flex-col items-center justify-center  space-y-14">
      {narrativesCollection.map(({ description, title }, index) => (
        <div key={index} className="flex w-3/4 flex-row gap-8">
          <Box className="relative w-1/3 text-yellow_secondary">
            <Image
              src={`/${images[index]}`}
              alt={title}
              width={300}
              height={300}
            />
            <div className="absolute bottom-4 right-[12vw] text-xl">
              <div className="flex w-[12vw] items-center justify-between">
                <div>
                  <span className="text-3xl font-bold">{title}</span>
                </div>
                <div className="self-end">
                  <a
                    className="mr-2 inline-block h-8 w-8"
                    href="#" /*onClick={() => setNowPlaying(guid)}*/
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
            <p className="text-white">{description}</p>
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
