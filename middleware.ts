import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { updateSession } from "@/supabase/middleware";
import { locales, DEFAULT_CD_LANG } from "@/utils/i18n/languages";

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the preferred locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, DEFAULT_CD_LANG);
}

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.endsWith("sitemap.xml") ||
    request.nextUrl.pathname.endsWith("robots.txt")
  ) {
    return NextResponse.next();
  }

  // Admin routes: only handle Supabase session
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/password-reset")
  ) {
    return await updateSession(request);
  }

  const pathname = request.nextUrl.pathname;

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  // Check if the pathname already has a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale =
      cookieLocale && locales.includes(cookieLocale as any)
        ? cookieLocale
        : getLocale(request);

    const response = NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
        request.url,
      ),
    );

    // Set cookie to maintain consistency between server and client
    if (!cookieLocale) {
      response.cookies.set("NEXT_LOCALE", locale, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  }
  const locale = pathname.split("/")[1];
  if (
    locales.includes(locale as any) &&
    (!cookieLocale || cookieLocale !== locale)
  ) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return response;
  }

  return NextResponse.next();
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
