"use client";

import { FC, useEffect } from "react";
import { Open_Sans } from "next/font/google";
import { Archivo } from "next/font/google";

import { useBoothContext } from "./BoothContext";
import LanguageButtons from "./LanguageButtons";

import NameForm from "./NameForm";
import StageZero from "./StageZero";
import StatementsForm from "./StatementsForm";
import SaveAndSend from "./SaveAndSend";
import PostersGallery from "./PostersGallery";
import MakePhoto from "./MakePhoto";

const openSans = Open_Sans({ subsets: ["greek"], weight: "700" });
const archivo = Archivo({ subsets: ["latin"], weight: "700" });

const ReactBooth: FC = () => {
  const {
    location,
    stage,
    currentLang,
    windowHeight,
    windowWidth,
    font,
    setFont,
  } = useBoothContext();

  useEffect(() => {
    const currFont = stage > -1 && currentLang === "greek" ? openSans : archivo;
    setFont({
      className: currFont.className,
      fontFamily: currFont.style.fontFamily,
    });
  }, [stage, currentLang]);

  useEffect(() => {
    console.log(stage);
  }, [stage]);

  if (!windowHeight || !windowWidth) {
    return null;
  }

  return (
    <div
      className={`flex h-full w-screen flex-col items-center ${font.className}`}
    >
      <PostersGallery />
      <LanguageButtons />
      <StageZero />
      <NameForm />
      <StatementsForm />
      <MakePhoto />
      <SaveAndSend />
    </div>
  );
};

export default ReactBooth;
