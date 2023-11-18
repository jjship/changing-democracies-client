import Image from "next/image";
import earshapedArrows from "@/public/arrows_ear_no_bg.svg";
import fundedByEu from "@/public/EU_co-founded.svg";
import logoLight from "@/public/logo_light_no_bg.svg";
import {
  projectFirstParagraphBg,
  projectParagraphSm,
  projectSecondParagraphBg,
} from "../content/project";

export default function Project() {
  return (
    <>
      <h1 className="hidden">Project</h1>
      <div className="flex flex-col items-center gap-[2.5em] pt-[0.375em] md:hidden">
        <div className="mx-[3.125rem] pb-[1rem]">
          <Image src={earshapedArrows} alt="image with earshaped arrows" />
        </div>
        <div className="mx-[5.625rem]">
          <Image src={logoLight} alt="changing democracies logo" />
        </div>
        <div>{projectParagraphSm}</div>
        <div className="mx-[5.625rem]">
          <Image src={fundedByEu} alt="funded by EU logo" />
        </div>
      </div>
      <MdProject />
      <XlProject />
    </>
  );
}

function MdProject() {
  return (
    <>
      <div className="hidden md:block xl:hidden">
        <Image
          src={earshapedArrows}
          alt="image with earshaped arrows"
          className="mx-auto max-w-[24rem] pt-10"
        />
        <div className="mt-14 grid w-full grid-cols-2 gap-14 text-[1.375rem] leading-7">
          <div>{projectFirstParagraphBg}</div>
          <div>{projectSecondParagraphBg}</div>
          <div>
            <div className="mr-[10.4rem] flex w-1/2 gap-4">
              <Image
                src={logoLight}
                alt="changing democracies logo"
                className="mr-9"
              />
              <Image src={fundedByEu} alt="funded by EU logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function XlProject() {
  return (
    <>
      <div className="hidden xl:block">
        <Image
          src={earshapedArrows}
          alt="image with earshaped arrows"
          className="mx-auto max-w-[24rem] pt-10"
        />
        <div className="mt-12 grid grid-cols-3 gap-10 text-[1.375rem]">
          <div>
            <div className="mr-[10.4rem] flex flex-col gap-10">
              <Image
                src={logoLight}
                alt="changing democracies logo"
                className="ml-[.3rem] mt-2 pr-9"
              />
              <Image src={fundedByEu} alt="funded by EU logo" />
            </div>
          </div>
          <div>{projectFirstParagraphBg}</div>
          <div>{projectSecondParagraphBg}</div>
        </div>
      </div>
    </>
  );
}
