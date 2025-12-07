import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import { timesAgo } from "../../utils/timesago.js";
import { useChannelSubscriber } from "../hooks/useSubscription.js";
import { Dislike, Like } from "../../assets/Icons.jsx";
import { useFetchVideoById } from "../hooks/useVideo.js";
import {
  useAddUserWatchHistory,
  useUserChannelDetails,
} from "../hooks/useUser.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../features/sidebar.js";
import { useGetVideoLikes, useToggleVideoLikes } from "../hooks/useLikes.js";
import {
  useAddVideoComment,
  useGetVideoComments,
} from "../hooks/useComments.js";
import SubscribeBtn from "../../utils/SubscribeBtn.jsx";

function WatchCard() {
  useEffect(() => {
    if (!Open) dispatch(toggleSideBar());
  }, []);

  const [liked, setLiked] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const { videoid } = useParams();

  const dispatch = useDispatch();

  const Open = useSelector((state) => state.sidebar.visible);

  const user = JSON.parse(localStorage.getItem("auth"));

  const { data: video, isLoading } = useFetchVideoById(videoid);

  const { data: channel } = useUserChannelDetails(video?.owner?.username);

  useEffect(() => {
    if (isLoading) {
      document.title = "Videogram";
    }
  }, [isLoading]);

  useEffect(() => {
    if (video?.title) {
      document.title = `Videogram - ${video.title}`;
    }
  }, [video]);

  const { mutate: addtoWatchHistory, isPending: addtoWatchHistoryPending } =
    useAddUserWatchHistory();

  const { mutate: toggleVideoLike } = useToggleVideoLikes();

  const { data: channelSubscriber, isLoading: channelSubscriberLoading } =
    useChannelSubscriber({ id: video?.owner?._id });

  const { data: videoLikes, isLoading: videoLikesLoading } =
    useGetVideoLikes(videoid);

  const { data: videoComments, isLoading: videoCommentsPending } =
    useGetVideoComments(videoid);

  useEffect(() => {
    if (video) {
      addtoWatchHistory({ videoId: videoid });
    }
  }, [video]);

  useEffect(() => {
    if (addComment && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addComment]);

  const { mutate: addVideoComment } = useAddVideoComment();

  const handleAddComment = () => {
    addVideoComment({ videoid, content });
    setAddComment(false);
    setContent("");
  };

  useEffect(() => {
    const isLiked = videoLikes?.docs?.some((like) => like.owner === user?._id);
    setLiked(Boolean(isLiked));
  }, [videoLikes, user?._id]);

  const handleLikes = (videoId) => {
    toggleVideoLike(videoId);
    setLiked(!liked);
  };

  if (
    isLoading ||
    addtoWatchHistoryPending ||
    channelSubscriberLoading ||
    videoLikesLoading ||
    videoCommentsPending
  )
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
              playing={isPlaying}
              width="100%"
              height="100%"
              className="bg-black rounded-2xl"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
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

                <Link
                  to={`/${video.owner.username}`}
                  className="flex flex-col items-start"
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium hover:underline">
                    {video.owner.username}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 italic">
                    {channelSubscriber?.length || 0} subscribers
                  </p>
                </Link>

                <SubscribeBtn
                  user={user}
                  subscribers={channelSubscriber}
                  channelId={channel?._id}
                />
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 
                       bg-white dark:bg-slate-800 hover:bg-slate-700 text-gray-200 rounded-full 
                       transition active:scale-95 text-xs sm:text-sm md:text-base shadow"
                  onClick={() => handleLikes(video._id)}
                >
                  {liked ? <Like style={"fill-gray-400"} /> : <Like />}{" "}
                  <span className="text-gray-800 dark:text-white">
                    {videoLikes?.docs?.length || 0}
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
          {/* Video stats */}
          <div className="flex flex-col gap-4 mt-4 p-4 bg-white dark:bg-[#363636] rounded-xl shadow-lg">
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
          {/* Comment Section */}
          <div>
            <h1 className="text-xl font-bold my-3">
              {videoComments?.length} Comments
            </h1>
          </div>
          <div className="flex mt-5 items-center gap-3">
            <img
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 md:h-12 md:w-12"
              src={user.avatar.url || "/dummy-avatar.png"}
              alt="userImage"
            />
            <div className="w-full">
              {addComment ? (
                <>
                  <div>
                    <div className="flex">
                      <input
                        type="text"
                        className={`w-full focus:outline-0 text-gray-700  py-2 border-b border-b-white`}
                        placeholder={"What are you thinking?..."}
                        ref={inputRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end py-2 gap-2 pr-10 pl-5">
                      <div className="flex gap-2">
                        <button onClick={() => setAddComment(false)}>
                          Cancel
                        </button>
                        <button
                          onClick={handleAddComment}
                          className={`p-1 rounded-lg text-white ${
                            content.length == 0
                              ? "bg-gray-400 hover:cursor-not-allowed"
                              : "bg-red-700"
                          } `}
                          disabled={content.length == 0}
                        >
                          Add Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="p-2 rounded w-full text-start"
                    onClick={() => setAddComment((prev) => !prev)}
                  >
                    Add Comment
                  </button>
                  <hr></hr>
                </>
              )}
            </div>
          </div>
          {/* Comments List */}
          <div className="mt-8">
            {videoComments?.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-4 border-b py-4 border-gray-200 dark:border-gray-700"
              >
                {/* Avatar */}
                <img
                  src={comment.avatar?.url || "/dummy-avatar.png"}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                      {comment.username}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                    {comment.comment}
                  </p>

                  {/* Like / Reply actions */}
                  <div className="flex gap-4 mt-2">
                    <button className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition">
                      👍 Like
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition">
                      💬 Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20"></div>
        </div>
      </div>
    </>
  );
}

export default WatchCard;
