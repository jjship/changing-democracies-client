"use client";

import { FC, useEffect, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";

export { Filters, filterButtons, filterGrid };

const filterGrid =
  "w-max-1/2 grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-8";

const tagsGrid =
  "w-max-ful grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-8";

const filterButtons =
  "text-[0.4rem] font-semibold text-black transition-colors hover:bg-yellow_secondary md:text-[0.5rem] lg:text-xs md:font-bold";

const Filters: FC = () => {
  const { setFragments, fragmentsResponse } = useFilmsContext();
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique people, and tags from fragments data
  const { people, tags } = useMemo(() => {
    if (!fragmentsResponse?.data) {
      return { people: [], tags: [] };
    }

    const uniquePeople = new Set<string>();
    const uniqueTags = new Set<string>();

    fragmentsResponse.data.forEach((fragment) => {
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
      people: Array.from(uniquePeople).sort(),
      tags: Array.from(uniqueTags).sort(),
    };
  }, [fragmentsResponse]);

  // Load saved filters from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPeople = localStorage.getItem("people");
      const storedTags = localStorage.getItem("tags");

      if (storedPeople) setSelectedPeople(JSON.parse(storedPeople));
      if (storedTags) setSelectedTags(JSON.parse(storedTags));
    }
  }, []);

  // Apply filters when selection changes
  useEffect(() => {
    if (fragmentsResponse?.data) {
      const hasPeopleFilters = selectedPeople.length > 0;
      const hasTagFilters = selectedTags.length > 0;

      // If no filters are active, show all fragments
      if (!hasPeopleFilters && !hasTagFilters) {
        setFragments(fragmentsResponse.data);
        return;
      }

      // Apply filters
      const filteredFragments = fragmentsResponse.data.filter((fragment) => {
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
          (!hasPeopleFilters || matchesPerson) &&
          (!hasTagFilters || matchesTags);

        return filterResult;
      });

      setFragments(filteredFragments);
    }

    // Save filter selections to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("people", JSON.stringify(selectedPeople));
      localStorage.setItem("tags", JSON.stringify(selectedTags));
    }
  }, [selectedPeople, selectedTags, fragmentsResponse, setFragments]);

  return fragmentsResponse ? (
    <>
      {/* People filter section */}
      <div className="grid grid-flow-row grid-cols-4 gap-2 pb-2 md:grid-cols-9 lg:grid-cols-10">
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
          <div className="grid grid-flow-row grid-cols-4 gap-2 pb-6 md:grid-cols-9 lg:grid-cols-10">
            {tags.map((tag, i) => (
              <Button
                key={i}
                value={tag}
                className={`${
                  selectedTags.includes(tag)
                    ? "bg-green_accent" // Use a distinct color for tags
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
