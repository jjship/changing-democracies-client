import {
  createServerClient,
  type CookieOptions,
  serialize,
} from "@supabase/ssr";
import { type GetServerSidePropsContext } from "next";
import { clientEnv } from "@/utils/env";

export function createClient(context: GetServerSidePropsContext) {
  const supabase = createServerClient(
    clientEnv().NEXT_PUBLIC_SUPABASE_URL,
    clientEnv().NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return context.req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          context.res.appendHeader(
            "Set-Cookie",
            serialize(name, value, options),
          );
        },
        remove(name: string, options: CookieOptions) {
          context.res.appendHeader("Set-Cookie", serialize(name, "", options));
        },
      },
    },
  );

  return supabase;
}
