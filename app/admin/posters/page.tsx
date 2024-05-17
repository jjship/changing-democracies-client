"use server";
import { Suspense } from "react";
import { getPostersMetadata } from "@/utils/posters-methods";
import PostersPage from "@/components/admin/posters/PostersPage";

export default async function Page() {
  const postersRes = await getPostersMetadata();

  if (!postersRes.success) {
    console.error(postersRes.error);
    return <p>Error loading posters</p>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostersPage initialPosters={postersRes.data} />
    </Suspense>
  );
}
