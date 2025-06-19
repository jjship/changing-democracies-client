import { CDLanguages, locales } from "./languages";
import { cookies } from "next/headers";

/**
 * Server-side utility for getting language from cookies
 * Only use this in Server Components or API routes
 */
export function getServerLanguage(): CDLanguages | null {
  try {
    const cookieStore = cookies();
    const cookieValue = cookieStore.get("NEXT_LOCALE")?.value;

    if (cookieValue) {
      const normalized = cookieValue.toLowerCase() as CDLanguages;
      return locales.includes(normalized) ? normalized : null;
    }
  } catch (error) {
    // Cookie store might not be available in all server contexts
    console.warn("Could not access cookies in server context:", error);
  }

  return null;
}

/**
 * Get language from request headers (for API routes)
 */
export function getLanguageFromHeaders(headers: Headers): CDLanguages | null {
  try {
    const cookieHeader = headers.get("cookie");
    if (cookieHeader) {
      const nextLocaleMatch = cookieHeader.match(/NEXT_LOCALE=([^;]+)/);
      if (nextLocaleMatch) {
        const cookieValue = nextLocaleMatch[1];
        const normalized = cookieValue.toLowerCase() as CDLanguages;
        return locales.includes(normalized) ? normalized : null;
      }
    }
  } catch (error) {
    console.warn("Could not parse language from headers:", error);
  }

  return null;
}
