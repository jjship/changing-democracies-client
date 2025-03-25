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
    <div className="relative flex h-full flex-col pb-32 pl-8 pr-24 pt-16 font-bold text-purple_lightest_bg low:pb-16 low:pt-8">
      <h1
        className={`text-4xl font-bold ${archivoNarrow.className} mb-6 text-yellow_secondary lg:text-5xl low:mb-3 low:text-2xl`}
      >
        {slide15AdditionalContent.credits}
      </h1>
      <div className="grid grid-cols-2 gap-10 lg:text-3xl xl:text-2xl l:text-lg low:text-xs">
        <div className="flex flex-col space-y-4 overflow-y-auto lg:space-y-4 xl:space-y-5 low:space-y-3">
          <div>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent lg:text-3xl`}
            >
              {slide15AdditionalContent.script}
            </h4>
            <p>
              David Sypniewski
              <br />
              Marjolein Delvou and Hanna Zielińska (Evens Foundation) <br />
              Tijl Akkermans (Autres Directions)
            </p>
          </div>
          <div>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent lg:text-3xl`}
            >
              {slide15AdditionalContent.visuals}
            </h4>
            <p>David Sypniewski </p>
          </div>
          <div>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent lg:text-3xl`}
            >
              {slide15AdditionalContent.development}
            </h4>
            <p>Jacek Skrzypek</p>
          </div>
          <div>
            <h4
              className={`${archivoNarrow.className} uppercase text-green_accent lg:text-3xl`}
            >
              {slide15AdditionalContent.music}
            </h4>
            <p>
              Kai Engel,{" "}
              <span className="italic">The Moments Of Our Mornings</span>
            </p>
          </div>
          <div className="pt-0 lg:pt-4 low:mt-0">
            <Image
              src={logoEvens}
              alt="evens logo"
              className="h-10 w-auto -translate-x-4 md:h-16 lg:h-20 low:h-6 low:-translate-x-2"
            />
            <Image
              src={logoAutres}
              alt="autres logo"
              className="h-5 w-auto -translate-x-2 md:h-8 lg:h-10 low:h-3 low:-translate-x-1"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-8 xl:space-y-5 low:space-y-3">
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
