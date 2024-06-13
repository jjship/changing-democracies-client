"use client";

import { FC, useEffect, useState } from "react";

import { useBoothContext } from "./BoothContext";
import { getTranslation, translations } from "./boothConstats";
import DavButton from "./DavButton";

const StageZero: FC = () => {
  const { windowHeight, stage, currentLang } = useBoothContext();
  const [texts, setTexts] = useState<[string, string]>([
    "Make your own poster",
    "Express your feelings about Democracy",
  ]);

  useEffect(() => {
    setTexts([
      getTranslation(currentLang, "Make your own poster", translations),
      getTranslation(
        currentLang,
        "Express your feelings about Democracy",
        translations,
      ),
    ]);
  }, [currentLang]);

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
        <p className="mt-24 text-[24px]">{texts[0]}</p>
      </div>
      <div>
        <p className="mt-72 text-[32px] text-darkRed">{texts[1]}</p>
      </div>
      <DavButton {...props} />
    </>
  );
};

export default StageZero;
