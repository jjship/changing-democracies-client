import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/supabase/middleware";
import { getBrowserLanguage } from "@/utils/i18n/languages";

export async function middleware(request: NextRequest) {
  // Admin routes: only handle Supabase session
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await updateSession(request);
  }

  // All other routes: handle language detection
  const response = NextResponse.next();
  const browserLang = getBrowserLanguage(
    request.headers.get("accept-language"),
  );
  response.headers.set("x-browser-language", browserLang);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /film (film routes)
     * - /# (hash routes)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*.(?:svg|png|jpg|jpeg|gif|webp)$|/film$|/#).*)/",
  ],
};
