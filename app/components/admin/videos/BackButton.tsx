import { redirect } from "next/navigation";
import { Button } from "../../ui/button";

export function BackButton() {
  "use client";
  return (
    <Button
      className="p-5 hover:bg-red_mains hover:text-black_bg"
      onClick={() => redirect("/admin?videos=true")}
    >
      Back to list
    </Button>
  );
}
