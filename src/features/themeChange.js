import { createSlice } from "@reduxjs/toolkit";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const savedTheme = JSON.parse(localStorage.getItem("theme"));

const initialState = {
  darkMode: savedTheme !== null ? savedTheme : getSystemTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", JSON.stringify(state.darkMode));
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("theme", JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
