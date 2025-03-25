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
    }, 200);

    const hideTimer = setTimeout(() => {
      setIsAboutVisible(false);
    }, 93000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    }; // Cleanup the timers on component unmount
  }, []);

  return (
    <div
      className={`relative flex h-full flex-col justify-center bg-pink_scroll/70 pb-32 pl-8 pr-24 pt-16 font-bold transition-opacity duration-1000 ${
        isAboutVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="mb-8 text-2xl text-purple_mains md:text-4xl lg:text-4xl">
        {slide3AdditionalContent.about_the_project}
      </h2>
      <div className="grid grid-cols-2 gap-8 l:gap-16">
        <div className="flex flex-col space-y-4 text-xs xl:space-y-6 xl:text-2xl l:text-base">
          <p>
            {`"${slide3AdditionalContent.democracy_failed_us}.", 
            "${slide3AdditionalContent.democracy_is_in_crisis}.",`}{" "}
            <br />
            {`"${slide3AdditionalContent.we_need_to_defend_democracy}.",`}{" "}
            <br />
            {`"${slide3AdditionalContent.authoritarianism_is_on_the_rise}.",`}{" "}
            <br />
            {`"${slide3AdditionalContent.democratic_institutions_are_in_decline}."`}
          </p>

          <p>
            {slide3AdditionalContent.you_know_these_phrases}. <br />
            {slide3AdditionalContent.you_ve_heard_them_over_and_over}.
          </p>

          <p>
            {slide3AdditionalContent.but_what_lies_beyond_this_gloomy_picture}?{" "}
            <br />
            {slide3AdditionalContent.there_are_people_around_us_who_know}.
          </p>

          <p>
            {
              slide3AdditionalContent.they_have_experienced_firsthand_what_life_is_like_under_different_political_systems
            }
            . <br />
            {
              slide3AdditionalContent.they_have_lived_through_times_of_transition
            }
            .
          </p>
        </div>
        <div className="flex flex-col space-y-4 text-xs xl:space-y-6 xl:text-2xl l:text-base">
          <p>
            {slide3AdditionalContent.so_we_asked_them}:
            <br />
            {slide3AdditionalContent.is_democracy_worth_the_trouble}?{" "}
          </p>

          <p>
            {
              slide3AdditionalContent.they_shared_their_fears_their_hopes_their_disillusions
            }
            ... {slide3AdditionalContent.their_stories}.
          </p>

          <p>
            {
              slide3AdditionalContent.changing_democracies_brings_you_their_wisdom
            }
            .{" "}
          </p>
          <p>{slide3AdditionalContent.we_learnt}:</p>
          <ul className="list-outside list-disc pl-5">
            <li className="mb-1 pl-1">
              {
                slide3AdditionalContent.that_it_pays_to_move_beyond_historical_facts
              }
            </li>
            <li className="mb-1 pl-1">
              {slide3AdditionalContent.that_democracy_is_never_finished}.
            </li>
            <li className="mb-1 pl-1">
              {
                slide3AdditionalContent.that_engaging_with_its_challenges_together_is_the_only_way_forward
              }
              .
            </li>
          </ul>

          <p>
            {slide3AdditionalContent.dont_take_our_word_for_it_see_for_yourself}
            .
          </p>
        </div>
      </div>
    </div>
  );
};
