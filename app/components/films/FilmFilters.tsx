"use client";

import { FC, useEffect, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useFilmsContext } from "./FilmsContext";
import { ClientTag, TagCategory } from "@/utils/cdApi";
import { cn } from "@/lib/utils";

export const filterGrid =
  "w-max-1/2 grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-8";

export const tagsGrid =
  "w-max-ful grid grid-flow-row grid-cols-4 gap-5 md:grid-cols-8 lg:grid-cols-8";

export const filterButtons =
  "text-[0.4rem] font-semibold text-black transition-colors hover:bg-yellow_secondary md:text-[0.5rem] lg:text-xs md:font-bold";

// Multi-select dropdown component for a single category
function MultiSelectDropdown({
  category,
  selectedTags,
  setSelectedTags,
}: {
  category: TagCategory;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedTags(
      selectedTags.includes(value)
        ? selectedTags.filter((item) => item !== value)
        : [...selectedTags, value],
    );
  };

  const handleRemove = (value: string) => {
    setSelectedTags(selectedTags.filter((item) => item !== value));
  };

  const selectedLabels = selectedTags.map((value) => {
    const tag = category.tags.find((tag) => tag.id === value);
    return tag?.name || value;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-h-10 h-auto w-full justify-between border-none bg-gray_light_secondary text-[0.4rem] font-semibold text-black transition-colors hover:bg-gray_light_secondary md:text-[0.5rem] md:font-bold lg:text-xs"
        >
          <div className="flex min-h-[1.6rem] flex-wrap items-center gap-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label) => (
                <Badge
                  key={label}
                  variant="secondary"
                  className="mb-1 mr-1 cursor-pointer bg-yellow_secondary text-[0.4rem] font-semibold text-black hover:bg-darkRed md:text-[0.5rem] md:font-bold lg:text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const value = category.tags.find(
                      (tag) => tag.name === label,
                    )?.id;
                    if (value) handleRemove(value);
                  }}
                >
                  {label}
                  <X className="ml-1 h-3 w-3 text-black hover:text-black" />
                </Badge>
              ))
            ) : (
              <span className="text-black">Select {category.name}...</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-gray_light_secondary p-0">
        <Command className="bg-gray_light_secondary">
          <CommandList>
            <CommandEmpty className="text-[0.4rem] font-semibold text-black md:text-[0.5rem] md:font-bold lg:text-xs">
              No {category.name.toLowerCase()} found.
            </CommandEmpty>
            <CommandGroup>
              {category.tags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.id}
                  onSelect={() => {
                    handleSelect(tag.id);
                  }}
                  className="text-[0.4rem] font-semibold text-black md:text-[0.5rem] md:font-bold lg:text-xs [&[data-highlighted]]:!bg-yellow_secondary"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.includes(tag.id)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const FilmFilters: FC = () => {
  const { fragments, setFragments, fragmentsResponse, tagCategoriesResponse } =
    useFilmsContext();
  const [selectedTagsByCategory, setSelectedTagsByCategory] = useState<
    Record<string, string[]>
  >({});

  // Load selected tags from sessionStorage on mount
  useEffect(() => {
    const savedTags = sessionStorage.getItem("selectedTagsByCategory");
    if (savedTags) {
      setSelectedTagsByCategory(JSON.parse(savedTags));
    }
  }, []);

  // Save selected tags to sessionStorage when they change
  useEffect(() => {
    sessionStorage.setItem(
      "selectedTagsByCategory",
      JSON.stringify(selectedTagsByCategory),
    );
  }, [selectedTagsByCategory]);

  // Apply filters when selection changes
  useEffect(() => {
    if (fragmentsResponse?.data) {
      const allSelectedTags = Object.values(selectedTagsByCategory).flat();
      const hasTagFilters = allSelectedTags.length > 0;

      // If no filters are active, show all fragments
      if (!hasTagFilters) {
        setFragments(fragmentsResponse.data);
        return;
      }

      // Apply filters
      const filteredFragments = fragmentsResponse.data.filter((fragment) => {
        // Tag filter matching - require ALL selected tags to be present
        const matchesTags = allSelectedTags.every((selectedTagId) =>
          fragment.tags.some((tag) => tag.id === selectedTagId),
        );

        return matchesTags;
      });

      setFragments(filteredFragments);
    }
  }, [selectedTagsByCategory, fragmentsResponse, setFragments]);

  const updateCategoryTags = (categoryId: string, tags: string[]) => {
    setSelectedTagsByCategory((prev) => ({
      ...prev,
      [categoryId]: tags,
    }));
  };

  if (!fragmentsResponse || !tagCategoriesResponse) return null;

  return (
    <div className="pb-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tagCategoriesResponse.tagCategories.map((category) => (
          <div key={category.id} className="w-full space-y-2">
            <h3 className="text-sm font-medium text-yellow_secondary">
              {category.name}
            </h3>
            <MultiSelectDropdown
              category={category}
              selectedTags={selectedTagsByCategory[category.id] || []}
              setSelectedTags={(tags) => updateCategoryTags(category.id, tags)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
