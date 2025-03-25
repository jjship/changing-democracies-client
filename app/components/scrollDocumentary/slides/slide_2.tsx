"use client";
import { FC, useEffect, useState } from "react";
import { Archivo } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../../../[lang]/context/TranslationContext";
import { Slide2AdditionalContent } from "../../../[lang]/dictionaries";

const archivo = Archivo({ subsets: ["latin"] });

export const Slide2Content: FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { dictionary: dict } = useTranslation();

  const slide2AdditionalContent = dict.scrollDocumentary.slides.slide_2
    .additionalContent as Slide2AdditionalContent;

  const changingWords = [
    slide2AdditionalContent.equality,
    slide2AdditionalContent.freedom,
    slide2AdditionalContent.honesty,
    slide2AdditionalContent.love,
    slide2AdditionalContent.conflict,
    slide2AdditionalContent.safety,
    slide2AdditionalContent.justice,
  ];

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
          {slide2AdditionalContent.democracy}
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
