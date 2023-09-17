"use client";

import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/dist/client/components/redirect";
import { Database, EventDbEntry } from "../types/database";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import EventFormFields, { FormEvent } from "./EventFormFields";

// const emptyDbEvent: EventDbEntry = {
//   id: 0,
//   start_date: DateTime.utc().toISO() ?? "",
//   end_date: DateTime.utc().toISO() ?? "",
//   title: "",
//   type: "",
//   location: "",
//   participants: 0,
//   category: "",
//   link: "",
//   created_at: DateTime.utc().toISO() ?? "",
//   created_by: null, // TODO set current user id
// };

// const emptyFormEvent: FormEvent = parseDbEvent({
//   dbEvent: emptyDbEvent,
// });

// export function parseDbEvent({
//   dbEvent,
// }: {
//   dbEvent: EventDbEntry;
// }): FormEvent {
//   return {
//     id: dbEvent.id,
//     startDate: dbEvent.start_date ? new Date(dbEvent.start_date) : new Date(),
//     endDate: dbEvent.end_date ? new Date(dbEvent.end_date) : new Date(),
//     title: dbEvent.title ?? undefined,
//     type: dbEvent.type ?? undefined,
//     location: dbEvent.location ?? undefined,
//     participants: dbEvent.participants ?? undefined,
//     category: dbEvent.category ?? undefined,
//     link: dbEvent.link ?? undefined,
//   };
// }

// export function EventForm({
//   eventId, // user,
// }: {
//   eventId: EventDbEntry["id"] | null;
//   // user: User;
// }) {
//   const [formEvent, setFormEvent] = useState<FormEvent | null>(null);

//   const supabase = createClientComponentClient<Database>();

//   useEffect(() => {
//     const getEvent = async (eventId: EventDbEntry["id"]) => {
//       const { data } = await supabase.from("events").select().eq("id", eventId);

//       if (data) {
//         setFormEvent(parseDbEvent({ dbEvent: data[0] }));
//       }
//     };

//     if (eventId) {
//       getEvent(eventId);
//     }
//   }, [eventId, supabase]);

//   return !formEvent ? (
//     <p>Loading...</p>
//   ) : (
//     <EventFormFields defaultValues={formEvent} />
//   );
// }
