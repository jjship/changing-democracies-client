"use client";

import { FC, useEffect } from "react";
import { useFilmsContext } from "./FilmsContext";
import { FilmFilters } from "./FilmFilters";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

const ShowAllOrFilters: FC = () => {
  const { setFragments, fragmentsResponse } = useFilmsContext();
  const { dictionary } = useTranslation();

  // Show all fragments on mount
  useEffect(() => {
    if (fragmentsResponse?.data) {
      setFragments(fragmentsResponse.data);
    }
  }, [fragmentsResponse, setFragments]);

  return (
    <>
      <div className="md:w-2/3">
        <p className="mt-4 text-lg font-medium text-yellow_secondary">
          {dictionary.freeBrowsing.description}
        </p>
        <p className="mt-2 pb-4 text-lg font-medium text-yellow_secondary">
          {dictionary.freeBrowsing.explanation}
        </p>
      </div>
      <FilmFilters />
    </>
  );
};

export default ShowAllOrFilters;
