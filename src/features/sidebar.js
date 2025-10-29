import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: JSON.parse(localStorage.getItem("sideBar")) || false,
  activeTab: "",
};

const sibebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.visible = !state.visible;
      localStorage.setItem("sideBar", JSON.stringify(state.visible));
    },
    activeTab: (state, action) => {
      const { activeTab } = action.payload;
      state.activeTab = activeTab;
    },
  },
});

export const { toggleSideBar, activeTab } = sibebarSlice.actions;

export default sibebarSlice.reducer;
