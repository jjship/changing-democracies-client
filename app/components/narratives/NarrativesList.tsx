"use client";
import { FC } from "react";
import { Box } from "@radix-ui/themes";
import Image from "next/image";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { NarrationPath } from "@/types/videosAndFilms";
import { getLocalizedField } from "@/utils/i18n/getLocalizedField";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { narrativeImages as images } from "./narrativeImages";

export const NarrativesList: FC = () => {
  const { narrationPaths, setCurrentPath, setCurrentIndex, selectedLanguage } =
    useNarrativesContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNarrativeClick = (
    narrativePath: NarrationPath,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    setCurrentPath(narrativePath);
    setCurrentIndex(0);

    // Create new URLSearchParams with existing params
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", narrativePath.id);

    // Update URL while preserving other parameters
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-[10vh] flex w-full flex-col items-center justify-center gap-12">
      {narrationPaths?.map((narrativePath, index) => (
        <a
          key={index}
          href={`${pathname}?${new URLSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            id: narrativePath.id,
          }).toString()}`}
          onClick={(e) => handleNarrativeClick(narrativePath, e)}
          className="ml-40 block w-full"
          style={{ textDecoration: "none" }}
        >
          <div className="group flex w-10/12 flex-row items-center gap-8 xl:w-3/4">
            <Box className="relative w-1/3 text-yellow_secondary">
              <div className="relative h-[300px] w-[300px] origin-top-left scale-75 transform-gpu overflow-hidden rounded-full">
                <Image
                  src={`/narratives/${images[index] ?? images[0]}`}
                  alt={
                    getLocalizedField(
                      narrativePath.titles,
                      selectedLanguage,
                      "title",
                    ) || "Narrative image"
                  }
                  fill
                  sizes="300px"
                  className="object-cover brightness-50 transition-all duration-300 group-hover:brightness-100"
                  priority={index < 3}
                />
              </div>

              <div className="absolute bottom-16 right-[8vw]">
                <div className="flex w-[16vw] items-end justify-between">
                  <div className="relative right-6 min-w-[14vw] text-right">
                    <span className="text-3xl font-bold">
                      {getLocalizedField(
                        narrativePath.titles,
                        selectedLanguage,
                        "title",
                      )}
                    </span>
                  </div>
                  <div className="self-end">
                    <button
                      className="mr-2 inline-block h-12 w-12"
                      onClick={(e) => handleNarrativeClick(narrativePath, e)}
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

            <Box className="flex h-[280px] max-w-[50vw] flex-1 flex-col justify-center lg:max-w-[40vw] xl:max-w-[30vw]">
              <div>
                {narrativePath.descriptions?.length
                  ? getLocalizedField(
                      narrativePath.descriptions,
                      selectedLanguage,
                      "description",
                    )?.map((line, i) => (
                      <p key={i.toString()} className="text-white">
                        {line}
                      </p>
                    ))
                  : null}
              </div>

              <div className="relative top-6 mt-8 flex w-1/2 flex-row items-center">
                <Image
                  src="../watch video - icon.svg"
                  alt="Watch video indicator"
                  width={32}
                  height={40}
                  className="absolute"
                />
                <div className="h-2 w-full rounded-2xl bg-green_accent" />
                <p className="absolute bottom-2 w-full self-end text-end text-xl font-bold text-yellow_secondary">
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
