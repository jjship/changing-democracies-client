"use client";

import { FC } from "react";
import FilmList from "@/components/films/FilmList";
import { FilmFilters } from "@/components/films/FilmFilters";
import { FilmsContextProvider } from "@/components/films/FilmsContext";
import { FragmentsResponse, TagCategoriesResponse } from "@/types/api";
import { StoriesFilmPlayer } from "../storiesFilmPlayer";

export const Stories: FC<{
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
}> = ({ fragmentsResponse, tagCategoriesResponse }) => {
  return (
    <FilmsContextProvider
      fragmentsResponse={fragmentsResponse}
      tagCategoriesResponse={tagCategoriesResponse}
    >
      <FilmFilters />
      <FilmList />
      <StoriesFilmPlayer />
    </FilmsContextProvider>
  );
};
