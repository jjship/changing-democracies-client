"use client";

import { FC, useState, useEffect } from "react";
import FilmList from "./films/FilmList";
import { FilmsContext } from "./films/FilmsContext";
import Title from "./Title";
import ShowAllOrFilters from "./films/ShowAllOrFilters";
import { FilmPlayer } from "./films/FilmPlayer";
import { ClientFragment, FragmentsResponse } from "@/lib/cdApi";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

export { FreeBrowsing };

const FreeBrowsing: FC<{
  fragmentsResponse: FragmentsResponse;
  title?: boolean;
}> = ({ fragmentsResponse, title = true }) => {
  const [fragments, setFragments] = useState<ClientFragment[] | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
  const { dictionary } = useTranslation();

  // Initialize fragments with data when component mounts
  useEffect(() => {
    if (fragmentsResponse?.data && !fragments) {
      setFragments(fragmentsResponse.data);
    }
  }, [fragmentsResponse, fragments]);

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
            <ShowAllOrFilters />
            <FilmList />
            <FilmPlayer />
          </>
        ) : (
          <div className="h-full, bg-black_bg"></div>
        )}
      </FilmsContext.Provider>
    </>
  );
};
