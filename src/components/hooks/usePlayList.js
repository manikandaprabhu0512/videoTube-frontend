import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addVideoToPlaylist,
  fetchPlaylistById,
  fetchUserPlaylists,
} from "../../Api/playlists";

export const useFetchUserPlaylists = (id) => {
  return useQuery({
    queryKey: ["userData", id],
    queryFn: () => fetchUserPlaylists(id),
  });
};

export const useFetchPlaylistById = (playlistId) => {
  return useQuery({
    queryKey: ["playlistData", playlistId],
    queryFn: () => fetchPlaylistById(playlistId),
  });
};

export const useAddVideoToPlaylist = () => {
  return useMutation({
    mutationFn: ({ playlistid, videoid }) =>
      addVideoToPlaylist({ playlistid, videoid }),
  });
};
