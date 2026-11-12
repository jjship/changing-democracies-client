"use server";

import "server-only";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/clients/server";
import { safeNext } from "@/utils/safe-next";
import { LoginValuesSchema } from "../components/admin/login/loginValues";
import { SupabaseClient } from "@supabase/supabase-js";

export { authenticate, login, logout };

async function login(data: { email: string; password: string }, next?: string) {
  // const { email, password } = LoginValuesSchema.parse({
  //   email: formdata.get("email"),
  //   password: formdata.get("password"),
  // });

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    if (Object.keys(error).includes("__isAuthError")) {
      return { message: "authorization error, check email and password" };
    }
    throw error;
  }

  redirect(safeNext(next));
}

async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

async function authenticate(client: SupabaseClient, next?: string) {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    console.error("Authentication error:", { error, user });

    const target = safeNext(next, "");
    redirect(target ? `/login?next=${encodeURIComponent(target)}` : "/login");
  }

  return user;
}
