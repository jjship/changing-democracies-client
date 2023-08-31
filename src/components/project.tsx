import Image from "next/image";
import earshapedArrows from "../../public/arrows_ear_no_bg.svg";
import fundedByEu from "../../public/EU_flag__funded_by.svg";
import logoLight from "../../public/logo_light_no_bg.svg";
import { projectParagraphSm } from "../app/content";

export default function Project() {
  return (
    <>
      <h1 className="hidden">Project</h1>
      <div className="flex flex-col items-center gap-[2.5em] pt-[0.375em]">
        <div className="mx-[3.125rem] pb-[1rem]">
          <Image src={earshapedArrows} alt="image with earshaped arrows" />
        </div>
        <div className="mx-[5.625rem]">
          <Image src={logoLight} alt="changing democracies logo" />
        </div>
        <p className="leading-5">{projectParagraphSm}</p>
        <div className="mx-[6.8em]">
          <Image src={fundedByEu} alt="funded by EU logo" />
        </div>
      </div>
    </>
  );
}
