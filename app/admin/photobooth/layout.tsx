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
    <main className={`bg-turquoise h-screen antialiased`}>{children}</main>
  );
}
