import { createContext, useContext, useState } from "react";
import { EventDbEntry } from "../types/database";

type DeleteCallback = (eventId: number) => void;

type EventsContextType = {
  onDelete?: DeleteCallback;
  events: EventDbEntry[] | null;
  setEvents: (events: EventDbEntry[] | null) => void;
  // currentEventId: number | null;
  // setCurrentEventId: (eventId: number | null) => void;
};

export const EventsContext = createContext<EventsContextType | null>(null);

export function EventsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<EventDbEntry[] | null>(null);
  // const [currentEventId, setCurrentEventId] = useState<number | null>(null);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        // currentEventId,
        // setCurrentEventId,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error(
      "useEventsContext must be used within a EventsContextProvider",
    );
  }

  return context;
}
