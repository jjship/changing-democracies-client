"use client";
import { useState, useEffect } from "react";

export default function Slide3Content() {
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAboutVisible(true);
    }, 62000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="relative left-1/2 flex h-full w-[23rem] -translate-x-1/2 flex-col items-center justify-center">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          isAboutVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-pink_scroll max-w-lg rounded bg-opacity-70 p-8 text-sm ">
          <h2 className="mb-4 text-2xl font-bold text-purple_mains">
            About the project
          </h2>
          <p className="mb-2">
            ‘Democracy failed us’, ‘Democracy is in crisis’, ‘We need to defend
            democracy’, ‘Authoritarianism is on the rise’, ‘Democratic
            institutions are in decline’ <br />
            You know these phrases. <br />
            You've heard them over and over.
          </p>
          <p className="mb-2">
            But what lies beyond this gloomy picture? <br />
            There are people around us who know.
          </p>
          <p className="mb-2">
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
          <p className="mb-2">
            Changing Democracies brings you their wisdom.
            <br /> We learnt:
          </p>
          <ul className="list- mb-2 list-inside list-disc">
            <li>That it pays to move beyond historical facts.</li>
            <li>That democracy is never finished.</li>
            <li>
              That engaging with its challenges together is the only way
              forward.
            </li>
          </ul>
          <p>Don't take our word for it—see for yourself.</p>
        </div>
      </div>
    </div>
  );
}
