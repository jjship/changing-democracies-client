"use server";

import { createClient } from "@/supabase/clients/server";
import { authenticate, logout } from "@/auth/actions";
import { EventDbEntry } from "@/types/database";
import {
  EventFormFields,
  FormEvent,
} from "@/components/admin/events/EventFormFields";
import { getEvent } from "@/components/admin/actions";
import { destructiveButton } from "@/components/admin/classNames";

export default async function Event({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const user = await authenticate(supabase);

  const formEvent = await getFormEvent({ eventId: +id });

  return (
    <>
      <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
        <div className="flex items-center justify-end gap-4 p-5">
          logged in as {user.email}
          <form action={logout}>
            <button className={`${destructiveButton} mb-2 rounded px-4 py-2`}>
              Log Out
            </button>
          </form>
        </div>
        <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
          {formEvent ? (
            <EventFormFields defaultValues={formEvent} userId={user.id} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

async function getFormEvent({
  eventId,
}: {
  eventId: number;
}): Promise<FormEvent> {
  const { data: dbEvent } = await getEvent(eventId);

  if (!dbEvent) {
    // add new event with the given id
    return parseDbEvent({ dbEvent: { ...emptyDbEvent, id: eventId } });
  }

  return parseDbEvent({ dbEvent: dbEvent[0] });
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
