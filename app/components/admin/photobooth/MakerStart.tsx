"use client";

import { FC } from "react";

import { useBoothContext } from "./BoothContext";
import DavButton from "./DavButton";
import BackBtn from "./BackBtn";
import { useTranslations } from "./useTranslations";

const MakerStart: FC = () => {
  const { windowHeight, stage } = useBoothContext();

  const { start, make, express } = useTranslations();

  if (stage !== 3) return null;

  const props = {
    txt: start,
    btnY: 300,
    width: 200,
    windowHeight,
  };

  return (
    <>
      {" "}
      <div>
        <p className="mt-24 text-4xl">{make}</p>
      </div>
      <div>
        <p className="mt-72 text-5xl text-darkRed">{express}</p>
      </div>
      <DavButton {...props} />
      <BackBtn />
    </>
  );
};

export default MakerStart;
