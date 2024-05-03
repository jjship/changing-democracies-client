"use client";

import { useState, useEffect } from "react";
import { Database, EventDbEntry } from "@/types/database";
import { EventsContext } from "@/components/admin/events/EventsContext";
import { EventsTable } from "@/components/admin/events/EventsTable";
import { createClient } from "@/supabase/clients/client";
import { useUserContext } from "@/components/admin/UserContext";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const supabase = createClient();

export default function EventsAdmin() {
  const { user } = useUserContext();

  const [events, setEvents] = useState<EventDbEntry[] | null>(null);
  const [openEvents, setOpenEvents] = useState<boolean>(false);

  function toggleEvents() {
    setOpenEvents(!openEvents);
  }

  useEffect(() => {
    const getEvents = async () => {
      const { data, error } = await supabase.from("events").select();

      if (data) {
        setEvents(data);
      }
    };

    if (user) {
      getEvents();
    }
  }, [user]);

  function handleDelete(eventId: number) {
    // Find the event that was deleted
    const eventToDelete = events?.find((event) => event.id === eventId) || null;

    // Optimistically update the UI by filtering out the deleted event
    setEvents(
      (prevEvents) =>
        prevEvents?.filter((event) => event.id !== eventId) || null,
    );

    // Send the delete request to the backend
    supabase
      .from("events")
      .delete()
      .eq("id", eventId)
      .then(({ error }) => {
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
