"use client";
import Image from "next/image";
import { Archivo_Narrow } from "next/font/google";
import { FC } from "react";
import { useTranslation } from "../../../[lang]/context/TranslationContext";
import { Slide15AdditionalContent } from "../../../[lang]/dictionaries";
import logoEvens from "@/public/logo_evens_white.svg";
import logoAutres from "@/public/logo_autres_white.svg";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

export const Slide15Content: FC = () => {
  const { dictionary: dict } = useTranslation();

  const slide15AdditionalContent = dict.scrollDocumentary.slides.slide_15
    .additionalContent as Slide15AdditionalContent;

  return (
    <div className="relative h-full flex-col   pl-8 pr-24 pt-2 font-bold text-purple_lightest_bg">
      <h1
        className={`text-4xl font-bold ${archivoNarrow.className}  mb-10 text-yellow_secondary`}
      >
        {slide15AdditionalContent.credits}
      </h1>
      <div className="flex-grow"></div>
      <div className="low:text-xs l:text-sm relative grid h-[80%] grid-cols-2 gap-10 xl:text-4xl ">
        <div className="flex h-full flex-col justify-between ">
          <>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent`}
            >
              {slide15AdditionalContent.script}
            </h4>
            <p>
              David Sypniewski 
              <br />
              Marjolein Delvou and Hanna Zielińska (Evens Foundation) <br />
              Tijl Akkermans (Autres Directions)
            </p>
          </>
          <div className="flex-grow"></div>
          <>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent`}
            >
              {slide15AdditionalContent.visuals}
            </h4>
            <p>David Sypniewski </p>
          </>
          <div className="flex-grow"></div>
          <>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent`}
            >
              {slide15AdditionalContent.development}
            </h4>
            <p>Jacek Skrzypek</p>
          </>
          <div className="flex-grow"></div>
          <>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent`}
            >
              {slide15AdditionalContent.music}
            </h4>
            <p>
              Kai Engel,{" "}
              <span className="italic">The Moments Of Our Mornings</span>
            </p>
          </>
          <div className="flex-grow"></div>
          <div className="flex flex-col items-start self-start">
            <Image
              src={logoEvens}
              alt="evens logo"
              className="h-10 w-auto -translate-x-6 md:h-20"
            />
            <Image
              src={logoAutres}
              alt="autres logo"
              className="h-5 w-auto -translate-x-2 md:h-10"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            <span className="font-bold text-darkRed">Changing Democracies</span>{" "}
            {slide15AdditionalContent.p1}
          </p>
          <p>{slide15AdditionalContent.p2}</p>
        </div>
      </div>
    </div>
  );
};
