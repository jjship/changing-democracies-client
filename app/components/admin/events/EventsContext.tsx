import { createContext, useContext } from "react";
import { EventDbEntry } from "@/types/database";

type EventsContextType = {
  onDelete?: (eventId: number) => void;
  events: EventDbEntry[] | null;
  setEvents: (events: EventDbEntry[] | null) => void;
};

const EventsContext = createContext<EventsContextType | null>(null);

export function EventsContextProvider({
  children,
  events,
  setEvents,
  onDelete,
}: {
  children: React.ReactNode;
  events: EventDbEntry[] | null;
  setEvents: (events: EventDbEntry[] | null) => void;
  onDelete?: (eventId: number) => void;
}) {
  return (
    <EventsContext.Provider
      value={{
        onDelete,
        events,
        setEvents,
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
