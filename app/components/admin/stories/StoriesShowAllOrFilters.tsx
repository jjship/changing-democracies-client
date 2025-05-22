"use client";

import { FC, useEffect } from "react";
import { useFilmsContext } from "@/components/films/FilmsContext";
import { FilmFilters } from "@/components/films/FilmFilters";

const StoriesShowAllOrFilters: FC = () => {
  const { setFragments, fragmentsResponse } = useFilmsContext();

  // Show all fragments on mount
  useEffect(() => {
    if (fragmentsResponse?.data) {
      setFragments(fragmentsResponse.data);
    }
  }, [fragmentsResponse, setFragments]);

  return <FilmFilters />;
};

export default StoriesShowAllOrFilters;
