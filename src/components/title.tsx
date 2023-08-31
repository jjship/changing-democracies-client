export default function Title(props: {
  text: string;
  theme: "light" | "dark";
}) {
  const { theme } = props;
  const bgColor = theme === "light" ? "bg-puprple_lightest_bg" : "bg-black_bg";

  return (
    <div className={`${bgColor} dt:relative dt:top-0 sticky top-16 z-30 `}>
      <h1 className="dt:text-[4.5rem] dt:font-bold dt:pl-16 dt:py-10 dt:leading-8 py-[0.3em] pl-5 text-[2.25rem] font-semibold leading-9 tracking-[-0.064rem]">
        {props.text}
      </h1>
    </div>
  );
}
