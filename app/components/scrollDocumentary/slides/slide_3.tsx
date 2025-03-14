"use client";
import { useState, useEffect, FC } from "react";

export const Slide3Content: FC = () => {
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAboutVisible(true);
    }, 62000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="relative left-1/2 flex h-3/4 w-[90vw] max-w-[23rem] -translate-x-1/2 flex-col items-center justify-center">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          isAboutVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-lg rounded bg-pink_scroll bg-opacity-70 p-4">
          <h2
            className=" font-bold text-purple_mains"
            style={{ fontSize: "2vh", marginBottom: "2vh" }}
          >
            About the project
          </h2>
          <p style={{ fontSize: "1.6vh", marginBottom: "1.6vh" }}>
            &ldquo;Democracy failed us&rdquo;, &ldquo;Democracy is in
            crisis&rdquo;, &ldquo;We need to defend democracy&rdquo;,
            &ldquo;Authoritarianism is on the rise&rdquo;, &ldquo;Democratic
            institutions are in decline&rdquo; <br />
            You know these phrases. <br />
            You&apos;ve heard them over and over.
          </p>
          <p style={{ fontSize: "1.6vh", marginBottom: "1.6vh" }}>
            But what lies beyond this gloomy picture? <br />
            There are people around us who know.
          </p>
          <p style={{ fontSize: "1.6vh", marginBottom: "1.6vh" }}>
            They have experienced firsthand what life is like under different
            political systems. <br />
            They have lived through times of transition.
            <br /> So we asked them:{" "}
            <span className="font-bold">
              Is democracy worth the trouble?
            </span>{" "}
            They shared their fears, their hopes, their disillusions. <br />
            Their stories.
          </p>
          <p style={{ fontSize: "1.6vh", marginBottom: "1.6vh" }}>
            Changing Democracies brings you their wisdom.
            <br /> We learnt:
          </p>
          <ul
            className="list- list-inside list-disc"
            style={{ fontSize: "1.6vh", marginBottom: "1.6vh" }}
          >
            <li>That it pays to move beyond historical facts.</li>
            <li>That democracy is never finished.</li>
            <li>
              That engaging with its challenges together is the only way
              forward.
            </li>
          </ul>
          <p style={{ fontSize: "1.6vh" }}>
            Don&apos;t take our word for it—see for yourself.
          </p>
        </div>
      </div>
    </div>
  );
};
