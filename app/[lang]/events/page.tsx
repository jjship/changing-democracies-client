import Image from "next/image";
import logoDark from "@/public/EN_Co-fundedbytheEU_RGB_BLACK.svg";
import { LangParam } from "@/types/langParam";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "@/translation/TranslationContext";
import { Section } from "@/components/Section";
import Events from "@/components/Events";
import { createClient } from "@/supabase/clients/server";
import { parseDbEventEntries } from "../../content/event";

export default async function Home({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang);
  const supabase = createClient();

  const { data: events, error } = await supabase.from("events").select("*");
  const { futureEvents, pastEvents } = parseDbEventEntries({ events });

  return (
    <TranslationProvider dictionary={dictionary}>
      <Suspense>
        <div className="flex min-h-screen flex-col justify-between bg-purple_lightest_bg ">
          <NavigationContainer
            fontColor="black_bg"
            bgColor="purple_lightest_bg"
          />
          <Section theme="light" id="events">
            <Events futureEvents={futureEvents} pastEvents={pastEvents} />
          </Section>
          <Image
            src={logoDark}
            alt="Co-funded by the EU logo"
            className="m-3 h-auto w-[30%] md:mx-10 md:w-[15%]"
          />
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
