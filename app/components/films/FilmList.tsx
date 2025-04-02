"use client";

import React from "react";
import Image from "next/image";
import { useFilmsContext } from "./FilmsContext";

const FilmList: React.FC = () => {
  const { fragments, setNowPlaying } = useFilmsContext();

  return fragments ? (
    <div className="grid grid-cols-1 gap-10 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {fragments.map(({ id, title, person, thumbnailUrl, tags }) => (
        <a key={id} href="#" onClick={() => setNowPlaying(id)}>
          <div className="cursor-pointer text-yellow_secondary transition-colors hover:bg-yellow_secondary hover:text-black_bg">
            <Image
              src={thumbnailUrl}
              alt={title}
              width={250}
              height={1}
              className="h-auto w-full"
            />
            <h3 className="mt-2 text-xl font-semibold text-inherit">
              {person?.name || title}
            </h3>
            <p className="text-green_accent">{person?.country?.name || ""}</p>
          </div>
        </a>
      ))}
    </div>
  ) : (
    <div className="h-full, bg-black_bg"></div>
  );
};

export default FilmList;
