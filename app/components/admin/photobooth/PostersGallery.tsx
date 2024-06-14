import useSWR from "swr";
import { useBoothContext } from "./BoothContext";
import { usePostersLoader } from "./usePostersLoader";
import { FC } from "react";
import PostersPage from "../posters/PostersPage";

const PostersGallery: FC = () => {
  const { location, stage } = useBoothContext();

  const { posters, error, reloadPosters } =
    usePostersLoader("/admin/posters/api");

  if (stage !== -2) return null;

  if (error) reloadPosters();

  return (
    <PostersPage
      initialPosters={posters}
      location={location}
      isLoading={!posters}
    />
  );
};

export default PostersGallery;
