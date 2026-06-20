"use client";

import { FC } from "react";
import FilmList from "@/components/films/FilmList";
import { FilmsContextProvider } from "@/components/films/FilmsContext";
import { FragmentsResponse, TagCategoriesResponse } from "@/types/api";
import { StoriesFilmPlayer } from "../storiesFilmPlayer";
import StoriesShowAllOrFilters from "./StoriesShowAllOrFilters";

export const Stories: FC<{
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
}> = ({ fragmentsResponse, tagCategoriesResponse }) => {
  return (
    <FilmsContextProvider
      fragmentsResponse={fragmentsResponse}
      tagCategoriesResponse={tagCategoriesResponse}
    >
      {fragmentsResponse ? (
        <>
          <StoriesShowAllOrFilters />
          <FilmList />
          <StoriesFilmPlayer />
        </>
      ) : (
        <div className="h-full, bg-black_bg"></div>
      )}
    </FilmsContextProvider>
  );
};
