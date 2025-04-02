"use client";

import { FC, useEffect, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";

export { Filters, filterButtons, filterGrid };

const filterGrid =
  "w-max-ful grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-7 lg:grid-cols-8";

const filterButtons =
  "text-[0.4rem] font-semibold text-black transition-colors hover:bg-yellow_secondary md:text-[0.65rem] lg:text-xs md:font-bold";

const Filters: FC = () => {
  const { setFragments, fragmentsResponse } = useFilmsContext();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique countries, people, and tags from fragments data
  const { countries, people, tags } = useMemo(() => {
    if (!fragmentsResponse?.data) {
      return { countries: [], people: [], tags: [] };
    }

    const uniqueCountries = new Set<string>();
    const uniquePeople = new Set<string>();
    const uniqueTags = new Set<string>();

    fragmentsResponse.data.forEach((fragment) => {
      if (fragment.person?.country?.name) {
        uniqueCountries.add(fragment.person.country.name);
      }

      if (fragment.person?.name) {
        uniquePeople.add(fragment.person.name);
      }

      // Extract tags
      if (fragment.tags && fragment.tags.length > 0) {
        fragment.tags.forEach((tag) => {
          if (tag.name) {
            uniqueTags.add(tag.name);
          }
        });
      }
    });

    return {
      countries: Array.from(uniqueCountries).sort(),
      people: Array.from(uniquePeople).sort(),
      tags: Array.from(uniqueTags).sort(),
    };
  }, [fragmentsResponse]);

  // Load saved filters from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCountries = localStorage.getItem("countries");
      const storedPeople = localStorage.getItem("people");
      const storedTags = localStorage.getItem("tags");

      if (storedCountries) setSelectedCountries(JSON.parse(storedCountries));
      if (storedPeople) setSelectedPeople(JSON.parse(storedPeople));
      if (storedTags) setSelectedTags(JSON.parse(storedTags));
    }
  }, []);

  // Apply filters when selection changes
  useEffect(() => {
    if (fragmentsResponse?.data) {
      const hasCountryFilters = selectedCountries.length > 0;
      const hasPeopleFilters = selectedPeople.length > 0;
      const hasTagFilters = selectedTags.length > 0;

      // If no filters are active, show all fragments
      if (!hasCountryFilters && !hasPeopleFilters && !hasTagFilters) {
        setFragments(fragmentsResponse.data);
        return;
      }

      // Apply filters
      const filteredFragments = fragmentsResponse.data.filter((fragment) => {
        // Country filter matching
        const matchesCountry =
          !hasCountryFilters ||
          (fragment.person?.country?.name &&
            selectedCountries.includes(fragment.person.country.name));

        // Person filter matching
        const matchesPerson =
          !hasPeopleFilters ||
          (fragment.person?.name &&
            selectedPeople.includes(fragment.person.name));

        // Tag filter matching
        const matchesTags =
          !hasTagFilters ||
          (fragment.tags &&
            fragment.tags.some((tag) => selectedTags.includes(tag.name)));

        // Include fragment if it matches ALL active filter types (AND between categories, OR within each category)
        const filterResult =
          (!hasCountryFilters || matchesCountry) &&
          (!hasPeopleFilters || matchesPerson) &&
          (!hasTagFilters || matchesTags);

        return filterResult;
      });

      setFragments(filteredFragments);
    }

    // Save filter selections to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("countries", JSON.stringify(selectedCountries));
      localStorage.setItem("people", JSON.stringify(selectedPeople));
      localStorage.setItem("tags", JSON.stringify(selectedTags));
    }
  }, [
    selectedCountries,
    selectedPeople,
    selectedTags,
    fragmentsResponse,
    setFragments,
  ]);

  return fragmentsResponse ? (
    <>
      <div className="md:w-full">
        <p className="mr-14 py-4 leading-6 text-yellow_secondary md:mr-0">
          Select from the countries, persons, or tags below to filter the videos
        </p>
      </div>

      {/* Countries filter section */}
      <h3 className="mb-2 text-lg font-medium text-yellow_secondary">
        Countries
      </h3>
      <div className={`${filterGrid} pb-6`}>
        {countries.map((country, i) => (
          <Button
            key={i}
            value={country}
            className={`${
              selectedCountries.includes(country)
                ? "bg-green_accent"
                : "bg-gray_light_secondary"
            } ${filterButtons}`}
            onClick={() => {
              selectedCountries.includes(country)
                ? setSelectedCountries(
                    selectedCountries.filter((c) => c !== country),
                  )
                : setSelectedCountries([...selectedCountries, country]);
            }}
          >
            {country}
          </Button>
        ))}
      </div>

      {/* People filter section */}
      <h3 className="mb-2 mt-4 text-lg font-medium text-yellow_secondary">
        People
      </h3>
      <div className={`${filterGrid} pb-6`}>
        {people.map((person, i) => (
          <Button
            key={i}
            value={person}
            className={`${
              selectedPeople.includes(person)
                ? "bg-red_mains"
                : "bg-gray_light_secondary"
            } ${filterButtons}`}
            onClick={() => {
              selectedPeople.includes(person)
                ? setSelectedPeople(selectedPeople.filter((p) => p !== person))
                : setSelectedPeople([...selectedPeople, person]);
            }}
          >
            {person}
          </Button>
        ))}
      </div>

      {/* Tags filter section */}
      {tags.length > 0 && (
        <>
          <h3 className="mb-2 mt-4 text-lg font-medium text-yellow_secondary">
            Tags
          </h3>
          <div className={`${filterGrid} pb-6`}>
            {tags.map((tag, i) => (
              <Button
                key={i}
                value={tag}
                className={`${
                  selectedTags.includes(tag)
                    ? "bg-blue-500" // Use a distinct color for tags
                    : "bg-gray_light_secondary"
                } ${filterButtons}`}
                onClick={() => {
                  selectedTags.includes(tag)
                    ? setSelectedTags(selectedTags.filter((t) => t !== tag))
                    : setSelectedTags([...selectedTags, tag]);
                }}
              >
                {tag}
              </Button>
            ))}
          </div>
        </>
      )}
    </>
  ) : (
    <div className="h-full, bg-black_bg"></div>
  );
};
