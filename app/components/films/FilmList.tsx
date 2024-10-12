"use client";

import React from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import { useFilmsContext } from "./FilmsContext";
import { getThumbnail } from "../../../utils/films-methods";

const FilmList: React.FC = () => {
  const { films, setNowPlaying } = useFilmsContext();

  return films ? (
    <div className="grid grid-cols-1 gap-10 pt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {films.map(({ guid, title, person, country }) => (
        <a key={guid} href="#" onClick={() => setNowPlaying(guid)}>
          <div className="cursor-pointer text-yellow_secondary transition-colors hover:bg-yellow_secondary hover:text-black_bg">
            <Image
              src={getThumbnail(guid)}
              alt={title}
              width={250}
              height={1}
              className="h-auto w-full"
            />
            {/* <div
                className="absolute inset-0 flex flex-col justify-between bg-yellow_secondary bg-opacity-90 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100"
                style={{
                  transform: "translate(15%, -10%)",
                  width: "100%",
                  height: "100%",
                }}
              ></div> */}
            <h3 className="mt-2 text-xl font-semibold text-inherit">
              {person}
            </h3>
            <p className="text-green_accent">{country}</p>
          </div>
        </a>
      ))}
    </div>
  ) : (
    <div className="h-full, bg-black_bg"></div>
  );
};

export default FilmList;
