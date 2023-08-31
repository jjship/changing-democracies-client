import Link from "next/link";
import { teamList } from "../app/content";
import Title from "./title";

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
      <div className="mt-5 flex flex-col items-center gap-[1.125em]">
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

const teamParagraphSm = (
  <>
    <b>Changing Democracies</b> involves 13 partners
    <br />
    from 10 European countries and is made
    <br />
    possible thanks to the funding of the European
    <br />
    Commission.
  </>
);
