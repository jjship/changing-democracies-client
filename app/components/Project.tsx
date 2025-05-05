"use client";

import Image from "next/image";
import earshapedArrows from "@/public/arrows_ear_no_bg.svg";
import fundedByEu from "@/public/EU_co-founded.svg";
import evensDark from "@/public/logo_evens_black.svg";
import { useTranslation } from "../[lang]/context/TranslationContext";

export default function Project() {
  const { dictionary: dict } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center gap-[2.5em] pt-[0.375em] md:hidden">
        <div className="mx-[3.125rem] hidden pb-[1rem] md:block">
          <Image src={earshapedArrows} alt="image with earshaped arrows" />
        </div>
        <div>{dict.about.p1}</div>
        <div>{dict.about.p2}</div>
        <div className="mx-[5.625rem] flex flex-col items-center justify-center gap-4">
          <Image src={fundedByEu} alt="funded by EU logo" />
          <Image
            src={evensDark}
            alt="Evens Foundation logo"
            className="h-auto w-[60%]"
          />
        </div>
      </div>
      <MdProject />
      <XlProject />
    </>
  );
}

function MdProject() {
  const { dictionary: dict } = useTranslation();
  return (
    <>
      <div className="hidden md:block xl:hidden">
        <Image
          src={earshapedArrows}
          alt="image with earshaped arrows"
          className="mx-auto max-w-[14rem]"
        />
        <div className="mt-6 grid w-full grid-cols-2 gap-6 text-[1.375rem] leading-7">
          <div>{dict.about.p1}</div>
          <div>{dict.about.p2}</div>
          <div className="mr-[10.4rem] flex w-1/2 gap-4">
            <Image src={fundedByEu} alt="funded by EU logo" />
            <Image
              src={evensDark}
              alt="Evens Foundation logo"
              className="h-auto w-[50%]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function XlProject() {
  const { dictionary: dict } = useTranslation();
  return (
    <>
      <div className="hidden xl:block">
        <Image
          src={earshapedArrows}
          alt="image with earshaped arrows"
          className="mx-auto max-w-[24rem] "
        />
        <div className="mt-12 grid grid-cols-3 gap-10 text-[1.375rem]">
          <div>
            <div className="mr-[10.4rem] flex flex-col gap-10">
              <Image src={fundedByEu} alt="funded by EU logo" />
              <Image
                src={evensDark}
                alt="Evens Foundation logo"
                className="h-auto w-[60%]"
              />
            </div>
          </div>
          <div>{dict.about.p1}</div>
          <div>{dict.about.p2}</div>
        </div>
      </div>
    </>
  );
}
