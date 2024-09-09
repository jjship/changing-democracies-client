import { useNavContext } from "./Navigation";

export default function Overlay() {
  const { isNavOpen } = useNavContext();
  return (
    <div
      className={`overlay z-40 m-auto w-[23.125rem] bg-black_bg xl:hidden ${
        isNavOpen ? "visible" : ""
      }`}
    ></div>
  );
}
