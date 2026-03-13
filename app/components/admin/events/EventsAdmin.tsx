"use client";

import { useState, useEffect } from "react";

import { EventDbEntry } from "@/types/database";
import { Button } from "@/components/ui/button";
import { EventsContextProvider } from "./EventsContext";
import EventsTable from "./EventsTable";
import { deleteEvent, getEvents } from "../actions";
import { navButton } from "../classNames";

export const dynamic = "force-dynamic";

export default function EventsAdmin({ open }: { open: boolean }) {
  const [events, setEvents] = useState<EventDbEntry[] | null>(null);
  const [openEvents, setOpenEvents] = useState<boolean>(open);

  function toggleEvents() {
    setOpenEvents(!openEvents);
  }

  useEffect(() => {
    const updateEvents = async () => {
      const { data } = await getEvents();

      if (data) {
        setEvents(data);
      }
    };

    updateEvents();
  }, []);

  function handleDelete(eventId: number) {
    const eventToDelete = events?.find((event) => event.id === eventId) || null;

    setEvents(
      (prevEvents) =>
        prevEvents?.filter((event) => event.id !== eventId) || null,
    );

    deleteEvent(eventId).then((error) => {
      if (error) {
        console.error("Failed to delete event:", error);

        if (eventToDelete) {
          setEvents((prevEvents) => [...(prevEvents || []), eventToDelete]);
        }
      }
    });
  }

  return (
    <>
      <Button onClick={toggleEvents} className={navButton} size="lg">
        {openEvents ? "Close Events Table" : "Edit Events"}
      </Button>
      <EventsContextProvider
        events={events}
        setEvents={setEvents}
        onDelete={handleDelete}
      >
        {openEvents ? events ? <EventsTable /> : <p>loading...</p> : null}
      </EventsContextProvider>
    </>
  );
}
