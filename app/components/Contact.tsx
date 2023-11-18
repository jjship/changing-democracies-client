import Link from "next/link";
import Image from "next/image";
import logoLight from "@/public/logo_light_no_bg.svg";

import roundPhoto from "@/public/photo in circle.png";
import Title from "./Title";

export default function Contact() {
  return (
    <>
      <Title text="Contact" theme="dark" />
      <div className="relative mt-6 md:z-20 md:ml-10 md:mt-[5rem] xl:ml-28">
        <div className=" absolute z-10 mr-[5.5rem] mt-[1rem] md:mr-[26rem] md:mt-[2.5rem] xl:mr-[40rem]">
          <Image
            src={roundPhoto}
            alt="retro photo of a boy with flowers and a man on a motorbike"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative z-20 text-display_sm font-bold leading-[4.5rem] tracking-[-.03em] text-red_mains mix-blend-screen md:text-[11rem] md:leading-[12.5rem]  xl:text-[12.5rem]">
          <p className="ml-[2.875rem] md:ml-[3rem]">Get in</p>
          <div className=" mr-4 mt-5 text-right underline mix-blend-overlay md:ml-64 md:text-left ">
            <Link href="mailto:touch@changingdemocracies.com">touch.</Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-end">
          <div
            className="relative z-20 mt-10 flex max-w-min flex-col md:mt-48"
            style={{ background: "rgba(107, 219, 198, 0.80)" }}
          >
            <Link
              href="mailto:hanna.zielinska@evensfoundation.be"
              className="mx-[.3rem] whitespace-nowrap text-center font-semibold leading-6 text-black_bg md:mx-2 md:text-2xl xl:mx-5 xl:text-[2.125rem] xl:leading-10"
            >
              hanna.zielinska@evensfoundation.be
            </Link>
            <Link
              href="mailto:marjolein.delvou@evensfoundation.be"
              className="mx-[.3rem] whitespace-nowrap text-center font-semibold leading-6 text-black_bg md:mx-2 md:text-2xl xl:mx-5 xl:text-[2.125rem] xl:leading-10"
            >
              marjolein.delvou@evensfoundation.be
            </Link>
          </div>
        </div>
      </div>
      <div className="relative z-20 mt-32 max-w-max border-solid border-white md:mx-auto md:mt-40 md:w-full">
        <span className="leading-6 text-puprple_lightest_bg md:text-2xl xl:text-[2.125rem] xl:leading-10">
          Download our Children and Young
          <br className="md:hidden" /> People Protection Policy from&nbsp;
          <Link
            href="/cypp_policy.pdf"
            className="text-green_accent underline"
            prefetch={false}
          >
            here
          </Link>
          .
        </span>
      </div>
      <div className="ml-6 mr-36 mt-[11.06rem] md:hidden">
        <Image src={logoLight} alt="changing democracies logo" />
      </div>
    </>
  );
}
