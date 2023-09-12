import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../types/database";
import { EventForm } from "../../components/EventForm";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from("events").select();
  }

  return user ? (
    <>
      <div className="flex flex-col  items-center gap-4">
        logged in as {user.email}
        <form action="/auth/sign-out" method="post">
          <button className="mb-2 rounded bg-red-700 px-4 py-2 text-white">
            Log Out
          </button>
        </form>
      </div>
      <div className="flex min-h-screen flex-col items-center bg-puprple_lightest_bg">
        <EventForm />
      </div>
    </>
  ) : (
    redirect("/login")
  );
}
