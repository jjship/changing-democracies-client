"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { navButton } from "../../components/admin/classNames";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center">
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className={navButton}
      >
        Try again
      </Button>
    </div>
  );
}
