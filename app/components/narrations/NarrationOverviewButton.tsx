import React, { Dispatch, SetStateAction } from "react";
import { NarrationPath } from "@/types/videosAndFilms";
import { useNarrationContext } from "@/app/narratives/NarrationsContext";

type OverviewButtonProps = {
  onClick: () => void;
};

const OverviewTag: React.FC<OverviewButtonProps> = ({ onClick }) => {
  return (
    <button className="absolute flex items-center" onClick={onClick}>
      <div
        className="absolute h-14 w-14 bg-gray-500"
        style={{
          clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
          left: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
      <div className="rounded-full bg-[#b85252] px-10 py-2 text-sm font-medium text-white">
        overview
      </div>
    </button>
  );
};

export default OverviewTag;