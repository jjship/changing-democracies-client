import { createContext, useContext, useState } from "react";
import { VideoDbEntry } from "@/types/videosAndFilms";

type VideosContextType = {
  onEdit?: (videoId: number) => void;
  videos: VideoDbEntry[] | null;
  setVideos: (videos: VideoDbEntry[] | null) => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
};

const VideosContext = createContext<VideosContextType | null>(null);

export function VideosContextProvider({
  children,
  videos,
  setVideos,
  error,
  setError,
}: {
  children: React.ReactNode;
  videos: VideoDbEntry[] | null;
  setVideos: (videos: VideoDbEntry[] | null) => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <VideosContext.Provider
      value={{
        videos,
        setVideos,
        setError,
        error,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
}

export function useVideosContext() {
  const context = useContext(VideosContext);

  if (!context) {
    throw new Error(
      "useVideosContext must be used within a VideosContextProvider",
    );
  }

  return context;
}
