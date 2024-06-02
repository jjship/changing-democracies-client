"use client";

import { useState, useEffect } from "react";
import PostersPage from "@/components/admin/posters/PostersPage";
import { getPostersMetadata, PosterMetadata } from "@/utils/posters-methods";

export default function PostersClient({
  initialPosters,
  location,
}: {
  initialPosters: PosterMetadata[];
  location?: string;
}) {
  const [posters, setPosters] = useState(initialPosters);
  const [error, setError] = useState<
    | {
        message: string;
        status: number;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const fetchPosters = async () => {
      const postersRes = await getPostersMetadata();
      if (postersRes.success) {
        const sortedPosters = postersRes.data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        if (posters.length !== sortedPosters.length) setPosters(sortedPosters);
        setError(undefined);
      } else {
        setError(postersRes.error);
      }
    };

    const intervalId = setInterval(fetchPosters, 30000); // 60,000 milliseconds = 1 minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [posters]);

  if (error) {
    console.error(error);
    return <p>Error loading posters</p>;
  }

  return <PostersPage initialPosters={posters} location={location ?? ""} />;
}
