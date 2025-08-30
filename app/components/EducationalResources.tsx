"use client";

import { FC } from "react";
import Title from "./Title";
import { useTranslation } from "../[lang]/context/TranslationContext";
import { Archivo_Narrow } from "next/font/google";

const archivo_narrow = Archivo_Narrow({ weight: "600", subsets: ["latin"] });
const EducationalResources: FC = () => {
  const { dictionary: dict, language } = useTranslation();
  return (
    <>
      <div className="w-4/5">
        <Title text={dict.eduPack.title} theme="light" />
      </div>

      <div className="md:w-3/5">
        <h2 className={`${archivo_narrow.className}  mb-4 text-2xl font-bold`}>
          {dict.eduPack.subtitle}
        </h2>
        <p className="italic md:text-xl">{dict.eduPack.lead}</p>
        <div className="mb-10 mt-2 h-[.4rem] w-16 bg-yellow_secondary"></div>
        <p className="mb-3">{dict.eduPack.p1}</p>
        <p className="hidden md:block">{dict.eduPack.p2}</p>
        <ul className="mb-3 hidden list-inside list-disc md:block">
          {dict.eduPack.questions.map((question, index) => (
            <li className="mb-0 ml-4" key={index}>
              {question}
            </li>
          ))}
        </ul>
        <p className="mb-6 hidden md:block">{dict.eduPack.p3}</p>
        <a
          href={`https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/edu/Changing_Democracies_Educational_Resource_Pack.${language}.pdf`}
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
