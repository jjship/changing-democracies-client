"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { VideoDbEntry } from "@/types/videos";
import { FilmCollection } from "../films/route";
import Link from "next/dist/client/link";

interface FilmListProps {
  films: VideoDbEntry[];
}

const FilmList: React.FC<FilmListProps> = ({ films }) => {
  return (
    <div className="space-y-4">
      {films.map((film) => (
        <Link key={film.guid} href={`/film/${film.guid}`}>
          <div className="cursor-pointer rounded border border-gray-300 p-4 transition-colors hover:bg-gray-200">
            <Image
              src={getThumbnail(film.guid)}
              alt="link to play film"
              width={300}
              height={200}
            ></Image>
            <h3 className="text-xl font-semibold">{film.title}</h3>
            <p className="text-gray-600">
              {film.metaTags
                .find((tag) => tag.property === "tags")
                ?.value?.split(",")
                .join(" ") || ""}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FilmList;

const getThumbnail = (filmId: string) =>
  `https://${process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE}.b-cdn.net/${filmId}/thumbnail.jpg`;
