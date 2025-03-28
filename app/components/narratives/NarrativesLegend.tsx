"use client";
import { FC } from "react";
import { useTranslation } from "@/translation/TranslationContext";

const NarrativesLegend: FC = () => {
  const { dictionary: dict } = useTranslation();
  const data = [
    {
      text: `${dict.narratives.select}`,
      image: "../select path - icon.svg",
      width: "w-[60px]",
    },
    {
      text: `${dict.narratives.watch}`,
      image: "../watch video - icon.svg",
      width: "w-[60px]",
    },
    {
      text: `${dict.narratives.continue}`,
      image: "../continue on path - icon.svg",
    },
    {
      text: `${dict.narratives.switch}`,
      image: "../or switch - icon.svg",
    },
  ];

  return (
    <div className=" grid w-[90%] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:pl-12">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="mb-5  xl:h-20">
            <p className="text-base font-bold text-[#b85252] md:text-xl lg:text-2xl">
              {item.text}
            </p>
          </div>
          <div
            className={`h-5 md:h-10 xl:h-[100px] ${
              item.width ? item.width : "w-[100px]"
            } items-center`}
            style={{
              backgroundImage: `url('${item.image}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 0%",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default NarrativesLegend;
