import { LangParam } from "@/types/langParam";
import { NavigationContainer } from "@/components/navigation/NavigationContainer";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { TranslationProvider } from "@/translation/TranslationContext";
import { Section } from "@/components/Section";
import Events from "@/components/Events";
import { createClient } from "@/supabase/clients/server";
import { parseDbEventEntries } from "../../content/event";
import PageFooter from "../../components/PageFooter";

// Enable ISR: regenerate page every hour (3600 seconds)
// This ensures pages are statically generated at build time for fast indexing
export const revalidate = 3600;

export default async function Home({ params: { lang } }: LangParam) {
  const dictionary = await getDictionary(lang);
  const supabase = createClient();

  const { data: events, error } = await supabase.from("events").select("*");

  // Handle Supabase errors gracefully
  if (error) {
    console.error("Error fetching events:", error);
    // Return empty arrays to prevent 5xx errors
    const { futureEvents, pastEvents } = parseDbEventEntries({ events: null });
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
            <PageFooter theme="light" />
          </div>
        </Suspense>
      </TranslationProvider>
    );
  }

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
          <PageFooter theme="light" />
        </div>
      </Suspense>
    </TranslationProvider>
  );
}
