import "@/app/globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
import { locales } from "@/utils/i18n/languages";
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
  params: { lang: string };
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${archivo.className} bg-black_bg antialiased`}>
        {children}
      </body>
    </html>
  );
}
