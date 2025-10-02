import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import Container from "../Container/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addWatchHistory, fetchVideoById } from "../../Api/videos.js";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../features/sidebar";

function WatchCard() {
  const { videoid } = useParams();

  const dispatch = useDispatch();

  const { data: video, isLoading } = useQuery({
    queryKey: ["videobyid"],
    queryFn: () => fetchVideoById(videoid),
  });

  const { mutate: addtoWatchHistory, isLoading: addtoWatchHistoryPending } =
    useMutation({
      mutationKey: ["addWatchHistory"],
      mutationFn: addWatchHistory,
    });

  useEffect(() => {
    if (video) {
      addtoWatchHistory({ videoId: videoid });
      dispatch(toggleSideBar());
    }
  }, [video]);

  if (isLoading || addtoWatchHistoryPending) return <Loader isLoading={true} />;
  if (!video) return <p>No User Found</p>;

  return (
    <Container>
      <div className="w-full flex justify-start">
        <ReactPlayer
          src={video.videoFile.url}
          controls
          playing={true}
          width="70%"
          height="auto"
          className="rounded-md mt-3"
        />
      </div>
    </Container>
  );
}

export default WatchCard;
