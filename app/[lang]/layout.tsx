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
          <StructuredData type="organization" lang={lang} />
          <StructuredData type="website" lang={lang} />
        </head>
        <body className={`${archivo.className} bg-black_bg antialiased`}>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-13VS8XS26Q"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-13VS8XS26Q');
            `}
          </Script>
          {children}
        </body>
      </html>
      <CookieConsent lang={lang} />
    </>
  );
}
