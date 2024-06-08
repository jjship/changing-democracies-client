"use client";
import { FC } from "react";

import { useBoothContext } from "./BoothContext";
import { languages } from "./boothConstats";
import BtnLang from "./BtnLang";

const LanguageButtons: FC = () => {
  const { windowHeight, stage } = useBoothContext();

  const width = 120;
  const height = 50;
  const buttonSpacing = 30;
  const startY =
    (windowHeight -
      (height * languages.length + buttonSpacing * (languages.length - 1))) /
    2;

  if (stage !== -1) return null;

  return (
    <>
      {languages.map((lang, i) => {
        const btnY = startY + i * buttonSpacing;
        const props = {
          language: lang,
          width,
          height,
          btnY,
          windowHeight,
        };
        return <BtnLang key={i} {...props} />;
      })}
    </>
  );
};

export default LanguageButtons;
