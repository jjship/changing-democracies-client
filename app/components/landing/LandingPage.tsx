"use client";

import { FC } from "react";
import { useTranslation } from "../../[lang]/context/TranslationContext";
import { Navigation } from "../navigation/Navigation";
import { Section } from "../Section";

export default function LandingPage() {
  // Access the dictionary and other translation context data
  const { dictionary, language } = useTranslation();

  return (
    <>
      <div className="container mx-auto">
        <h1 className="mb-6 text-4xl font-bold">
          {dictionary.landing.scrollDocumentary}
        </h1>
        <p className="mb-8 text-lg">{dictionary.landing.description}</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-yellow-100 p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              {dictionary.landing.narratives}
            </h2>
            {/* Add more content using dictionary values */}
          </div>
          <div className="rounded-lg bg-yellow-100 p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              {dictionary.landing.freeBrowsing}
            </h2>
            {/* Add more content using dictionary values */}
          </div>
        </div>
      </div>
    </>
  );
}
