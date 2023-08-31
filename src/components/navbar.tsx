import Link from "next/link";

export default function Navbar() {
  return (
    <section className="dt:px-10 sticky top-0 z-40 flex flex-row justify-between  bg-puprple_lightest_bg p-5 text-black_bg">
      <h1 className="hidden">Navbar</h1>
      <div className="dt:flex dt:w-full dt:flex-col dt:items-end dt:text-xl dt:font-bold">
        <div className=" dt:flex dt:flex-row dt:items-end dt:gap-10">
          <div className="dt:block hidden">Project</div>
          <div className="dt:block hidden">Team</div>
          <div className="dt:block hidden">Events</div>
          <div className="dt:block hidden">Contact</div>
          <div>
            <p>
              Language
              <svg
                className="ml-[.313em] inline-block "
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
              >
                <path
                  d="M12.1014 1.31863L11.9244 1.15067L11.7522 1.32362L7.01532 6.08154L2.2077 1.42934L2.02945 1.25686L1.85557 1.43374L0.821719 2.48542L0.644766 2.66542L0.826463 2.84063L6.88185 8.67996L7.05915 8.85094L7.23275 8.67619L13.1774 2.69192L13.3576 2.51043L13.1721 2.33436L12.1014 1.31863Z"
                  fill="#191818"
                  stroke="#191818"
                  stroke-width="0.5"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
      <svg
        className="dt:hidden"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
      >
        <line
          y1="22.168"
          x2="28"
          y2="22.168"
          stroke="#191818"
          stroke-width="3"
        />
        <line y1="1.5" x2="28" y2="1.5" stroke="#191818" stroke-width="3" />
        <line
          y1="11.834"
          x2="28"
          y2="11.834"
          stroke="#191818"
          stroke-width="3"
        />
      </svg>
    </section>
  );
}

function Navigation() {
  return (
    <nav className="items-left flex flex-col justify-between">
      <Link href="#project">Project</Link>
      <Link href="#team">Team</Link>
      <Link href="#events">Events</Link>
      <Link href="#contact">Contact</Link>
    </nav>
  );
}
