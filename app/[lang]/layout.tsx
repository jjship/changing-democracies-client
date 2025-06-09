import "@/app/globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
import { CDLanguages, locales } from "@/utils/i18n/languages";
import CookieConsent from "@/components/CookieConsent";
const archivo = Archivo({ subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Changing Democracies",
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
        <body className={`${archivo.className} bg-black_bg antialiased`}>
          {children}
        </body>
      </html>
      <CookieConsent lang={lang} />
    </>
  );
}
