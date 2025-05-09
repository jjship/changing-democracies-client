"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

import { PosterMetadata } from "@/utils/posters-methods";
import { Skeleton } from "@/ui/skeleton";
import { useBoothContext } from "../photobooth/BoothContext";
import { useTranslations } from "../photobooth/useTranslations";
import PostersNavFooter from "../photobooth/PostersNavFooter";

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
      <PostersNavFooter
        locations={locations}
        selectedLocation={selectedLocation}
        handleFilterClick={handleFilterClick}
        handleNavClick={handlePosterMakerClick}
      />
    </div>
  );
};

export default PostersPage;
