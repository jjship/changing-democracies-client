"use client";
import { useState } from "react";

const Page = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <main className="m-auto max-w-[23.125rem] dt:max-w-[90rem]">
      <div
        className="m-auto h-20 w-20 bg-yellow_secondary py-10 "
        onClick={toggleNav}
      >
        <div className="ml-5" onClick={toggleNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.75em"
            height="1.5em"
            viewBox="0 0 28 24"
            fill="none"
          >
            <line
              id="top-line"
              y1="1.5"
              x2="28"
              y2="1.5"
              stroke="#191818"
              strokeWidth="3"
              className={isNavOpen ? "open" : ""}
            />
            <line
              id="middle-line"
              y1="11.834"
              x2="28"
              y2="11.834"
              stroke="#191818"
              strokeWidth="3"
              className={isNavOpen ? "open" : ""}
            />
            <line
              id="bottom-line"
              y1="22.168"
              x2="28"
              y2="22.168"
              stroke="#191818"
              strokeWidth="3"
              className={isNavOpen ? "open" : ""}
            />
          </svg>
          <style jsx>{`
            #top-line,
            #middle-line,
            #bottom-line {
              transition: all 1s ease;
            }
            .open#top-line {
              transform-origin: top left;
              transform: translate(8%, 5%) rotate(47deg);
            }
            .open#middle-line {
              opacity: 0;
            }
            .open#bottom-line {
              transform-origin: bottom left;
              transform: translate(9%, 0%) rotate(-50deg);
            }
          `}</style>
        </div>
      </div>
    </main>
  );
};

export default Page;
