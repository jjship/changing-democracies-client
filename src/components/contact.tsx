import Link from "next/link";
import Image from "next/image";
import logoLight from "../../public/logo_light_no_bg.svg";

import roundPhoto from "../../public/photo in circle.png";
import Title from "./title";

export default function Contact() {
  return (
    <>
      <Title text="Contact" theme="dark" />
      <div className="relative mt-6">
        <div className="absolute z-10 mr-[5.5rem] mt-[1rem]">
          <Image
            src={roundPhoto}
            alt="retro photo of a boy with flowers and a man on a motorbike"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative z-20 text-display_sm font-bold leading-[4.5rem] tracking-[-.03em] text-red_mains  mix-blend-screen">
          <p className="ml-[2.875rem]">Get in</p>
          <div className="mr-4 mt-5 text-right underline mix-blend-overlay">
            <Link href="mailto:touch@changingdemocracies.com">touch.</Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-end">
          <div
            className="relative z-20 mt-10 max-w-min"
            style={{ background: "rgba(107, 219, 198, 0.80)" }}
          >
            <span className="mx-[.3rem] whitespace-nowrap text-right font-semibold leading-6 text-black_bg">
              touch@changing democracies.com
            </span>
          </div>
        </div>
      </div>
      <div className="ml-6 mr-36 mt-[11.06rem]">
        <Image src={logoLight} alt="changing democracies logo" />
      </div>
    </>
  );
}
