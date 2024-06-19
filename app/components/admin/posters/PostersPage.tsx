"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

import simple_arrow from "@/public/simple_arrow.svg";
import { PosterMetadata } from "@/utils/posters-methods";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { useBoothContext } from "../photobooth/BoothContext";
import { useTranslations } from "../photobooth/useTranslations";
import { boothBtn } from "../photobooth/boothConstats";

interface PostersPageProps {
  initialPosters: PosterMetadata[];
  location?: string;
  isLoading: boolean;
}

const thisStage = 0;

const PostersPage: React.FC<PostersPageProps> = ({
  initialPosters,
  isLoading,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filteredPosters, setFilteredPosters] = useState<PosterMetadata[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const { setPrevLocations, setStage } = useBoothContext();
  const { make } = useTranslations();

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
    <div className="grid h-screen w-full grid-cols-3 gap-x-16 gap-y-24 bg-black_bg p-20">
      {Array(9)
        .fill(1, 0, 9)
        .map((_el, i) => {
          return (
            <Skeleton key={i} className="h-10, border-s-violet-5 w-full" />
          );
        })}
    </div>
  ) : (
    <div className="bg-black_bg">
      <div className="grid min-h-screen w-screen grid-cols-3 gap-x-16 gap-y-24  p-20">
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
      <div className="fixed bottom-0 max-h-min w-screen flex-col bg-black_bg px-20 pb-10 font-black">
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
                } w-32 font-black  text-black hover:bg-yellow_secondary`}
                onClick={handleFilterClick}
              >
                {posterLocation}
              </Button>
            ))}
          </div>
        )}
        <div className="flex w-full justify-between ">
          <p className="text-5xl text-white">{make.toUpperCase()}</p>
          <Image src={simple_arrow} alt="arrow" />
          <Button
            className={`${boothBtn} my-auto text-black_bg`}
            onClick={handlePosterMakerClick}
          >
            CREATE NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostersPage;
