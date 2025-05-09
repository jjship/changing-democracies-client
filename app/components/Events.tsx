"use client";

import { useTranslation } from "../[lang]/context/TranslationContext";
import { parseDbEventEntries, ParsedEventEntry } from "../content/event";
import Title from "./Title";
import { createClient } from "@/supabase/clients/server";

// refresh every 30 minutes
export const revalidate = 1800;

export default function Events({
  futureEvents,
  pastEvents,
}: {
  futureEvents: ParsedEventEntry[];
  pastEvents: ParsedEventEntry[];
}) {
  const { dictionary: dict } = useTranslation();

  return (
    <>
      <Title text={dict.navigation.events} theme="light" />
      {futureEvents.length ? (
        <EventsList events={futureEvents} isFuture={true} />
      ) : null}
      {pastEvents.length ? (
        <EventsList events={pastEvents} isFuture={false} />
      ) : null}
    </>
  );
}

function EventsList(props: { isFuture: boolean; events: ParsedEventEntry[] }) {
  const { events, isFuture } = props;

  const bgColor = isFuture ? "text-yellow_secondary" : "text-black_bg";

  return (
    <div className="mt-5 md:mt-20">
      <div className="mb-5 md:mb-10">
        <p
          className={`${bgColor} text-head_3_sm font-semibold leading-5 md:text-[1.375rem] md:font-bold`}
        >
          {isFuture ? "upcoming" : ""}
        </p>
      </div>
      <div className="flex gap-[.938em] overflow-x-auto md:gap-x-6 md:gap-y-20 xl:gap-x-40">
        {events.map((event, index) => {
          return (
            <EventEntryComponent
              key={index}
              event={event}
              isFuture={isFuture}
            />
          );
        })}
      </div>
    </div>
  );
}

function EventEntryComponent(props: {
  isFuture: boolean;
  event: ParsedEventEntry;
}) {
  const { event, isFuture } = props;

  const bgColor = isFuture
    ? "bg-yellow_secondary"
    : "bg-purple_lighter_additional";

  return (
    <div className={`relative min-w-[9rem] md:w-[18.5rem]`}>
      <div
        className={`${bgColor} absolute left-0 top-0 z-10 h-[4.8rem] w-[5.5rem] md:h-[8.938rem] md:w-[10.5rem]`}
      ></div>
      <div className="relative z-20 ml-[.8rem] mt-[.3rem] md:ml-[1.625rem] md:mt-[1.2rem]">
        <EventInfo event={event} />
      </div>
    </div>
  );
}

function EventInfo(props: { event: ParsedEventEntry }) {
  const { event } = props;
  const textOverflowStyle = "overflow-hidden break-words";
  return (
    <div className="overflow-clip leading-5 md:text-[1.375rem] md:leading-[2rem]">
      <p
        className={`h-[4.7rem] text-[1.625rem] font-light leading-[1.625rem] md:h-max md:max-h-40 md:min-h-[10rem] md:text-[3.375rem] md:font-thin md:leading-[3.3rem] ${textOverflowStyle}`}
      >
        {event.title}
      </p>

      {Object.keys(event)
        .filter((key) => {
          return key !== "title" && key !== "link";
        })
        .map((key) => {
          const boldStyle = key === "date" ? "font-bold" : "";

          if (key === "participants") {
            return event.participants ? (
              <p key={key}>participants: {event.participants}</p>
            ) : null;
          }

          return (
            <p
              key={key}
              className={`${boldStyle} ${textOverflowStyle} whitespace-nowrap`}
            >
              {event[key as keyof typeof event]}
            </p>
          );
        })}
    </div>
  );
}
