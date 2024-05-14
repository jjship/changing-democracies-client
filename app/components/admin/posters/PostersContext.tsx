import { createContext, useContext, useState } from "react";
import { Poster } from "./actions";

type PosterCallback = (poster: Poster) => void;

type PostersContextType = {
  posters: Poster[] | null;
  setPosters: (posters: Poster[] | null) => void;
  onDelete?: PosterCallback;
  onUpdate?: PosterCallback;
};

export const PostersContext = createContext<PostersContextType | null>(null);

export function PostersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posters, setPosters] = useState<Poster[] | null>(null);

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
