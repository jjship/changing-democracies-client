import useSWR from "swr";
import { useBoothContext } from "./BoothContext";
import { FC } from "react";
import PostersPage from "../posters/PostersPage";

const PostersGallery: FC = () => {
  const { location, stage } = useBoothContext();

  const { data, error } = useSWR("/admin/posters/api", (...args) =>
    fetch(...args).then((res) => res.json()),
  );

  if (stage !== -2) return null;

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <PostersPage initialPosters={data} location={location} />;
};

export default PostersGallery;
