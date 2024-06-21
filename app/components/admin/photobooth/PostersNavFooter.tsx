import { FC, MouseEventHandler, useCallback } from "react";
import Image from "next/image";

import simple_arrow from "@/public/simple_arrow.svg";

import { Button } from "@/ui/button";
import { boothBtn } from "../photobooth/boothConstats";

import { useTranslations } from "./useTranslations";

type PostersNavFooterProps = {
  locations: string[];
  selectedLocation: string | null;
  handleFilterClick: MouseEventHandler<HTMLButtonElement>;
  handleNavClick: () => void;
};

const PostersNavFooter: FC<PostersNavFooterProps> = ({
  locations,
  selectedLocation,
  handleFilterClick,
  handleNavClick,
}) => {
  const { make } = useTranslations();
  const totalButtons = locations.length;
  const isSingleRow = totalButtons <= 6;
  const getGridClass = useCallback(
    (index: number) => {
      const isLastRow =
        Math.ceil((index + 1) / 7) === Math.ceil(totalButtons / 7);

      if (isSingleRow || (isLastRow && totalButtons % 7 <= 6)) {
        return "grid-cols-6-cols";
      }

      return "grid-cols-7-cols";
    },
    [locations, isSingleRow],
  );

  return (
    <div className="bg-purple fixed bottom-0 max-h-min w-full flex-col px-20 pt-10 font-black">
      {locations && (
        <div
          className={`grid min-h-max gap-x-7 gap-y-5 ${getGridClass(
            totalButtons - 1,
          )}`}
        >
          {Array.from(locations).map((posterLocation) => (
            <Button
              key={posterLocation}
              value={posterLocation}
              className={`${
                selectedLocation === posterLocation || !selectedLocation
                  ? "bg-green_accent"
                  : "bg-gray_light_secondary"
              } font-black  text-black hover:bg-yellow_secondary`}
              onClick={handleFilterClick}
            >
              {posterLocation}
            </Button>
          ))}
        </div>
      )}
      <div className="mb-5 flex h-36 w-full justify-between ">
        <p className="mt-9 text-5xl font-extrabold text-white">
          {make.toUpperCase()}
        </p>
        <Image src={simple_arrow} alt="arrow" className="mb-6" />
        <div className="relative w-28">
          <Button
            className=" fixed bottom-6 right-6 flex h-44 w-44 items-center justify-center rounded-full bg-red_mains pt-5 text-3xl/7 font-black text-black shadow-lg hover:bg-red-700"
            onClick={handleNavClick}
          >
            CREATE NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostersNavFooter;
