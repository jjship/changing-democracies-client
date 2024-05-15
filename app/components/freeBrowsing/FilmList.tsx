"use client";

import React from "react";
import { useRouter } from "next/router";

interface Film {
  id: string;
  title: string;
  country: string;
  tags: string[];
}

interface FilmListProps {
  films: Film[];
}

const FilmList: React.FC<FilmListProps> = ({ films }) => {
  const router = useRouter();

  const handleFilmClick = (id: string) => {
    router.push(`/film/${id}`);
  };

  return (
    <div className="space-y-4">
      {films.map((film) => (
        <div
          key={film.id}
          className="cursor-pointer rounded border border-gray-300 p-4 transition-colors hover:bg-gray-200"
          onClick={() => handleFilmClick(film.id)}
        >
          <h3 className="text-xl font-semibold">{film.title}</h3>
          <p className="text-gray-600">{film.country}</p>
        </div>
      ))}
    </div>
  );
};

export default FilmList;
