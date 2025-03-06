"use client";

import { FC } from "react";
import Title from "./Title";
import { useTranslation } from "../[lang]/context/TranslationContext";

const ResearchPublication: FC = () => {
  const { dictionary: dict } = useTranslation();
  return (
    <>
      <Title text={dict.researchPublication.title} theme="light" />
      <div className="md:w-8/12  md:py-5">
        <h2 className="mb-4 text-lg font-bold">
          {dict.researchPublication.subtitle}
        </h2>
        <p className="mb-4 italic">{dict.researchPublication.lead}</p>
        <p className="mb-3">{dict.researchPublication.p1}</p>

        <a
          href={`https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/research/Changing-Democraties-WEB02.pdf`}
          className="inline-block rounded bg-darkRed px-4 py-2 text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.researchPublication.download}
        </a>
      </div>
    </>
  );
};

export default ResearchPublication;
