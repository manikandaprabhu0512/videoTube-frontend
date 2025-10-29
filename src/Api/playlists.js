import API from "./api.js";

export const fetchUserPlaylists = async (id) => {
  try {
    const res = await API.get(`/playlist/c/${id}`, {
      withCredentials: true,
    });
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    throw error;
  }
};

export const createPlaylist = async ({
  playlistName,
  description,
  thumbnail,
}) => {
  const formData = new FormData();
  formData.append("playListName", playlistName);
  formData.append("description", description);
  formData.append("thumbnail", thumbnail);

  try {
    const res = await API.post("/playlist/createplaylist", formData, {
      headers: { "Content-type": "multipart / form-data" },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPlaylistById = async (playlistId) => {
  try {
    const res = await API.get(`/playlist/user/c/${playlistId}`);

    return res?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const addVideoToPlaylist = async ({ playlistid, videoid }) => {
  try {
    await API.post(`/playlist/${playlistid}/addVideo/c/${videoid}`);
  } catch (error) {
    throw error;
  }
};
