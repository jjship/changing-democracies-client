import useSWR from "swr";
import { useBoothContext } from "./BoothContext";
import { FC } from "react";
import PostersPage from "../posters/PostersPage";

const PostersGallery: FC = () => {
  const { location, stage } = useBoothContext();

  const { data, error, isLoading } = useSWR("/admin/posters/api", (...args) =>
    fetch(...args).then((res) => res.json()),
  );

  if (stage !== -2) return null;

  if (error) throw new Error(error);

  return (
    <PostersPage
      initialPosters={data}
      location={location}
      isLoading={isLoading}
    />
  );
};

export default PostersGallery;
