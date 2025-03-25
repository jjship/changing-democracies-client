"use client";
import { FC } from "react";
import { Archivo } from "next/font/google";
import { useTranslation } from "../../../[lang]/context/TranslationContext";
import { Slide0AdditionalContent } from "../../../[lang]/dictionaries";

const archivo = Archivo({ subsets: ["latin"] });

export const Slide0Content: FC = () => {
  const { dictionary: dict } = useTranslation();

  const slide0AdditionalContent = dict.scrollDocumentary.slides.slide_0
    .additionalContent as Slide0AdditionalContent;

  return (
    <div className="group">
      <div
        className={`absolute left-0 top-1/2 flex h-full w-full -translate-y-1/2 items-center`}
      >
        {/* Arrow Rectangle */}
        <div className="h-36 w-[40rem] bg-purple_mains tall:w-[20rem] midheight:w-[30vw]" />

        {/* Arrow Triangle - Changes color on hover */}
        <div
          className="z-20 h-0 w-0
        border-b-[7rem] border-l-[11rem] 
        border-t-[7rem] border-b-transparent 
        border-l-yellow_secondary border-t-transparent
        transition-colors
        duration-200 group-hover:border-l-teal-300"
        />
      </div>

      <div className="absolute left-40 top-2/3 z-10 flex items-center justify-center mix-blend-screen">
        <div className="min-w-[60vw] text-left">
          <h1
            className={`${archivo.className} text-8xl  text-yellow_secondary`}
          >
            <span className={`block ${archivo.className}`}>
              {slide0AdditionalContent.scroll}
            </span>
            <span className={`mt-4 block ${archivo.className}`}>
              {slide0AdditionalContent.documentary}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
