import Link from "next/link";
import Image from "next/image";
import earshapedArrows from "../../public/arrows_ear_no_bg.svg";
import logoLight from "../../public/logo_light_no_bg.svg";
import fundedByEu from "../../public/EU_flag__funded_by.svg";
import roundPhoto from "../../public/photo in circle.png";
import {
  TeamEntry,
  projectParagraphSm,
  teamParagraphSm,
  teamList,
  EventEntry,
  futureEvents,
  pastEvents,
} from "./content";

export default function Page() {
  return (
    <main className="space-x-max m-auto min-h-screen max-w-[23.125rem]">
      <section className="sticky top-0 z-40 flex flex-row justify-between bg-puprple_lightest_bg p-5 text-black_bg">
        <h1 className="hidden">Navbar</h1>
        <div>
          <p className="font-bold">
            Language
            <svg
              className="ml-[.313em] inline-block "
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
            >
              <path
                d="M12.1014 1.31863L11.9244 1.15067L11.7522 1.32362L7.01532 6.08154L2.2077 1.42934L2.02945 1.25686L1.85557 1.43374L0.821719 2.48542L0.644766 2.66542L0.826463 2.84063L6.88185 8.67996L7.05915 8.85094L7.23275 8.67619L13.1774 2.69192L13.3576 2.51043L13.1721 2.33436L12.1014 1.31863Z"
                fill="#191818"
                stroke="#191818"
                stroke-width="0.5"
              />
            </svg>
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
        >
          <line
            y1="22.168"
            x2="28"
            y2="22.168"
            stroke="#191818"
            stroke-width="3"
          />
          <line y1="1.5" x2="28" y2="1.5" stroke="#191818" stroke-width="3" />
          <line
            y1="11.834"
            x2="28"
            y2="11.834"
            stroke="#191818"
            stroke-width="3"
          />
        </svg>
      </section>
      <section id="project" className=" bg-puprple_lightest_bg text-black_bg">
        <h1 className="hidden">Project</h1>
        <div className="flex flex-col items-center gap-[2.5em] pb-[1.125em] pt-[0.375em]">
          <div className="mx-[4.44em]  pb-[2.5em]">
            <Image src={earshapedArrows} alt="image with earshaped arrows" />
          </div>
          <div className="mx-[6.8em]">
            <Image src={logoLight} alt="changing democracies logo" />
          </div>
          <p className="leading-5">{projectParagraphSm}</p>
          <div className="mx-[6.8em]">
            <Image src={fundedByEu} alt="funded by EU logo" />
          </div>
        </div>
      </section>
      <section
        id="team"
        className="bg-black_bg px-5 py-[2em] text-puprple_lightest_bg"
      >
        <Title text="Team" theme="dark" />
        <div className="mt-6 flex flex-col items-center gap-[1.125em]">
          <p className="leading-5">{teamParagraphSm}</p>
          <TeamsList teams={teamList} />
        </div>
      </section>
      <section
        id="events"
        className="bg-puprple_lightest_bg py-[2.5em] pl-5 text-black_bg"
      >
        <Title text="Events" theme="light" />
        <div className="mt-6">
          <EventsList events={futureEvents} isFuture={true} />
          <EventsList events={pastEvents} isFuture={false} />
        </div>
      </section>
      <section
        id="contact"
        className="bg-black_bg px-5 py-[2.5em] text-puprple_lightest_bg"
      >
        <Title text="Contact" theme="dark" />
        <div className="relative mt-6">
          <div className="absolute z-10 mr-[5.5rem] mt-[1rem]">
            <Image
              src={roundPhoto}
              alt="retro photo of a boy with flowers and a man on a motorbike"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative z-20 text-display_sm font-bold leading-[4.5rem] tracking-[-.03em] text-red_mains  mix-blend-screen">
            <p className="ml-[2.875rem]">Get in</p>
            <div className="mr-4 mt-5 text-right underline mix-blend-overlay">
              <Link href="mailto:touch@changingdemocracies.com">touch.</Link>
            </div>
          </div>
          <div className="flex w-full flex-col items-end">
            <div
              className="relative z-20 mt-10 max-w-min"
              style={{ background: "rgba(107, 219, 198, 0.80)" }}
            >
              <span className="mx-[.3rem] whitespace-nowrap text-right font-semibold leading-6 text-black_bg">
                touch@changing democracies.com
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6 mr-36 mt-[11.06rem]">
          <Image src={logoLight} alt="changing democracies logo" />
        </div>
      </section>
    </main>
  );
}

function EventsList(props: { isFuture: boolean; events: EventEntry[] }) {
  const { events, isFuture } = props;

  const bgColor = isFuture ? "text-yellow_secondary" : "text-black_bg";

  return (
    <div className="pb-5">
      <div className="mb-5">
        <p className={`${bgColor} text-head_3_sm font-semibold leading-5`}>
          {isFuture ? "upcoming" : "past"}
        </p>
      </div>
      <div className="event-list flex gap-[.938em] overflow-x-auto">
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
    <div className={`relative min-w-[9rem]`}>
      <div
        className={`${bgColor} absolute left-0 top-0 z-10 h-[4.8rem] w-[5.5rem]`}
      ></div>
      <div className="relative z-20 ml-[.8rem] mt-[.3rem]">
        <EventInfo event={event} />
      </div>
    </div>
  );
}

function EventInfo(props: { event: EventEntry }) {
  const { event } = props;
  return (
    <div className="leading-5">
      <p className="h-[4.7rem] text-[1.625rem] font-light leading-[1.625rem]">
        {event.title}
      </p>
      {Object.keys(event).map((key) => {
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

function Title(props: { text: string; theme: "light" | "dark" }) {
  const { theme } = props;
  const bgColor = theme === "light" ? "bg-puprple_lightest_bg" : "bg-black_bg";

  return (
    <div className={`${bgColor} sticky top-16 z-30 `}>
      <h1 className="py-[0.3em] pl-6 text-[2.25rem] font-semibold leading-9 tracking-[-0.064rem]">
        {props.text}
      </h1>
    </div>
  );
}

function TeamsList(props: { teams: TeamEntry[] }) {
  return (
    <div className="items-left flex flex-col gap-[.938em]">
      {props.teams.map((team) => (
        <TeamEntryComponent key={team.organisation} {...team} />
      ))}
    </div>
  );
}

function TeamEntryComponent(props: TeamEntry) {
  return (
    <div>
      <Link href={props.link}>
        <p className="leading-5">{props.organisation}</p>
      </Link>
      <p className="text-[.875rem] leading-[1.125rem] text-yellow_secondary ">
        {props.teamMembers.join(", ")}
      </p>

      <p className="max-w-fit bg-red_mains px-[.313em] leading-5 text-black_bg">
        <svg
          className="mr-[.313em] inline-block fill-black_bg align-[.125em]"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="6"
          viewBox="0 0 14 6"
          fill="none"
        >
          <title>arrow</title>
          <path d="M14 3L9 0.113249V5.88675L14 3ZM0 3.5H9.5V2.5H0V3.5Z" />
        </svg>
        {props.country}
      </p>
    </div>
  );
}

function NavBar() {
  return <div></div>;
}

function Navigation() {
  return (
    <nav className="items-left flex flex-col justify-between">
      <Link href="#project">Project</Link>
      <Link href="#team">Team</Link>
      <Link href="#events">Events</Link>
      <Link href="#contact">Contact</Link>
    </nav>
  );
}
