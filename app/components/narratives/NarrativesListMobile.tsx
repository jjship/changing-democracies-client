"use client";
import { FC } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { NarrationPath } from "@/types/videosAndFilms";
import { getLocalizedField } from "@/utils/i18n/getLocalizedField";
import { useNarrativeNavigation } from "./utils/narrativeNavigation";
import { narrativeImages } from "./narrativeImages";

export const NarrativesListMobile: FC = () => {
  const { narrationPaths, setCurrentPath, setCurrentIndex, selectedLanguage } =
    useNarrativesContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navigateToNarrative } = useNarrativeNavigation();

  const handleClick = (narrativePath: NarrationPath, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPath(narrativePath);
    setCurrentIndex(0);
    navigateToNarrative(narrativePath.id);
  };

  return (
    <ul className="mx-auto mt-10 grid max-w-[46rem] grid-cols-1 gap-x-6 gap-y-12 pb-12 [@media(min-width:600px)]:grid-cols-2">
      {narrationPaths?.map((narrativePath, index) => {
        const title = getLocalizedField(
          narrativePath.titles,
          selectedLanguage,
          "title",
        );
        return (
          <li key={narrativePath.id}>
            <a
              href={`${pathname}?${new URLSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                id: narrativePath.id,
              }).toString()}`}
              onClick={(e) => handleClick(narrativePath, e)}
              className="relative mx-auto flex min-h-[11rem] w-full max-w-[21rem] items-end"
            >
              <div className="absolute right-[4%] top-1/2 h-44 w-44 -translate-y-1/2 overflow-hidden rounded-full">
                <Image
                  src={`/narratives/${
                    narrativeImages[index] ?? narrativeImages[0]
                  }`}
                  alt=""
                  fill
                  sizes="176px"
                  className="object-cover brightness-[0.6]"
                  priority={index < 3}
                />
              </div>
              <span className="relative z-10 w-[57%] pb-1 text-right text-[clamp(1.25rem,7vw,1.7rem)] font-extrabold leading-[1.15] text-yellow_secondary">
                {title}
              </span>
              <Image
                src="/watch video - icon.svg"
                alt=""
                width={48}
                height={56}
                className="relative z-10 -mb-3 ml-5 h-14 w-12"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};
