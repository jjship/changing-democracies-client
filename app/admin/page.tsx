import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex  items-center gap-4">
      Logged in as {user.email}!
      <form action="/auth/sign-out" method="post">
        <button className="mb-2 rounded bg-red-700 px-4 py-2 text-white">
          Log Out
        </button>
      </form>
    </div>
  ) : (
    redirect("/login")
  );
}
