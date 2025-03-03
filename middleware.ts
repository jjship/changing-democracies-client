import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { updateSession } from "@/supabase/middleware";
import { locales, DEFAULT_LANGUAGE_LABEL } from "@/utils/i18n/languages";

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the preferred locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, DEFAULT_LANGUAGE_LABEL);
}

export async function middleware(request: NextRequest) {
  // Admin routes: only handle Supabase session
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/login")
  ) {
    return await updateSession(request);
  }

  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
        request.url,
      ),
    );
  }
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
    "/((?!_next/static|_next/image|favicon.ico|images|.*.(?:svg|png|jpg|jpeg|gif|webp)$|/film$|/#).*)/",
  ],
};
