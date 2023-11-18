import Link from "next/link";
import Messages from "./messages";
import PasswordResetForm from "../components/PasswordResetForm";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-puprple_lightest_bg p-5">
      <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md bg-yellow_secondary px-4 py-2 text-sm text-foreground no-underline hover:bg-red_mains"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div>
        <Messages />
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-black_bg"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="mb-6 rounded-md border bg-white px-4 py-2"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="mb-6 rounded-md border bg-white px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="text-md mb-6 rounded bg-yellow_secondary px-4 py-2 text-black_bg hover:bg-green_accent">
            Log In
          </button>
        </form>

        <PasswordResetForm />
      </div>
    </div>
  );
}
