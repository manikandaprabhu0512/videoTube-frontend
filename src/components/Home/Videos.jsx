import { useEffect } from "react";
import VideoCard from "../Cards/VideoCard";
import Loader from "../Loader";
import { useFetchAllVideos } from "../hooks/useVideo.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../features/sidebar.js";

function Videos() {
  const dispatch = useDispatch();

  const Open = useSelector((state) => state.sidebar.visible);

  const { data: videos, isLoading } = useFetchAllVideos();

  useEffect(() => {
    document.title = "Videogram - Home";
    if (Open) dispatch(toggleSideBar());
  }, []);

  if (isLoading) return <Loader isLoading={true} />;
  if (!videos) return <p>No User Found</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {videos.docs.map((video) => (
          <div key={video._id}>
            <VideoCard
              url={video.thumbnail.url}
              title={video.title}
              duration={video.duration}
              channelname={video.owner.username}
              views={video.views}
              createdAt={video.createdAt}
              _id={video._id}
              avatar={video.owner.avatar.url}
            />
          </div>
        ))}
      </div>
      <div className="mt-20"></div>
    </>
  );
}

export default Videos;
