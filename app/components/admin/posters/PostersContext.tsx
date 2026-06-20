import { createContext, useContext } from "react";
import { PosterMetadata } from "@/utils/admin/posters-methods";

type PostersContextType = {
  posters: PosterMetadata[] | null;
  setPosters: (posters: PosterMetadata[]) => void;
  onDelete?: (poster: PosterMetadata) => void;
};

const PostersContext = createContext<PostersContextType | null>(null);

export function PostersContextProvider({
  children,
  posters,
  setPosters,
  onDelete,
}: {
  children: React.ReactNode;
  posters: PosterMetadata[] | null;
  setPosters: (posters: PosterMetadata[]) => void;
  onDelete?: (poster: PosterMetadata) => void;
}) {
  return (
    <PostersContext.Provider
      value={{
        posters,
        setPosters,
        onDelete,
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
