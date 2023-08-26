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
} from "./content";

export default function Page() {
  return (
    <main className="min-h-screen max-w-[23.125rem] m-auto">
      <Section
        id="project"
        styling="text-black_bg bg-puprple_lightest_bg min-w-full"
      >
        <h1 className="hidden">Project</h1>
        <div className="flex flex-col items-center gap-[2.5em] pt-[0.375em] pb-[1.125em]">
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
        styling="bg-black_bg text-puprple_lightest_bg px-[1.25em] pb-[2.5em]"
      >
        <Title text="Team" />
        <div className="flex flex-col items-center gap-[1.125em]">
          <Paragraph text={teamParagraphSm} />
          <TeamsList teams={teamList} />
        </div>
      </Section>
      <section id="events">events section</section>
      <section id="contact">contact section</section>
    </main>
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
    <div className="w-full pl-[1.5em]  pt-[1.875em] pb-[1.25em]">
      <h1 className="text-[2.25rem] font-semibold leading-9 tracking-[-0.064rem] py-[0.3em]">
        {props.text}
      </h1>
    </div>
  );
}

function TeamsList(props: { teams: TeamEntry[] }) {
  return (
    <div className="flex flex-col items-left gap-[.938em]">
      {props.teams.map((team) => (
        <TeamEntryComponent key={team.organisation} {...team} />
      ))}
    </div>
  );
}

function TeamEntryComponent(props: TeamEntry) {
  return (
    <div>
      <Link className="leading-4" href={props.link}>
        {props.organisation}
      </Link>
      <p className="text-[.875rem] leading-[.875rem] text-yellow_secondary ">
        {props.teamMembers.join(", ")}
      </p>

      <p className="leading-[1.125em] px-[.313em] text-black_bg bg-red_mains max-w-fit">
        <svg
          className="inline-block align-[.125em] mr-[.313em] fill-black_bg"
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
    <nav className="flex flex-col items-left justify-between">
      <Link href="#project">Project</Link>
      <Link href="#team">Team</Link>
      <Link href="#events">Events</Link>
      <Link href="#contact">Contact</Link>
    </nav>
  );
}
