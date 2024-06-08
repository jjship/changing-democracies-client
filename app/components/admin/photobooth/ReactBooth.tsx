"use client";

import { Open_Sans } from "next/font/google";
import { Archivo } from "next/font/google";
import { FC } from "react";
import { useBoothContext } from "./BoothContext";
import LanguageButtons from "./LanguageButtons";

import NameForm from "./NameForm";
import StageZero from "./StageZero";
import StatementForm from "./StatementForm";
import SaveAndSend from "./SaveAndSend";
import PostersGallery from "./PostersGallery";
import MakePhoto from "./MakePhoto";

const openSans = Open_Sans({ subsets: ["greek"], weight: "700" });
const archivo = Archivo({ subsets: ["latin"], weight: "700" });

const ReactBooth: FC = () => {
  const { location, stage, currentLang, windowHeight, windowWidth } =
    useBoothContext();

  if (!windowHeight || !windowWidth) {
    return null;
  }

  const fontClass =
    stage > -1 && currentLang === "greek"
      ? openSans.className
      : archivo.className;

  return (
    <div className={`flex w-full flex-col items-center ${fontClass}`}>
      <PostersGallery />
      <LanguageButtons />
      <StageZero />
      <NameForm />
      <StatementForm />
      <MakePhoto />
      <SaveAndSend />
    </div>
  );
};

export default ReactBooth;
