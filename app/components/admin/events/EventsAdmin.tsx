"use client";

import { useState, useEffect } from "react";

import { EventDbEntry } from "@/types/database";
import { Button } from "@/components/ui/button";
import { EventsContext } from "../events/EventsContext";
import { EventsTable } from "../events/EventsTable";
// import { useUserContext } from "@/components/admin/UserContext";
import { deleteEvent, getEvents } from "../actions";

export const dynamic = "force-dynamic";

export default function EventsAdmin() {
  const [events, setEvents] = useState<EventDbEntry[] | null>(null);
  const [openEvents, setOpenEvents] = useState<boolean>(false);

  function toggleEvents() {
    setOpenEvents(!openEvents);
  }

  useEffect(() => {
    const updateEvents = async () => {
      const data = await getEvents();

      if (data) {
        setEvents(data);
      }
    };

    updateEvents();
  }, []);

  function handleDelete(eventId: number) {
    // Find the event that was deleted
    const eventToDelete = events?.find((event) => event.id === eventId) || null;

    // Optimistically update the UI by filtering out the deleted event
    setEvents(
      (prevEvents) =>
        prevEvents?.filter((event) => event.id !== eventId) || null,
    );

    // Send the delete request to the backend
    deleteEvent(eventId).then((error) => {
      if (error) {
        console.error("Failed to delete event:", error);

        // Revert the UI update (add the event back)
        // TODO You might also want to notify the user about the failure
        if (eventToDelete) {
          setEvents((prevEvents) => [...(prevEvents || []), eventToDelete]);
        }
      }
    });
  }

  return (
    <>
      <Button onClick={toggleEvents} size="sm">
        {openEvents ? "Close events table" : "Edit events"}
      </Button>
      <EventsContext.Provider
        value={{ onDelete: handleDelete, events, setEvents }}
      >
        {openEvents ? events ? <EventsTable /> : <p>loading...</p> : null}
      </EventsContext.Provider>
    </>
  );
}
