"use client";

import { useEffect, useState } from "react";
import { BunnyPoster, PosterMetadata } from "@/utils/posters-methods";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostersPageProps {
  initialPosters: PosterMetadata[];
  location?: string;
}

const PostersPage: React.FC<PostersPageProps> = ({
  initialPosters,
  location,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [posters, setPosters] = useState<PosterMetadata[]>(initialPosters);
  const [filteredPosters, setFilteredPosters] = useState<PosterMetadata[]>([]);
  const router = useRouter();

  const locations = new Set<string>();
  posters.forEach((poster) => {
    const posterLocation = poster.fileName.split(".")[0].split("_").pop();
    if (posterLocation) locations.add(posterLocation);
  });
  const handleLocationFilter = (posterLocation: string) => {
    setSelectedLocation(posterLocation);
  };

  useEffect(() => {
    async function fetchPosters() {
      try {
        const response = await fetch("../api/posters", {
          next: { revalidate: 55 },
        });
        if (!response.ok) {
          return;
        }
        const postersData = await response.json();
        setPosters(postersData);
      } catch (error) {
        return;
      }
    }
    fetchPosters();
    const intervalId = setInterval(fetchPosters, 60000);
    return () => clearInterval(intervalId);
  }, [initialPosters]);

  useEffect(() => {
    const filteredPosters = selectedLocation
      ? posters.filter((poster) => poster.fileName.includes(selectedLocation))
      : posters;
    setFilteredPosters(filteredPosters);
  }, [selectedLocation, posters]);

  if (!posters) {
    return <p>Loading...</p>;
  }

  const handlePosterMakerClick = () => {
    router.push(
      location ? `/admin/photobooth/${location}` : "/admin/photobooth",
    );
  };

  return (
    filteredPosters && (
      <>
        <div className=" p-5 ">
          <div className="flex items-center justify-center gap-5 p-5">
            {Array.from(locations).map((posterLocation) => (
              <Button
                key={posterLocation}
                className={`${
                  selectedLocation === posterLocation
                    ? "bg-yellow_secondary text-black"
                    : "bg-green_accent"
                } m-5 text-black hover:bg-yellow_secondary hover:text-black`}
                onClick={() => handleLocationFilter(posterLocation)}
              >
                {posterLocation}
              </Button>
            ))}
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-5">
              {filteredPosters.map((poster) => (
                <div key={poster.id} className="w-full">
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${poster.fileName}`}
                    alt={poster.fileName}
                    className="w-full"
                    width={800}
                    height={800}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className="fixed bottom-20 right-10 z-50 flex h-44 w-44 items-center justify-center rounded-full bg-red_mains pt-3 text-3xl/7 font-black text-black shadow-lg hover:bg-red-700"
          onClick={handlePosterMakerClick}
        >
          POSTER MAKER
        </Button>
      </>
    )
  );
};

export default PostersPage;
