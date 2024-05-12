"use server";

import "server-only";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/clients/server";
import { LoginValuesSchema } from "../components/admin/login/loginValues";
import { SupabaseClient } from "@supabase/supabase-js";

export { authenticate, login, logout };

async function login(data: { email: string; password: string }, next?: string) {
  // const { email, password } = LoginValuesSchema.parse({
  //   email: formdata.get("email"),
  //   password: formdata.get("password"),
  // });

  const supabase = createClient();

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

  redirect(next ?? "/admin");
}

async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

async function authenticate(client: SupabaseClient, next?: string) {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    if (error?.message === "Auth session missing!") {
      redirect(`/login${next ? `?next=${next}` : ""}`);
    }
    throw new Error("Failed to fetch user data");
  }

  return user;
}
