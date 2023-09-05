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
    xPadding = "px-5 dt:px-10",
    yPadding = "py-5 dt:py-20",
  } = props;

  const bgColor = theme === "light" ? "bg-puprple_lightest_bg" : "bg-black_bg";
  const textColor =
    theme === "light" ? "text-black_bg" : "text-puprple_lightest_bg";

  return (
    <section
      className={`relative ${bgColor} ${textColor} ${xPadding} ${yPadding}`}
    >
      <div id={id} className={`absolute -top-16`}></div>
      {props.children}
    </section>
  );
}
