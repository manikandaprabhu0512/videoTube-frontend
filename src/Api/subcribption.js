import API from "./api.js";

export const fetchSubscribers = async ({ id }) => {
  try {
    const res = await API.get(`/subscriptions/c/subscribers/${id}`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSubscribered = async ({ id }) => {
  try {
    const res = await API.get(`/subscriptions/c/subscribed/${id}`);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const subscriberChannel = async ({ id }) => {
  try {
    await API.post(`/subscriptions/c/${id}`, {});
  } catch (error) {
    throw error;
  }
};

export const unsubscribeChannel = async ({ id }) => {
  try {
    await API.delete(`/subscriptions/c/${id}`, {});
  } catch (error) {
    throw error;
  }
};
