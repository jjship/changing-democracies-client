"use client";

import { FC } from "react";
import Title from "./Title";
import { useTranslation } from "../[lang]/context/TranslationContext";

const Project: FC = () => {
  const { dictionary: dict } = useTranslation();
  return (
    <>
      <Title text="Changing Democracies" theme="light" />
      <div className="md:w-8/12  md:py-5">
        <h2 className="mb-4 text-lg font-bold">{""}</h2>
        <p className="mb-4">{dict.about.p1}</p>
        <p className="mb-4">{dict.about.p2}</p>
      </div>
      <div>
        <p className="mb-2 italic">{dict.about.disclaimer}</p>
      </div>
    </>
  );
};

export default Project;
