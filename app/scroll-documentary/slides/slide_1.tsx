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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute z-10 flex w-full justify-center">
      <div className="relative right-6 top-10 flex w-2/3 justify-between font-bold">
        <div
          className={`${archivo.className} text-4xl text-purple_lightest_bg`}
        >
          Democracy
        </div>

        <div className="relative h-32 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentWordIndex}
              initial={{ y: -100, opacity: 0, x: 0 }} // Ensure x is set to 0
              animate={{ y: 0, opacity: 1, x: 0 }} // Ensure x remains 0
              exit={{ y: 100, opacity: 0, x: 0 }} // Ensure x remains 0
              transition={{ duration: 0.5 }}
              className={`${archivo.className} text-4xl text-purple_lightest_bg`}
            >
              {changingWords[currentWordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
