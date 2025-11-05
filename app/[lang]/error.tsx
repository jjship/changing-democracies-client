"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error);
  }, [error]);

  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black_bg p-24 text-white">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-gray-400">{error.message}</p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="rounded bg-yellow_secondary px-4 py-2 text-black_bg hover:bg-yellow_secondary/80"
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded border border-white px-4 py-2 hover:bg-white/10"
          >
            Go to homepage
          </button>
        </div>
      </div>
    </main>
  );
}
