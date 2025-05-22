"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useFilmsContext } from "./FilmsContext";
import { ClientTag, TagCategory } from "@/utils/cdApi";

export const filterGrid =
  "w-max-1/2 grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-8";

export const tagsGrid =
  "w-max-ful grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-8";

export const filterButtons =
  "text-[0.4rem] font-semibold text-black transition-colors hover:bg-yellow_secondary md:text-[0.5rem] lg:text-xs md:font-bold";

export const FilmFilters: FC = () => {
  const { fragments, setFragments, fragmentsResponse, tagCategoriesResponse } =
    useFilmsContext();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Load selected tags from sessionStorage on mount
  useEffect(() => {
    const savedTags = sessionStorage.getItem("selectedTags");
    if (savedTags) {
      setSelectedTags(JSON.parse(savedTags));
    }
  }, []);

  // Save selected tags to sessionStorage when they change
  useEffect(() => {
    sessionStorage.setItem("selectedTags", JSON.stringify(selectedTags));
  }, [selectedTags]);

  // Apply filters when selection changes
  useEffect(() => {
    if (fragmentsResponse?.data) {
      const hasTagFilters = selectedTags.length > 0;

      // If no filters are active, show all fragments
      if (!hasTagFilters) {
        setFragments(fragmentsResponse.data);
        return;
      }

      // Apply filters
      const filteredFragments = fragmentsResponse.data.filter((fragment) => {
        // Tag filter matching - require ALL selected tags to be present
        const matchesTags = selectedTags.every((selectedTagId) =>
          fragment.tags.some((tag) => tag.id === selectedTagId),
        );

        return matchesTags;
      });

      setFragments(filteredFragments);
    }
  }, [selectedTags, fragmentsResponse, setFragments]);

  const handleTagClick = (tag: ClientTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag.id)
        ? prev.filter((t) => t !== tag.id)
        : [...prev, tag.id],
    );
  };

  if (!fragmentsResponse || !tagCategoriesResponse) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {tagCategoriesResponse.tagCategories.map((category: TagCategory) => (
          <div key={category.id} className="space-y-2">
            <h3 className="text-sm font-medium text-yellow_secondary">
              {category.name}
            </h3>
            <div className={tagsGrid}>
              {category.tags.map((tag) => (
                <Button
                  key={tag.id}
                  value={tag.id}
                  className={`${
                    selectedTags.includes(tag.id)
                      ? "bg-green_accent"
                      : "bg-gray_light_secondary"
                  } ${filterButtons}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
