import API from "./api";

export const fetchAllVideos = async () => {
  try {
    const res = await API.get(
      // `https://videotube-xwsa.onrender.com/api/v1/users/c/${auth.username}`,
      `/videos`,
      { withCredentials: true }
    );

    return res.data.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const fetchVideoById = async (videoid) => {
  try {
    const res = await API.get(`/videos/c/${videoid}`, {
      withCredentials: true,
    });

    return res.data.data[0];
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const publishVideo = async ({
  title,
  description,
  videoFile,
  thumbnail,
}) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("videoFile", videoFile);
  formData.append("thumbnail", thumbnail);

  try {
    const res = await API.post("/videos/publishVideo", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart / form-data" },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchAllVideosByUserName = async (username) => {
  try {
    const res = await API.get(`/videos/c/user/${username}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const toggleVideo = async (videoId) => {
  try {
    const res = await API.patch(
      `/videos/c/toggle/${videoId.videoId}`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.error("Error in Toggle Video: ", error);
  }
};

export const updateThumbnail = async ({ videoId, thumbnail }) => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail);

  try {
    const res = await API.patch(`/videos/c/thumbnail/${videoId}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart / form-data" },
    });
    return res;
  } catch (error) {}
};

export const updateVideoDetails = async ({ videoId, title, description }) => {
  if (!(title || description)) return alert("Title or Description is missing");

  try {
    const res = await API.patch(
      `/videos/c/${videoId}`,
      { title, description },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const deleteVideo = async ({ videoId }) => {
  if (!videoId) return alert("Video Id is missing");

  try {
    const res = await API.delete(`/videos/c/${videoId}`, {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const addWatchHistory = async ({ videoId }) => {
  if (!videoId) return alert("Video Id is missing");

  try {
    const res = await API.patch(
      `/videos/c/watchHistory/${videoId}`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    console.error("Error: ", error);
  }
};
