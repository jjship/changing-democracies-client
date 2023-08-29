import Link from "next/link";
import Image from "next/image";
import earshapedArrows from "../../public/arrows_ear_no_bg.svg";
import logoLight from "../../public/logo_light_no_bg.svg";
import fundedByEu from "../../public/EU_flag__funded_by.svg";
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
    <main className="m-auto min-h-screen max-w-[23.125rem]">
      <Section
        id="project"
        styling="text-black_bg bg-puprple_lightest_bg min-w-full"
      >
        <h1 className="hidden">Project</h1>
        <div className="flex flex-col items-center gap-[2.5em] pb-[1.125em] pt-[0.375em]">
          <div className="mx-[4.44em]  pb-[2.5em]">
            <Image src={earshapedArrows} alt="image with earshaped arrows" />
          </div>
          <div className="mx-[6.8em]">
            <Image src={logoLight} alt="changing democracies logo" />
          </div>
          <Paragraph text={projectParagraphSm} />
          <div className="mx-[6.8em]">
            <Image src={fundedByEu} alt="funded by EU logo" />
          </div>
        </div>
      </Section>
      <Section
        id="team"
        styling="bg-black_bg text-puprple_lightest_bg px-5 pb-[2.5em]"
      >
        <Title text="Team" />
        <div className="flex flex-col items-center gap-[1.125em]">
          <Paragraph text={teamParagraphSm} />
          <TeamsList teams={teamList} />
        </div>
      </Section>
      <Section id="events" styling="bg-puprple_lightest_bg text-black_bg pl-5">
        <Title text="Events" />
        <EventsList events={futureEvents} isFuture={true} />
        <EventsList events={pastEvents} isFuture={false} />
      </Section>
      <section id="events">events section</section>
      <section id="contact">contact section</section>
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
        {events.map((event) => {
          return <EventEntryComponent event={event} isFuture={isFuture} />;
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
          return <p>participants: {event.participants}</p>;
        }

        return <p className={style}>{event[key as keyof typeof event]}</p>;
      })}
    </div>
  );
}

function Section(props: {
  id: string;
  styling: string;
  children: React.ReactNode;
}) {
  return (
    <section id={props.id}>
      <div className={`${props.styling}`}>{props.children}</div>
    </section>
  );
}

function Paragraph(props: { text: string | JSX.Element }) {
  return <p className="leading-5 ">{props.text}</p>;
}

function Title(props: { text: string }) {
  return (
    <div className="w-full pb-5  pl-[1.5em] pt-[1.875em]">
      <h1 className="py-[0.3em] text-[2.25rem] font-semibold leading-9 tracking-[-0.064rem]">
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
