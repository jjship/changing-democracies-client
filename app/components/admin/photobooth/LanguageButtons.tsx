"use client";
import { FC } from "react";

import { useBoothContext } from "./BoothContext";
import { languages } from "./boothConstats";
import BtnLang from "./BtnLang";
import BackBtn from "./BackBtn";

const LanguageButtons: FC = () => {
  const { windowHeight, stage, location } = useBoothContext();
  const thisStage = 2;
  const width = 120;
  const height = 50;
  const buttonSpacing = 30;
  const startY =
    (windowHeight -
      (height * languages.length + buttonSpacing * (languages.length - 1))) /
    4;

  if (stage !== thisStage) return null;

  return (
    <>
      <BackBtn nextStage={0} />

      <p className="mt-24 pb-0 text-3xl">Choose your language</p>

      {languages.map((lang, i) => {
        const btnY = startY + i * buttonSpacing;
        const props = {
          language: lang,
          width,
          height,
          btnY,
          windowHeight,
          thisStage,
        };
        return <BtnLang key={i} {...props} />;
      })}
    </>
  );
};

export default LanguageButtons;
