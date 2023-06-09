import { createSlice } from "@reduxjs/toolkit";
const bearerToken = localStorage.getItem("idToken");
const initialState = { isAuthenticated: !!bearerToken, bearerToken };

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
      console.log(state.bearerToken);
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
