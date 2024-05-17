"use client";

import { useEffect, useState } from "react";
import { BunnyPoster, PosterMetadata } from "@/utils/posters-methods";
import { Button } from "../../ui/button";
import Image from "next/image";

interface PostersPageProps {
  initialPosters: PosterMetadata[];
}

const PostersPage: React.FC<PostersPageProps> = ({ initialPosters }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [posters, setPosters] = useState<PosterMetadata[]>(initialPosters);

  const [filteredPosters, setFilteredPosters] = useState<PosterMetadata[]>([]);
  const locations = new Set<string>();
  posters.forEach((poster) => {
    const location = poster.fileName.split(".")[0].split("_").pop();
    if (location) locations.add(location);
  });
  const handleLocationFilter = (location: string) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    async function fetchPosters() {
      try {
        const response = await fetch("../api/posters");
        if (!response.ok) {
          return;
        }
        const postersData = await response.json();
        setPosters(postersData);
      } catch (error) {
        return;
      }
    }
    //initial on page load
    fetchPosters();
    // Poll every minute
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

  return (
    filteredPosters && (
      <>
        <div className=" p-5 ">
          <div className="flex items-center justify-center gap-5 p-5">
            {Array.from(locations).map((location) => (
              <Button
                key={location}
                className={`${
                  selectedLocation === location
                    ? "bg-yellow_secondary text-black"
                    : "bg-green_accent"
                } m-5 text-black hover:bg-yellow_secondary hover:text-black`}
                onClick={() => handleLocationFilter(location)}
              >
                {location}
              </Button>
            ))}
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="grid w-full grid-cols-2 gap-5">
              {filteredPosters.map((poster) => (
                <div key={poster.id} className="w-full">
                  <Image
                    src={`https://cd-dev-pull.b-cdn.net/posters/${poster.fileName}`}
                    alt={poster.fileName}
                    className="w-full"
                    width={800}
                    height={800}
                    loading="lazy" // Add lazy loading attribute
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default PostersPage;
