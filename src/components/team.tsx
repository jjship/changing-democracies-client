import Link from "next/link";
import Image from "next/image";
import { teamList, teamParagraphSm } from "../app/content";
import Title from "./Title";
import knotOfArrows from "../../public/arrows_knot_no_bg.svg";
import logoLight from "../../public/logo_light_no_bg.svg";

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
      <div className="hidden w-full justify-between text-[1.375rem] dt:grid dt:grid-cols-2 dt:gap-10">
        <div className="min-h-max">
          <div className="sticky mt-20">
            <Image src={knotOfArrows} alt="image of knotted arrows" />
            <Image
              src={logoLight}
              alt="changing democracies logo"
              className="mt-[10.3rem]"
            />
          </div>
        </div>
        <div className="">
          <p className="mb-20 mr-14 leading-6">{teamParagraphSm}</p>
          <TeamsList teams={teamList} />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-[1.125em] dt:hidden">
        <p className="leading-5">{teamParagraphSm}</p>
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
        <p className="leading-5 dt:text-[1.375rem] dt:leading-[1.875rem]">
          {props.organisation}
        </p>
      </Link>
      <p className="text-[.875rem] leading-[1.125rem] text-yellow_secondary dt:text-[1.188rem] dt:leading-[1.563rem] ">
        {props.teamMembers.join(", ")}
      </p>

      <p className="max-w-fit bg-red_mains px-[.313em] leading-5 text-black_bg dt:px-2 dt:text-[1.375rem] dt:leading-[1.875rem]">
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
