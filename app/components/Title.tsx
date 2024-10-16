import { Archivo_Black } from "next/font/google";

const archivo_black = Archivo_Black({ weight: "400", subsets: ["latin"] });

export default function Title(props: {
  text: string;
  theme: "light" | "dark";
  color?: string;
}) {
  const { theme, color } = props;
  const bgColor = theme === "light" ? "bg-purple_lightest_bg" : "bg-black_bg";

  return (
    <div
      className={`${bgColor} sticky top-10 z-30 md:relative md:top-0 md:z-20 `}
    >
      <h1
        className={`${
          archivo_black.className
        } py-[0.3em] pl-5 text-[2.25rem] leading-9 tracking-[-0.064rem] md:py-10 md:pl-12 md:text-7xl md:leading-8 xl:pl-24 xl:text-[4.5rem] ${
          color ? "text-" + color : ""
        }`}
      >
        {props.text}
      </h1>
    </div>
  );
}
