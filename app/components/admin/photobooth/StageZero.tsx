"use client";

import { FC } from "react";

import { useBoothContext } from "./BoothContext";
import { getTranslation, translations } from "./boothConstats";
import DavButton from "./DavButton";

const StageZero: FC = () => {
  const { windowHeight, stage, currentLang } = useBoothContext();

  if (stage !== 0) return null;

  const props = {
    txt: "Start",
    btnY: 70,
    width: 200,
    windowHeight,
  };

  return (
    <>
      {" "}
      <div>
        <p className="mt-24 text-[24px]">
          {getTranslation(currentLang, "Make your own poster", translations)}
        </p>
      </div>
      <div>
        <p className="text-darkRed mt-72 text-[32px]">
          {getTranslation(
            currentLang,
            "Express your feelings about Democracy",
            translations,
          )}
        </p>
      </div>
      <DavButton {...props} />
    </>
  );
};

export default StageZero;
