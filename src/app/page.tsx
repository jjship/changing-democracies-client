import Project from "../components/project";
import Team from "../components/team";
import Navbar from "../components/navbar";
import Events from "../components/events";
import Contact from "../components/contact";

export default function Page() {
  return (
    <main className="space-x-max m-auto max-w-[23.125rem]">
      <Navbar />
      <section id="project" className=" bg-puprple_lightest_bg text-black_bg">
        <Project />
      </section>
      <section
        id="team"
        className="bg-black_bg px-5 py-5 text-puprple_lightest_bg"
      >
        <Team />
      </section>
      <section
        id="events"
        className="bg-puprple_lightest_bg py-5 pl-5 text-black_bg"
      >
        <Events />
      </section>
      <section
        id="contact"
        className="bg-black_bg px-5 py-5 text-puprple_lightest_bg"
      >
        <Contact />
      </section>
    </main>
  );
}
