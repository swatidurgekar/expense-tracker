import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: false };

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    light(state) {
      state.theme = false;
    },
    dark(state) {
      state.theme = true;
    },
  },
});

export const themeActions = ThemeSlice.actions;

export default ThemeSlice.reducer;
