import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useAddVideoToPlaylist,
  useFetchPlaylistById,
} from "../hooks/usePlayList";
import Loader from "../Loader";
import { Color } from "color-thief-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../features/sidebar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "../Popup/ModalPopup";
import { usefetchAllVideosByUser } from "../hooks/useVideo";
import VideoList from "../Cards/VideoList";

function PlaylistViewPage() {
  const { playlistid } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("auth"));

  const dispatch = useDispatch();
  const Open = useSelector((state) => state.sidebar.visible);

  useEffect(() => {
    if (!Open) dispatch(toggleSideBar());
  }, [Open]);

  const { data: playlist, isLoading: playlistLoading } =
    useFetchPlaylistById(playlistid);

  const playlistIds = useMemo(() => {
    return playlist?.videos.map((v) => v._id) || [];
  }, [playlist]);

  const { data: videos, isLoading } = usefetchAllVideosByUser(user?.username);

  const { mutate: addVideoToPlayList, isLoading: addVideoToPlayListPending } =
    useAddVideoToPlaylist();

  const handleAddVideo = (videoid) => {
    addVideoToPlayList(
      { playlistid, videoid },
      {
        onSuccess: () => {
          setModalOpen(false);
        },
      }
    );
  };

  if (playlistLoading || isLoading || addVideoToPlayListPending)
    return <Loader isLoading={true} />;
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full h-screen">
        <div className="w-full md:w-1/3 p-4 bg-slate-300 rounded-2xl dark:bg-black/60 shadow-2xl flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 md:fixed md:top-20 md:left-0 md:h-[calc(100vh-5rem)] static ">
          {/* Thumbnail */}
          <div className="shrink-0 sp sm:aspect-[16/9] w-full overflow-hidden rounded-lg flex items-center justify-center transition-all">
            <Color
              src={playlist.thumbnail.url || "/dummy-avatar.png"}
              crossOrigin="anonymous"
              format="rgbString"
            >
              {({ data }) => {
                const shadowColor = data || "rgba(0,0,0,0.3)";
                return (
                  <div
                    className="w-full h-full rounded-lg overflow-hidden"
                    style={{
                      boxShadow: `0px 10px 40px ${shadowColor}`,
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    <img
                      src={playlist.thumbnail.url || "/dummy-avatar.png"}
                      alt="Playlist Thumbnail"
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                );
              }}
            </Color>
          </div>

          {/* Playlist Title */}
          <h1 className="shrink-0 text-2xl font-bold line-clamp-2">
            {playlist.name}
          </h1>
          <div className="shrink-0 flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              By <span className="font-medium">{playlist.owner.username}</span>
            </p>
            <p className="text-gray-700 text-sm line-clamp-4">
              {playlist.description}
            </p>
            <p className="text-sm text-gray-500">
              {playlist.videos.length} videos
            </p>
          </div>

          <button
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Add Videos
          </button>
          <div className="flex gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
              ▶ Play All
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
              🔀 Shuffle
            </button>
          </div>
        </div>

        {/* RIGHT: Video List Section */}
        <div className="flex-1 p-2 sm:p-4 ml-0 md:ml-[33.333%] overflow-y-auto">
          {playlist?.videos && playlist?.videos.length > 0 ? (
            playlist.videos.map((video, index) => (
              <Link
                to={`/watch/${video._id}`}
                key={index}
                className="flex gap-4 mb-4 sm:p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              >
                {/* Video Number */}
                <div className="flex items-center justify-center w-8  font-medium">
                  {index + 1}.
                </div>

                {/* Video Thumbnail */}
                <VideoList
                  url={video.thumbnail.url}
                  title={video.title}
                  duration={video.duration}
                  description={video.description}
                  views={video.views}
                  createdAt={video.createdAt}
                />
              </Link>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <div className="p-4 rounded-lg flex flex-col gap-6 w-60 mt-50 items-center justify-center">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 h-9 active:scale-95 transition text-sm text-gray-500 dark:text-white rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center gap-1"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Videos</span>
                </button>
                <p className="hidden sm:inline">Add Videos to the PlayList</p>
              </div>
            </div>
          )}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="text-xl font-bold mb-4">Your Videos</h2>
            <ul>
              {videos.filter(
                (video) =>
                  video.isPublished === true && !playlistIds.includes(video._id)
              ).length === 0 ? (
                <div>
                  <p1 className="text-sm text-gray-600">No Videos Found</p1>
                  <div className="flex flex-col p-25 items-center gap-2.5 justify-center">
                    <Link
                      to={`/upload/video`}
                      className="w-auto px-4 py-2 active:scale-95 transition text-sm text-gray-500 dark:text-white rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span>Create</span>
                    </Link>
                    <span>Create New Video</span>
                  </div>
                </div>
              ) : (
                videos
                  .filter(
                    (video) =>
                      video.isPublished === true &&
                      !playlistIds.includes(video._id)
                  )
                  .map((video) => (
                    <div key={video._id}>
                      <li>
                        <button onClick={() => handleAddVideo(video._id)}>
                          <VideoList
                            url={video.thumbnail.url}
                            title={video.title}
                            duration={video.duration}
                            description={video.description}
                            views={video.views}
                            createdAt={video.createdAt}
                          ></VideoList>
                        </button>
                      </li>
                    </div>
                  ))
              )}
            </ul>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default PlaylistViewPage;
