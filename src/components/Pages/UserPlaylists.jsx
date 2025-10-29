import React from "react";
import Loader from "../Loader";
import { useFetchUserPlaylists } from "../hooks/usePlayList";
import { Link } from "react-router-dom";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";

function UserPlaylists() {
  const user = JSON.parse(localStorage.getItem("auth"));

  const { data: playlists, isLoading } = useFetchUserPlaylists(user?._id);

  if (isLoading) return <Loader isLoading={true} />;

  return (
    <div>
      <div>
        <div className="flex justify-between mx-5">
          <h1 className="text-3xl font-bold">Your Playlists</h1>
          <Link
            to={`/studio/create-playlist/${user?.username}`}
            type="button"
            class="w-auto px-4 pt-2 active:scale-95 transition text-sm text-gray-500 dark:text-white rounded-lg bg-gray-200 dark:bg-gray-800"
          >
            <p class="mb-0.5">Create new Playlist</p>
          </Link>
        </div>
        <hr className="m-3"></hr>
      </div>
      <div>
        {playlists.length === 0 ? (
          <>
            <p className="pl-4">No PlayLists Found</p>
            <div className="flex justify-center items-center">
              <div className="p-4 rounded-lg flex flex-col gap-6 w-60 mt-50 items-center justify-center">
                <Link
                  to={`/studio/create-playlist/${user?.username}`}
                  className="px-4 h-9 active:scale-95 transition text-sm text-gray-500 dark:text-white rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center gap-1"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Create</span>
                </Link>
                <p className="hidden sm:inline">Create Your New PlayList</p>
              </div>
            </div>
          </>
        ) : (
          <ul>
            {playlists.map((playlist) => (
              <div key={playlist._id} className="mr-3">
                <li className="ml-3 mb-3">
                  <Link
                    to={`/playlist/${playlist._id}`}
                    className="flex flex-col sm:flex-row items-start rounded-lg shadow-md bg-black overflow-hidden hover:shadow-lg transition-shadow cursor-pointer w-full mr-3"
                  >
                    <div className="w-full sm:w-48 md:w-56 aspect-[16/9] flex justify-center items-center overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={playlist.thumbnail.url || "/dummy-avatar.png"}
                        alt="Playlist Thumbnail"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between w-full">
                      <h2 className="text-lg font-semibold line-clamp-2">
                        {playlist.name || "Sample Video Title"}
                      </h2>
                      <p className="text-gray-500  text-sm mt-2 line-clamp-3">
                        {playlist.description ||
                          "This is a sample description of the video or playlist. It will show a couple of lines and truncate if too long."}
                      </p>
                    </div>
                    <EllipsisVerticalIcon className="h-6 w-6 mr-2 mt-2 cursor-pointer flex-shrink-0" />
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserPlaylists;
