import React from "react";
import { useFetchUserPlaylists } from "../hooks/usePlayList";
import Loader from "../Loader";

function PlayLists() {
  const user = JSON.parse(localStorage.getItem("auth"));

  const { data: playlists, isLoading } = useFetchUserPlaylists(user?._id);

  if (isLoading) return <Loader isLoading={true} />;

  return (
    <div>
      <h1 className="text-3xl font-bold ml-3 mb-3">Playlists</h1>
      <hr className="m-3"></hr>
      {playlists.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 ml-3">
          No Playlists Found
        </p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist._id} className="ml-3">
              {playlist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlayLists;
