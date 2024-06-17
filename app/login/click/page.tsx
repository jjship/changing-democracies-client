"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navButton } from "../../components/admin/classNames";

type ClickParams = { token_hash: string; type: string; next: string };

export default function ClickToLogin({
  searchParams,
}: {
  searchParams: ClickParams;
}) {
  const { token_hash, type, next } = searchParams;

  const router = useRouter();

  const goLogin = () => {
    if (type === "invite" || type === "recovery") {
      router.push(
        `/auth/confirm?token_hash=${token_hash}&type=${type}&next=${next}`,
      );
    }
  };

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-purple_mains">
      <div>
        <Button className={navButton} size="lg" onClick={() => goLogin()}>
          Open Log In Page
        </Button>
      </div>
    </main>
  );
}
