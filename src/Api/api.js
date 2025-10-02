import axios from "axios";
import store from "../store/store";
import { showPopup } from "../features/popup";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_LINK,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      store.dispatch(
        showPopup({
          component: "SomethingWentWrong_Popup",
          props: {
            isOpen: true,
            message: "Internal Error. Please Reload Again",
          },
        })
      );
    }
    if (error.response && error.response.status === 400) {
      store.dispatch(
        showPopup({
          component: "SomethingWentWrong_Popup",
          props: {
            isOpen: true,
            message: "Bad Request!!",
          },
        })
      );
      window.location.href = "/";
      return;
    }

    if (
      error.response &&
      error.response.status === 500 &&
      !error.config._retry &&
      !error.config.url.includes("/login")
    ) {
      error.config._retry = true;
      store.dispatch(
        showPopup({
          component: "SomethingWentWrong_Popup",
          props: {
            isOpen: true,
            message: "Internal Error. Please Reload Again",
          },
        })
      );
      return;
    }

    return Promise.reject(error);
  }
);

export default API;
