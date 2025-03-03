import { Archivo_Black } from "next/font/google";

const archivo_black = Archivo_Black({ weight: "400", subsets: ["latin"] });

export default function Title(props: {
  text: string;
  theme: "light" | "dark" | "transparent";
  color?: string;
  alt?: boolean;
}) {
  const colors = {
    light: "bg-purple_lightest_bg",
    dark: "bg-black_bg",
    transparent: "bg-transparent",
  };

  const { text, theme, color, alt } = props;
  const bgColor = colors[theme];
  const fontClass = alt ? archivo_black.className : undefined;
  const topDistance = alt ? null : "top-10";

  return (
    <div
      className={`${bgColor} ${topDistance} z-30 md:relative md:top-0 md:z-20 `}
    >
      <h1
        className={`${fontClass} pb-2 pl-5 text-[2.25rem] leading-9 tracking-[-0.064rem] md:py-10 md:pl-12 md:text-6xl md:leading-8 xl:pl-24 xl:text-[4.5rem]  ${
          color ? "text-" + color : ""
        }`}
      >
        {text}
      </h1>
    </div>
  );
}
