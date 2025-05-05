import { Archivo_Narrow } from "next/font/google";

const archivo_narrow = Archivo_Narrow({ weight: "700", subsets: ["latin"] });

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

  return (
    <div className={`${bgColor} z-30  md:z-20 `}>
      <h1
        className={`${
          archivo_narrow.className
        } pb-2 text-[2.25rem] leading-9 tracking-[-0.064rem] md:py-10 md:text-6xl md:leading-8  xl:text-[4.5rem]  ${
          color ? "text-" + color : ""
        }`}
      >
        {text}
      </h1>
    </div>
  );
}
