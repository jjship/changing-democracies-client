"use client";
import Link from "next/link";
import Image from "next/image";
import languageArrow from "../../../public/language_arrow.svg";

export default function Navbar() {
  return (
    <section id="navbar">
      <h1 className="hidden">Navbar</h1>
      <div
        className={`z-50 p-5 font-bold text-black_bg dt:flex dt:flex-row dt:items-end dt:gap-10 dt:px-10 dt:text-xl`}
      >
        <Link href="#project" className="hidden dt:block">
          Project
        </Link>
        <Link href="#team" className="hidden dt:block">
          Team
        </Link>
        <Link href="#events" className="hidden dt:block">
          Events
        </Link>
        <Link href="#contact" className="hidden dt:block">
          Contact
        </Link>
        <div>
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
