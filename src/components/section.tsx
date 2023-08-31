export default function Section(props: {
  id: string;
  theme: "light" | "dark";
  xPadding?: string;
  children: React.ReactNode;
}) {
  const { id, theme, xPadding = "px-5" } = props;

  const bgColor = theme === "light" ? "bg-puprple_lightest_bg" : "bg-black_bg";
  const textColor =
    theme === "light" ? "text-black_bg" : "text-puprple_lightest_bg";

  return (
    <section id={id} className={`${bgColor} ${textColor} ${xPadding} py-5`}>
      {props.children}
    </section>
  );
}
