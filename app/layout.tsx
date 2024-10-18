import "./globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Changing Democracies",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.className} bg-black antialiased`}>
        {children}
      </body>
    </html>
  );
}
