"use client";

import { FC } from "react";
import Title from "./Title";
import { useTranslation } from "../[lang]/context/TranslationContext";

const TravellingWorkshop: FC = () => {
  const { dictionary: dict } = useTranslation();
  return (
    <>
      <Title text={dict.travellingWorkshop.title} theme="light" />
      <div className="md:w-8/12  md:py-5">
        <p className="mb-4 italic">{dict.travellingWorkshop.lead}</p>
        <p className="mb-3">{dict.travellingWorkshop.p1}</p>
        <p className="mb-3">{dict.travellingWorkshop.p2}</p>
        <p className="mb-3">{dict.travellingWorkshop.p3}</p>
        <p className="mb-3">{dict.travellingWorkshop.p4}</p>
        <p className="mb-3">{dict.travellingWorkshop.p5}</p>
      </div>
    </>
  );
};

export default TravellingWorkshop;
