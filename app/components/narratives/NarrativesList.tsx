"use client";
import { FC, useMemo } from "react";
import { Box } from "@radix-ui/themes";
import Image from "next/image";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";

export { NarrativesList };

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
  "q11.png",
  "q12.png",
  "q13.png",
  "q14.png",
  "q15.png",
];

const NarrativesList: FC = () => {
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

  const getTitleInLanguage = useMemo(
    () => (titles: { languageCode: string; title: string }[]) => {
      return (
        titles.find((title) => title.languageCode === selectedLanguage)
          ?.title || titles.find((title) => title.languageCode === "EN")?.title
      );
    },
    [selectedLanguage],
  );

  return (
    <div className="mt-[10vh] flex w-full flex-col items-center justify-center gap-8 md:gap-12">
      {narrationPaths?.map((narrativePath, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPath(narrativePath);
            setCurrentIndex(0);
          }}
          className="ml-40 block w-full"
          style={{ textDecoration: "none" }}
        >
          <div className="group flex w-full flex-col items-center md:w-10/12 md:flex-row md:gap-8 xl:w-3/4">
            <Box className="relative w-full text-yellow_secondary md:w-1/3">
              <div className="relative h-[300px] w-[300px] origin-top-left scale-90 transform-gpu overflow-hidden rounded-full md:scale-75">
                <Image
                  src={`/narratives/${images[index] ?? images[0]}`}
                  alt={
                    getTitleInLanguage(narrativePath.titles) ||
                    "Narrative image"
                  }
                  fill
                  sizes="300px"
                  className="object-cover brightness-50 transition-all duration-300 group-hover:brightness-100"
                  priority={index < 3}
                />
              </div>

              <div className="md:absolute md:bottom-16 md:right-[8vw]">
                <div className="flex w-full items-end justify-between md:w-[16vw]">
                  <div className="relative right-6 min-w-[14vw] text-right">
                    <span className="text-xl font-bold md:text-3xl">
                      {getTitleInLanguage(narrativePath.titles)}
                    </span>
                  </div>
                  <div className="self-end">
                    <button
                      className="mr-2 inline-block h-12 w-12 md:h-12 md:w-12"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPath(narrativePath);
                      }}
                    >
                      <Image
                        src="../watch video - icon.svg"
                        alt="Watch video"
                        width={48}
                        height={56}
                        className="m-2"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Box>

            <Box className="flex h-[280px] flex-1 flex-col justify-center md:max-w-[50vw] lg:max-w-[40vw] xl:max-w-[30vw]">
              <div>
                {narrativePath.descriptions?.length
                  ? getDescriptionInLanguage(narrativePath.descriptions)?.map(
                      (line, i) => (
                        <p key={i.toString()} className="text-white">
                          {line}
                        </p>
                      ),
                    )
                  : null}
              </div>

              <div className="relative top-6 flex w-full flex-row items-center md:mt-8 md:w-1/2">
                <Image
                  src="../watch video - icon.svg"
                  alt="Watch video indicator"
                  width={32}
                  height={40}
                  className="absolute"
                />
                <div className="h-2 w-full rounded-2xl bg-green_accent" />
                <p className="absolute bottom-2 w-full self-end text-end text-xl font-bold text-yellow_secondary md:text-xl">
                  {`${narrativePath.fragments.length} videos, ${Math.floor(
                    narrativePath.total_length / 60,
                  )} min`}
                </p>
              </div>
            </Box>
          </div>
        </a>
      ))}
    </div>
  );
};
