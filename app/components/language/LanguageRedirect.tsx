"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales, CDLanguages } from "@/utils/i18n/languages";
import { LanguageService } from "@/utils/i18n/languageService";

export function LanguageRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    // Root path always needs redirect
    if (pathname === "/") {
      const { language: preferredLanguage } =
        LanguageService.getCurrentLanguage();
      router.replace(`/${preferredLanguage}`);
      return;
    }

    // For other paths, check if they have a valid language prefix
    const pathSegments = pathname.split("/").filter(Boolean);

    // If first segment is not a valid language code, prefix with language
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0].toLowerCase();

      // Check if firstSegment is a valid language code
      const isValidLanguageCode = locales.includes(firstSegment as CDLanguages);

      // If the first segment is already a valid language code, no redirect needed
      if (isValidLanguageCode) {
        return;
      }

      // Otherwise, add language prefix
      const { language: preferredLanguage } =
        LanguageService.getCurrentLanguage();
      router.replace(`/${preferredLanguage}${pathname}`);
    }
  }, [pathname, router]);

  return children;
}
