"use client";

import { FC, useEffect, useState } from "react";
import { Archivo } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const archivo = Archivo({ subsets: ["latin"] });

const changingWords = [
  "Equality",
  "Freedom",
  "Honesty",
  "Love",
  "Conflict",
  "Safety",
  "Justice",
];

export const Slide1Content: FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % changingWords.length);
    }, 5000); // Changed to 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute z-10 flex w-full justify-center">
      <div className="relative right-7 top-10 flex w-7/12 justify-between font-bold">
        <div
          className={`${archivo.className} text-purple_lightest_bg`}
          style={{ fontSize: "2vw" }}
        >
          Democracy
        </div>

        <div className="relative h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`${archivo.className} text-purple_lightest_bg`}
              style={{ fontSize: "2vw" }}
            >
              {changingWords[currentWordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
