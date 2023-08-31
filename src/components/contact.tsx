import Link from "next/link";
import Image from "next/image";
import logoLight from "../../public/logo_light_no_bg.svg";

import roundPhoto from "../../public/photo in circle.png";
import Title from "./title";

export default function Contact() {
  return (
    <>
      <Title text="Contact" theme="dark" />
      <div className="dt:mt-[5rem] dt:ml-28 dt:z-20 relative mt-6">
        <div className=" dt:mr-[40rem] dt:mt-[2.5rem] absolute z-10 mr-[5.5rem] mt-[1rem]">
          <Image
            src={roundPhoto}
            alt="retro photo of a boy with flowers and a man on a motorbike"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="dt:text-[12.5rem] dt:leading-[12.5rem] relative z-20 text-display_sm font-bold leading-[4.5rem] tracking-[-.03em] text-red_mains  mix-blend-screen">
          <p className="dt:ml-[3rem] ml-[2.875rem]">Get in</p>
          <div className=" dt:text-[12.5rem] dt:text-left dt:ml-64 mr-4 mt-5 text-right underline mix-blend-overlay">
            <Link href="mailto:touch@changingdemocracies.com">touch.</Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-end">
          <div
            className="dt:mt-48 relative z-20 mt-10 max-w-min"
            style={{ background: "rgba(107, 219, 198, 0.80)" }}
          >
            <span className="dt:text-[2.125rem] dt:mx-5 dt:leading-10 mx-[.3rem] whitespace-nowrap text-right font-semibold leading-6 text-black_bg">
              touch@changing democracies.com
            </span>
          </div>
        </div>
      </div>
      <div className="dt:hidden ml-6 mr-36 mt-[11.06rem]">
        <Image src={logoLight} alt="changing democracies logo" />
      </div>
    </>
  );
}
