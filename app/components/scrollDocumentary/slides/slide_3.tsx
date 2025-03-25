"use client";
import { useState, useEffect, FC } from "react";
import { useTranslation } from "../../../[lang]/context/TranslationContext";
import { Slide3AdditionalContent } from "../../../[lang]/dictionaries";

export const Slide3Content: FC = () => {
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const { dictionary: dict } = useTranslation();

  const slide3AdditionalContent = dict.scrollDocumentary.slides.slide_3
    .additionalContent as Slide3AdditionalContent;

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsAboutVisible(true);
    }, 62000);

    const hideTimer = setTimeout(() => {
      setIsAboutVisible(false);
    }, 179000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    }; // Cleanup the timers on component unmount
  }, []);

  return (
    <div
      className={`relative h-full  bg-pink_scroll/70 pl-8 pr-24 pt-2 font-bold  transition-opacity duration-1000 ${
        isAboutVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="mb-8  text-2xl text-purple_mains md:text-4xl lg:text-4xl">
        {slide3AdditionalContent.about_the_project}
      </h2>
      <div className="relative grid h-[80%] grid-cols-2 gap-8 l:gap-16 ">
        <div className="flex  flex-col justify-between xl:text-2xl l:text-lg low:text-xs">
          <p>
            {`"${slide3AdditionalContent.democracy_failed_us}", 
            "${slide3AdditionalContent.democracy_is_in_crisis}", 
            "${slide3AdditionalContent.we_need_to_defend_democracy}", 
            "${slide3AdditionalContent.authoritarianism_is_on_the_rise}", 
            "${slide3AdditionalContent.democratic_institutions_are_in_decline}"`}
          </p>

          <div className="flex-grow"></div>
          <p>
            {slide3AdditionalContent.you_know_these_phrases} <br />
            {slide3AdditionalContent.you_ve_heard_them_over_and_over}
          </p>
          <div className="flex-grow"></div>
          <p>
            {slide3AdditionalContent.but_what_lies_beyond_this_gloomy_picture}{" "}
            <br />
            {slide3AdditionalContent.there_are_people_around_us_who_know}
          </p>
          <div className="flex-grow"></div>
          <p>
            {
              slide3AdditionalContent.they_have_experienced_firsthand_what_life_is_like_under_different_political_systems
            }{" "}
            <br />
            {
              slide3AdditionalContent.they_have_lived_through_times_of_transition
            }
          </p>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
        </div>
        <div className="flex flex-col justify-between xl:text-2xl l:text-lg low:text-xs">
          <p>
            {slide3AdditionalContent.so_we_asked_them}
            <br />
            {slide3AdditionalContent.is_democracy_worth_the_trouble}{" "}
          </p>
          <div className="flex-grow"></div>
          <p>
            {
              slide3AdditionalContent.they_shared_their_fears_their_hopes_their_disillusions
            }
            <br />
            {slide3AdditionalContent.their_stories}
          </p>
          <div className="flex-grow"></div>
          <p>
            {
              slide3AdditionalContent.changing_democracies_brings_you_their_wisdom
            }
            . <br />
            {slide3AdditionalContent.we_learnt}:
          </p>
          <ul className="list- list-inside list-disc">
            <li>
              {
                slide3AdditionalContent.that_it_pays_to_move_beyond_historical_facts
              }
            </li>
            <li>That democracy is never finished.</li>
            <li>
              {
                slide3AdditionalContent.that_engaging_with_its_challenges_together_is_the_only_way_forward
              }
            </li>
          </ul>
          <div className="flex-grow"></div>
          <p>
            {slide3AdditionalContent.dont_take_our_word_for_it_see_for_yourself}
          </p>
          <div className="flex-grow"></div>
        </div>
      </div>
    </div>
  );
};
