import { LangParam } from "@/types/langParam";
import { getDictionary } from "./dictionaries";
import { TranslationProvider } from "./context/TranslationContext";
import LandingPage from "@/components/landing/LandingPage";
import { Section } from "@/components/Section";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";

export default async function ({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang);

  return (
    <TranslationProvider dictionary={dictionary}>
      <NavigationContainer bgColor="yellow_secondary" fontColor="black_bg" />
      <Section
        id="project"
        theme="light"
        xPadding="px-4 md:px-10"
        yPadding="pb-5 md:pb-14 xl:pb-20"
      >
        <LandingPage />
      </Section>
    </TranslationProvider>
  );
}

// return (
//   <>
//     <Navigation bgColor="purple_lightest_bg" fontColor="black_bg" />
//     <Section
//       id="project"
//       theme="light"
//       xPadding="px-4 md:px-10 "
//       yPadding="pb-5 md:pb-14 xl:pb-20"
//     >
//       <Project />
//     </Section>
//     <Section id="team" theme="dark">
//       <Team />
//     </Section>
//     <Section id="events" theme="light" xPadding="pl-5 md:px-10">
//       <Events />
//     </Section>
//     <Section id="contact" theme="dark">
//       <Contact />
//     </Section>
//     <Section id="educational-resources" theme="light">
//       <EducationalResources />
//     </Section>
//   </>
// );
