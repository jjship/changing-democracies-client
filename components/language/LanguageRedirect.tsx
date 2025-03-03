"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getInitialLanguage } from "@/utils/i18n/languages";

export function LanguageRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we are at the root route or at a route without a language param
    if (pathname === "/" || !pathname.match(/^\/[a-z]{2}\//)) {
      const preferredLanguage = getInitialLanguage();

      // Construct the new path with the language param
      let newPath = `/${preferredLanguage}`;

      // If we're not at root, append the current path without the leading slash
      if (pathname !== "/") {
        newPath = `/${preferredLanguage}${pathname}`;
      }

      router.replace(newPath);
    }
  }, [pathname, router]);

  return children;
}
