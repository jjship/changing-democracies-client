"use client";

import { FC } from "react";
import FilmList from "./films/FilmList";
import { FilmsContextProvider } from "./films/FilmsContext";
import Title from "./Title";
import ShowAllOrFilters from "./films/ShowAllOrFilters";
import { FilmPlayer } from "./films/FilmPlayer";
import { FragmentsResponse, TagCategoriesResponse } from "@/types/api";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

export const FreeBrowsing: FC<{
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
  title?: boolean;
  initialFragmentId?: string;
}> = ({
  fragmentsResponse,
  tagCategoriesResponse,
  title = true,
  initialFragmentId,
}) => {
  const { dictionary } = useTranslation();

  return (
    <>
      {title && (
        <Title
          text={dictionary.freeBrowsing.title}
          theme="dark"
          color="yellow_secondary"
          alt={true}
        />
      )}
      <FilmsContextProvider
        fragmentsResponse={fragmentsResponse}
        tagCategoriesResponse={tagCategoriesResponse}
        initialFragmentId={initialFragmentId}
        syncUrl
      >
        {fragmentsResponse ? (
          <>
            <ShowAllOrFilters />
            <FilmList />
            <FilmPlayer />
          </>
        ) : (
          <div className="h-full, bg-black_bg"></div>
        )}
      </FilmsContextProvider>
    </>
  );
};
