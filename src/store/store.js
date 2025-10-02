import { configureStore } from "@reduxjs/toolkit";
import { authSlice, popUpSlice, sidebarSlice, themeSlice } from "../features";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    sidebar: sidebarSlice,
    popup: popUpSlice,
  },
});

export default store;
