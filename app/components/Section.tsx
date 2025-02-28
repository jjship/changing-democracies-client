import { FC } from "react";

export { Section, sectionPadding };

const sectionPadding = { x: "px-5 md:px-10", y: "py-5" };

const Section: FC<{
  id: string;
  theme: "light" | "dark" | "yellow";
  xPadding?: string;
  yPadding?: string;
  children: React.ReactNode;
}> = ({
  id,
  theme,
  xPadding = sectionPadding.x,
  yPadding = sectionPadding.y,
  children,
}) => {
  const colors = {
    light: {
      bg: "bg-purple_lightest_bg",
      text: "text-black_bg",
    },
    dark: {
      bg: "bg-black_bg",
      text: "text-purple_lightest_bg",
    },
    yellow: {
      bg: "bg-yellow_secondary",
      text: "text-black_bg",
    },
  };
  const bgColor = colors[theme].bg;
  const textColor = colors[theme].text;

  return (
    <section className={`relative ${bgColor} ${textColor}`}>
      <div id={id} className={`absolute -top-16`}></div>
      <div
        className={`m-auto max-w-[23.125rem] md:max-w-[64rem] xl:max-w-[90rem] ${xPadding} ${yPadding}`}
      >
        {children}
      </div>
    </section>
  );
};
