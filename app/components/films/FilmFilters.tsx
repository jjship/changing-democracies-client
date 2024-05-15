"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";

const filterGrid =
  "w-max-full mb-4 grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-7 lg:grid-cols-8 ";

const filterButtons =
  "text-[0.4rem] font-semibold text-black transition-colors hover:bg-yellow_secondary md:text-[0.65rem] lg:text-xs md:font-bold";

const Filters: React.FC = () => {
  const { setFilms, collection } = useFilmsContext();
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(
    [],
  );
  const [selectedPeople, setSelectedPeople] = React.useState<string[]>([]);

  // useEffect(() => {
  //   if (collection) {
  //     setSelectedCountries(collection.countries);
  //     setSelectedPeople(collection.people);
  //   }
  // }, [collection]);

  useEffect(() => {
    if (collection) {
      setFilms(
        collection.films.filter(
          (film) =>
            selectedCountries.includes(film.country) ||
            selectedPeople.includes(film.person),
        ),
      );
    }
  }, [selectedCountries, selectedPeople]);

  return (
    collection && (
      <>
        <div className={`pb-10 pt-20 ${filterGrid}`}>
          {collection.countries.map((tag, i) => (
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
        <div className={`py-10 ${filterGrid}`}>
          {collection.people.map((tag, i) => (
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
    )
  );
};

export default Filters;
