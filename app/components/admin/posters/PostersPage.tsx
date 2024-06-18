"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import { PosterMetadata } from "@/utils/posters-methods";
import { Button } from "../../ui/button";
import { useBoothContext } from "../photobooth/BoothContext";
import { Skeleton } from "../../ui/skeleton";

interface PostersPageProps {
  initialPosters: PosterMetadata[];
  location?: string;
  isLoading: boolean;
}

type PostersStatesMap = Record<
  number,
  { loading: boolean; imageSrc: string | null; hasError: boolean }
>;

const PostersPage: React.FC<PostersPageProps> = ({
  initialPosters,
  isLoading,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filteredPosters, setFilteredPosters] = useState<PosterMetadata[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const { setPrevLocations } = useBoothContext();

  const { setStage } = useBoothContext();
  const thisStage = 0;

  useEffect(() => {
    const getLocations = () => {
      const newLocations = new Set<string>();
      initialPosters.forEach((poster) => {
        const posterLocation = poster.fileName.split(".")[0].split("_").pop();
        if (posterLocation) newLocations.add(posterLocation);
      });
      setPrevLocations(Array.from(newLocations));
      setLocations(Array.from(newLocations));
    };

    if (initialPosters) {
      setFilteredPosters(initialPosters);
      getLocations();
    }
  }, [initialPosters, setPrevLocations]);

  const handleFilterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const filterPosters = (chosenLocation: string) => {
      const filteredPosters = initialPosters.filter((poster) =>
        poster.fileName.includes(chosenLocation),
      );
      return filteredPosters;
    };
    const clickedLocation = (e.target as HTMLButtonElement).value;

    const locationToSet =
      selectedLocation === clickedLocation ? null : clickedLocation;

    if (locationToSet === null) {
      setFilteredPosters(initialPosters); // remove filter if same button clicked
    } else {
      const filtered = filterPosters(locationToSet);

      setFilteredPosters(filtered);
    }

    setSelectedLocation(locationToSet);
  };

  const handlePosterMakerClick = () => {
    setStage(thisStage + 1);
  };

  return isLoading || !filteredPosters ? (
    <div className="flex min-h-screen w-screen flex-col items-center bg-black_bg px-20">
      <Skeleton className="my-10 h-10 w-full" />
      <div className="grid min-h-screen w-full grid-cols-3 gap-x-16 gap-y-24 py-20">
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
      <div className=" w-screen bg-black_bg px-20">
        {locations && (
          <div className="my-10 flex min-h-max items-start justify-start gap-5">
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
        )}
        <div className="flex h-full items-center justify-center">
          <div className="grid min-h-screen w-full grid-cols-3 gap-x-16 gap-y-24">
            {filteredPosters.map(
              (poster) =>
                poster.imageUrl && (
                  <div key={poster.id} className="w-full">
                    <Image
                      src={poster.imageUrl}
                      alt={poster.fileName}
                      className="w-full"
                      width={800}
                      height={800}
                      loading="lazy"
                    />
                  </div>
                ),
            )}
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
