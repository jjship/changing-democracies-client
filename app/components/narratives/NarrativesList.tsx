import { FC, useEffect, useState } from "react";
import { Box } from "@radix-ui/themes";
import { useNarrativesContext } from "@/app/narratives/NarrativesContext";

export { NarrativesList };

const NarrativesList: FC = () => {
  const [isClient, setIsClient] = useState(false);
  const images = ["q1.png", "q2.png", "q3.png", "q4.png", "q5.png"];
  const { narrationPaths, setCurrentPath } = useNarrativesContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="mt-[5vh] flex flex-col items-center justify-center gap-4 sm:mt-[8vh] sm:gap-8 md:mt-[10vh] md:gap-14">
      {narrationPaths?.map((narration, index) => (
        <a
          key={index}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPath(narration);
          }}
          className="block w-[80%] xl:ml-40"
          style={{ textDecoration: "none" }}
        >
          <div className="group flex w-full flex-col items-center md:w-3/4 md:flex-row md:gap-8">
            <Box className="relative w-full text-yellow_secondary md:w-1/3">
              <div className="origin-top-left scale-90 transform-gpu md:scale-75">
                <div
                  className="relative h-[200px] w-[200px] rounded-full bg-cover bg-center sm:h-[300px] sm:w-[300px]"
                  style={{ backgroundImage: `url(/${images[index]})` }}
                >
                  <div className="absolute inset-0 z-10 rounded-full bg-black/50 transition-opacity duration-300 group-hover:opacity-0" />
                </div>
              </div>
              <div className="mt-4 md:absolute md:bottom-16 md:right-[8vw]">
                <div className="flex w-full items-end justify-between md:w-[16vw]">
                  <div className="relative  right-6 min-w-[14vw] text-right">
                    <span className="font-bold sm:text-sm md:text-3xl">
                      {narration.title}
                    </span>
                  </div>
                  <div className="self-end">
                    <button
                      className="mr-2 inline-block h-11 w-9 sm:h-13 sm:w-13 md:h-13 md:w-13"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPath(narration);
                      }}
                      style={{ background: "none", border: "none", padding: 0 }}
                    >
                      <div
                        className="m-2 h-11 relative w-9 bg-cover bg-center sm:h-13 sm:w-13"
                        style={{
                          backgroundImage: "url('./watch video - icon.svg')",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Box>
            <Box className="flex h-[200px] flex-1 flex-col justify-center sm:my-3 sm:h-[280px]">
              {narration.description?.length ? (
                narration.description.map((line, i) => (
                  <p key={i.toString()} className="text-white sm:text-sm md:text-base">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-xs text-white sm:text-base"></p>
              )}
              <div className="relative sm:my-6 top-6 flex w-full flex-row items-center md:mt-8 md:w-1/2">
                <p className="absolute bottom-2 w-full self-end text-end text-xs font-bold text-yellow_secondary sm:text-base md:text-xl">
                  {`${narration.fragments.length - 1} videos, ${Math.floor(
                    narration.total_length / 60,
                  )} min`}
                </p>
                <div
                  className="absolute h-6 w-6 bg-cover bg-center sm:h-8 sm:w-8"
                  style={{ backgroundImage: "url(/watch video - icon.svg)" }}
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
