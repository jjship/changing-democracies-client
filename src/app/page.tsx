import Project from "../components/project";
import Team from "../components/team";
import Navbar from "../components/navbar";
import Events from "../components/events";
import Contact from "../components/contact";
import Section from "../components/section";

export default function Page() {
  return (
    <main className="dt:max-w-[90rem] m-auto max-w-[23.125rem]">
      <Navbar />
      <Section
        id="project"
        theme="light"
        xPadding="px-4 dt:px-10 "
        yPadding="pb-5 dt:pb-20"
      >
        <Project />
      </Section>
      <Section id="team" theme="dark">
        <Team />
      </Section>
      <Section id="events" theme="light" xPadding="pl-5 dt:px-10">
        <Events />
      </Section>
      <Section id="contact" theme="dark">
        <Contact />
      </Section>
    </main>
  );
}
