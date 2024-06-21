import { FC, MouseEventHandler } from "react";
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

  return (
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
          onClick={handleNavClick}
        >
          CREATE NOW
        </Button>
      </div>
    </div>
  );
};

export default PostersNavFooter;
