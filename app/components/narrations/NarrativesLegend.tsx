import React from "react";
import Image from "next/image";

export default function NarrativesLegend() {
  const data = [
    {
      text: "select path",
      image: "./select path - icon.svg",
    },
    {
      text: "watch video",
      image: "./watch video - icon.svg",
    },
    {
      text: "continue on selected path",
      image: "./continue on path - icon.svg",
    },
    {
      text: "or switch to other connected paths",
      image: "./or switch - icon.svg",
    },
  ];

  return (
    <div className="my-10 grid w-[80%] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:pl-12">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="mb-5 h-20 w-[100%]">
            <p className="text-base font-bold text-[#b85252] sm:text-lg md:text-xl lg:text-2xl">
              {item.text}
            </p>
          </div>
          <div className="flex h-[100px] items-center">
            <Image src={item.image} alt="circle image" width={60} height={60} />
          </div>
        </div>
      ))}
    </div>
  );
}
