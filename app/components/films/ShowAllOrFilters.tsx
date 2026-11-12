"use client";

import { FC } from "react";
import { FilmFilters } from "./FilmFilters";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

const ShowAllOrFilters: FC = () => {
  const { dictionary } = useTranslation();

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
