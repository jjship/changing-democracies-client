"use client";

import { useEffect, useState } from "react";
import FilmList from "./FilmList";
import Filters from "./FilmFilters";
import { FilmCollection } from "../../types/videos";

const HomePage = () => {
  const [collection, setCollection] = useState<FilmCollection | null>(null);

  useEffect(() => {
    fetch("/api/films")
      .then((response) => response.json())
      .then((data) => setCollection(data));
  }, []);

  return (
    collection && (
      <div className="p-8">
        <h1 className="mb-6 text-4xl font-bold">Free browsing</h1>
        <Filters filmCollection={collection} />
        <FilmList filmCollection={collection} />
      </div>
    )
  );
};

export default HomePage;
