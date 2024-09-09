import Link from "next/link";
import { useState, useEffect } from "react";
import { NavColor, useNavContext } from "./Navigation";

export default function MobileNav() {
  const { isNavOpen } = useNavContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      const visibleTimeout = setTimeout(() => {
        setVisible(true);
      }, 100);

      return () => clearTimeout(visibleTimeout);
    } else {
      setVisible(false);
    }
    //TODO inventigate this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavOpen]);

  return (
    <div
      className={`ml-5 flex min-h-[90vh] flex-col justify-between bg-black_bg pt-10 ${
        visible ? "" : "hidden"
      }`}
    >
      <div className="flex-grow "></div>
      <div className="flex flex-col justify-center gap-8">
        <AnimatedLink
          href="/free-browsing"
          text="free browsing"
          timeout={110}
          color="yellow"
        />
        <AnimatedLink
          href="/#project"
          text="project"
          timeout={200}
          color="pink"
        />
        <AnimatedLink href="/#team" text="team" timeout={300} color="pink" />
        <AnimatedLink
          href="/#events"
          text="events"
          timeout={400}
          color="pink"
        />
        <AnimatedLink
          href="/#contact"
          text="contact"
          timeout={500}
          color="pink"
        />
      </div>
    </div>
  );
}

type LinkColor = "yellow" | "pink";

const getFontColor = (color: LinkColor): NavColor => {
  switch (color) {
    case "pink":
      return "purple_lightest_bg";
    case "yellow":
      return "yellow_secondary";
    default:
      console.error("Unknown animated link color");
      return "purple_lightest_bg";
  }
};

const AnimatedLink = (props: {
  href: string;
  text: string;
  timeout?: number;
  color: LinkColor;
}) => {
  const { isNavOpen, toggleNav } = useNavContext();
  const [slideIn, setSlideIn] = useState(false);
  const { text, timeout = 0 } = props;

  const linkClasses = `text-${getFontColor(props.color)} text-5xl capitalize`;

  useEffect(() => {
    if (isNavOpen) {
      const slideTimeout = setTimeout(() => {
        setSlideIn(true);
      }, timeout);

      return () => clearTimeout(slideTimeout);
    } else {
      setSlideIn(false);
    }
  }, [isNavOpen, timeout]);

  return (
    <div
      style={{
        zIndex: 100,
        transform: slideIn ? "translateY(0)" : "translateY(100vh)",
        transition: "all 1s ease-in-out",
      }}
    >
      <Link
        href={props.href}
        onClick={() => toggleNav()}
        className={linkClasses}
      >
        {text}
      </Link>
    </div>
  );
};
