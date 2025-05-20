"use client";

import { FC, useMemo } from "react";
import { useFilmsContext } from "./FilmsContext";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

const FilmList: FC = () => {
  const { fragments, setNowPlaying } = useFilmsContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFragmentClick = (fragmentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setNowPlaying(fragmentId);
  };

  const filteredFragments = useMemo(() => {
    if (!fragments) return [];
    return fragments;
  }, [fragments]);

  return (
    <div className="grid grid-cols-1 gap-10 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredFragments.map((fragment) => (
        <a
          key={fragment.id}
          href={`${pathname}?${new URLSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            id: fragment.id,
          }).toString()}`}
          onClick={(e) => handleFragmentClick(fragment.id, e)}
          className="cursor-pointer text-yellow_secondary transition-colors hover:bg-yellow_secondary hover:text-black_bg"
        >
          <div>
            <Image
              src={fragment.thumbnailUrl}
              alt={fragment.title}
              width={250}
              height={1}
              className="h-auto w-full"
            />
            <h3 className="mt-2 text-xl font-semibold text-inherit">
              {fragment.person?.name || fragment.title}
            </h3>
            <p className="text-green_accent">
              {fragment.person?.country?.name || ""}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default FilmList;
