"use client";

import { useEffect, useState } from "react";
import { Film, FilmsCollection } from "@/types/videos";
import Section from "@/components/Section";
import FilmList from "@/components/films/FilmList";
import { FilmsContext } from "@/components/films/FilmsContext";
import ShowAllOrFilters from "../../components/films/ShowAllOrFilters";
import { getFilms } from "../../components/films/actions";

export default function Stories() {
  const [collection, setCollection] = useState<FilmsCollection | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    const updateFilms = async () => {
      const filmsCollection = await getFilms();

      setCollection(filmsCollection);
    };

    updateFilms();
  }, []);

  return (
    <main>
      <Section id="stories" theme="dark">
        <FilmsContext.Provider
          value={{ films, setFilms, collection, setCollection }}
        >
          {collection ? (
            <div>
              <ShowAllOrFilters />
              <FilmList />
            </div>
          ) : (
            <div className="h-full, bg-black_bg"></div>
          )}
        </FilmsContext.Provider>
      </Section>
    </main>
  );
}
