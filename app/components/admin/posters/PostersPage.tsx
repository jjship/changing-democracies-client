"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { BunnyPoster, PosterMetadata } from "@/utils/posters-methods";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useBoothContext } from "../photobooth/BoothContext";
import { Skeleton } from "../../ui/skeleton";

interface PostersPageProps {
  initialPosters: PosterMetadata[];
  location?: string;
  isLoading: boolean;
}

const PostersPage: React.FC<PostersPageProps> = ({
  initialPosters,
  isLoading,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filteredPosters, setFilteredPosters] = useState<PosterMetadata[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const { setStage } = useBoothContext();

  useEffect(() => {
    const getLocations = () => {
      const newLocations = new Set<string>();
      initialPosters.forEach((poster) => {
        const posterLocation = poster.fileName.split(".")[0].split("_").pop();
        if (posterLocation) newLocations.add(posterLocation);
      });
      setLocations(Array.from(newLocations));
    };

    if (initialPosters) {
      setFilteredPosters(initialPosters);
      getLocations();
    }
  }, [initialPosters]);

  const handleFilterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const filterPosters = (chosenLocation: string) => {
      const filteredPosters = initialPosters.filter((poster) =>
        poster.fileName.includes(chosenLocation),
      );

      setFilteredPosters(filteredPosters);
    };
    const clickedLocation = (e.target as HTMLButtonElement).value;

    const locationToSet =
      selectedLocation === clickedLocation ? null : clickedLocation;

    if (locationToSet === null) {
      setFilteredPosters(initialPosters); // remove filter if same button clicked
    } else {
      filterPosters(locationToSet);
    }

    setSelectedLocation(locationToSet);
  };

  const handlePosterMakerClick = () => {
    setStage(-1);
  };

  return isLoading || !filteredPosters ? (
    <div className="my-10 flex h-screen w-full flex-col items-center px-20">
      <Skeleton className="h-10 w-full" />
      <div className="grid h-full w-full grid-cols-3 gap-x-16 gap-y-24 py-20">
        {Array(9)
          .fill(1, 0, 9)
          .map((_el, i) => {
            return (
              <Skeleton key={i} className="h-10, border-s-violet-5 w-full" />
            );
          })}
      </div>
    </div>
  ) : (
    <>
      <div className="w-full px-20">
        {locations ? (
          <div className="my-10 flex items-start justify-start gap-5">
            {Array.from(locations).map((posterLocation) => (
              <Button
                key={posterLocation}
                value={posterLocation}
                className={`${
                  selectedLocation === posterLocation || !selectedLocation
                    ? "bg-green_accent"
                    : "bg-gray_light_secondary"
                } w-32  text-black hover:bg-yellow_secondary hover:text-black`}
                onClick={handleFilterClick}
              >
                {posterLocation}
              </Button>
            ))}
          </div>
        ) : (
          <></>
        )}
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
  );
};

export default PostersPage;
