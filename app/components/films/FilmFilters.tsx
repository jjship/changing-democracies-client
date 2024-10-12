"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";

export { Filters, filterButtons, filterGrid };

const filterGrid =
  "w-max-ful grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-7 lg:grid-cols-8";

const filterButtons =
  "text-[0.4rem] font-semibold text-black transition-colors hover:bg-yellow_secondary md:text-[0.65rem] lg:text-xs md:font-bold";

const Filters: FC = () => {
  const { setFilms, filmsCollection } = useFilmsContext();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCountries = localStorage.getItem("countries");
      const storedPeople = localStorage.getItem("people");

      if (storedCountries) setSelectedCountries(JSON.parse(storedCountries));

      if (storedPeople) setSelectedPeople(JSON.parse(storedPeople));
    }
  }, []);

  useEffect(() => {
    if (filmsCollection) {
      setFilms(
        filmsCollection.films.filter(
          (film) =>
            selectedCountries.includes(film.country) ||
            selectedPeople.includes(film.person),
        ),
      );
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("countries", JSON.stringify(selectedCountries));
      localStorage.setItem("people", JSON.stringify(selectedPeople));
    }
  }, [selectedCountries, selectedPeople, filmsCollection, setFilms]);

  return filmsCollection ? (
    <>
      <div className="md:w-full">
        <p className=" mr-14 py-4 leading-6 text-yellow_secondary md:mr-0">
          Select from the countries or persons below to acces the videos
        </p>
      </div>
      <div className={`${filterGrid}  pb-10`}>
        {filmsCollection.countries.map((tag, i) => (
          <Button
            key={i}
            value={tag}
            className={`${
              selectedCountries.includes(tag)
                ? "bg-green_accent"
                : "bg-gray_light_secondary"
            } ${filterButtons}`}
            onClick={() => {
              selectedCountries.includes(tag)
                ? setSelectedCountries(
                    selectedCountries.filter((t) => t !== tag),
                  )
                : setSelectedCountries([...selectedCountries, tag]);
            }}
          >
            {tag}
          </Button>
        ))}
      </div>
      <div className={` ${filterGrid}`}>
        {filmsCollection.people.map((tag, i) => (
          <Button
            key={i}
            value={tag}
            className={`${
              selectedPeople.includes(tag)
                ? "bg-red_mains"
                : "bg-gray_light_secondary"
            } ${filterButtons}`}
            onClick={() => {
              selectedPeople.includes(tag)
                ? setSelectedPeople(selectedPeople.filter((t) => t !== tag))
                : setSelectedPeople([...selectedPeople, tag]);
            }}
          >
            {tag}
          </Button>
        ))}
      </div>
    </>
  ) : (
    <div className="h-full, bg-black_bg"></div>
  );
};
