import { futureEvents, pastEvents } from "../app/content";
import Title from "./title";

export type EventEntry = {
  isPast: boolean;
  date: string;
  title: string;
  kind: string;
  location: string;
  link: string;
  participants?: number;
  wp3?: string;
};

export default function Events() {
  return (
    <>
      <Title text="Events" theme="light" />
      <EventsList events={futureEvents} isFuture={true} />
      <EventsList events={pastEvents} isFuture={false} />
    </>
  );
}

function EventsList(props: { isFuture: boolean; events: EventEntry[] }) {
  const { events, isFuture } = props;

  const bgColor = isFuture ? "text-yellow_secondary" : "text-black_bg";

  return (
    <div className="dt:mt-20 mt-5">
      <div className="dt:mb-10 mb-5">
        <p
          className={`${bgColor} dt:text-[1.375rem] dt:font-bold text-head_3_sm font-semibold leading-5`}
        >
          {isFuture ? "upcoming" : "past"}
        </p>
      </div>
      <div className="event-list dt:gap-x-40 dt:gap-y-20 dt:flex-wrap	flex gap-[.938em] overflow-x-auto">
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

function EventEntryComponent(props: { isFuture: boolean; event: EventEntry }) {
  const { event, isFuture } = props;

  const bgColor = isFuture
    ? "bg-yellow_secondary"
    : "bg-purple_lighter_additional";

  return (
    <div className={`dt:w-[18rem] relative min-w-[9rem]`}>
      <div
        className={`${bgColor} dt:w-[10.5rem] dt:h-[8.938rem] absolute left-0 top-0 z-10 h-[4.8rem] w-[5.5rem]`}
      ></div>
      <div className="dt:ml-[1.625rem] dt:mt-[1.2rem] relative z-20 ml-[.8rem] mt-[.3rem]">
        <EventInfo event={event} />
      </div>
    </div>
  );
}

function EventInfo(props: { event: EventEntry }) {
  const { event } = props;
  return (
    <div className="dt:text-[1.375rem] dt:leading-[1.5rem] leading-5">
      <p className="dt:text-[3.375rem] dt:font-thin dt:leading-[3.3rem] dt:h-[8rem] h-[4.7rem] text-[1.625rem] font-light leading-[1.625rem]">
        {event.title}
      </p>
      {Object.keys(event)
        .filter((key) => {
          return key !== "title";
        })
        .map((key) => {
          const style = key === "date" ? "font-bold" : "";

          if (key === "participants") {
            return <p key={key}>participants: {event.participants}</p>;
          }

          return (
            <p key={key} className={style}>
              {event[key as keyof typeof event]}
            </p>
          );
        })}
    </div>
  );
}
