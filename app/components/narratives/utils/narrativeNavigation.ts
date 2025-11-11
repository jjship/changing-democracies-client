import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useNarrativeNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateToOverview = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    router.push(`${pathname}?${params.toString()}`);
  };

  const navigateToNarrative = (narrativeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", narrativeId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    navigateToOverview,
    navigateToNarrative,
  };
};

