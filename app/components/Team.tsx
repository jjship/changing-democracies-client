import Link from "next/link";
import Image from "next/image";
import { teamList, teamParagraphSm } from "../content/team";
import Title from "./Title";
import knotOfArrows from "@/public/arrows_knot_no_bg.svg";
import logoLight from "@/public/logo_light_no_bg.svg";

export type TeamEntry = {
  organisation: string;
  link: string;
  teamMembers: string[];
  country: string;
};

export default function Team() {
  return (
    <>
      <Title text="Team" theme="dark" />
      <div className="hidden w-full text-[1.375rem] md:grid md:grid-cols-custom md:gap-10 xl:grid-cols-2">
        <div className="relative min-h-max">
          <div className="sticky top-28 mt-20">
            <Image src={knotOfArrows} alt="image of knotted arrows" />
            <Image
              src={logoLight}
              alt="changing democracies logo"
              className="mt-[10.3rem] md:max-w-[12rem]"
            />
          </div>
        </div>
        <div className="md:w-full">
          <p className="mb-20 mr-14 leading-6 md:mr-0">{teamParagraphSm}</p>
          <TeamsList teams={teamList} />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-[1.125em] md:hidden">
        <p className="leading-5 md:text-2xl">{teamParagraphSm}</p>
        <TeamsList teams={teamList} />
      </div>
    </>
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
    <div className="">
      <Link href={props.link}>
        <p className="leading-5 md:text-[1.375rem] md:leading-[1.875rem]">
          {props.organisation}
        </p>
      </Link>
      <p className="text-[.875rem] leading-[1.125rem] text-yellow_secondary md:text-[1.188rem] md:leading-[1.563rem] ">
        {props.teamMembers.join(", ")}
      </p>

      <p className="max-w-fit bg-red_mains px-[.313em] leading-5 text-black_bg md:px-2 md:text-[1.375rem] md:leading-[1.875rem]">
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
