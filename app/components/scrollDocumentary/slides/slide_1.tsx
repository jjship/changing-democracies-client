"use client";
import { FC } from "react";
import { Archivo } from "next/font/google";
import { useTranslation } from "../../../[lang]/context/TranslationContext";
import { Slide1AdditionalContent } from "../../../[lang]/dictionaries";

const archivo = Archivo({ subsets: ["latin"] });

export const Slide1Content: FC = () => {
  const { dictionary: dict } = useTranslation();

  const slide1AdditionalContent = dict.scrollDocumentary.slides.slide_1
    .additionalContent as Slide1AdditionalContent;

  return (
    <div className="absolute left-4 top-10 z-10 mobile:left-3 mobile:top-2 flex items-center justify-center bg-black/30 mix-blend-screen">
      <div className="min-w-[60vw] text-left">
        <h1 className={`${archivo.className} text-8xl text-green_accent mobile:text-[clamp(1.5rem,8vw,3rem)] mobile:leading-[1.05]`}>
          <span className={`block ${archivo.className}`}>
            {slide1AdditionalContent.is_democracy}
          </span>
          <span className={`mt-4 block mobile:mt-0 ${archivo.className}`}>
            {slide1AdditionalContent.worth}
          </span>
          <span className={`mt-4 block mobile:mt-0 ${archivo.className}`}>
            {slide1AdditionalContent.the_trouble}
          </span>
        </h1>
      </div>
    </div>
  );
};
