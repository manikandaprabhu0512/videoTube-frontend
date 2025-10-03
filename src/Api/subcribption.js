import API from "./api.js";

export const fetchSubscribers = async ({ id }) => {
  try {
    const res = await API.get(`/subscriptions/c/subscribers/${id}`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
