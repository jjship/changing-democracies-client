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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {films.map((film) => (
        <Link key={film.guid} href={`/film/${film.guid}`}>
          <div className="cursor-pointer rounded border border-gray-300 p-4 transition-colors hover:bg-gray-200">
            <Image
              src={getThumbnail(film.guid)}
              alt={film.title}
              width={300}
              height={200}
              className="h-auto w-full rounded"
            />
            <h3 className="mt-2 text-xl font-semibold">{film.title}</h3>
            <p className="mt-1 text-gray-600">
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
