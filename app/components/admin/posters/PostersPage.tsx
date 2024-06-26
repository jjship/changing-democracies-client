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
  const [locations, setLocations] = useState<string[]>([]);
  const router = useRouter();

  const handleLocationFilter = (posterLocation: string) => {
    if (selectedLocation === posterLocation) {
      setSelectedLocation(null); // If the same location is clicked again, remove the filter
    } else {
      setSelectedLocation(posterLocation); // Otherwise, set the selected location
    }
  };

  useEffect(() => {
    const newLocations = new Set<string>();
    posters.forEach((poster) => {
      const posterLocation = poster.fileName.split(".")[0].split("_").pop();
      if (posterLocation) newLocations.add(posterLocation);
    });
    setLocations(Array.from(newLocations));
  }, [initialPosters, posters]);

  useEffect(() => {
    const filteredPosters = selectedLocation
      ? initialPosters.filter((poster) =>
          poster.fileName.includes(selectedLocation),
        )
      : initialPosters;
    setFilteredPosters(filteredPosters);
    setPosters(filteredPosters);
  }, [selectedLocation, initialPosters, posters]);

  if (!initialPosters) {
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
        <div className="px-20">
          <div className="my-10 flex items-start justify-start gap-5">
            {Array.from(locations).map((posterLocation) => (
              <Button
                key={posterLocation}
                className={`${
                  selectedLocation === posterLocation || !selectedLocation
                    ? "bg-green_accent"
                    : "bg-gray_light_secondary"
                } w-32  text-black hover:bg-yellow_secondary hover:text-black`}
                onClick={() => handleLocationFilter(posterLocation)}
              >
                {posterLocation}
              </Button>
            ))}
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-x-16 gap-y-24">
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
          className="fixed bottom-20 right-10 z-50 flex h-44 w-44 items-center justify-center rounded-full bg-red_mains pt-3 text-3xl/7 font-bold text-black shadow-lg hover:bg-red-700"
          onClick={handlePosterMakerClick}
        >
          POSTER MAKER
        </Button>
      </>
    )
  );
};

export default PostersPage;
