import API from "./api";

export const getVideoComments = async (videoid) => {
  try {
    const res = await API.get(`/comments/c/${videoid}`);

    return res?.data?.data?.docs;
  } catch (error) {
    throw error;
  }
};

export const addVideoComments = async ({ videoid, content }) => {
  try {
    await API.post(`/comments/add-comments/c/${videoid}`, {
      content,
    });
  } catch (error) {
    throw error;
  }
};
