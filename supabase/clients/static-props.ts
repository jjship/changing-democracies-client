import { createClient as createClientPrimitive } from "@supabase/supabase-js";
import { clientEnv } from "@/utils/env";

export function createClient() {
  const supabase = createClientPrimitive(
    clientEnv().NEXT_PUBLIC_SUPABASE_URL,
    clientEnv().NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return supabase;
}
