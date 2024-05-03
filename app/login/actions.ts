"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/clients/server";

export async function login(_prevState: any, formdata: FormData) {
  const supabase = createClient();

  const data = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  // TODO JAC sanitize?

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (Object.keys(error).includes("__isAuthError")) {
      return { message: "authorization error, check email and password" };
    }
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
