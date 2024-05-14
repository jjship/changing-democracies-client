"use client";

import { DbPoster } from "../../../../lib/bunnyMethods";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../ui/button";

export default function Posters({ posters }: { posters: DbPoster[] }) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = new Set<string>();
  posters.forEach((poster) => {
    const location = poster.ObjectName.split(".")[0].split("_").pop();
    if (location) locations.add(location);
  });

  const handleLocationFilter = (location: string) => {
    setSelectedLocation(location);
  };

  const filteredPosters = selectedLocation
    ? posters.filter((poster) => poster.ObjectName.includes(selectedLocation))
    : posters;

  return (
    posters && (
      <>
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
              <div key={poster.Guid} className="w-full">
                <Image
                  src={`https://cd-dev-pull.b-cdn.net/posters/${poster.ObjectName}`}
                  alt={poster.ObjectName}
                  className="w-full"
                  width={200}
                  height={200}
                  loading="lazy" // Add lazy loading attribute
                />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}
