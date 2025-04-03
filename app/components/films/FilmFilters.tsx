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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags from fragments data
  const { tags } = useMemo(() => {
    if (!fragmentsResponse?.data) {
      return { tags: [] };
    }

    const uniqueTags = new Set<string>();

    fragmentsResponse.data.forEach((fragment) => {
      // Extract tags
      if (fragment.tags && fragment.tags.length > 0) {
        fragment.tags.forEach((tag) => {
          if (tag.id) {
            uniqueTags.add(tag.id);
          }
        });
      }
    });

    return {
      tags: Array.from(uniqueTags).sort(),
    };
  }, [fragmentsResponse]);

  // Load saved filters from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTags = sessionStorage.getItem("tags");

      if (storedTags) setSelectedTags(JSON.parse(storedTags));
    }
  }, []);

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
        const matchesTags =
          !hasTagFilters ||
          (fragment.tags &&
            selectedTags.every((selectedTagId) => {
              const hasTag = fragment.tags.some(
                (tag) => tag.id === selectedTagId,
              );

              return hasTag;
            }));

        return matchesTags;
      });

      setFragments(filteredFragments);
    }

    // Save filter selections to sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tags", JSON.stringify(selectedTags));
    }
  }, [selectedTags, fragmentsResponse, setFragments]);

  return fragmentsResponse ? (
    <>
      {/* Tags filter section */}
      {tags.length > 0 && (
        <>
          <div className="grid grid-flow-row grid-cols-4 gap-2 pb-6 md:grid-cols-9 lg:grid-cols-10">
            {tags.map((tagId, i) => {
              // Find the tag name for display
              const tagName =
                fragmentsResponse.data
                  .find((fragment) =>
                    fragment.tags.some((tag) => tag.id === tagId),
                  )
                  ?.tags.find((tag) => tag.id === tagId)?.name || tagId;

              return (
                <Button
                  key={i}
                  value={tagId}
                  className={`${
                    selectedTags.includes(tagId)
                      ? "bg-green_accent" // Use a distinct color for tags
                      : "bg-gray_light_secondary"
                  } ${filterButtons}`}
                  onClick={() => {
                    selectedTags.includes(tagId)
                      ? setSelectedTags(selectedTags.filter((t) => t !== tagId))
                      : setSelectedTags([...selectedTags, tagId]);
                  }}
                >
                  {tagName}
                </Button>
              );
            })}
          </div>
        </>
      )}
    </>
  ) : (
    <div className="h-full, bg-black_bg"></div>
  );
};
