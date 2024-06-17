"use client";

import { FC, useEffect } from "react";
import { Open_Sans } from "next/font/google";
import { Archivo } from "next/font/google";
import { useIdleTimer } from "react-idle-timer";

import { useBoothContext } from "./BoothContext";
import LanguageButtons from "./LanguageButtons";

import NameForm from "./NameForm";
import StatementsForm from "./StatementsForm";
import SaveAndSend from "./SaveAndSend";
import PostersGallery from "./PostersGallery";
import MakePhoto from "./MakePhoto";
import LocationForm from "./LocationForm";
import MakerStart from "./MakerStart";

const openSans = Open_Sans({ subsets: ["greek"], weight: "700" });
const archivo = Archivo({ subsets: ["latin"], weight: "700" });

const ReactBooth: FC = () => {
  const {
    setStage,
    stage,
    currentLang,
    windowHeight,
    windowWidth,
    font,
    setFont,
  } = useBoothContext();

  const onIdle = () => setStage(0);

  useIdleTimer({
    onIdle,
    timeout: 180_000,
    throttle: 500,
  });

  useEffect(() => {
    const currFont = stage > -1 && currentLang === "greek" ? openSans : archivo;
    setFont({
      className: currFont.className,
      fontFamily: currFont.style.fontFamily,
    });
  }, [stage, currentLang]);

  if (!windowHeight || !windowWidth) {
    return null;
  }

  return (
    <div
      className={`flex h-full w-screen flex-col items-center ${font.className}`}
    >
      <PostersGallery />
      <LocationForm />
      <LanguageButtons />
      <MakerStart />
      <NameForm />
      <StatementsForm />
      <MakePhoto />
      <SaveAndSend />
    </div>
  );
};

export default ReactBooth;
