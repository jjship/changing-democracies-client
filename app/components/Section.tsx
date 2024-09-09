export default function Section(props: {
  id: string;
  theme: "light" | "dark";
  xPadding?: string;
  yPadding?: string;
  children: React.ReactNode;
}) {
  const {
    id,
    theme,
    xPadding = "px-5 md:px-10",
    yPadding = "py-5 md:py-14 xl:py-20",
  } = props;

  const bgColor = theme === "light" ? "bg-purple_lightest_bg" : "bg-black_bg";
  const textColor =
    theme === "light" ? "text-black_bg" : "text-purple_lightest_bg";

  return (
    <section className={`relative ${bgColor} ${textColor}`}>
      <div id={id} className={`absolute -top-16`}></div>
      <div
        className={`m-auto max-w-[23.125rem] md:max-w-[64rem] xl:max-w-[90rem] ${xPadding} ${yPadding}`}
      >
        {props.children}
      </div>
    </section>
  );
}
