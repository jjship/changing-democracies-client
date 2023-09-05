import Project from "../components/project";
import Team from "../components/team";
import Events from "../components/events";
import Contact from "../components/contact";
import Section from "../components/section";
import Navigation from "../components/navigation/Navigation";

export default function Page() {
  return (
    <main className="m-auto max-w-[23.125rem] dt:max-w-[90rem]">
      <Navigation />
      <Section
        id="project"
        theme="light"
        xPadding="px-4 dt:px-10 "
        yPadding="pb-5 dt:pb-20"
        scrollMargin="6rem"
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
