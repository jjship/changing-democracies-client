"use client";

import { FC, useState, useEffect } from "react";
import FilmList from "./films/FilmList";
import { FilmsContext } from "./films/FilmsContext";
import Title from "./Title";
import ShowAllOrFilters from "./films/ShowAllOrFilters";
import { FilmPlayer } from "./films/FilmPlayer";
import { ClientFragment, FragmentsResponse } from "@/utils/cdApi";
import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export { FreeBrowsing };

const FreeBrowsing: FC<{
  fragmentsResponse: FragmentsResponse;
  title?: boolean;
  initialFragmentId?: string;
}> = ({ fragmentsResponse, title = true, initialFragmentId }) => {
  const [fragments, setFragments] = useState<ClientFragment[] | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(
    () => initialFragmentId || null,
  );
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
  const { dictionary } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize fragments with data when component mounts
  useEffect(() => {
    if (fragmentsResponse?.data && !fragments) {
      setFragments(fragmentsResponse.data);
    }
  }, [fragmentsResponse, fragments]);

  // Update URL when nowPlaying changes
  useEffect(() => {
    if (nowPlaying) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", nowPlaying);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("id");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [nowPlaying, pathname, router, searchParams]);

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
