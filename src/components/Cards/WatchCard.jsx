import ReactPlayer from "react-player";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addWatchHistory, fetchVideoById } from "../../Api/videos.js";
import { useDispatch } from "react-redux";
import { timesAgo } from "../../utils/timesago.js";
import { useFetchAllVideos } from "../hooks/useVideo.js";
import { useChannelSubscriber } from "../hooks/useSubscription.js";
import { Dislike, Like } from "../../assets/Icons.jsx";

function WatchCard() {
  const { videoid } = useParams();

  const user = JSON.parse(localStorage.getItem("auth"));

  const { data: video, isLoading } = useQuery({
    queryKey: ["videobyid"],
    queryFn: () => fetchVideoById(videoid),
  });

  const { mutate: addtoWatchHistory, isPending: addtoWatchHistoryPending } =
    useMutation({
      mutationKey: ["addWatchHistory"],
      mutationFn: addWatchHistory,
    });

  const { data: channelSubscriber, isLoading: channelSubscriberLoading } =
    useChannelSubscriber({ id: user._id });

  useEffect(() => {
    if (video) {
      addtoWatchHistory({ videoId: videoid });
    }
  }, [video]);

  if (isLoading || addtoWatchHistoryPending || channelSubscriberLoading)
    return <Loader isLoading={true} />;
  if (!video) return <p>No User Found</p>;

  return (
    <>
      <div className="flex justify-center max-w-8xl w-full mx-auto px-4">
        <div className="w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3">
          {/* Video */}
          <div className="aspect-video shadow-2xl rounded-2xl">
            <ReactPlayer
              src={video.videoFile.url}
              controls
              playing
              width="100%"
              height="100%"
              className="bg-black rounded-2xl"
            />
          </div>
          {/* Video Details */}
          <div>
            <div className="mt-4">
              <span className="block text-2xl font-semibold">
                {video.title}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
                  src={video.owner.avatar.url || "/dummy-avatar.png"}
                  alt="user avatar"
                />

                <div className="flex flex-col items-start">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    {video.owner.username}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 italic">
                    {channelSubscriber?.length || 0} subscribers
                  </p>
                </div>

                <button
                  type="button"
                  className="ml-auto sm:ml-4 w-20 sm:w-24 md:w-28 lg:w-32 py-1 sm:py-1.5 md:py-2 
                 text-xs sm:text-sm md:text-base text-white dark:text-black 
                 rounded-full bg-black dark:bg-white active:scale-95 transition"
                >
                  <span className="block">Subscribe</span>
                </button>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 
                       bg-white dark:bg-slate-800 hover:bg-slate-700 text-gray-200 rounded-full 
                       transition active:scale-95 text-xs sm:text-sm md:text-base shadow"
                >
                  <Like />{" "}
                  <span className="text-gray-800 dark:text-white">
                    {video.likes || 0}
                  </span>
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 
                       bg-white dark:bg-slate-800 hover:bg-slate-700 text-gray-200 rounded-full 
                       transition active:scale-95 text-xs sm:text-sm md:text-base shadow"
                >
                  <Dislike />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 p-4 bg-white dark:bg-[#363636] rounded-xl shadow-lg">
            {/* Video stats */}
            <div className="flex flex-wrap gap-2 text-gray-800 dark:text-white text-sm sm:text-base">
              <span>{video.views} views</span>
              <span>{timesAgo(video.createdAt)}</span>
            </div>

            <div className="text-gray-800 dark:text-white text-sm sm:text-base whitespace-pre-line">
              {video.description}
            </div>

            <div className="flex items-center gap-4 mt-2">
              {/* Avatar */}
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                src={video.owner.avatar.url || "/dummy-avatar.png"}
                alt="userImage"
              />

              <div className="flex flex-col justify-center">
                <p className="text-gray-800 dark:text-white font-medium">
                  {video.owner.username}
                </p>
                <p className="text-gray-400 text-sm">
                  {channelSubscriber?.length || 0} subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20"></div>
    </>
  );
}

export default WatchCard;
