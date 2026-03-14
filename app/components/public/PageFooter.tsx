import { FC } from "react";
import Image from "next/image";
import euDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import evensDark from "@/public/logo_evens_black.svg";
import evensLight from "@/public/logo_evens_white.svg";
import euLight from "@/public/EN_Co-fundedbytheEU_RGB_WHITE.svg";

const PageFooter: FC<{ theme: "light" | "dark" }> = ({ theme }) => (
  <div className="justify-left flex">
    <Image
      src={theme === "light" ? euDark : euLight}
      alt="changing democracies logo"
      className="m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
    />
    <Image
      src={theme === "light" ? evensDark : evensLight}
      alt="Evens Foundation logo"
      className="h-auto w-[20%] md:w-[8%]"
    />
  </div>
);

export default PageFooter;
