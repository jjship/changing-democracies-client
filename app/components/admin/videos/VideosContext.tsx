import { createContext, useContext, useState } from "react";
import { VideoDbEntry } from "@/types/videosAndFilms";

type EditCallback = (videoId: number) => void;

type VideosContextType = {
  onEdit?: EditCallback;
  videos: VideoDbEntry[] | null;
  setVideos: (videos: VideoDbEntry[] | null) => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
};

export const VideosContext = createContext<VideosContextType | null>(null);

export function VideosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [videos, setVideos] = useState<VideoDbEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
