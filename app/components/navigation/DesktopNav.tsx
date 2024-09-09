import { FC } from "react";
import { useNavContext } from "./Navigation";
import Hamburger from "./Hamburger";
import Navbar from "./Navbar";

export const DesktopNav: FC = () => {
  const { isNavOpen, bgColor } = useNavContext();
  const position = isNavOpen ? "relative" : "sticky top-0 z-40";
  const color = isNavOpen ? "black_bg" : bgColor;

  return (
    <div className={`bg-${color} sticky top-0 z-40`}>
      <div className="m-auto max-w-[23.125rem] md:max-w-[64rem] xl:max-w-[90rem] ">
        <div
          className={`flex flex-row justify-between md:flex-col md:items-end ${position}`}
        >
          <Navbar />
          <Hamburger />
        </div>
      </div>
    </div>
  );
};
