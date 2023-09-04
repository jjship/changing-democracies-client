import { useContext } from "react";
import { NavContext } from "./Navigation";

export default function Overlay() {
  const { isNavOpen } = useContext(NavContext);
  return (
    <div
      className={`overlay z-40 m-auto w-[23.125rem] dt:hidden ${
        isNavOpen ? "visible" : ""
      }`}
    ></div>
  );
}
