"use client";

import { FC } from "react";
import { useFilmsContext } from "./FilmsContext";
import Image from "next/image";

const FilmList: FC = () => {
  const { fragments, setNowPlaying } = useFilmsContext();

  return (
    <div className="grid grid-cols-1 gap-10 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {fragments.map((fragment) => (
        <a
          key={fragment.id}
          href={`?id=${fragment.id}`}
          onClick={(e) => {
            e.preventDefault();
            setNowPlaying(fragment.id);
          }}
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
