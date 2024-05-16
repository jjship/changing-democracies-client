import Section from "@/components/Section";
import Navigation from "@/components/navigation/Navigation";
import FreeBrowsing from "@/components/FreeBrowsing";

export default function FreeBrowsingPage() {
  return (
    <main>
      <Navigation />
      <Section id="free_browsing" theme="dark">
        <div className="h-m"></div>
        <FreeBrowsing />
      </Section>
    </main>
  );
}
