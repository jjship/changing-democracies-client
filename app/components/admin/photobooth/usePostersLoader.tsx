import { useEffect, useState } from "react";
import useSWR from "swr";
import { PosterMetadata } from "../../../../utils/posters-methods";

class FetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetchPosters = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new FetchError("Error loading posters", res.status);
  }
  return res.json();
};

export const usePostersLoader = (src: string) => {
  const {
    data: posters,
    error,
    mutate,
  } = useSWR(src, fetchPosters, {
    revalidateOnFocus: false,
    refreshInterval: 10000,
  });

  const [currentPosters, setCurrentPosters] =
    useState<PosterMetadata[]>(posters);

  useEffect(() => {
    const postersTimeout = setTimeout(() => {
      if (
        posters &&
        (!currentPosters || posters.length !== currentPosters.length)
      )
        setCurrentPosters(posters);
    }, 1000);
    return () => clearTimeout(postersTimeout);
  }, [posters, currentPosters]);

  return {
    posters: currentPosters,
    error,
    reloadPosters: mutate,
  };
};
