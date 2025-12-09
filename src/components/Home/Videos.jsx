import { useEffect, useRef } from "react";
import VideoCard from "../Cards/VideoCard";
import { useFetchAllVideos } from "../hooks/useVideo.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../features/sidebar.js";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function Videos() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const Open = useSelector((state) => state.sidebar.visible);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchAllVideos(query);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const videos = data?.pages.flatMap((page) => page.items || page.docs) || [];

  useEffect(() => {
    document.title = "Videogram - Home";
    if (Open) dispatch(toggleSideBar());
  }, []);

  if (!videos) return <p>No Videos Found</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {videos?.map((video) => (
          <div key={video?._id}>
            <VideoCard
              url={video?.thumbnail?.url}
              title={video?.title}
              duration={video?.duration}
              channelname={video?.owner?.username}
              views={video?.views}
              createdAt={video?.createdAt}
              _id={video?._id}
              avatar={video?.owner?.avatar?.url}
            />
          </div>
        ))}
      </div>
      <div ref={ref} className="mt-20 text-center">
        <span className="loader1"></span>
      </div>
    </>
  );
}

export default Videos;
