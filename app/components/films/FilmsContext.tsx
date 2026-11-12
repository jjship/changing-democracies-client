"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ClientFragment,
  FragmentsResponse,
  TagCategoriesResponse,
} from "@/types/api";

type SelectedTagsByCategory = Record<string, string[]>;

type FilmsContextType = {
  /** Fragments with the selected tag filters applied. */
  fragments: ClientFragment[];
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
  nowPlaying: string | null;
  setNowPlaying: (fragmentId: string | null) => void;
  showSidePanel: boolean;
  setShowSidePanel: (show: boolean) => void;
  selectedTagsByCategory: SelectedTagsByCategory;
  setCategoryTags: (categoryId: string, tags: string[]) => void;
};

const FilmsContext = createContext<FilmsContextType | null>(null);

const SELECTED_TAGS_STORAGE_KEY = "selectedTagsByCategory";
const NO_TAGS: SelectedTagsByCategory = {};

const readFragmentIdFromUrl = () =>
  new URLSearchParams(window.location.search).get("id");

// Native history API rather than router.push: the App Router keeps
// usePathname/useSearchParams in sync with it (Next >= 14.1) but makes no
// server round trip, so opening a film never re-renders the page.
const writeFragmentIdToUrl = (fragmentId: string | null) => {
  const params = new URLSearchParams(window.location.search);
  if (fragmentId) params.set("id", fragmentId);
  else params.delete("id");
  const search = params.toString();
  window.history.pushState(
    null,
    "",
    `${window.location.pathname}${search ? `?${search}` : ""}`,
  );
};

export function FilmsContextProvider({
  children,
  fragmentsResponse,
  tagCategoriesResponse,
  syncUrl = false,
}: {
  children: React.ReactNode;
  fragmentsResponse: FragmentsResponse;
  tagCategoriesResponse: TagCategoriesResponse;
  /** Mirror the open film into `?id=` (deep links, back/forward). */
  syncUrl?: boolean;
}) {
  const [nowPlaying, setNowPlayingState] = useState<string | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [selectedTagsByCategory, setSelectedTagsByCategory] =
    useState<SelectedTagsByCategory>(NO_TAGS);

  // The open film is read from the URL on the client only, so the page can be
  // prerendered without useSearchParams. popstate covers back/forward.
  useEffect(() => {
    if (!syncUrl) return;
    const syncFromUrl = () => setNowPlayingState(readFragmentIdFromUrl());
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [syncUrl]);

  const setNowPlaying = useCallback(
    (fragmentId: string | null) => {
      setNowPlayingState(fragmentId);
      if (syncUrl) writeFragmentIdToUrl(fragmentId);
    },
    [syncUrl],
  );

  // Tag filters persist for the session.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SELECTED_TAGS_STORAGE_KEY);
      if (saved) setSelectedTagsByCategory(JSON.parse(saved));
    } catch {
      // Ignore unreadable storage; filters just start empty.
    }
  }, []);

  useEffect(() => {
    if (selectedTagsByCategory === NO_TAGS) return;
    sessionStorage.setItem(
      SELECTED_TAGS_STORAGE_KEY,
      JSON.stringify(selectedTagsByCategory),
    );
  }, [selectedTagsByCategory]);

  const setCategoryTags = useCallback((categoryId: string, tags: string[]) => {
    setSelectedTagsByCategory((prev) => ({ ...prev, [categoryId]: tags }));
  }, []);

  // Derived, not stored: a fragment must carry every selected tag.
  const fragments = useMemo(() => {
    const selectedTagIds = Object.values(selectedTagsByCategory).flat();
    if (!selectedTagIds.length) return fragmentsResponse.data;
    return fragmentsResponse.data.filter((fragment) =>
      selectedTagIds.every((tagId) =>
        fragment.tags.some((tag) => tag.id === tagId),
      ),
    );
  }, [fragmentsResponse, selectedTagsByCategory]);

  return (
    <FilmsContext.Provider
      value={{
        fragments,
        fragmentsResponse,
        tagCategoriesResponse,
        nowPlaying,
        setNowPlaying,
        showSidePanel,
        setShowSidePanel,
        selectedTagsByCategory,
        setCategoryTags,
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
