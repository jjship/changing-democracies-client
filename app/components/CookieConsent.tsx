"use client";

import Script from "next/script";
import { CDLanguages } from "@/utils/i18n/languages";

export default function CookieConsent({ lang }: { lang: CDLanguages }) {
  return (
    <Script
      id="CookieConsent"
      src="https://policy.app.cookieinformation.com/uc.js"
      data-culture={lang.toUpperCase()}
      data-gcm-version="2.0"
      type="text/javascript"
      strategy="afterInteractive"
    />
  );
}
