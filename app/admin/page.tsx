"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/clients/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { UserContext } from "../components/admin/UserContext";
import EventsAdmin from "@/components/admin/events/EventsAdmin";
import VideosAdmin from "../components/admin/videos/VideosAdmin";

export const dynamic = "force-dynamic";

const supabase = createClient();

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [noUser, setNoUser] = useState(false); // TODO refactor to use user

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

  if (noUser) {
    // TODO refactor to use user
    <p>redirecting...</p>;
    redirect("/login");
  }

  return (
    <>
      {user && (
        <div className="flex min-h-screen flex-col bg-puprple_lightest_bg ">
          <div className="flex items-center justify-end gap-4 p-5">
            logged in as {user.email}
            <form action="/auth/sign-out" method="post">
              <button className="bg-red mb-2 rounded bg-red_mains px-4 py-2 text-white">
                Log Out
              </button>
            </form>
          </div>
          <UserContext.Provider value={{ user, setUser, noUser, setNoUser }}>
            <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
              <EventsAdmin />
              {/* <VideosAdmin /> */}
            </div>
          </UserContext.Provider>
        </div>
      )}
      {noUser && <p>loading...</p>}
    </>
  );
}
