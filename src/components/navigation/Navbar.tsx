"use client";
import Link from "next/link";
import Image from "next/image";
import languageArrow from "../../../public/language_arrow.svg";

export default function Navbar() {
  return (
    <section id="navbar">
      <h1 className="hidden">Navbar</h1>
      <div
        className={`z-50 p-5 font-bold text-black_bg xl:flex xl:flex-row xl:items-end xl:gap-10 xl:px-10 xl:text-xl`}
      >
        <Link href="#project" className="hidden xl:block">
          Project
        </Link>
        <Link href="#team" className="hidden xl:block">
          Team
        </Link>
        <Link href="#events" className="hidden xl:block">
          Events
        </Link>
        <Link href="#contact" className="hidden xl:block">
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
