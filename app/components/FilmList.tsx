"use client";

import React from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import { FilmCollection } from "../../types/videos";

interface FilmListProps {
  filmCollection: FilmCollection;
}

const FilmList: React.FC<FilmListProps> = ({ filmCollection }) => {
  return (
    <div className="grid grid-cols-1 gap-4 pt-20 sm:grid-cols-2 lg:grid-cols-4">
      {filmCollection.films.map((film) => (
        <Link key={film.guid} href={`/film/${film.guid}`}>
          <div className="cursor-pointer p-5 transition-colors hover:bg-yellow_secondary">
            <Image
              src={getThumbnail(film.guid)}
              alt={film.title}
              width={300}
              height={200}
              className="h-auto w-full"
            />
            <h3 className="mt-2 text-xl font-semibold text-yellow_secondary">
              {film.title.split("_")[2]}
            </h3>
            <p className="mt-1 text-green_accent">
              {parseTags(film.metaTags)[0] || ""}
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

function parseTags(
  metaTags: {
    property: string;
    value: string;
  }[],
): string[] {
  if (!metaTags) return [];
  const tags: string[] | undefined = metaTags
    .find((tag) => tag.property === "tags")
    ?.value?.split(",");
  return tags ?? [];
}
