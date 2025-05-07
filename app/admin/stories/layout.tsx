import "@/app/globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Changing Democracies",
};

export default function StoriesLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.className} bg-black_bg antialiased`}>
        {children}
      </body>
    </html>
  );
}
