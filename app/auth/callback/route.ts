import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { baseUrl } from "@/lib/constants";
import { VerifyOtpParams } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (token_hash && type) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.verifyOtp({ token_hash, type } as VerifyOtpParams);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    `${baseUrl}/password-reset` || "/password-reset",
  );
}
