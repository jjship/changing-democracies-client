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
    xPadding = "px-5 xl:px-10",
    yPadding = "py-5 xl:py-20",
  } = props;

  const bgColor = theme === "light" ? "bg-puprple_lightest_bg" : "bg-black_bg";
  const textColor =
    theme === "light" ? "text-black_bg" : "text-puprple_lightest_bg";

  return (
    <section
      className={`relative ${bgColor} ${textColor} ${xPadding} ${yPadding}`}
    >
      <div id={id} className={`absolute -top-16`}></div>
      <div className="m-auto max-w-[23.125rem] xl:max-w-[90rem]">
        {props.children}
      </div>
    </section>
  );
}
