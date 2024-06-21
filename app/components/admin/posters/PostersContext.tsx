import { createContext, useContext, useState } from "react";
import { PosterMetadata } from "@/utils/posters-methods";

type PosterCallback = (poster: PosterMetadata) => void;

type PostersContextType = {
  posters: PosterMetadata[] | null;
  setPosters: (posters: PosterMetadata[]) => void;
  onDelete?: PosterCallback;
};

export const PostersContext = createContext<PostersContextType | null>(null);

export function PostersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posters, setPosters] = useState<PosterMetadata[] | null>(null);

  return (
    <PostersContext.Provider
      value={{
        posters,
        setPosters,
      }}
    >
      {children}
    </PostersContext.Provider>
  );
}

export function usePostersContext() {
  const context = useContext(PostersContext);

  if (!context) {
    throw new Error(
      "usePostersContext must be used within a PostersContextProvider",
    );
  }

  return context;
}
