import "@/app/globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Changing Democracies Admin",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
