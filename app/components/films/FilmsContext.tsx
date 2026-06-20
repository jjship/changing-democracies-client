"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  ClientFragment,
  FragmentsResponse,
  TagCategoriesResponse,
} from "@/types/api";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type FilmsContextType = {
  fragments: ClientFragment[] | null;
  setFragments: (fragments: ClientFragment[] | null) => void;
  fragmentsResponse: FragmentsResponse | null;
  nowPlaying: string | null;
  setNowPlaying: (fragmentId: string | null) => void;
  showSidePanel: boolean;
  setShowSidePanel: (show: boolean) => void;
  tagCategoriesResponse: TagCategoriesResponse | null;
};

const FilmsContext = createContext<FilmsContextType | null>(null);

export function FilmsContextProvider({
  children,
  fragmentsResponse,
  tagCategoriesResponse,
  initialFragmentId,
  syncUrl = false,
}: {
  children: React.ReactNode;
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
  initialFragmentId?: string;
  syncUrl?: boolean;
}) {
  const [fragments, setFragments] = useState<ClientFragment[] | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string | null>(
    initialFragmentId || null,
  );
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize fragments with data when component mounts
  useEffect(() => {
    if (fragmentsResponse?.data && !fragments) {
      setFragments(fragmentsResponse.data);
    }
  }, [fragmentsResponse, fragments]);

  // Update URL when nowPlaying changes (only for public-facing pages)
  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams(searchParams.toString());
    if (nowPlaying) {
      params.set("id", nowPlaying);
    } else {
      params.delete("id");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [nowPlaying, pathname, router, searchParams, syncUrl]);

  return (
    <FilmsContext.Provider
      value={{
        fragments,
        setFragments,
        fragmentsResponse,
        nowPlaying,
        setNowPlaying,
        showSidePanel,
        setShowSidePanel,
        tagCategoriesResponse,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
}

export function useFilmsContext() {
  const context = useContext(FilmsContext);

  if (!context) {
    throw new Error(
      "useFilmsContext must be used within a FilmsContextProvider",
    );
  }

  return context;
}
