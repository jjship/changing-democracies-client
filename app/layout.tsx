import "@/app/globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Changing Democracies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivo.className} bg-black_bg antialiased`}>
        {children}
      </body>
    </html>
  );
}
