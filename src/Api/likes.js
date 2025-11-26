import API from "./api";

export const getVideoLikes = async (videoid) => {
  try {
    const res = await API.get(`/likes/videos/c/${videoid}`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const toggleVideoLikes = async (videoid) => {
  try {
    const res = await API.post(`/likes/video/c/${videoid}`);
  } catch (error) {
    throw error;
  }
};
