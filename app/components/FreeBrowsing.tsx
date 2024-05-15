"use client";

import { useEffect, useState } from "react";
import FilmList from "./freeBrowsing/FilmList";
import Filters from "./freeBrowsing/FilmFilters";

interface Film {
  id: string;
  title: string;
  country: string;
  tags: string[];
}

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetch("/api/films")
      .then((response) => response.json())
      .then((data) => setFilms(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold">Free browsing</h1>
      <Filters />
      <FilmList films={films} />
    </div>
  );
};

export default HomePage;
