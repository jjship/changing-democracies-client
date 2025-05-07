"use client";

import { FC, useState, useEffect } from "react";
import FilmList from "@/components/films/FilmList";
import { FilmsContext } from "@/components/films/FilmsContext";
import { ClientFragment, FragmentsResponse } from "@/utils/cdApi";
import { StoriesFilmPlayer } from "../storiesFilmPlayer";
import StoriesShowAllOrFilters from "./StoriesShowAllOrFilters";

export { Stories };

const Stories: FC<{
  fragmentsResponse: FragmentsResponse;
}> = ({ fragmentsResponse }) => {
  const [fragments, setFragments] = useState<ClientFragment[] | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);

  // Initialize fragments with data when component mounts
  useEffect(() => {
    if (fragmentsResponse?.data && !fragments) {
      setFragments(fragmentsResponse.data);
    }
  }, [fragmentsResponse, fragments]);

  return (
    <>
      <FilmsContext.Provider
        value={{
          fragments,
          setFragments,
          fragmentsResponse,
          nowPlaying,
          setNowPlaying,
          showSidePanel,
          setShowSidePanel,
        }}
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
      </FilmsContext.Provider>
    </>
  );
};
