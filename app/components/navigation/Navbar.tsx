"use client";
import Link from "next/link";
import Image from "next/image";
import languageArrow from "@/public/language_arrow.svg";
import { useNavContext } from "./Navigation";

export default function Navbar() {
  const { fontColor } = useNavContext();

  return (
    <section id="navbar">
      <h1 className="hidden">Navbar</h1>
      <div
        className={`z-50 p-5 font-bold text-${fontColor} md:flex md:flex-row md:items-end md:gap-10 md:px-10 md:text-xl`}
      >
        <Link href="/free-browsing" className="hidden md:block">
          Free Browsing
        </Link>
        <Link href="/#project" className="hidden md:block">
          Project
        </Link>
        <Link href="/#team" className="hidden md:block">
          Team
        </Link>
        <Link href="/#events" className="hidden md:block">
          Events
        </Link>
        <Link href="/#contact" className="hidden md:block">
          Contact
        </Link>
        {/* hidden until we get language versions */}
        <div className="hidden">
          <p>
            Language
            <Image
              src={languageArrow}
              alt="arrow icon opening languages menu"
              className="ml-[.313em] inline-block"
            />
          </p>
        </div>
      </div>
    </section>
  );
}
