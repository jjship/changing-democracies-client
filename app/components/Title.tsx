import { Archivo_Black } from "next/font/google";

const archivo_black = Archivo_Black({ weight: "400", subsets: ["latin"] });

export default function Title(props: {
  text: string;
  theme: "light" | "dark";
  color?: string;
  alt?: boolean;
}) {
  const { text, theme, color, alt } = props;
  const bgColor = theme === "light" ? "bg-purple_lightest_bg" : "bg-black_bg";
  const fontClass = alt ? archivo_black.className : undefined;
  const topDistance = alt ? null : "top-10";

  return (
    <div
      className={`${bgColor} sticky ${topDistance} z-30 md:relative md:top-0 md:z-20 `}
    >
      <h1
        className={`${fontClass} py-[0.3em] pl-5 text-[2.25rem] leading-9 tracking-[-0.064rem] md:py-10 md:pl-12 md:text-7xl md:leading-8 xl:pl-24 xl:text-[4.5rem] ${
          color ? "text-" + color : ""
        }`}
      >
        {text}
      </h1>
    </div>
  );
}
