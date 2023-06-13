import { createSlice } from "@reduxjs/toolkit";
const bearerToken = localStorage.getItem("idToken");
const email = localStorage.getItem("email");
const initialState = { isAuthenticated: !!bearerToken, bearerToken, email };

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.bearerToken = "";
    },
    token(state, action) {
      state.bearerToken = action.payload;
    },
    email(state, action) {
      state.email = action.payload;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
