"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navButton } from "../../components/admin/classNames";

type ClickParams = { token_hash: string; type: string; next: string };

export default function ClickToLogin(props: {
  searchParams: Promise<ClickParams>;
}) {
  const searchParams = use(props.searchParams);
  const { token_hash, type, next } = searchParams;

  const router = useRouter();

  const goLogin = () => {
    if (type === "invite" || type === "recovery") {
      const params = new URLSearchParams({
        token_hash,
        type,
        next: next ?? "",
      });
      router.push(`/auth/confirm?${params.toString()}`);
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
