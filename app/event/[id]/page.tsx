"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, EventDbEntry } from "../../../types/database";
import { useEffect, useState } from "react";
import EventFormFields, {
  FormEvent,
} from "../../../components/EventFormFields";

export default function Event({ params: { id } }: { params: { id: string } }) {
  const [formEvent, setFormEvent] = useState<FormEvent | null>(null);
  const eventId = +id;

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getEvent = async (eventId: EventDbEntry["id"]) => {
      const { data } = await supabase.from("events").select().eq("id", eventId);

      if (!data) {
        return; // TODO handle error
      }

      if (!data.length) {
        // add new event with the given id
        setFormEvent(
          parseDbEvent({ dbEvent: { ...emptyDbEvent, id: eventId } }),
        );
        return;
      }

      setFormEvent(parseDbEvent({ dbEvent: data[0] }));
    };

    if (eventId) {
      getEvent(eventId);
    }
  }, [eventId, supabase]);

  return (
    <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
      {!formEvent ? (
        <p>Loading...</p>
      ) : (
        <EventFormFields defaultValues={formEvent} />
      )}
    </div>
  );
}

function parseDbEvent({ dbEvent }: { dbEvent: EventDbEntry }): FormEvent {
  return {
    id: dbEvent.id,
    startDate: dbEvent.start_date ? new Date(dbEvent.start_date) : new Date(),
    endDate: dbEvent.end_date ? new Date(dbEvent.end_date) : new Date(),
    title: dbEvent.title ?? "",
    type: dbEvent.type ?? "",
    location: dbEvent.location ?? "",
    participants: dbEvent.participants ?? 0,
    category: dbEvent.category ?? "",
    link: dbEvent.link ?? "",
    created_at: new Date(dbEvent.created_at) ?? new Date(),
    created_by: dbEvent.created_by ?? null,
    modified_at: dbEvent.modified_at ? new Date(dbEvent.modified_at) : null,
    modified_by: dbEvent.modified_by ?? null,
  };
}

const emptyDbEvent: EventDbEntry = {
  id: 0,
  start_date: new Date().toISOString() ?? null,
  end_date: new Date().toISOString() ?? null,
  title: null,
  type: null,
  location: null,
  participants: null,
  category: null,
  link: null,
  created_at: new Date().toISOString() || "",
  created_by: null,
  modified_at: null,
  modified_by: null,
};
