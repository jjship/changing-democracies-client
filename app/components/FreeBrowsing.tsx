"use client";

import { useEffect, useState } from "react";
import FilmList from "./FilmList";
import Filters from "./FilmFilters";
import { VideoDbEntry } from "../../types/videos";
import { FilmCollection } from "../films/route";

const HomePage = () => {
  const [films, setFilms] = useState<VideoDbEntry[] | null>(null);

  useEffect(() => {
    fetch("/api/films")
      .then((response) => response.json())
      .then((data) => setFilms(data));
  }, []);

  console.log({ films });

  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold">Free browsing</h1>
      <Filters films={films?.length ? films : []} />
      <FilmList films={films?.length ? films : []} />
    </div>
  );
};

export default HomePage;
