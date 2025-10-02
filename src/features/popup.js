import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
  name: "popup",
  initialState: [],
  reducers: {
    showPopup: (state, action) => {
      const { component, props } = action.payload;
      state.push({
        id: Date.now(),
        component,
        props: props || {},
      });
    },
    hidePopup: (state, action) => {
      return state.filter((popup) => popup.id != action.payload);
    },
  },
});

export const { showPopup, hidePopup } = popUpSlice.actions;
export default popUpSlice.reducer;
