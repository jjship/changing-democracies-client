import Link from "next/link";
import { ReactNode, useContext, useState, useEffect } from "react";
import { NavContext } from "./Navigation";

export default function MobileNav() {
  const { isNavOpen } = useContext(NavContext);
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
      className={`ml-5 flex h-screen flex-col justify-center gap-8 bg-black_bg pt-60 ${
        visible ? "" : "hidden"
      }`}
    >
      <AnimatedLink text="project" timeout={110} />
      <AnimatedLink text="team" timeout={200} />
      <AnimatedLink text="events" timeout={300} />
      <AnimatedLink text="contact" timeout={400} />
    </div>
  );
}

const AnimatedLink = (props: { text: string; timeout?: number }) => {
  const { isNavOpen, toggleNav } = useContext(NavContext);
  const [slideIn, setSlideIn] = useState(false);
  const { text, timeout = 0 } = props;

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
        color: "white",
      }}
    >
      <Link
        href={`#${text}`}
        onClick={() => toggleNav()}
        className="text-5xl capitalize text-puprple_lightest_bg"
      >
        {text}
      </Link>
    </div>
  );
};
