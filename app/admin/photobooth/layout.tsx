import "../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changing Democracies",
};

export default function BoothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`h-screen bg-turquoise font-black antialiased`}>
      {children}
    </main>
  );
}
