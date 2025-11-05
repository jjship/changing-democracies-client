import "@/app/globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
import Script from "next/script";
import { CDLanguages, locales } from "@/utils/i18n/languages";
import CookieConsent from "@/components/CookieConsent";
import { StructuredData } from "../../components/StructuredData";
const archivo = Archivo({ subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Changing Democracies - Exploring Democratic Transitions in Europe",
  description:
    "Changing Democracies explores unknown stories about recent democratic transitions in Europe to grasp what's needed for democracy to fulfil its promises for everyone.",
  keywords:
    "democracy, Europe, democratic transitions, political science, research, education",
  authors: [{ name: "Changing Democracies" }],
  creator: "Changing Democracies",
  publisher: "Changing Democracies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.SITE_URL || "https://www.changingdemocracies.eu",
  ),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: CDLanguages };
}) {
  return (
    <>
      <html lang={lang} suppressHydrationWarning>
        <head>
          {/* Structured Data */}
          <StructuredData type="organization" lang={lang} />
          <StructuredData type="website" lang={lang} />
        </head>
        <body className={`${archivo.className} bg-black_bg antialiased`}>
          {/* Google Tag Manager (noscript) - Must be immediately after opening body tag */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-P6F8FHST"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          {/* Google Tag Manager - using afterInteractive for Next.js 14 App Router compatibility */}
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P6F8FHST');`}
          </Script>
          {/* End Google Tag Manager */}
          {children}
        </body>
      </html>
      <CookieConsent lang={lang} />
    </>
  );
}
