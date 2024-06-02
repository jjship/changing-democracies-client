import PostersClient from "@/components/admin/posters/PostersClient";
import { getPostersMetadata } from "@/utils/posters-methods";

export default async function PostersWithLocation({
  params: { location },
}: {
  params: { location?: string };
}) {
  const postersRes = await getPostersMetadata();

  if (!postersRes.success) {
    console.error(postersRes.error);
    return <p>Error loading posters</p>;
  }

  const sortedPosters = postersRes.data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return <PostersClient initialPosters={sortedPosters} location={location} />;
}
