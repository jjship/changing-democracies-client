import { redirect } from "next/navigation";

export default function PostersPage() {
  redirect("/admin/photobooth");

  return null;
}
