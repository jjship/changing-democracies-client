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
    <div className="my-10 grid w-full grid-cols-4 items-center gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="mb-5 h-20 w-[80%]">
            <p
              style={{
                fontSize: "1.5rem",
                color: "#b85252",
                fontWeight: "bold",
              }}
            >
              {item.text}
            </p>
          </div>
          <div className="flex h-[100px] items-center">
            <Image
              src={item.image}
              alt="circle image"
              width={100}
              height={100}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
