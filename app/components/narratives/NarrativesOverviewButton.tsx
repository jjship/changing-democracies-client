import { FC } from "react";

type OverviewButtonProps = {
  onClick: () => void;
};

const OverviewTag: FC<OverviewButtonProps> = ({ onClick }) => {
  return (
    <button className="absolute flex items-center" onClick={onClick}>
      <div
        className="absolute h-14 w-12 bg-gray-500"
        style={{
          clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
          left: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
      <div className="rounded-full bg-[#b85252] px-8 py-2 text-sm font-medium text-white">
        overview
      </div>
    </button>
  );
};

export default OverviewTag;
