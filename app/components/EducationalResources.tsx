"use client";

import { FC } from "react";
import Title from "./Title";
import { useTranslation } from "../[lang]/context/TranslationContext";

const EducationalResources: FC = () => {
  const { dictionary: dict } = useTranslation();
  return (
    <>
      <Title text={dict.eduPack.title} theme="light" />
      <div className="mdpy-5  md:w-8/12">
        <h2 className="mb-4 text-lg font-bold">{dict.eduPack.subtitle}</h2>
        <p className="mb-4 italic">{dict.eduPack.lead}</p>
        <p className="mb-3">{dict.eduPack.p1}</p>
        <p className="mb-3">{dict.eduPack.p2}</p>
        <ul className="mb-3 list-inside list-disc">
          {dict.eduPack.questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
        <p className="mb-4">{dict.eduPack.p3}</p>
        <a
          href={`https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/edu/Educational_Resource_Pack_Eng.pdf`}
          className="inline-block rounded bg-darkRed px-4 py-2 text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.eduPack.download}
        </a>
      </div>
    </>
  );
};

export default EducationalResources;
