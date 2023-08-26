import Link from "next/link";
import Image from "next/image";
import earshapedArrows from "../../public/arrows_ear_no_bg.svg";
import logoLight from "../../public/logo_light_no_bg.svg";
import fundedByEu from "../../public/EU_flag__funded_by.svg";
import { TeamEntry, projectParagraphSm } from "./content";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
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
      <div className={`${props.styling} max-w-[24em]`}>{props.children}</div>
    </section>
  );
}

function Paragraph(props: { text: string | JSX.Element }) {
  return (
    <div className="whitespace-pre-line leading-5">
      <p>{props.text}</p>
    </div>
  );
}

  )
}
