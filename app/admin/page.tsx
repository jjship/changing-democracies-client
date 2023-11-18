"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Database, EventDbEntry } from "../../types/database";
import { EventsTable } from "../components/EventsTable";
import { useEffect, useState } from "react";
import { EventsContext } from "../components/EventsContext";

export const dynamic = "force-dynamic";

const supabase = createClientComponentClient<Database>();

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [noUser, setNoUser] = useState(false); // TODO refactor to use user
  const [events, setEvents] = useState<EventDbEntry[] | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      }
      return user ? setUser(user) : setNoUser(true);
    };

    getUser();
  }, []);

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

  if (noUser) {
    // TODO refactor to use user
    <p>redirecting...</p>;
    redirect("/login");
  }

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
    <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
      <div className="flex items-center justify-end gap-4 p-5">
        {user && `logged in as ${user.email}`}
        <form action="/auth/sign-out" method="post">
          <button className="bg-red mb-2 rounded bg-red_mains px-4 py-2 text-white">
            Log Out
          </button>
        </form>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
        <EventsContext.Provider
          value={{ onDelete: handleDelete, events, setEvents }}
        >
          {events ? <EventsTable /> : <p>loading...</p>}
        </EventsContext.Provider>
      </div>
    </div>
  );
}
