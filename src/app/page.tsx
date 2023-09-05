import Project from "../components/Project";
import Team from "../components/Team";
import Events from "../components/Events";
import Contact from "../components/Contact";
import Section from "../components/Section";
import Navigation from "../components/navigation/Navigation";

export default function Page() {
  return (
    <main>
      <Navigation />
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
