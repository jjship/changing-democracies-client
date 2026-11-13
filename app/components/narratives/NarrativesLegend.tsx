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
  ];

  return (
    <>
      <ul className="mt-6 grid max-w-[46rem] grid-cols-2 gap-x-4 gap-y-6 desktop:hidden [@media(min-width:600px)]:grid-cols-3">
        {data.map((item) => (
          <li key={item.text} className="flex items-center gap-3">
            <p className="w-[5.5rem] text-[0.7rem] font-bold leading-tight text-red_mains">
              {item.text}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="" className="h-5 w-auto" />
          </li>
        ))}
      </ul>
      <div className="hidden w-[90%] grid-cols-4 gap-4 pl-12 desktop:grid">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="mb-5  xl:h-20">
              <p className="text-xl font-bold text-[#b85252] lg:text-2xl">
                {item.text}
              </p>
            </div>
            <div
              className={`h-10 xl:h-[100px] ${
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
    </>
  );
};

export default NarrativesLegend;
